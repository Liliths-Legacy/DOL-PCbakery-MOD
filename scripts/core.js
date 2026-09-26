/* Pure gameplay layer. State is JSON-compatible; all game effects use the adapter. */
(() => {
    'use strict';
    setup.createPCBakery = env => {
        const RENT = 1000000; // DoL stores pence, not pounds.
        const BUFFS = {
            welcome: { name: '熟客口碑', text: '所有订单收入 +10%' },
            fresh: { name: '趁热出炉', text: '现做份数的收入额外 +20%' },
            sweet: { name: '甜蜜时光', text: '甜品份数的收入 +15%' },
            precision: { name: '精致小单', text: '精选单收入 +35%' },
            pairing: { name: '组合菜单', text: '双拼单收入 +30%' },
            bulk: { name: '批量供应', text: '批量单收入 +25%' },
            variety: { name: '试吃推广', text: '试吃单收入 +30%，不同品类额外 +10%' },
            pantry: { name: '灵活备货', text: '库存食品收入 +10%，现做食品不受影响' },
            custom: { name: '私人定制', text: '定制单收入 +40%' }
        };
        const fail = message => { throw new Error(message); };
        const vars = () => env.vars();
        const catalog = () => {
            const data = env.catalog();
            if (!data || typeof data !== 'object') fail('原版食物数据尚未初始化，请重新加载游戏后再试。');
            return data;
        };
        const inventory = () => env.inventory ? env.inventory() : vars().foodstuff;
        const known = key => env.known ? env.known(key) : inventory()?.[key]?.knows_recipe === true;
        const amount = key => Math.max(0, Number(inventory()?.[key]?.amount) || 0);
        function state() {
            let s = vars().pcBakery;
            if (s === undefined) s = vars().pcBakery = { schemaVersion: 1 };
            if (!s || s.schemaVersion !== 1) fail('面包坊存档版本不受支持。');
            if (!Object.hasOwn(s, 'leaseUntil')) s.leaseUntil = 0;
            if (!Object.hasOwn(s, 'session')) s.session = null;
            if (!Object.hasOwn(s, 'summary')) s.summary = null;
            return s;
        }
        function finish(reason) {
            const s = state(), run = s.session;
            if (!run || run.phase === 'closed') return;
            s.summary = { day: run.day, completed: run.completed, income: run.income, reason };
            run.phase = 'closed'; run.buffs = []; run.buffOffers = []; run.tray = {}; run.selection = [];
            run.current = null; run.offers = []; run.paused = false;
        }
        function sync() {
            const s = state();
            if (s.session && s.session.day !== env.day() && s.session.phase !== 'closed') finish('昨日营业结束');
            if (s.session?.phase === 'buff') ensureBuffOffers(s.session);
            if (s.session && !Number.isInteger(s.session.processed)) s.session.processed = s.session.completed || 0;
            return s;
        }
        const leased = () => state().leaseUntil > env.day();
        const isOpenTime = () => env.minutes() >= 480 && env.minutes() < 1260;
        function category(key) {
            const item = catalog()[key];
            if (!item) return '原料';
            if (item.food?.tags?.includes('sweet')) return '甜品';
            if (item.food?.tags?.includes('drink')) return '饮料';
            return item.category === 'dish' ? '菜肴' : '原料';
        }
        function chain(key, visited = new Set()) {
            if (visited.has(key)) return [];
            const next = new Set(visited); next.add(key);
            return [...new Set((catalog()[key]?.recipe?.ingredients || []).flatMap(k => [k, ...chain(k, next)]))];
        }
        function recipes() {
            return Object.keys(catalog()).filter(k => known(k) && catalog()[k].recipe?.ingredients?.length);
        }
        const sellable = key => known(key) && category(key) !== '原料' && !!catalog()[key]?.recipe?.ingredients?.length;
        function rent() {
            sync();
            if (leased()) fail('租期尚未到期。');
            if (vars().money < RENT) fail('租金不足，需要 £10,000。');
            env.money(-RENT);
            state().leaseUntil = env.day() + 30;
        }
        function run() {
            sync();
            const r = state().session;
            if (!r || r.phase === 'closed') fail('今天尚未营业或已经打烊。');
            if (r.paused) fail('请先继续营业。');
            return r;
        }
        function start() {
            const s = sync();
            if (!leased()) fail('请先租赁或续租店面。');
            if (s.session?.day === env.day()) {
                if (s.session.phase === 'closed') fail('今天已经打烊，明天再来吧。');
                s.session.paused = false;
                if (s.session.phase !== 'order' && !isOpenTime()) finish('已到打烊时间');
                return;
            }
            if (!isOpenTime()) fail('营业时间为 08:00—21:00。');
            if (!recipes().some(sellable)) fail('还没有学会可出售的食物配方。');
            s.session = { day: env.day(), phase: 'buff', paused: false, buffs: [], completed: 0,
                processed: 0, income: 0, offers: [], buffOffers: rollBuffs(), current: null, tray: {}, selection: [], last: null };
        }
        function pick(list) { return list[Math.min(list.length - 1, Math.floor(env.random() * list.length))]; }
        function rollBuffs() {
            const pool = Object.keys(BUFFS), result = [];
            while (pool.length && result.length < 3) result.push(pool.splice(Math.floor(env.random() * pool.length), 1)[0]);
            return result;
        }
        function ensureBuffOffers(run) {
            if (!Array.isArray(run.buffOffers) || run.buffOffers.length < 3) run.buffOffers = rollBuffs();
            return run.buffOffers;
        }
        function offer(kind, witness, ingredients, extra = {}) {
            const categoryName = category(witness), ingredient = ingredients.length ? pick(ingredients) : null;
            const common = { kind, category: null, ingredient: null, requirements: [], rewardMultiplier: 1 };
            if (kind === 'single') {
                common.count = 1; common.label = '精选单'; common.category = categoryName;
                common.ingredient = ingredient; common.rewardMultiplier = 1.75;
                common.requirements = [{ type: 'category', mode: 'some', value: categoryName }];
                if (ingredient) common.requirements.push({ type: 'ingredient', mode: 'some', value: ingredient });
            } else if (kind === 'pair') {
                common.count = 2; common.label = '双拼单'; common.ingredient = ingredient;
                common.rewardMultiplier = .9;
                if (ingredient) common.requirements.push({ type: 'ingredient', mode: 'all', value: ingredient });
                if (extra.distinct) common.requirements.push({ type: 'distinctFoods', value: 2 });
            } else if (kind === 'bulk') {
                common.count = 3; common.label = '批量单'; common.category = categoryName;
                common.rewardMultiplier = .58;
                common.requirements.push({ type: 'category', mode: 'all', value: categoryName });
            } else if (kind === 'tasting') {
                common.count = 3; common.label = '试吃单'; common.rewardMultiplier = .8;
                common.requirements = [{ type: 'distinctFoods', value: 3 }];
                if (extra.distinctCategories) common.requirements.push({ type: 'distinctCategories', value: 2 });
            } else {
                common.count = 1; common.label = '定制单'; common.food = witness; common.rewardMultiplier = 2.1;
                common.requirements = [{ type: 'food', value: witness }, { type: 'fresh', value: 1 }];
            }
            return Object.assign(common, extra.fields || {});
        }
        function sharedIngredients(pool) {
            return [...new Set(pool.flatMap(key => chain(key)))].filter(ingredient =>
                pool.filter(key => chain(key).includes(ingredient)).length >= 2);
        }
        function offers() {
            const r = run();
            if (!isOpenTime()) { finish('已到打烊时间'); return; }
            const pool = recipes().filter(sellable);
            if (!pool.length) { finish('没有已解锁的食物配方'); return; }
            const shared = sharedIngredients(pool);
            const pairWitness = pick(pool);
            const pairIngredient = shared.length ? pick(shared) : pick(chain(pairWitness));
            const tastingReady = pool.length >= 3 && new Set(pool.map(key => category(key))).size >= 2;
            const kinds = ['single', 'pair', 'bulk', 'custom'];
            if (tastingReady) kinds.push('tasting');
            const selected = [];
            while (selected.length < 3) selected.push(kinds.splice(Math.floor(env.random() * kinds.length), 1)[0]);
            r.offers = selected.map(kind => {
                if (kind === 'single') { const key = pick(pool); return offer(kind, key, chain(key)); }
                if (kind === 'pair') return offer(kind, pairWitness, [pairIngredient], { distinct: shared.length > 0 });
                if (kind === 'tasting') { const key = pick(pool); return offer(kind, key, chain(key), { distinctCategories: true }); }
                const key = pick(pool); return offer(kind, key, chain(key));
            });
            r.phase = 'offers';
        }
        function chooseBuff(key) {
            const r = run();
            if (r.phase !== 'buff' || !BUFFS[key] || !ensureBuffOffers(r).includes(key)) fail('请选择当前提供的营业增益。');
            if (!isOpenTime()) { finish('已到打烊时间'); return; }
            r.buffs.push(key); r.buffOffers = []; offers();
        }
        function accept(index) {
            const r = run();
            if (r.phase !== 'offers' || !Number.isInteger(index) || !r.offers[index]) fail('请选择有效订单。');
            if (!isOpenTime()) { finish('已到打烊时间'); return; }
            r.current = r.offers[index]; r.offers = []; r.buffOffers = []; r.phase = 'order'; r.tray = {}; r.selection = [];
        }
        function order() {
            const r = run();
            if (r.phase !== 'order') fail('请先接取订单。');
            return r;
        }
        const reserved = (r, key, source) => r.selection.filter(x => x.key === key && x.source === source).length;
        function available(r, key, source) {
            return Math.max(0, (source === 'tray' ? r.tray[key] || 0 : amount(key)) - reserved(r, key, source));
        }
        function canCook(key) {
            const r = state().session;
            if (!r || r.phase !== 'order' || r.paused || r.day !== env.day()) return { ok: false, reason: '请先接单' };
            if (!known(key) || !catalog()[key]?.recipe?.ingredients?.length) return { ok: false, reason: '未解锁' };
            if (env.tired()) return { ok: false, reason: '太疲惫' };
            const needed = {};
            for (const k of catalog()[key].recipe.ingredients) needed[k] = (needed[k] || 0) + 1;
            // MVP uses the standard recipe; substitute ingredients are intentionally not auto-selected.
            for (const [k, n] of Object.entries(needed)) {
                if (available(r, k, 'tray') + available(r, k, 'stock') < n) return { ok: false, reason: '缺料' };
            }
            return { ok: true, needed };
        }
        let kitchenRulesOverride = null;
        function kitchenRules() {
            const rules = kitchenRulesOverride || (typeof env.kitchenRules === 'function' ? env.kitchenRules() : {});
            return rules && typeof rules === 'object' ? rules : {};
        }
        function setKitchenRules(rules) {
            kitchenRulesOverride = rules && typeof rules === 'object' ? rules : null;
        }
        function canCookStandalone(key) {
            const item = catalog()[key], recipe = item?.recipe;
            if (!known(key) || !recipe?.ingredients?.length) return { ok: false, reason: '未解锁' };
            if (env.tired()) return { ok: false, reason: '太疲惫' };
            const rules = kitchenRules(), supplied = new Set(Array.isArray(rules.supplied) ? rules.supplied : []);
            const needed = {};
            for (const ingredient of recipe.ingredients) needed[ingredient] = (needed[ingredient] || 0) + 1;
            for (const [ingredient, count] of Object.entries(needed)) {
                if (!supplied.has(ingredient) && typeof rules.allowed === 'function' && !rules.allowed(ingredient)) return { ok: false, reason: '食材受此厨房限制' };
                if (!supplied.has(ingredient) && amount(ingredient) < count) return { ok: false, reason: '缺料' };
            }
            if (Number.isFinite(rules.hourRestriction)) {
                const future = env.minutes() + Number(recipe.cook_minutes) || env.minutes();
                const hour = Math.floor((future % 1440) / 60), minute = future % 60;
                if (!(hour < rules.hourRestriction || minute <= 15)) return { ok: false, reason: '制作后超过厨房开放时间' };
            }
            return { ok: true, needed };
        }
        function cookStandalone(key) {
            const check = canCookStandalone(key);
            if (!check.ok) fail(check.reason);
            const recipe = catalog()[key].recipe, rules = kitchenRules();
            const supplied = new Set(Array.isArray(rules.supplied) ? rules.supplied : []);
            for (const [ingredient, count] of Object.entries(check.needed)) {
                if (!supplied.has(ingredient)) inventory()[ingredient].amount -= count;
            }
            inventory()[key] = inventory()[key] || { amount: 0 };
            inventory()[key].amount = (Number(inventory()[key].amount) || 0) + recipe.servings;
            env.pass(recipe.cook_minutes);
            return recipe.servings;
        }
        function cook(key) {
            const r = order(), check = canCook(key);
            if (!check.ok) fail(check.reason);
            const recipe = catalog()[key].recipe;
            if (!Number.isInteger(recipe.cook_minutes) || recipe.cook_minutes < 0 || !Number.isInteger(recipe.servings) || recipe.servings < 1) fail('配方数据无效。');
            for (const [k, n] of Object.entries(check.needed)) {
                const fromTray = Math.min(n, available(r, k, 'tray'));
                r.tray[k] = (r.tray[k] || 0) - fromTray;
                if (n > fromTray) inventory()[k].amount -= n - fromTray;
            }
            r.tray[key] = (r.tray[key] || 0) + recipe.servings;
            env.pass(recipe.cook_minutes);
            sync();
        }
        function select(key, source) {
            const r = order();
            if (!['stock', 'tray'].includes(source) || !sellable(key)) fail('只能提交已解锁的食物。');
            if (r.selection.length >= 3) fail('最多提交三份。');
            if (available(r, key, source) < 1) fail('数量不足。');
            r.selection.push({ key, source });
        }
        function remove(index) {
            const r = order();
            if (!Number.isInteger(index) || index < 0 || index >= r.selection.length) fail('无效的选择。');
            r.selection.splice(index, 1);
        }
        function validate() {
            const r = order(), o = r.current;
            if (r.selection.length !== o.count) return '提交份数不符合订单。';
            if (r.selection.some(x => !sellable(x.key))) return '只能提交已解锁的食物。';
            if (o.category && !r.selection.some(x => category(x.key) === o.category)) return '提交的食物品类不符合订单。';
            if (o.ingredient && !r.selection.some(x => chain(x.key).includes(o.ingredient))) return '提交的食物原料不符合订单。';
            const requirements = Array.isArray(o.requirements) ? o.requirements : [];
            const keys = r.selection.map(x => x.key);
            const categories = r.selection.map(x => category(x.key));
            for (const requirement of requirements) {
                const mode = requirement.mode || 'some', value = requirement.value;
                if (requirement.type === 'category') {
                    const matches = categories.filter(x => x === value).length;
                    if (mode === 'all' ? matches !== r.selection.length : matches < 1) return '提交的食物品类不符合订单。';
                } else if (requirement.type === 'ingredient') {
                    const matches = r.selection.filter(x => chain(x.key).includes(value)).length;
                    if (mode === 'all' ? matches !== r.selection.length : matches < 1) return '提交的食物原料不符合订单。';
                } else if (requirement.type === 'food' && r.selection.some(x => x.key !== value)) {
                    return '订单要求指定的食物。';
                } else if (requirement.type === 'distinctFoods' && new Set(keys).size < value) {
                    return '订单要求提交不同的食物。';
                } else if (requirement.type === 'distinctCategories' && new Set(categories).size < value) {
                    return '订单要求包含更多不同的品类。';
                } else if (requirement.type === 'fresh' && r.selection.filter(x => x.source === 'tray').length < value) {
                    return '订单要求更多现做食物。';
                } else if (requirement.type === 'stock' && r.selection.filter(x => x.source === 'stock').length < value) {
                    return '订单要求使用库存食品。';
                }
            }
            const counts = {};
            for (const x of r.selection) {
                const id = x.source + ':' + x.key; counts[id] = (counts[id] || 0) + 1;
                if ((x.source === 'tray' ? r.tray[x.key] || 0 : amount(x.key)) < counts[id]) return '库存发生变化，请重新选择。';
            }
            return null;
        }
        const basePrice = key => Math.max(100, Number(catalog()[key]?.shop?.sell_price) || 100) * 2;
        function submit() {
            const r = order(), error = validate();
            if (error) fail(error);
            const stacks = key => r.buffs.filter(x => x === key).length;
            const currentOrder = r.current;
            const orderBonus = 1 + stacks('precision') * (currentOrder.kind === 'single' ? .35 : 0)
                + stacks('pairing') * (currentOrder.kind === 'pair' ? .3 : 0)
                + stacks('bulk') * (currentOrder.kind === 'bulk' ? .25 : 0)
                + stacks('variety') * (currentOrder.kind === 'tasting' ? .3 : 0)
                + stacks('pantry') * (r.selection.every(x => x.source === 'stock') ? .1 : 0)
                + stacks('custom') * (currentOrder.kind === 'custom' ? .4 : 0)
                + stacks('variety') * (currentOrder.kind === 'tasting' && new Set(r.selection.map(x => category(x.key))).size >= 2 ? .1 : 0);
            let payout = 0, score = 0;
            for (const x of r.selection) {
                const base = basePrice(x.key);
                const bonus = 1 + stacks('welcome') * .1 + (x.source === 'tray' ? .2 + stacks('fresh') * .2 : 0)
                    + (category(x.key) === '甜品' ? stacks('sweet') * .15 : 0);
                payout += base * bonus;
                score += bonus * orderBonus * 100;
            }
            payout = Math.round(payout * (currentOrder.rewardMultiplier ?? (1 + (r.current.count - 1) * .1)) * orderBonus);
            for (const x of r.selection) {
                if (x.source === 'stock') inventory()[x.key].amount--;
                else r.tray[x.key]--;
            }
            env.money(payout); r.income += payout; r.completed++; r.processed++;
            r.last = { income: payout, count: r.selection.length, score: Math.round(score / r.selection.length) };
            r.tray = {}; r.selection = []; r.current = null;
            r.phase = 'settlement';
            env.pass(5); sync();
            if (r.phase !== 'closed' && !isOpenTime()) finish('已到打烊时间');
            return payout;
        }
        function abandon() {
            const r = order();
            r.processed++;
            r.last = { income: 0, count: 0, score: 0, abandoned: true };
            r.tray = {}; r.selection = []; r.current = null;
            r.phase = 'settlement';
            env.pass(5); sync();
            if (r.phase !== 'closed' && !isOpenTime()) finish('已到打烊时间');
        }
        function next() {
            const r = run();
            if (r.phase !== 'settlement') fail('请先完成当前订单。');
            if (!isOpenTime()) { finish('已到打烊时间'); return; }
            if (r.processed % 3 === 0) { r.phase = 'buff'; r.buffOffers = rollBuffs(); }
            else offers();
        }
        function pause() { const r = run(); r.paused = true; }
        return { version: '0.4.6', RENT, BUFFS, state, sync, leased, isOpenTime, known, amount, category, chain,
            recipes, sellable, basePrice, rent, start, chooseBuff, accept, canCook, cook, kitchenRules, setKitchenRules, canCookStandalone, cookStandalone, select, remove, validate, submit, abandon, next,
            pause, close: () => { run(); finish('主动打烊'); }, available };
    };
})();
