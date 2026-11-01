/* Shared native preset UI, with shop-specific acquisition and refresh actions. */
(() => {
    'use strict';
    const vanity = setup.pcVanity, shop = setup.pcVanityShop;
    const copy = value => JSON.parse(JSON.stringify(value));
    let ready = false, problem = '';
    const active = () => ready && shop.ui.active();
    const location = () => State.variables.wardrobes.shopReturn || 'wardrobe';
    function canStrip(slot, worn) {
        if (shop.fashion()) return;
        if (worn[slot]?.type?.includes('strap-on')) return '此物品需通过原版物品入口取下';
        if (vanity.wornGroup(slot, worn).some(part => worn[part].cursed === 1)) return '当前部位的衣物无法脱下';
    }
    function canWear(parts, pieces, worn) {
        const v = State.variables;
        for (const part of parts) {
            const locked = canStrip(part, worn); if (locked) return locked;
            const item = pieces[part], types = item.type || [];
            if (playerBellySize() >= 12 && types.includes('constricting')) return '身体条件不允许穿戴';
            if (v.hypnosis_traits?.silence === 1) continue;
            const slime = v.earSlime || {};
            if (slime.forcedCommando !== undefined && slime.forcedCommando >= 0 && part === 'under_lower' &&
                !types.some(type => ['swim', 'dance', 'naked'].includes(type))) return '当前状态不允许穿戴内裤';
            if (setup.clothingLayer.torso.includes(part) && item.reveal < earSlimeCorruptionClothes() &&
                !types.includes('event') && !(types.includes('school') && Time.schoolDay)) return '当前状态限制了服装暴露度';
            if (slime.forcedDressing?.days > 0 && item.gender !== slime.forcedDressing.type && item.gender !== 'n' &&
                !types.includes('event')) return '当前状态限制了服装类型';
        }
    }
    function available(slot, item) {
        const v = State.variables;
        // Search is independent of cosmetic catalogue filters, while still
        // respecting the real store and unlock rules.
        if (!item.shop?.includes(v.shopName)) return '本店不出售';
        if (v.specialClothes?.find(x => x.name === item.name)?.unlocked === 0) return '商品尚未解锁';
    }
    function create(slot, base, outfit, anchor) {
        const selected = outfit.colors?.[anchor] || outfit.colors?.[slot] || [];
        const custom = outfit.colors?.[anchor + 'custom'] || outfit.colors?.[slot + 'custom'] || [];
        function colour(options, index) {
            const value = selected[index];
            if (!options?.length) return 0;
            if (value === 'random' || value === undefined) {
                const choices = options.filter(x => !['custom','random'].includes(x));
                return choices[random(0, choices.length - 1)] || options[0];
            }
            if (value === 0) return options[0];
            if (!options.includes(value)) throw new Error('预设颜色或图案不可用');
            return value;
        }
        const primary = copy(base), result = {[slot]: primary};
        for (const [part, name] of Object.entries(base.outfitPrimary || {})) {
            if (['split','broken'].includes(name)) continue;
            const piece = setup.clothes[part]?.find(x => x.name === name && x.modder === base.modder);
            if (!piece) throw new Error('商品缺少配套部件');
            result[part] = copy(piece);
        }
        const palette = [colour(base.colour_options, 0), colour(base.accessory_colour_options, 1), colour(base.pattern_options, 2)];
        for (const item of Object.values(result)) {
            for (const [i, key, options] of [[0,'colour','colour_options'],[1,'accessory_colour','accessory_colour_options'],[2,'pattern','pattern_options']]) {
                if (item[options]?.length) item[key] = item[options].includes(palette[i]) ? palette[i] : item[options][0];
            }
            if (item.colour === 'custom') item.colourCustom = custom[0];
            if (item.accessory_colour === 'custom') item.accessory_colourCustom = custom[1];
            if ((item.colour === 'custom' && !item.colourCustom) || (item.accessory_colour === 'custom' && !item.accessory_colourCustom))
                throw new Error('预设缺少自定义颜色数据');
            item.lastTaken = location();
            clothesDataTrimmer(item);
        }
        return result;
    }
    const planner = setup.createPCShopOutfits({catalog:()=>setup.clothes, slots:vanity.slots,
        blank:vanity.blank, group:vanity.wornGroup, location, canStrip, canWear, available, create});
    const api = setup.pcShopOutfits = {
        capture() {
            if (!vanity.featureEnabled()) return copy(State.variables.worn);
            const s = shop.session();
            if (shop.managed()) s.capture = copy(shop.preview(false));
            else {
                s.capture = copy(State.variables.worn);
                for (const key of ['showEquip','showUnderEquip']) for (const [slot,item] of Object.entries(State.variables.tryOn[key] || {}))
                    if (item) s.capture[slot] = copy(item);
            }
            return s.capture;
        },
        apply(index) {
            if (!vanity.featureEnabled()) throw new Error('衣着系统优化未开启。');
            const v = State.variables, outfit = v.outfit[index];
            if (!outfit) throw new Error('套装不存在。');
            if (outfit.location && outfit.location !== location()) throw new Error('此预设限定在其他衣柜使用。');
            // Replacing a preset first returns all pending merchandise. Owned
            // clothes remain available in their current target and real storage.
            Wikifier.wikifyEval('<<ShowUnderEquip "normal">><<ShowUnderEquip "over">><<clothingReset>><<tryOnReset>>');
            if (!shop.fashion() && !shop.managed()) shop.manageEquipment(v.worn);
            const storage = shop.ui.storage(), result = planner.plan(outfit, shop.owned(), storage);
            if (shop.fashion()) { vanity.state().worn = result.worn; vanity.state().enabled = true; }
            else shop.session().equipmentOwned = result.worn;
            for (const slot of vanity.slots()) storage[slot].splice(0, storage[slot].length, ...result.storage[slot]);
            Object.assign(shop.session(), {trials:result.trials, products:result.products, hidden:{}, outfitMissing:result.missing});
            if (!shop.fashion() && outfit.hairStyle && v.savedHairStyles?.[outfit.hairStyle])
                Object.assign(v, copy(v.savedHairStyles[outfit.hairStyle]));
            if (v.shopName === 'school' && Object.keys(result.trials).length) v.schoolShopAction.push('try');
            shop.sync();
            return result;
        },
        compatibilityReport: () => ({ready, problem})
    };
    function refreshOutfits() {
        if (!active()) return;
        for (const root of document.querySelectorAll('.pc-shop-outfits-content')) {
            root.replaceChildren(); renderContents(root);
        }
        if (typeof updateMoment === 'function') updateMoment();
    }
    function renderContents(root) {
        const v = State.variables;
        if (v.settings.multipleWardrobes !== 'all') v.wardrobes.shopReturn = 'wardrobe';
        if (v.settings.multipleWardrobes === 'all') {
            const label = document.createElement('label'); label.textContent = '使用衣柜：';
            const select = document.createElement('select'); select.className = 'pc-shop-outfits-wardrobe';
            for (const [key, wardrobe] of Object.entries(v.wardrobes)) if (wardrobe?.unlocked && !wardrobe.isolated) {
                const option = document.createElement('option'); option.value = key; option.textContent = wardrobe.name; select.append(option);
            }
            select.value = location();
            select.addEventListener('change', () => { v.wardrobes.shopReturn = select.value; refreshOutfits(); });
            label.append(select); root.append(label, document.createElement('br'));
        }
        api.capture();
        new Wikifier(root, '<<pcShopListOutfits>>');
        const missing = shop.session().outfitMissing || [];
        if (missing.length) {
            const message = document.createElement('div'); message.className = 'pc-vanity-notice';
            message.textContent = '未补齐：' + missing.map(({slot,name,reason}) => {
                const item = setup.clothes[slot]?.find(x=>x.name===name);
                return (item?.cn_name_cap || item?.name_cap || name) + '（' + reason + '）';
            }).join('、');
            root.append(message);
        }
    }
    shop.renderOutfits = output => {
        if (!active()) return;
        const details = document.createElement('details'); details.className = 'pc-shop-outfits';
        details.open = !!shop.session().outfitsOpen;
        const summary = document.createElement('summary'); summary.textContent = '预设套装';
        const content = document.createElement('div'); content.className = 'pc-shop-outfits-content';
        details.append(summary,content); output.append(details); renderContents(content);
        details.addEventListener('toggle', () => { if (shop.ui.inShop()) shop.session().outfitsOpen = details.open; });
    };
    Macro.add('pcShopCapture', {handler() {api.capture();}});
    Macro.add('pcShopOutfitAction', {handler() {
        if (!active()) return;
        shop.ui.act(() => {
            const v = State.variables, index = v.wear_outfit;
            try {
                if (index !== 'none' && index !== undefined) {
                    if (v.delete_outfit === 1) Wikifier.wikifyEval('<<deleteoutfit>>');
                    else if (v.delete_outfit === 2) Wikifier.wikifyEval('<<pcShopOverwriteOutfit>>');
                    else { api.apply(index); shop.ui.refresh();
                        Wikifier.wikifyEval('<<exposure>><<updateallure>><<updatewarmthscale>><<updatewarmthdescription>>'); }
                }
            } finally { v.wear_outfit = 'none'; v.delete_outfit = 'none'; }
            refreshOutfits();
        }, this.output);
    }});
    Macro.add('pcShopOutfitEditorDone', {handler() {
        if (!active()) return;
        closeOverlay(); refreshOutfits(); shop.ui.refreshHeaders();
        if (typeof updateMoment === 'function') updateMoment();
    }});
    $(document).on(':oncloseoverlay.pcShopOutfits', (_event, name) => {
        if (active() && name === 'outfitEditor') refreshOutfits();
    });
    $(document).on(':storyready.pcShopOutfits', () => {
        if (!shop.compatibilityReport().ready) return;
        try {
            const {widgetSource,wrap} = vanity.ui;
            const define = (name,text) => Wikifier.wikifyEval('<<widget "'+name+'">>'+text+'<</widget>>');
            const target = text => text.replace(/\$worn\b/g,'$pcVanity.shop.capture').replace(/\bV\.worn\b/g,'V.pcVanity.shop.capture')
                .replace(/\$wardrobe_location\b/g,'$wardrobes.shopReturn').replace(/<<updatewardrobe "outfits">>/g,'<<pcShopOutfitAction>>');
            define('pcShopNewOutfit', target(widgetSource('wardrobeNewOutfit')).replace('<<set $outfit_name', '<<pcShopCapture>><<set $outfit_name'));
            define('pcShopOverwriteOutfit', '<<pcShopCapture>>'+target(widgetSource('overwriteoutfit')));
            define('pcShopListOutfits', target(widgetSource('listoutfits')).replace('<<wardrobeNewOutfit>>','<<pcShopNewOutfit>>'));
            const editor = widgetSource('outfitEditor').replace(/<<link \[\[[^\]\n]+\|\$passage\]\]>>\s*<<\/link>>/g,
                '<<link "更新商店">><<pcShopOutfitEditorDone>><</link>>');
            if (editor === widgetSource('outfitEditor')) throw new Error('未找到预设编辑器刷新入口');
            define('pcShopOutfitEditor',editor);
            wrap('outfitEditor',function(original){return active()?Macro.get('pcShopOutfitEditor').handler.call(this):original.call(this);});
            ready = true;
        } catch (error) {problem=error.message;console.error('[PCShopOutfits]',error);}
    });
})();
