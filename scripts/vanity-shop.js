/* Shop mode routing; native sale, theft and delivery rules remain in charge. */
(() => {
    'use strict';
    const shops = new Set(['Clothing Shop', 'School Library Shop', 'Forest Shop', 'Adult Shop Store', 'Balloon Stand', 'Bait Shop']);
    const theftResults = new Set(['Stolen Clothing Shop Result', 'Stolen Adult Shop Result']);
    const vanity = setup.pcVanity;
    let installed = false, ready = false, notice = '';
    const copy = value => JSON.parse(JSON.stringify(value));
    const inShop = () => shops.has(State.passage);
    function storage() {
        const v = State.variables, key = v.wardrobes?.shopReturn;
        return key === 'wardrobe' ? v.wardrobe : v.wardrobes?.[key] || v.wardrobe;
    }
    function create(slot, index) {
        const v = State.variables, base = setup.clothes[slot]?.[index];
        if (!base || base.outfitSecondary) throw new Error('这件商品不能单独穿戴。');
        const choice = (options, selected) => options.includes(selected) ? selected : options.find(x => !['custom', 'random'].includes(x)) || options[0];
        function item(data, primary) {
            const result = copy(data);
            result.lastTaken = v.wardrobes.shopReturn;
            if (data.colour_options?.length) {
                result.colour = choice(data.colour_options, primary?.colour ?? v.colouraction);
                if (result.colour === 'custom') result.colourCustom = primary?.colourCustom || customColour(v.customColors.color.primary, v.customColors.saturation.primary, v.customColors.brightness.primary, v.customColors.contrast.primary, v.customColors.sepia.primary);
            }
            if (data.accessory_colour_options?.length && data.accessory_colour_sidebar) {
                result.accessory_colour = choice(data.accessory_colour_options, primary?.accessory_colour ?? v.accessorycolouraction);
                if (result.accessory_colour === 'custom') result.accessory_colourCustom = primary?.accessory_colourCustom || customColour(v.customColors.color.secondary, v.customColors.saturation.secondary, v.customColors.brightness.secondary, v.customColors.contrast.secondary, v.customColors.sepia.secondary);
            }
            if (data.pattern_options?.length) result.pattern = choice(data.pattern_options, primary?.pattern ?? v.patternaction);
            if (typeof clothesDataTrimmer === 'function') clothesDataTrimmer(result);
            return result;
        }
        const result = { [slot]: item(base) };
        for (const [other, name] of Object.entries(base.outfitPrimary || {})) {
            if (['broken', 'split'].includes(name)) continue;
            const linked = setup.clothes[other]?.find(x => x.name === name && x.modder === base.modder);
            if (!linked) throw new Error('商品缺少配套部件：' + name);
            result[other] = item(linked, result[slot]);
        }
        const current = vanity.state().shop?.preview?.[slot];
        if (current?.name === base.name) {
            for (const key of ['altposition', 'altsleeve']) if (current[key] !== undefined) result[slot][key] = current[key];
            if (current.hoodposition === 'down' && result[slot].outfitPrimary?.head) {
                delete result.head; delete result[slot].outfitPrimary.head; result[slot].hoodposition = 'down';
            }
        }
        return result;
    }
    const core = setup.pcVanityShop = setup.createPCVanityShop(vanity, {
        passage: () => State.passage, tryOn: () => State.variables.tryOn,
        storage, create, price: (slot, item) => getClothingCost(item, slot),
        equipment: () => State.variables.worn,
        enabled: () => vanity.featureEnabled(),
        setEquipment: worn => { State.variables.worn = worn; },
        money: () => State.variables.money,
        charge: cost => Wikifier.wikifyEval('<<money ' + (-cost) + ' "clothes">>')
    });
    const active = () => vanity.featureEnabled() && ready && inShop() && core.session().passage === State.passage;
    const editing = () => active() && core.fashion();
    const routing = () => active() && core.managed();
    const marked = () => vanity.featureEnabled() && !!State.variables.tryOn?.pcVanity;
    const oldShouldRender = vanity.shouldRender;
    vanity.shouldRender = () => active() ? editing() : oldShouldRender();
    vanity.shopPreview = () => editing() ? core.session().preview || core.preview() : undefined;
    core.editing = editing;
    core.routing = routing;
    function act(callback, output) {
        notice = '';
        try { return callback(); }
        catch (error) { notice = error.message; if (output) output.append(document.createTextNode(notice)); }
        finally { refreshHeaders(); }
    }
    function refreshHeaders() {
        for (const root of document.querySelectorAll('.pc-vanity-shop-controls')) renderHeader(root);
    }
    function refresh() {
        if (document.querySelector('#clothes-list')) Wikifier.wikifyEval('<<updateclotheslist>>');
        else if (document.querySelector('#clothingShop-div')) Wikifier.wikifyEval('<<updateclothingshop>>');
        Wikifier.wikifyEval('<<updatetryonstats>><<updatesidebarimg>><<updatesidebardescription>><<updatesidebarmoney>>');
        refreshHeaders();
        if (typeof updateMoment === 'function') updateMoment();
    }
    function renderHeader(root) {
        if (!vanity.featureEnabled()) { root.remove(); return; }
        root.replaceChildren();
        const watermark = document.createElement('div'); watermark.className = 'pc-vanity-watermark gold';
        watermark.textContent = '✨ PC的面包坊MOD ✨';
        root.append(watermark);
        const label = document.createElement('strong'); label.textContent = editing() ? '时装模式' : '装备模式';
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = editing() ? '切换到装备模式' : '切换到时装模式';
        button.addEventListener('click', () => act(() => {
            const mode = editing() ? 'equipment' : 'fashion';
            // Return actual equipment trials before changing their destination.
            // Owned vanity clothes are never part of this temporary preview.
            Wikifier.wikifyEval('<<ShowUnderEquip "normal">><<ShowUnderEquip "over">><<clothingReset>><<tryOnReset>>');
            delete State.variables.tryOn.pcVanity;
            core.reset(mode);
            refresh();
        }));
        const description = document.createElement('div'); description.className = 'pc-vanity-description';
        description.innerHTML = editing()
            ? '当前为 <span class="green">时装模式</span>，服装仅影响模型显示效果，<span class="gold">不参与任何特殊效果</span>。'
            : '当前为 <span class="green">装备模式</span>，穿着的服装将<span class="gold">切实影响</span> 温暖度、特质、暴露度与战斗防御 等玩法内容。';
        root.append(label, button, description);
        if (notice) { const message = document.createElement('div'); message.className = 'pc-vanity-notice'; message.textContent = notice; root.append(message); }
    }
    Macro.add('pcVanityShopHeader', { handler() {
        if (!vanity.featureEnabled()) return;
        const root = document.createElement('div'); root.className = 'pc-vanity-controls pc-vanity-shop-controls';
        renderHeader(root); this.output.append(root);
    } });
    function install() {
        if (installed || !vanity.compatibilityReport().ready) return;
        installed = true;
        const {widgetSource, wrap} = vanity.ui;
        function variant(name, transform) {
            const alternate = 'pcVanityShop_' + name;
            Wikifier.wikifyEval('<<widget "' + alternate + '">>' + transform(widgetSource(name)) + '<</widget>>');
            wrap(name, function (original) { return editing() ? Macro.get(alternate).handler.call(this) : original.call(this); });
        }
        function appearance(text) {
            return text.replace(/\$worn\b/g, '$pcVanity.shop.preview').replace(/\bV\.worn\b/g, 'V.pcVanity.shop.preview')
                .replace(/isConnectedToHood\(/g, 'setup.pcVanityShop.isConnectedToHood(')
                .replace(/<<toggleHood\s+[^>]*>>/g, '<<run setup.pcVanityShop.toggleHood()>>')
                .replace(/\$(upperTucked|lowerTucked|bellyTucked|facelayer)\b/g, '$pcVanity.$1');
        }
        variant('shopDetailsv2', text => appearance(text)
            // This action is an atomic transaction in fashion mode. Its price
            // is charged inside buy(), only after item/capacity validation.
            .replace(/<<money `-getClothingCost\(_temp_choice,\$clothingShopSlot\)` "clothes">>/g, '')
            .replace(/<<clothingReset _realSlot>>/g, '')
            .replace(/\$pcVanity\.shop\.preview\[[^\]]+\]\.cursed/g, '0')
            .replace(/Buy and wear|购买并穿上|购买并穿戴/g, '购买并穿作时装')
            .replace(/Steal and wear|偷走并穿上|偷走并穿戴|偷窃并穿戴/g, '偷走并穿作时装'));
        Wikifier.wikifyEval('<<widget "pcVanityShop_equipmentDetails">>' + widgetSource('shopDetailsv2')
            .replace(/<<money `-getClothingCost\(_temp_choice,\$clothingShopSlot\)` "clothes">>/g, '')
            .replace(/<<clothingReset _realSlot>>/g, '') + '<</widget>>');
        wrap('shopDetailsv2', function (original) {
            return routing() && !editing() ? Macro.get('pcVanityShop_equipmentDetails').handler.call(this) : original.call(this);
        });
        for (const name of ['toggleHoodLink', 'toggleUpperTuck', 'toggleLowerTuck', 'toggleBellyTuck', 'toggleAltLink', 'toggleAltPosition', 'toggleAltSleeve', 'toggleFaceLayer'])
            if (Macro.has(name)) variant(name, appearance);
        wrap('toggleHoodLink', function (original) {
            return routing() && !editing() ? Macro.get('pcVanityShop_toggleHoodLink').handler.call(this) : original.call(this);
        });
        for (const name of ['clothingShop-main', 'schoolShop-main', 'adultShop-main', 'forestShop-main', 'baitShopShop-main', 'stallShop-main', 'clothingShopv2']) {
            if (!Macro.has(name)) continue;
            wrap(name, function (original) {
                if (vanity.featureEnabled() && inShop()) {
                    if (core.session().passage !== State.passage) { core.close(); core.reset('equipment'); }
                    else if (core.managed()) core.sync();
                    new Wikifier(this.output, '<<pcVanityShopHeader>>');
                    if (core.renderOutfits) core.renderOutfits(this.output);
                }
                return original.call(this);
            });
        }
        wrap('shopbuyv2', function (original) {
            if (!routing()) return original.call(this);
            const [slot, action, destination, index] = this.args;
            State.variables.clothes_choice_previous = State.variables.clothes_choice;
            if (action !== 'reset') {
                if (['upper', 'lower'].includes(slot)) core.show('normal', false);
                if (['over_upper', 'over_lower', 'over_head'].includes(slot)) core.show('over', false);
            }
            if (action === 'buy' || action === 'steal') {
                if (destination === 'wear') return act(() => {
                    core.buy(slot, index, action === 'steal');
                    if (State.variables.shopName === 'school') State.variables.schoolShopAction.push('buy', 'wear');
                    Wikifier.wikifyEval('<<updateOwned "' + slot + '">>');
                }, this.output);
                return original.call(this);
            }
            if (action === 'try' || action === 'return') return act(() => {
                if (action === 'try') core.tryItems(slot, index); else core.remove(slot);
                if (State.variables.shopName === 'school') State.variables.schoolShopAction.push(action);
            }, this.output);
            return original.call(this);
        });
        wrap('clothingReset', function (original) { return marked() ? core.remove(this.args[0]) : original.call(this); });
        wrap('ShowUnderEquip', function (original) { return marked() ? core.show(this.args[0], this.args[1] === 'hide') : original.call(this); });
        wrap('tryOnStats', function (original) {
            if (!marked()) return original.call(this);
            const root = document.createElement('div');
            if (State.variables.shopName !== 'stall') for (const [type, slots, label] of [
                ['normal', ['upper', 'lower'], editing() ? '外层时装' : '外层服装'], ['over', ['over_head', 'over_upper', 'over_lower'], editing() ? '罩层时装' : '罩层服装']
            ]) {
                const hidden = slots.some(slot => core.session().hidden[slot]);
                const link = document.createElement('a'); link.href = '#';
                link.textContent = (hidden ? '恢复' : '暂时隐藏') + label;
                link.addEventListener('click', event => {
                    event.preventDefault(); core.show(type, !hidden);
                    if (type === 'normal' && !hidden && State.variables.shopName === 'school') State.variables.schoolShopAction.push('under');
                    refresh();
                });
                root.append(link, document.createElement('br'));
            }
            const text = document.createElement('span'); text.textContent = editing() ? '时装试穿商品合计：' : '试穿商品合计：'; root.append(text);
            new Wikifier(root, '<<printmoney $tryOn.value>>');
            for (const [slot, group] of Object.entries(core.session().trials)) {
                const row = document.createElement('div'), link = document.createElement('a'); link.href = '#';
                const part = Object.keys(group)[0], product = core.session().products?.[slot];
                const base = product?.item || setup.clothes[part].find(x => x.name === group[part].name);
                row.append(document.createTextNode((base?.cn_name_cap || base?.name_cap || group[part].name) + (product?.split ? '（按整套计价，保留预设部件）' : '') + ' '));
                link.textContent = '退还'; link.addEventListener('click', event => { event.preventDefault(); core.remove(part); refresh(); });
                row.append(link); root.append(row);
            }
            this.output.append(root);
        });
        wrap('buyTryOnClothes', function (original) {
            if (!marked()) return original.call(this);
            return act(() => {
                core.checkout(this.args[0], this.args[1] === 'steal');
                Wikifier.wikifyEval('<<updatesidebarimg>><<updatesidebarmoney>>');
                if (typeof updateMoment === 'function') updateMoment();
            }, this.output);
        });
        wrap('tryOnReset', function (original) {
            const result = original.call(this);
            if (routing()) core.reset(core.session().mode);
            return result;
        });
        for (const name of ['updateclotheslist', 'updateclothingshop']) if (Macro.has(name)) wrap(name, function (original) {
            try { return original.call(this); } finally { refreshHeaders(); }
        });
        ready = true;
    }
    core.isConnectedToHood = slot => (slot === 'upper' && core.session().preview.upper.hoodposition !== undefined) ||
        (slot === 'head' && !!core.session().preview.head.hood);
    core.toggleHood = () => act(() => {
        const preview = core.session().preview, upper = preview.upper;
        const base = setup.clothes.upper.find(x => x.name === upper.name && x.modder === upper.modder);
        if (!base?.outfitPrimary?.head) return;
        const trial = Object.values(core.session().trials).find(group => group.upper === upper);
        const owned = core.owned();
        if (upper.hoodposition === 'up') {
            preview.head = vanity.blank('head'); delete upper.outfitPrimary.head; upper.hoodposition = 'down';
            if (trial) delete trial.head;
            else if (owned.head.name === base.outfitPrimary.head && owned.head.hood) owned.head = vanity.blank('head');
        } else {
            const hood = setup.clothes.head.find(x => x.name === base.outfitPrimary.head && x.modder === upper.modder);
            if (!hood) throw new Error('找不到这件衣服的帽兜。');
            if (!trial && !vanity.naked(owned.head)) {
                if (!core.fashion() && vanity.wornGroup('head',owned).some(slot => owned[slot].cursed === 1)) throw new Error('当前头部衣物无法脱下。');
                const target = storage();
                for (const slot of vanity.wornGroup('head',owned)) if (Number.isFinite(target.space) && target[slot].length >= target.space)
                    throw new Error('目标衣柜没有空间收纳旧衣物：' + slot);
                vanity.strip('head',target,owned);
            }
            for (const [key, group] of Object.entries(core.session().trials)) if (group !== trial && group.head) {
                delete core.session().trials[key]; delete core.session().products?.[key];
            }
            preview.head = { ...copy(hood), colour: upper.colour, accessory_colour: upper.accessory_colour, colourCustom: upper.colourCustom, accessory_colourCustom: upper.accessory_colourCustom };
            upper.outfitPrimary.head = hood.name; upper.hoodposition = 'up';
            if (trial) trial.head = preview.head;
            else owned.head = preview.head;
        }
        core.sync();
    });
    $(document).on(':storyready.pcVanityShop', () => {
        try { install(); } catch (error) { console.error('[PCVanityShop]', error); notice = error.message; }
    });
    $(document).on(':passagedisplay.pcVanityShop', () => {
        if (!ready || !vanity.featureEnabled()) return;
        if (!inShop() && State.variables.pcVanity?.shop) {
            if (theftResults.has(State.passage) && marked()) act(() => core.checkout('wear', true));
            core.close();
        }
        if (inShop() || State.variables.pcVanity?.enabled) Wikifier.wikifyEval('<<updatesidebarimg>>');
    });
    $(document).on(':passagestart.pcVanityShop', () => {
        if (ready && !inShop() && !theftResults.has(State.passage) && State.variables.pcVanity?.shop) core.close();
    });
    core.ui = { inShop, active, storage, create, refresh, act, refreshHeaders };
    core.compatibilityReport = () => ({ ready, notice });
})();
