/* Native wardrobe integration; no dependency on any bakery gameplay module. */
(() => {
    'use strict';
    let edit = false, installed = false, ready = false, problem = '', notice = '';
    const api = setup.pcVanity = setup.createPCVanity({
        vars: () => State.variables,
        slots: () => setup.clothes_all_slots || Object.keys(State.variables.worn || {}),
        catalog: () => setup.clothes,
        enabled: () => State.variables.options?.pcClothingOptimizations !== false,
        storage: () => typeof selectWardrobe === 'function' ? selectWardrobe() : State.variables.wardrobe
    });
    api.featureEnabled = () => State.variables.options?.pcClothingOptimizations !== false;
    api.editing = () => edit && api.featureEnabled();
    api.shouldRender = () => api.featureEnabled() && ready && !!State.variables.pcVanity && (edit || (State.variables.pcVanity.enabled && !inWardrobe()));
    function inWardrobe() { return !!document.querySelector('#wardrobe-options-div'); }
    function clearRequests() {
        const v = State.variables;
        for (const slot of api.slots()) v['wear_' + slot] = 'none';
        v.wear_outfit = 'none'; v.randomWear = false;
        delete T.wearAction;
    }
    api.resetEditing = () => { edit = false; notice = ''; clearRequests(); };
    function redraw() {
        if (!api.featureEnabled()) return;
        Wikifier.wikifyEval('<<updatewardrobe "outfits">>');
        renderHeader(document.querySelector('.pc-vanity-controls'));
        if (typeof updateMoment === 'function') updateMoment();
    }
    function renderHeader(root) {
        if (!root) return;
        if (!api.featureEnabled()) { root.remove(); return; }
        root.replaceChildren();
        const watermark = document.createElement('div'); watermark.className = 'pc-vanity-watermark gold';
        watermark.textContent = '✨ PC的面包坊MOD ✨';
        root.append(watermark);
        const label = document.createElement('strong');
        label.textContent = edit ? '时装模式' : '装备模式';
        const toggle = document.createElement('button'); toggle.type = 'button';
        toggle.textContent = edit ? '切换到装备模式' : '切换到时装模式';
        toggle.disabled = !ready;
        toggle.addEventListener('click', () => {
            api.state(); edit = !edit; notice = '';
            State.variables.wardrobeOption = 'wear'; State.variables.delete_outfit = 'none';
            clearRequests(); redraw();
        });
        root.append(label, toggle);
        if (ready) {
            const enabledLabel = document.createElement('label'), enabled = document.createElement('input');
            enabled.type = 'checkbox'; enabled.checked = !!State.variables.pcVanity?.enabled;
            enabled.addEventListener('change', () => { api.state().enabled = enabled.checked; redraw(); });
            enabledLabel.append(enabled, document.createTextNode('启用时装显示'));
            root.append(enabledLabel);
        }
        const description = document.createElement('div'); description.className = 'pc-vanity-description';
        if (problem) description.textContent = problem;
        else description.innerHTML = edit
            ? '当前为 <span class="green">时装模式</span>，服装仅影响模型显示效果，<span class="gold">不参与任何特殊效果</span>。'
            : '当前为 <span class="green">装备模式</span>，穿着的服装将<span class="gold">切实影响</span> 温暖度、特质、暴露度与战斗防御 等玩法内容。';
        root.append(description);
        if (notice) { const message = document.createElement('div'); message.className = 'pc-vanity-notice'; message.textContent = notice; root.append(message); }
    }
    Macro.add('pcVanityHeader', { handler() {
        if (!api.featureEnabled()) return;
        const root = document.createElement('div'); root.className = 'pc-vanity-controls';
        renderHeader(root); this.output.append(root);
    } });
    function widgetSource(name) {
        const pattern = new RegExp('<<widget\\s+["\']' + name + '["\'][^>]*>>([\\s\\S]*?)<</widget>>');
        for (const passage of document.querySelectorAll('tw-passagedata')) {
            const match = pattern.exec(passage.textContent);
            if (match) return match[1];
        }
        throw new Error('当前游戏缺少衣柜组件：' + name);
    }
    function wrap(name, callback) {
        const macro = Macro.get(name);
        if (!macro) throw new Error('当前游戏缺少衣柜操作：' + name);
        const original = macro.handler;
        macro.handler = function () { return callback.call(this, original); };
    }
    api.ui = { widgetSource, wrap, fashionSource };
    function fashionSource(text) {
        text = text.replace(/\$worn\b/g, '$pcVanity.worn').replace(/\bV\.worn\b/g, 'V.pcVanity.worn');
        for (const key of ['upperTucked', 'lowerTucked', 'bellyTucked', 'facelayer'])
            text = text.replace(new RegExp('\\$' + key + '\\b', 'g'), '$pcVanity.' + key);
        text = text.replace(/isConnectedToHood\(/g, 'setup.pcVanity.isConnectedToHood(');
        text = text.replace(/<<toggleHood\s+[^>]*>>/g, '<<run setup.pcVanity.toggleHood()>>');
        // Leash attachment is gameplay inventory manipulation; render a separate
        // appearance toggle without calling native attach_leash on real gear.
        text = text.replace(/<<toggleLeash>>/g, '<<pcVanityLeash>>');
        text = text.replace(/Currently equipped:|已装备物品[：:]/g, '当前时装：');
        return text;
    }
    function variant(name, text = fashionSource(widgetSource(name))) {
        const alternate = 'pcVanity_' + name.replaceAll('-', '_');
        Wikifier.wikifyEval('<<widget "' + alternate + '">>' + text + '<</widget>>');
        wrap(name, function (original) {
            if (!edit || !ready || !api.featureEnabled()) return original.call(this);
            api.state();
            return Macro.get(alternate).handler.call(this);
        });
    }
    api.isConnectedToHood = slot => {
        const worn = api.state().worn;
        return (slot === 'upper' && worn.upper.hoodposition !== undefined) ||
            (slot === 'head' && !!worn.head.hood);
    };
    Macro.add('pcVanityLeash', { handler() {
        if (!api.featureEnabled()) return;
        const item = api.state().worn.neck;
        if (!['collar', 'free use collar', 'leather collar', 'spiked collar', 'collar with leash', 'free use collar with leash', 'leather collar with leash', 'spiked collar with leash'].includes(item.name)) return;
        const attached = item.name.endsWith(' with leash');
        const link = document.createElement('a'); link.href = '#';
        link.textContent = attached ? '取下牵绳' : '系上牵绳';
        link.addEventListener('click', event => {
            event.preventDefault();
            const name = attached ? item.name.slice(0, -11) : item.name + ' with leash';
            const base = setup.clothes.neck.find(x => x.name === name && x.modder === item.modder);
            if (!base) return;
            const next = JSON.parse(JSON.stringify(base));
            for (const key of ['colour', 'accessory_colour', 'colourCustom', 'accessory_colourCustom', 'integrity', 'location', 'lastTaken'])
                if (item[key] !== undefined) next[key] = item[key];
            api.state().worn.neck = next; redraw();
        });
        this.output.append(link);
    } });
    function requests(output) {
        const v = State.variables;
        notice = '';
        try {
            if (v.wear_outfit !== 'none' && v.wear_outfit !== undefined) {
                if (v.delete_outfit === 1) Wikifier.wikifyEval('<<deleteoutfit>>');
                else if (v.delete_outfit === 2) Wikifier.wikifyEval('<<overwriteoutfit>>');
                else {
                    const missing = api.wearOutfit(v.outfit[v.wear_outfit]);
                    if (missing.length) notice = '衣柜中缺少：' + missing.join('、') + '。未找到的衣物未穿上。';
                }
                v.wear_outfit = 'none'; v.delete_outfit = 'none';
            }
            if (T.wearAction === 'strip') { api.stripAll(); delete T.wearAction; }
            if (T.wearAction === 'dry') {
                // Drying is still a real-equipment action in either mode.
                delete T.wearAction; Wikifier.wikifyEval('<<dry>>');
            }
            if (v.randomWear) {
                v.randomWear = false;
                const target = api.storage(), done = new Set();
                for (const slot of api.slots()) {
                    if (!v.randomEquipConfigure?.[slot] || done.has(slot)) continue;
                    const choices = target[slot].map((item, index) => ({item,index})).filter(x => !x.item.outfitSecondary);
                    if (!choices.length) continue;
                    const chosen = choices[Math.floor(Math.random() * choices.length)];
                    for (const key of api.wear(slot, chosen.index)) done.add(key);
                }
            }
            let delegate = false;
            for (const slot of api.slots()) {
                const value = v['wear_' + slot];
                if (value === 'none' || value === undefined) continue;
                if (value === 'strip') api.strip(slot);
                else if (['towel', 'large_towel'].includes(value)) notice = '时装需使用衣柜中的真实衣物。';
                else if (v.wardrobeOption && v.wardrobeOption !== 'wear') { delegate = true; continue; }
                else if (Number.isInteger(value) && value >= 0) api.wear(slot, value);
                v['wear_' + slot] = 'none';
            }
            if (notice && output) output.append(document.createTextNode(notice));
            return delegate;
        } catch (error) {
            notice = error.message; clearRequests();
            if (output) output.append(document.createTextNode(notice));
            return false;
        }
    }
    function install() {
        if (installed) return;
        installed = true;
        try {
            setup.installPCVanityRenderer(api);
            for (const name of ['wardrobeList', 'oldWardrobeList', 'oldWardrobeMinorOptions', 'wardrobeNewOutfit', 'overwriteoutfit',
                'toggleHoodLink', 'toggleUpperTuck', 'toggleLowerTuck', 'toggleBellyTuck', 'toggleAltLink', 'toggleAltPosition', 'toggleAltSleeve', 'toggleFaceLayer'])
                if (Macro.has(name)) variant(name);
            const canvas = widgetSource('canvasimg').replace('<<selectmodel "main" "sidebar">>', '<<selectmodel "pcVanitySidebar" "sidebar">>')
                .replace('<<modelprepare-player-body>>', '<<pcVanityPrepareBody>>')
                .replace('<<modelprepare-player-clothes>>', '<<pcVanityPrepareClothes>>')
                .replace(/playerHasStrapon\(\)/g, 'setup.pcVanity.visualHasStrapon()')
                .replace(/\$worn\b/g, 'setup.pcVanity.renderWorn()').replace(/\$lowerwetstage\b/g, '0');
            Wikifier.wikifyEval('<<widget "pcVanityCanvasimg">>' + canvas + '<</widget>>');
            wrap('canvasimg', function (original) { return api.shouldRender() ? Macro.get('pcVanityCanvasimg').handler.call(this) : original.call(this); });
            wrap('wardrobe', function (original) { if (api.featureEnabled()) new Wikifier(this.output, '<<pcVanityHeader>>'); return original.call(this); });
            wrap('wardrobewear', function (original) {
                if (!edit || !ready || !api.featureEnabled()) return original.call(this);
                if (requests(this.output)) return original.call(this);
            });
            wrap('wearoutfit', function (original) { if (!edit || !ready || !api.featureEnabled()) return original.call(this); });
            wrap('updatewardrobe', function (original) {
                try { return original.call(this); }
                finally {
                    if (api.featureEnabled() && inWardrobe() && !document.querySelector('.pc-vanity-controls')) {
                        const root = document.createElement('div'); root.className = 'pc-vanity-controls';
                        document.querySelector('#wardrobe-options-div').before(root);
                    }
                    renderHeader(document.querySelector('.pc-vanity-controls'));
                }
            });
            ready = true;
        } catch (error) { problem = '时装功能暂不可用：' + error.message; console.error('[PCVanity]', error); }
    }
    $(document).on(':storyready.pcVanity', install);
    $(document).on(':passagestart.pcVanity', () => { edit = false; notice = ''; });
    $(document).on(':passagedisplay.pcVanity', () => {
        if (api.featureEnabled() && ready && (inWardrobe() || State.variables.pcVanity?.enabled)) Wikifier.wikifyEval('<<updatesidebarimg>>');
    });
    api.compatibilityReport = () => ({ ready, problem });
})();
