/* Independent wardrobe inventory: items move between storage and vanity slots. */
(() => {
    'use strict';
    setup.createPCVanity = env => {
        const copy = value => JSON.parse(JSON.stringify(value));
        const vars = () => env.vars();
        const slots = () => env.slots();
        const naked = item => !item || item.name === 'naked';
        const blank = slot => copy(env.catalog()[slot][0]);
        const requireEnabled = () => { if (env.enabled?.() === false) throw new Error('衣着系统优化未开启。'); };
        function state() {
            const v = vars();
            if (!v.pcVanity) v.pcVanity = { schemaVersion: 1, enabled: false, worn: {}, upperTucked: 0, lowerTucked: 0, bellyTucked: 0, facelayer: 'front' };
            const s = v.pcVanity;
            if (s.schemaVersion !== 1) throw new Error('时装存档版本不受支持，已停止操作以保留衣物。');
            for (const slot of slots()) if (!s.worn[slot]) s.worn[slot] = blank(slot);
            return s;
        }
        function storage() {
            const result = env.storage();
            if (!result) throw new Error('当前衣柜不可用。');
            for (const slot of slots()) if (!Array.isArray(result[slot])) throw new Error('当前衣柜缺少部位：' + slot);
            return result;
        }
        const connected = name => name && !['broken', 'split'].includes(name);
        function linkedMatch(primary, secondary) {
            return primary.modder === secondary.modder && primary.colour === secondary.colour &&
                (primary.colour !== 'custom' || primary.colourCustom === secondary.colourCustom) &&
                (!secondary.accessory || (primary.accessory_colour === secondary.accessory_colour &&
                    (primary.accessory_colour !== 'custom' || primary.accessory_colourCustom === secondary.accessory_colourCustom))) &&
                (!primary.pattern || !secondary.pattern || primary.pattern === secondary.pattern);
        }
        function secondaryPairs(item) {
            const pairs = [];
            for (let i = 0; i < (item.outfitSecondary?.length || 0); i += 2)
                if (connected(item.outfitSecondary[i + 1])) pairs.push([item.outfitSecondary[i], item.outfitSecondary[i + 1]]);
            return pairs;
        }
        function wornGroup(slot, worn = state().worn) {
            const found = new Set();
            const visit = key => {
                if (found.has(key) || naked(worn[key])) return;
                found.add(key);
                for (const [other, name] of [...Object.entries(worn[key].outfitPrimary || {}), ...secondaryPairs(worn[key])])
                    if (connected(name) && worn[other]?.name === name) visit(other);
            };
            visit(slot);
            return [...found];
        }
        function strip(slot, target = storage(), worn = state().worn) {
            const group = wornGroup(slot, worn);
            for (const key of group) {
                target[key].push(worn[key]);
                worn[key] = blank(key);
            }
            return group.length;
        }
        function stripAll() {
            const target = storage();
            return slots().reduce((count, slot) => count + strip(slot, target), 0);
        }
        function plan(slot, item, target) {
            if (!item || !target[slot].includes(item)) throw new Error('这件衣服已经不在当前衣柜中。');
            const group = new Map([[slot, item]]);
            for (const [key, name] of Object.entries(item.outfitPrimary || {})) {
                if (!connected(name)) continue;
                const match = target[key]?.find(other => other.name === name && other.modder === item.modder &&
                    linkedMatch(item, other) && secondaryPairs(other).some(([s, n]) => s === slot && n === item.name));
                if (!match) throw new Error('衣柜中缺少配套部件：' + name + '。');
                group.set(key, match);
            }
            for (const [key, name] of secondaryPairs(item)) {
                const primary = target[key]?.find(other => other.name === name && linkedMatch(other, item));
                if (!primary) throw new Error('衣柜中缺少配套衣服：' + name + '。');
                return plan(key, primary, target);
            }
            return group;
        }
        function wear(slot, index) {
            requireEnabled();
            const target = storage(), s = state();
            const group = plan(slot, target[slot]?.[index], target);
            // Validate the entire outfit before removing anything. Remove by
            // object identity so returning old items cannot shift source indices.
            for (const [key, item] of group) target[key].splice(target[key].indexOf(item), 1);
            for (const key of group.keys()) strip(key, target);
            for (const [key, item] of group) s.worn[key] = item;
            s.enabled = true;
            return [...group.keys()];
        }
        function equipItems(items, target = storage(), worn = state().worn) {
            requireEnabled();
            const keys = Object.keys(items), displaced = new Set();
            for (const slot of keys) {
                if (!slots().includes(slot) || naked(items[slot])) throw new Error('无效的时装物品。');
                for (const key of wornGroup(slot, worn)) displaced.add(key);
            }
            for (const slot of displaced) {
                if (!Array.isArray(target[slot])) throw new Error('目标衣柜缺少部位：' + slot);
                if (Number.isFinite(target.space) && target[slot].length >= target.space)
                    throw new Error('目标衣柜没有空间收纳旧时装：' + slot);
            }
            for (const slot of displaced) strip(slot, target, worn);
            for (const slot of keys) worn[slot] = items[slot];
            if (worn === state().worn) state().enabled = true;
        }
        function matchesPreset(item, outfit, slot) {
            if (item.name !== outfit[slot]) return false;
            const colours = outfit.colors?.[slot];
            if (!colours) return true;
            if (colours[0] && item.colour !== colours[0]) return false;
            if (colours[1] && item.accessory_colour !== colours[1]) return false;
            if (colours[2] && item.pattern !== colours[2]) return false;
            const custom = outfit.colors[slot + 'custom'];
            return !custom || ((item.colour !== 'custom' || item.colourCustom === custom[0]) &&
                (item.accessory_colour !== 'custom' || item.accessory_colourCustom === custom[1]));
        }
        function wearOutfit(outfit) {
            requireEnabled();
            if (!outfit) throw new Error('套装不存在。');
            const target = storage(), s = state(), done = new Set(), missing = [];
            // Equip primary pieces first: a linked skirt must not independently
            // remove the dress which was just equipped from the same preset.
            const ordered = [...slots()].sort((a, b) => Number(!!env.catalog()[b]?.find(x => x.name === outfit[b])?.outfitPrimary) -
                Number(!!env.catalog()[a]?.find(x => x.name === outfit[a])?.outfitPrimary));
            for (const slot of ordered) {
                if (done.has(slot) || outfit[slot] === undefined) continue;
                if (outfit[slot] === 'naked') { strip(slot, target); continue; }
                if (matchesPreset(s.worn[slot], outfit, slot)) { done.add(slot); continue; }
                const index = target[slot].findIndex(item => matchesPreset(item, outfit, slot));
                if (index < 0) { missing.push(outfit[slot]); continue; }
                try { for (const key of wear(slot, index)) done.add(key); }
                catch (error) { missing.push(error.message); }
            }
            for (const slot of done) {
                const item = s.worn[slot];
                if (item.altposition !== undefined && outfit.positions?.[slot]) item.altposition = outfit.positions[slot];
                if (item.altsleeve !== undefined && outfit.positions?.sleeves) item.altsleeve = outfit.positions.sleeves;
            }
            s.enabled = true;
            return [...new Set(missing)];
        }
        function toggleHood() {
            requireEnabled();
            const worn = state().worn, upper = worn.upper;
            const base = env.catalog().upper.find(x => x.name === upper.name && x.modder === upper.modder);
            const hoodName = base?.outfitPrimary?.head;
            if (!hoodName || upper.hoodposition === undefined) return;
            if (upper.hoodposition === 'up') {
                if (worn.head.name === hoodName && secondaryPairs(worn.head).some(([slot, name]) => slot === 'upper' && name === upper.name))
                    worn.head = blank('head');
                delete upper.outfitPrimary.head;
                upper.hoodposition = 'down';
            } else {
                const hood = env.catalog().head.find(x => x.name === hoodName && x.modder === upper.modder);
                if (!hood) throw new Error('找不到这件衣服的帽兜。');
                strip('head');
                worn.head = copy(hood);
                for (const key of ['colour', 'accessory_colour', 'colourCustom', 'accessory_colourCustom'])
                    if (upper[key] !== undefined) worn.head[key] = upper[key];
                upper.outfitPrimary ||= {};
                upper.outfitPrimary.head = hoodName;
                upper.hoodposition = 'up';
            }
        }
        function visualWorn(worn = state().worn) {
            const result = {};
            for (const slot of slots()) {
                const item = worn[slot];
                const base = env.catalog()[slot].find(x => x.name === item.name && x.modder === item.modder);
                // Preserve the physical item's actual damage in the save. Only
                // its render copy is presented as dry and normally worn.
                result[slot] = { ...(base || item), ...copy(item) };
                for (const key of ['exposed', 'vagina_exposed', 'anus_exposed', 'state', 'state_top', 'skirt_down']) {
                    if (base?.[key + '_base'] !== undefined) result[slot][key] = base[key + '_base'];
                    else if (base?.[key] !== undefined) result[slot][key] = base[key];
                }
                result[slot].integrity = result[slot].integrity_max;
            }
            return result;
        }
        function cleanup() {
            const count = stripAll();
            delete vars().pcVanity;
            return count;
        }
        return { state, slots, blank, naked, storage, wear, equipItems, strip, stripAll, wearOutfit, toggleHood, visualWorn, cleanup, wornGroup };
    };
})();
