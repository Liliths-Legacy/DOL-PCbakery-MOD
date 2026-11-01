/* Unpaid shop previews are separate from owned garments and real equipment. */
(() => {
    'use strict';
    setup.createPCVanityShop = (vanity, env) => {
        const copy = value => JSON.parse(JSON.stringify(value));
        const requireEnabled = () => { if (env.enabled?.() === false) throw new Error('衣着系统优化未开启。'); };
        function session() {
            const state = vanity.state();
            state.shop ||= { mode: 'equipment', passage: env.passage(), trials: {}, hidden: {} };
            return state.shop;
        }
        function fashion() { return session().mode === 'fashion'; }
        const managed = () => fashion() || !!session().equipmentOwned;
        const owned = () => fashion() ? vanity.state().worn : session().equipmentOwned || env.equipment?.();
        const entries = () => Object.values(session().trials);
        const price = items => Object.entries(items).reduce((sum, [slot, item]) => sum + env.price(slot, item), 0);
        const groupPrice = (key, group) => session().products?.[key]
            ? env.price(session().products[key].slot, session().products[key].item) : price(group);
        function preview(hide = true) {
            const s = session(), base = owned() || vanity.state().worn, result = {...base};
            for (const group of entries()) {
                for (const slot of Object.keys(group))
                    for (const other of vanity.wornGroup(slot, base)) result[other] = vanity.blank(other);
            }
            for (const group of entries()) Object.assign(result, group);
            if (hide) {
                for (const [slot, hidden] of Object.entries(s.hidden)) if (hidden) result[slot] = vanity.blank(slot);
                s.preview = result;
            }
            return result;
        }
        function sync() {
            if (env.enabled?.() === false) return;
            const s = session(), record = env.tryOn();
            preview();
            if (!managed() || !record) return;
            record.pcVanity = true;
            record.autoReset = false;
            if (!fashion()) {
                record.ownedStored = copy(owned());
                env.setEquipment(s.preview);
            }
            record.tryingOn = Object.fromEntries(vanity.slots().map(slot => [slot, null]));
            for (const group of entries()) Object.assign(record.tryingOn, group);
            // Native theft checks must see a heavy original product even when
            // the requested retained piece itself has no heavy trait.
            for (const [key, product] of Object.entries(s.products || {})) if (s.trials[key] && (product.heavy || product.item.type?.includes('heavy'))) {
                const slot = Object.keys(s.trials[key])[0], item = record.tryingOn[slot];
                record.tryingOn[slot] = { ...item, type: [...new Set([...item.type, 'heavy'])] };
            }
            record.value = Object.entries(s.trials).reduce((sum, [key, group]) => sum + groupPrice(key, group), 0);
        }
        function remove(slot) {
            const s = session();
            if (!slot) { s.trials = {}; s.products = {}; s.hidden = {}; }
            else for (const [key, group] of Object.entries(s.trials)) if (group[slot]) { delete s.trials[key]; delete s.products?.[key]; }
            sync();
        }
        function tryItems(slot, index) {
            requireEnabled();
            const group = env.create(slot, index);
            const s = session();
            for (const [key, old] of Object.entries(s.trials))
                if (Object.keys(group).some(part => old[part])) { delete s.trials[key]; delete s.products?.[key]; }
            s.trials[slot] = group;
            s.hidden = {};
            sync();
            return group;
        }
        function target() {
            const result = env.storage();
            if (!result || vanity.slots().some(slot => !Array.isArray(result[slot]))) throw new Error('寄送衣柜不可用。');
            return result;
        }
        function payAndReceive(items, destination, cost, steal) {
            const storage = target();
            if (!steal && env.money() < cost) throw new Error('余额不足。');
            if (destination === 'wardrobe') {
                for (const slot of Object.keys(items))
                    if (Number.isFinite(storage.space) && storage[slot].length >= storage.space)
                        throw new Error('目标衣柜已满：' + slot);
                for (const [slot, item] of Object.entries(items)) storage[slot].push(item);
            } else vanity.equipItems(items, storage, owned());
            if (!steal) env.charge(cost);
        }
        function buy(slot, index, steal = false) {
            requireEnabled();
            const items = env.create(slot, index);
            // Direct Buy and wear is charged at the native product price, not
            // once for each linked piece. Bulk trial checkout follows tryOn.value.
            payAndReceive(items, 'wear', env.price(slot, items[slot]), steal);
            const s = session();
            for (const [key, old] of Object.entries(s.trials))
                if (Object.keys(items).some(part => old[part])) { delete s.trials[key]; delete s.products?.[key]; }
            sync();
            return items;
        }
        function checkout(destination = 'wear', steal = false) {
            requireEnabled();
            const groups = entries();
            if (!groups.length) return 0;
            const items = Object.assign({}, ...groups), cost = Object.entries(session().trials).reduce((sum, [key, group]) => sum + groupPrice(key, group), 0);
            payAndReceive(items, destination, cost, steal);
            session().trials = {}; session().products = {}; session().hidden = {};
            sync();
            // Native theft links compute crime from value after this call.
            const record = env.tryOn();
            record.value = cost; record.autoReset = true;
            return cost;
        }
        function show(type, hide) {
            requireEnabled();
            const s = session(), record = env.tryOn();
            const slots = type === 'over' ? ['over_head', 'over_upper', 'over_lower'] : ['upper', 'lower'];
            const key = type === 'over' ? 'showEquip' : 'showUnderEquip';
            record[key] ||= {};
            for (const slot of slots) {
                s.hidden[slot] = !!hide;
                record[key][slot] = hide ? copy(s.preview?.[slot] || vanity.blank(slot)) : null;
            }
            preview();
        }
        function reset(mode = session().mode) {
            const s = session();
            if (s.equipmentOwned && mode !== s.mode) { env.setEquipment(s.equipmentOwned); delete s.equipmentOwned; }
            s.mode = mode; s.trials = {}; s.products = {}; s.hidden = {};
            s.passage = env.passage(); sync();
        }
        function manageEquipment(worn) { requireEnabled(); session().equipmentOwned = copy(worn); sync(); }
        function close() {
            if (session().equipmentOwned) env.setEquipment(session().equipmentOwned);
            const record = env.tryOn();
            if (record?.pcVanity) {
                record.value = 0; record.autoReset = true;
                record.tryingOn = Object.fromEntries(vanity.slots().map(slot => [slot, null]));
                delete record.pcVanity;
            }
            delete vanity.state().shop;
        }
        return { session, fashion, managed, owned, manageEquipment, preview, sync, remove, tryItems, buy, checkout, show, reset, close };
    };
})();
