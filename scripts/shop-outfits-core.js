/* Preset planning is pure: owned garments and unpaid products never share a ledger. */
(() => {
    'use strict';
    setup.createPCShopOutfits = env => {
        const copy = value => JSON.parse(JSON.stringify(value));
        const connected = name => name && !['split', 'broken'].includes(name);
        const secondary = item => {
            const pairs = [];
            for (let i = 0; i < (item.outfitSecondary?.length || 0); i += 2)
                if (connected(item.outfitSecondary[i + 1])) pairs.push([item.outfitSecondary[i], item.outfitSecondary[i + 1]]);
            return pairs;
        };
        function matches(item, outfit, slot) {
            if (item.name !== outfit[slot]) return false;
            const base = env.catalog()[slot].find(x => x.name === item.name && x.modder === item.modder);
            const colours = outfit.colors?.[slot], custom = outfit.colors?.[slot + 'custom'] || [];
            if (!colours) return true;
            for (const [i, key, options, customKey] of [
                [0, 'colour', 'colour_options', 'colourCustom'], [1, 'accessory_colour', 'accessory_colour_options', 'accessory_colourCustom'],
                [2, 'pattern', 'pattern_options', null]
            ]) {
                let wanted = colours[i];
                if (wanted === 'random' || wanted === undefined) continue;
                if (wanted === 0) wanted = base?.[options]?.[0] ?? 0;
                if (item[key] !== wanted && !(wanted === 0 && !item[key])) return false;
                if (wanted === 'custom' && item[customKey] !== undefined && item[customKey] !== custom[i]) return false;
            }
            return true;
        }
        function linked(a, b) {
            return a.modder === b.modder && a.colour === b.colour &&
                (a.colour !== 'custom' || a.colourCustom === b.colourCustom) &&
                (!a.accessory || !b.accessory || (a.accessory_colour === b.accessory_colour &&
                    (a.accessory_colour !== 'custom' || a.accessory_colourCustom === b.accessory_colourCustom))) &&
                (!b.pattern || !a.pattern || a.pattern === b.pattern);
        }
        function split(item, omitted) {
            for (const slot of omitted) if (item.outfitPrimary?.[slot]) item.outfitPrimary[slot] = 'split';
            if (item.outfitSecondary) for (let i = 0; i < item.outfitSecondary.length; i += 2)
                if (omitted.includes(item.outfitSecondary[i])) item.outfitSecondary[i + 1] = 'split';
            item.one_piece = 'split';
        }
        function inherit(item, primary) {
            if (!item.outfitSecondary || item.variable !== primary.variable) return;
            const attributes = {};
            for (const key of ['accessory_colour','accessory_colourCustom','pattern'])
                if (primary[key] && !item[key]) attributes[key] = primary[key];
            if (Object.keys(attributes).length) item.inherited_attributes = attributes;
        }
        function plan(outfit, current, inventory) {
            if (!outfit) throw new Error('套装不存在。');
            const catalog = env.catalog(), slots = env.slots(), worn = copy(current), storage = copy(inventory);
            const pool = [], chosen = new Map(), requests = [], handled = new Set(), missing = [], hiddenHoods = new Set();
            for (const slot of slots) {
                if (worn[slot]?.name !== 'naked') pool.push({slot, item: worn[slot], fromWorn: true});
                for (const item of storage[slot] || []) pool.push({slot, item, fromWorn: false});
            }
            const fail = (slot, reason) => missing.push({slot, name: outfit[slot], reason});
            // Group named preset pieces by their actual sale product. A hood
            // lowered in a preset remains an intrinsic hood, not a cut-up coat.
            for (const slot of slots) {
                if (handled.has(slot) || !outfit[slot] || outfit[slot] === 'naked') continue;
                let base = catalog[slot]?.find(x => x.name === outfit[slot]), primarySlot = slot;
                if (!base) { fail(slot, '衣物定义不存在'); handled.add(slot); continue; }
                if (base.outfitSecondary) {
                    const pair = secondary(base).find(([s, name]) => catalog[s]?.some(x => x.name === name && x.modder === base.modder));
                    if (pair) { primarySlot = pair[0]; base = catalog[primarySlot].find(x => x.name === pair[1] && x.modder === base.modder); }
                }
                const pieces = {[primarySlot]: base};
                for (const [part, name] of Object.entries(base.outfitPrimary || {})) if (connected(name)) {
                    const piece = catalog[part]?.find(x => x.name === name && x.modder === base.modder);
                    if (piece) pieces[part] = piece;
                }
                const wanted = Object.keys(pieces).filter(part => !handled.has(part) && outfit[part] === pieces[part].name);
                const hoodDown = base.hoodposition !== undefined && wanted.includes(primarySlot) && !wanted.includes('head');
                const expected = Object.keys(pieces).filter(part => !(hoodDown && part === 'head'));
                const full = expected.every(part => wanted.includes(part));
                wanted.forEach(part => handled.add(part));
                requests.push({slot: primarySlot, base, pieces, wanted, full, hoodDown});
            }
            const unavailable = new Set();
            for (const request of requests) {
                const {slot, base, pieces, wanted, full, hoodDown} = request;
                const reason = env.canWear?.(wanted, pieces, worn, request);
                if (reason) { wanted.forEach(part => { fail(part, reason); unavailable.add(part); }); continue; }
                const available = (part, predicate = () => true) => pool.filter(entry => !entry.used && entry.slot === part && predicate(entry.item));
                let picks;
                if (full) {
                    for (const root of available(slot, item => matches(item, outfit, slot))) {
                        if (Object.keys(pieces).length > 1 && (root.item.one_piece === 'split' ||
                            Object.entries(pieces).some(([part, piece]) => part !== slot && !(part === 'head' && (hoodDown || base.hoodposition !== undefined && root.item.hoodposition === 'down')) && root.item.outfitPrimary?.[part] !== piece.name))) continue;
                        const group = {[slot]: root};
                        for (const part of wanted.filter(part => part !== slot)) {
                            const entry = available(part, item => matches(item, outfit, part) && linked(root.item, item) &&
                                secondary(item).some(([s, name]) => s === slot && name === root.item.name))[0];
                            if (entry) group[part] = entry;
                        }
                        // Hoods are generated/removed by native clothing actions.
                        if (base.hoodposition !== undefined && wanted.includes('head') && !group.head && root.item.hoodposition === 'down') {
                            const item = {...copy(pieces.head), colour: root.item.colour, accessory_colour: root.item.accessory_colour,
                                colourCustom: root.item.colourCustom, accessory_colourCustom: root.item.accessory_colourCustom};
                            if (matches(item, outfit, 'head')) group.head = {slot:'head', item, intrinsic:true};
                        }
                        if (wanted.every(part => group[part])) { picks = group; break; }
                    }
                } else {
                    picks = {};
                    for (const part of wanted) {
                        const entry = available(part, item => matches(item, outfit, part))[0];
                        if (entry) picks[part] = entry;
                    }
                }
                const retained = Object.keys(picks || {});
                for (const part of retained) {
                    const entry = picks[part]; entry.used = true; chosen.set(part, entry);
                    if (!entry.fromWorn) {
                        if (env.location) entry.item.lastTaken = env.location();
                        const defaults = pieces[part];
                        for (const [key, source] of Object.entries({state:'state_base',state_top:'state_top_base',exposed:'exposed_base',
                            skirt_down:'skirt_down',vagina_exposed:'vagina_exposed_base',anus_exposed:'anus_exposed_base'}))
                            if (defaults[source] != null) entry.item[key] = defaults[source];
                    }
                    if (!full) {
                        // Cut only this owned instance and its matching attached
                        // pieces. Unused owned parts go back to inventory.
                        const related = [entry], found = new Set([entry.slot]);
                        for (const source of related) for (const [part, name] of [...Object.entries(source.item.outfitPrimary || {}), ...secondary(source.item)]) {
                            if (found.has(part) || !connected(name)) continue;
                            const other = pool.find(candidate => !candidate.used && candidate.slot === part && candidate.item.name === name && linked(source.item,candidate.item));
                            if (other) {found.add(part);related.push(other);}
                        }
                        const primary = related.find(other => other.slot === slot)?.item;
                        for (const other of related) {
                            if (primary) inherit(other.item,primary);
                            split(other.item,Object.keys(pieces).filter(key=>key!==other.slot));
                        }
                    }
                }
                if (picks?.[slot] && base.hoodposition !== undefined) {
                    const item = picks[slot].item;
                    item.hoodposition = hoodDown ? 'down' : 'up';
                    if (hoodDown) {
                        const hood = pool.find(entry => !entry.used && entry.slot === 'head' && entry.item.name === pieces.head?.name &&
                            linked(item,entry.item) && secondary(entry.item).some(([s,n])=>s===slot && n===item.name));
                        if (hood) {hood.used=true;if(hood.fromWorn)hiddenHoods.add('head');}
                        delete item.outfitPrimary.head;
                    }
                    else item.outfitPrimary.head = pieces.head.name;
                }
                request.need = wanted.filter(part => !retained.includes(part));
                if (!request.need.length) continue;
                const saleReason = env.available?.(slot, base);
                if (saleReason) { request.need.forEach(part => fail(part, saleReason)); request.need = []; continue; }
            }
            // Owned changes are committed independently of purchasing. Keep the
            // old garment beneath an unpaid trial until the trial is acquired.
            const displaced = new Set(hiddenHoods);
            for (const slot of slots) if (chosen.has(slot) || (outfit[slot] === 'naked' && !unavailable.has(slot))) {
                const reason = env.canStrip?.(slot, worn);
                if (reason) { if (!chosen.has(slot)) fail(slot, reason); continue; }
                for (const part of env.group(slot, worn)) displaced.add(part);
                displaced.add(slot);
            }
            for (const slot of displaced) worn[slot] = env.blank(slot);
            for (const [slot, entry] of chosen) worn[slot] = entry.item;
            for (const slot of slots) storage[slot] = pool.filter(entry => entry.slot === slot && !entry.used &&
                (!entry.fromWorn || displaced.has(slot))).map(entry => entry.item);
            const trials = {}, products = {};
            let number = 0;
            for (const request of requests) {
                if (!request.need?.length) continue;
                // Different explicit colours may require buying the same sale
                // product more than once; each purchase retains only its parts.
                let pending = [...request.need];
                while (pending.length) {
                    const anchor = pending[0];
                    let product;
                    try { product = env.create(request.slot, request.base, outfit, anchor); }
                    catch (error) { pending.forEach(part => fail(part, error.message)); break; }
                    const keep = pending.filter(part => product[part] && matches(product[part], outfit, part));
                    if (!keep.includes(anchor)) { fail(anchor, '预设颜色或图案不可用'); pending.shift(); continue; }
                    const original = copy(product[request.slot] || request.base);
                    const items = Object.fromEntries(keep.map(part => [part, product[part]]));
                    const cut = Object.keys(request.pieces).filter(part => !(request.hoodDown && part === 'head')).some(part => !keep.includes(part));
                    if (cut) for (const [part, item] of Object.entries(items)) {
                        inherit(item,original);
                        split(item, Object.keys(request.pieces).filter(key => key !== part));
                    }
                    if (request.hoodDown && items[request.slot]) { delete items[request.slot].outfitPrimary.head; items[request.slot].hoodposition = 'down'; }
                    const key = 'preset' + number++;
                    trials[key] = items;
                    products[key] = {slot:request.slot, item:original, split:cut, heavy:Object.values(product).some(item=>item.type?.includes('heavy'))};
                    pending = pending.filter(part => !keep.includes(part));
                }
            }
            for (const [slot, item] of Object.entries({...worn, ...Object.assign({}, ...Object.values(trials))})) {
                if (item.altposition !== undefined && outfit.positions?.[slot]) item.altposition = outfit.positions[slot];
                if (item.altsleeve !== undefined && outfit.positions?.sleeves) item.altsleeve = outfit.positions.sleeves;
            }
            for (const slot of slots) if (Number.isFinite(storage.space) && storage[slot].length > storage.space && storage[slot].length > inventory[slot].length)
                throw new Error('目标衣柜没有空间收纳换下的衣物：' + slot);
            return {worn, storage, trials, products, missing};
        }
        return {plan, matches};
    };
})();
