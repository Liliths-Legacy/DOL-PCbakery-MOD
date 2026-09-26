/* Hunting uses the game's existing food inventory and passage presentation. */
(() => {
    'use strict';
    const TYPES = {
        boar: { food: 'pork', minutes: 45, amount: 10, label: '野猪' },
        bison: { food: 'beef', minutes: 60, amount: 20, label: '野牛' },
        pheasant: { food: 'chicken', minutes: 10, amount: 10, label: '野鸡' }
    };
    const vars = () => State.variables;
    function state() {
        const v = vars();
        if (!v.pcBakeryHunt || typeof v.pcBakeryHunt !== 'object') {
            v.pcBakeryHunt = { asked: false, rifle: false, introduced: false,
                trophies: { boar: 0, bison: 0, pheasant: 0 }, result: null };
        }
        const s = v.pcBakeryHunt;
        if (!s.trophies) s.trophies = { boar: 0, bison: 0, pheasant: 0 };
        for (const type of Object.keys(TYPES)) s.trophies[type] = Math.max(0, Number(s.trophies[type]) || 0);
        return s;
    }
    function foodInventory(type) {
        const v = vars(), key = TYPES[type].food;
        if (v.foodstuff && (setup.foodstuff?.[key] || !v.plants)) {
            if (!v.foodstuff[key]) v.foodstuff[key] = { amount: 0 };
            return v.foodstuff[key];
        }
        if (v.plants && setup.plants?.[key]) {
            const definition = setup.plants[key];
            if (!v.plants[key]) v.plants[key] = { name: definition.name, plural: definition.plural, amount: 0 };
            return v.plants[key];
        }
        return null;
    }
    function edenAway() {
        const v = vars();
        // Eden's daily hunting flag is also used by the original cabin passage.
        return v.daily?.eden?.hunting === 1 && Time.hour >= 11 && Time.hour <= 14;
    }
    function canAsk() { return !state().asked && !state().rifle && vars().eden_shoot >= 2 && vars().stat_shoot >= 500; }
    function canTake() { return state().asked && !state().rifle && edenAway(); }
    function firstTrophy() { return Object.keys(TYPES).find(type => state().trophies[type] > 0) || null; }
    function chance(type) {
        const v = vars();
        const shooting = Math.min(1, Math.max(0, (Number(v.stat_shoot) || 0) / 1000));
        const cunning = Math.min(1, Math.max(0, (Number(v.skulduggery) || 0) / 1000));
        const score = shooting * 0.65 + cunning * 0.35;
        const base = { boar: 0.25, bison: 0.18, pheasant: 0.08 }[type];
        return Math.min(0.95, base + score * 0.65);
    }
    function shoot(type) {
        if (!TYPES[type] || !state().rifle) return false;
        const success = Math.random() < chance(type);
        state().result = { type, success };
        if (success) state().trophies[type]++;
        return success;
    }
    function process(type) {
        const s = state(), info = TYPES[type];
        if (!info || s.trophies[type] < 1) return false;
        const inventory = foodInventory(type);
        if (!inventory) return false;
        s.trophies[type]--;
        inventory.amount = (Number(inventory.amount) || 0) + info.amount;
        s.introduced = true;
        s.lastProcessed = type;
        if (s.pendingFirstType === type) s.pendingFirstType = null;
        return true;
    }
    function startFirst() {
        const s = state();
        s.introSeen = true;
        if (!s.pendingFirstType) s.pendingFirstType = firstTrophy();
    }
    function completeFirstIfNeeded() {
        const s = state();
        if (s.lastProcessed && !s.pendingFirstType) return true;
        const type = s.pendingFirstType || firstTrophy();
        if (!type) return false;
        if (!process(type)) return false;
        s.pendingFirstType = null;
        return true;
    }
    const api = setup.pcBakeryHunt = { state, TYPES, edenAway, canAsk, canTake,
        firstTrophy, chance, shoot, process, startFirst, completeFirstIfNeeded };

    function addLink(content, anchor, markup, before = false) {
        if (!anchor || content.querySelector('.pcb-hunt-link')) return;
        const wrap = document.createElement('span');
        wrap.className = 'pcb-hunt-link';
        new Wikifier(wrap, '<br>' + markup + (before ? '<br>' : ''));
        const position = before ? (anchor.previousElementSibling || anchor) : anchor.nextSibling;
        anchor.parentNode.insertBefore(wrap, position);
    }
    function addAfterChoiceLine(content, anchor, markup) {
        if (!anchor || content.querySelector('.pcb-hunt-link')) return;
        let after = anchor.nextSibling;
        while (after && after.nodeName !== 'BR') after = after.nextSibling;
        const wrap = document.createElement('span');
        wrap.className = 'pcb-hunt-link';
        new Wikifier(wrap, markup + '<br>');
        anchor.parentNode.insertBefore(wrap, after ? after.nextSibling : null);
    }
    $(document).on(':passagerender.pcBakeryHunt', event => {
        const content = event.content, title = event.passage.title, s = state();
        if (title === 'Cabin Eden Actions') {
            const back = content.querySelector('a[data-passage="Eden Cabin"]');
            if (canAsk()) addLink(content, back, '<<edenicon "target">><<link [[向伊甸要一杆猎枪|PCBakery Hunt Ask]]>><</link>>', true);
            if (s.rifle && firstTrophy()) {
                const target = !s.introduced && !s.introSeen ? 'PCBakery Hunt First' : 'PCBakery Hunt Process';
                const food = TYPES[firstTrophy()].food;
                addLink(content, back, '<<icon "tending/' + food + '.png">><<link [[请求处理猎物|' + target + ']]>><</link>>', true);
            }
        } else if (title === 'Cabin House Actions' && canTake()) {
            const back = content.querySelector('a[data-passage="Eden Cabin"]');
            addLink(content, back, '<<edenicon "target">><<link [[拿走伊甸的备用猎枪|PCBakery Hunt Take]]>><</link>>', true);
        } else if (s.rifle && title === 'Forest') {
            const dodge = content.querySelector('a[data-passage="Forest Boar Dodge"]');
            if (dodge) addAfterChoiceLine(content, dodge, '<<edenicon "target">><<link [[瞄准射击|PCBakery Hunt Boar Forest]]>><<run setup.pcBakeryHunt.shoot("boar")>><</link>>');
        } else if (s.rifle && ['Lake Shore', 'Lake Waterfall', 'Lake Fishing Rock', 'Lake Firepit', 'Lake Campsite'].includes(title)) {
            const run = content.querySelector('a[data-passage="Lake Boar Run"]');
            if (run) addAfterChoiceLine(content, run, '<<edenicon "target">><<link [[瞄准射击|PCBakery Hunt Boar Lake]]>><<run setup.pcBakeryHunt.shoot("boar")>><</link>>');
        } else if (s.rifle && title === 'Moor' && Math.random() < 0.25) {
            const travel = content.querySelector('a[data-passage="Farmland"]');
            if (travel) addLink(content, travel, '<<edenicon "target">><<link [[远方有什么东西在走动|PCBakery Hunt Bison]]>><</link>>', true);
        } else if (s.rifle && title === 'Meadow' && Math.random() < 0.13) {
            const travel = content.querySelector('a[data-passage="Farmland"]');
            if (travel) addLink(content, travel, '<<edenicon "target">><<link [[高草丛中好像有动静|PCBakery Hunt Pheasant]]>><</link>>', true);
        }
    });
})();
