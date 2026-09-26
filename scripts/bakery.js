(() => {
    'use strict';
    let catalogSource = 'unresolved';
    let fallbackReported = false;
    function inventory() {
        const v = State.variables;
        return v.foodstuff ?? v.plants ?? {};
    }
    function learned(key) {
        const v = State.variables;
        return v.foodstuff != null ? v.foodstuff[key]?.knows_recipe === true : v.plants?.[key]?.recipe === true;
    }
    function runtimeCatalog() {
        const sources = [
            ['setup', setup],
            ['DOL.setup', window.DOL?.setup],
            ['SugarCube.setup', typeof SugarCube !== 'undefined' ? SugarCube.setup : undefined],
            ['window.SugarCube.setup', window.SugarCube?.setup]
        ];
        // Prefer the format belonging to the current save; never migrate its inventory.
        const fields = State.variables.foodstuff == null && State.variables.plants != null
            ? ['plants', 'foodstuff'] : ['foodstuff', 'plants'];
        for (const field of fields) for (const [name, owner] of sources) {
            const data = owner?.[field];
            if (!data || typeof data !== 'object' || Array.isArray(data)) continue;
            const isLegacy = field === 'plants';
            if (!Object.values(data).some(item => item && Array.isArray(isLegacy ? item.ingredients : item.recipe?.ingredients))) continue;
            catalogSource = name + '.' + field;
            return isLegacy ? setup.pcBakeryNormalizeLegacy(data) : data;
        }
        return null;
    }
    function foodCatalog() {
        const live = runtimeCatalog();
        if (live) return live;
        const baseline = setup.pcBakeryFoodBaseline;
        if (baseline && typeof baseline === 'object') {
            catalogSource = 'bundled DoL 0.5.11.9';
            if (!fallbackReported) {
                console.warn('[PCBakery] Runtime food catalog unavailable; using bundled 0.5.11.9 recipes. Custom mod recipes are unavailable until their runtime catalog is restored.');
                fallbackReported = true;
            }
            return baseline;
        }
        throw new Error('面包坊配方文件未完整加载，请移除旧版 PCBakery 后重新安装最新版。');
    }
    const api = setup.pcBakery = setup.createPCBakery({
        vars: () => State.variables,
        catalog: foodCatalog,
        inventory,
        known: learned,
        day: () => Math.floor(Time.date.timeStamp / 86400),
        minutes: () => Time.hour * 60 + Time.minute,
        random: () => random(0, 1000000) / 1000001,
        tired: () => State.variables.tiredness >= C.tiredness.max,
        pass: minutes => Wikifier.wikifyEval('<<pass ' + minutes + '>>'),
        money: value => Wikifier.wikifyEval('<<money ' + value + '>>'),
        kitchenRules: () => {
            const temporary = State.temporary || {};
            const legacyTemporary = typeof T !== 'undefined' && T && typeof T === 'object' ? T
                : window.T && typeof window.T === 'object' ? window.T : {};
            const read = name => temporary[name] ?? legacyTemporary[name] ?? temporary['_' + name] ?? legacyTemporary['_' + name];
            let supplied = read('ingredientsSupplied');
            // Avery's kitchen builds its supplied list from save data inside a
            // widget. Read that source directly as a fallback so the list remains
            // available after SugarCube clears its temporary widget variables.
            const mansion = State.variables.avery_mansion;
            if ((!Array.isArray(supplied) || supplied.length === 0) && State.variables.bus === 'avery_kitchen' && mansion?.kitchen_stock) {
                supplied = (mansion.kitchen_stock.normal || []).concat(mansion.kitchen_stock.requested || []);
            }
            return {
                // Capture both SugarCube temporary-variable access forms.
                supplied: Array.isArray(supplied) ? supplied.slice() : [],
                hourRestriction: read('hourRestriction'),
                allowed: typeof window.ingredientIsAllowed === 'function' ? window.ingredientIsAllowed : undefined
            };
        }
    });
    api.compatibilityReport = () => {
        const data = foodCatalog();
        return { version: api.version, catalogSource, inventorySource: State.variables.foodstuff != null ? 'foodstuff' : 'plants', definitionCount: Object.keys(data).length };
    };
    const money = value => '£' + (value / 100).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const label = key => {
        // Render the game's localized recipe macro into an isolated element, then use plain text.
        try {
            if (!runtimeCatalog() || !(setup.foodstuff?.[key] || setup.plants?.[key])) return foodCatalog()[key]?.name || key;
            const holder = document.createElement('span');
            new Wikifier(holder, '<<recipe_name ' + JSON.stringify(key) + '>>');
            return holder.querySelector('.error') ? foodCatalog()[key]?.name || key : holder.textContent;
        } catch (_) { return foodCatalog()[key]?.name || key; }
    };
    const recipeIngredients = (key, item) => {
        const tables = [setup.foodstuff, setup.plants].filter(table => table && typeof table === 'object');
        const runtimeItem = tables.map(table => table[key]).find(Boolean)
            || tables.flatMap(table => Object.values(table)).find(candidate =>
                candidate && (candidate.name === item?.name || candidate.name === key));
        const raw = item?.recipe?.ingredients ?? item?.ingredients
            ?? runtimeItem?.recipe?.ingredients ?? runtimeItem?.ingredients;
        let values;
        if (Array.isArray(raw)) values = raw;
        else if (raw && typeof raw === 'object' && typeof raw.length === 'number') values = Array.from(raw);
        else if (raw && typeof raw === 'object') values = Object.values(raw);
        else values = [];
        return values.map(value => typeof value === 'string' ? value : value?.key || value?.name).filter(Boolean);
    };
    function node(tag, text, cls) {
        const el = document.createElement(tag);
        if (text !== undefined) el.textContent = text;
        if (cls) el.className = cls;
        return el;
    }
    function button(text, action, disabled = false) {
        const el = node('button', text); el.type = 'button'; el.disabled = disabled;
        el.addEventListener('click', action); return el;
    }
    function textAction(text, action, disabled = false, hint = '') {
        const el = button(text, action, disabled);
        el.className = 'pcb-text-action';
        if (hint) { el.title = hint; el.setAttribute('aria-label', hint); }
        return el;
    }
    function foodIcon(key) {
        const holder = node('span', undefined, 'pcb-food-icon');
        holder.setAttribute('aria-hidden', 'true');
        const file = foodCatalog()[key]?.icon;
        if (file && State.variables.options?.images !== 0) {
            // Both supported game versions use the icon macro and the tending image directory.
            new Wikifier(holder, '<<icon ' + JSON.stringify('tending/' + file) + '>>');
        }
        return holder;
    }
    function describe(o) {
        const requirements = Array.isArray(o.requirements) ? o.requirements : [];
        const details = requirements.map(requirement => {
            if (requirement.type === 'category') return (requirement.mode === 'all' ? '全部' : '至少一份') + requirement.value;
            if (requirement.type === 'ingredient') return (requirement.mode === 'all' ? '全部含' : '至少一份含') + label(requirement.value);
            if (requirement.type === 'food') return '现做一份' + label(requirement.value);
            if (requirement.type === 'distinctFoods') return '至少 ' + requirement.value + ' 种不同食物';
            if (requirement.type === 'distinctCategories') return '至少 ' + requirement.value + ' 种不同品类';
            if (requirement.type === 'fresh') return '至少 ' + requirement.value + ' 份现做';
            if (requirement.type === 'stock') return '至少 ' + requirement.value + ' 份库存';
            return '';
        }).filter(Boolean);
        if (!details.length) {
            if (o.category) details.push('至少一份' + o.category);
            if (o.ingredient) details.push('至少一份含' + label(o.ingredient));
        }
        return (o.label ? o.label + '：' : '') + '提交 ' + o.count + ' 份食物' + (details.length ? '，' + details.join('，') : '');
    }
    function mount(root) {
        let filter = '全部', search = '', book = [], notice = '', busy = false;
        let closing = false, justClosed = false;
        let waiting = false, waitingDots = 0, waitingTimer;
        function act(fn) {
            if (busy) return;
            busy = true; notice = '';
            const beforeTime = Time.date.timeStamp;
            const beforeMoney = State.variables.money;
            const wasClosed = api.state().session?.phase === 'closed';
            try { fn(); }
            catch (err) { notice = err.message; }
            finally {
                busy = false;
                if (root.isConnected) {
                    // Automatic closing (for example, submitting after a cooking action
                    // crosses 21:00) should show this run's settlement once. A later
                    // visit creates a new mount and correctly shows the locked-door text.
                    if (!wasClosed && api.state().session?.phase === 'closed') justClosed = true;
                    render();
                    if (Time.date.timeStamp !== beforeTime || State.variables.money !== beforeMoney) {
                        // In-place actions skip Engine.play's automatic sidebar redraw.
                        // Redraw once after the entire transaction, never re-enter the passage or advance time.
                        UIBar.update();
                    }
                }
            }
        }
        const action = fn => () => act(fn);
        function waitingAction(fn) {
            return () => {
                if (busy || waiting) return;
                waiting = true; waitingDots = 0;
                render();
                waitingTimer = setInterval(() => {
                    waitingDots = waitingDots >= 3 ? 1 : waitingDots + 1;
                    render();
                }, 500);
                setTimeout(() => {
                    clearInterval(waitingTimer); waitingTimer = undefined;
                    waiting = false; act(fn);
                }, 0);
            };
        }
        function leave() {
            const r = api.sync().session;
            if (r && r.phase !== 'closed' && !r.paused) api.pause();
            Engine.play('Cliff Street');
        }
        function renderBook(parent) {
            if (!book.length) return;
            const key = book.at(-1), item = foodCatalog()[key];
            if (!item) { book = []; return; }
            const pane = node('section', undefined, 'pcb-book');
            pane.id = 'pcb-recipe-' + book[0];
            pane.setAttribute('aria-label', label(key) + '的配方');
            const head = node('div', undefined, 'pcb-book-heading');
            head.append(foodIcon(key), node('strong', label(key)));
            const controls = node('div', undefined, 'pcb-actions');
            if (book.length > 1) controls.append(textAction('返回上级', action(() => book.pop())));
            controls.append(textAction('收起', action(() => { book = []; })));
            head.append(controls); pane.append(head);
            const recipe = item.recipe;
            if (recipe?.ingredients?.length) {
                pane.append(node('div', recipe.cook_minutes + ' 分钟 · 产出 ' + recipe.servings + ' 份' + (api.known(key) ? '' : ' · 未解锁'), 'pcb-recipe-meta'));
                const r = api.state().session;
                const ingredients = node('div', undefined, 'pcb-ingredients');
                const needed = {};
                for (const k of recipe.ingredients) needed[k] = (needed[k] || 0) + 1;
                for (const [k, count] of Object.entries(needed)) {
                    const row = node('div', undefined, 'pcb-ingredient');
                    const name = node('div', undefined, 'pcb-ingredient-name');
                    name.append(foodIcon(k), textAction(label(k), action(() => { if (!book.includes(k)) book.push(k); })), node('span', '×' + count));
                    row.append(name, node('div', '库存 ' + api.available(r, k, 'stock') + ' · 托盘 ' + api.available(r, k, 'tray'), 'pcb-stock-count'));
                    ingredients.append(row);
                }
                pane.append(ingredients);
                const check = api.canCook(key);
                pane.append(textAction('制作一批', action(() => api.cook(key)), !check.ok, check.ok ? '制作' + label(key) : check.reason));
                if (!check.ok) pane.append(node('span', check.reason, 'pcb-muted'));
            } else pane.append(node('div', '基础原料 · 库存 ' + api.amount(key), 'pcb-recipe-meta'));
            parent.append(pane);
        }
        function renderKitchen(parent, r) {
            const kitchen = node('section', undefined, 'pcb-kitchen');
            kitchen.append(node('h3', '食谱', 'pcb-section-heading'));
            const tabs = node('nav', undefined, 'pcb-row');
            for (const name of ['全部', '甜品', '菜肴', '饮料', '原料']) {
                const b = textAction(name, action(() => { filter = name; }));
                b.setAttribute('aria-pressed', String(filter === name)); tabs.append(b);
            }
            const input = node('input'); input.type = 'search'; input.placeholder = '搜索食谱'; input.value = search;
            input.setAttribute('aria-label', '搜索食谱');
            input.addEventListener('input', () => { search = input.value; renderCards(); });
            kitchen.append(tabs, input);
            const grid = node('div', undefined, 'pcb-grid'); kitchen.append(grid); parent.append(kitchen);
            function renderCards() {
                grid.replaceChildren();
                for (const key of api.recipes()) {
                    if (filter !== '全部' && api.category(key) !== filter) continue;
                    const name = label(key);
                    if (search && !name.toLowerCase().includes(search.toLowerCase()) && !key.includes(search.toLowerCase())) continue;
                    const item = foodCatalog()[key], recipe = item.recipe, check = api.canCook(key);
                    const card = node('article', undefined, 'pcb-card'); card.dataset.food = key;
                    const summary = node('div', undefined, 'pcb-food-summary');
                    const price = node('span', money(api.basePrice(key)), 'pcb-price');
                    price.title = api.category(key) === '原料' ? '参考价格；中间原料不能直接提交' : '每份基础售价，未含增益及订单加成';
                    summary.append(foodIcon(key), node('span', name, 'pcb-food-name'), price);
                    const actions = node('div', undefined, 'pcb-actions');
                    const details = textAction('详情', action(() => { book = book[0] === key ? [] : [key]; }));
                    details.setAttribute('aria-expanded', String(book[0] === key));
                    details.setAttribute('aria-controls', 'pcb-recipe-' + key);
                    actions.append(details,
                        textAction('制作', action(() => api.cook(key)), !check.ok,
                            check.ok ? '制作一批：' + recipe.cook_minutes + ' 分钟，产出 ' + recipe.servings + ' 份' : check.reason),
                        textAction('＋', action(() => api.select(key, 'stock')),
                            !api.sellable(key) || api.available(r, key, 'stock') < 1 || r.selection.length >= 3,
                            api.sellable(key) ? '将一份' + name + '加入提交栏；库存可用 ' + api.available(r, key, 'stock') : '中间原料不能直接提交'));
                    card.append(summary, actions);
                    if (book[0] === key) renderBook(card);
                    grid.append(card);
                }
                if (!grid.children.length) grid.append(node('p', '没有符合条件的已解锁食谱。'));
            }
            renderCards();
            const tray = node('section', undefined, 'pcb-tray');
            tray.append(node('h3', '本单托盘', 'pcb-section-heading'), node('div', '现做食物与中间原料 · 结单后清空', 'pcb-section-note'));
            const trayItems = node('div', undefined, 'pcb-tray-items');
            for (const [key, count] of Object.entries(r.tray)) {
                if (count <= 0) continue;
                const row = node('div', undefined, 'pcb-tray-item');
                row.append(foodIcon(key), node('span', label(key)), node('strong', '×' + count));
                if (api.sellable(key)) row.append(textAction('＋', action(() => api.select(key, 'tray')),
                    api.available(r, key, 'tray') < 1 || r.selection.length >= 3, '将一份现做的' + label(key) + '加入提交栏'));
                else row.append(node('span', '原料', 'pcb-muted'));
                trayItems.append(row);
            }
            if (!trayItems.children.length) trayItems.append(node('div', '托盘还是空的。', 'pcb-empty'));
            tray.append(trayItems); parent.append(tray);
            const selected = node('section', undefined, 'pcb-submit');
            const header = node('div', undefined, 'pcb-submit-heading');
            header.append(node('h3', '提交订单', 'pcb-section-heading'), node('span', r.selection.length + ' / 3 份', 'pcb-selection-count'));
            selected.append(header);
            const totalBasePrice = r.selection.reduce((total, item) => total + api.basePrice(item.key), 0);
            selected.append(node('div', '总基准价格：' + money(totalBasePrice), 'pcb-total-price'));
            const slots = node('div', undefined, 'pcb-submit-slots');
            for (let i = 0; i < 3; i++) {
                const x = r.selection[i];
                const slot = node('div', undefined, 'pcb-slot' + (x ? '' : ' pcb-slot-empty'));
                if (x) {
                    slot.append(foodIcon(x.key), node('span', label(x.key), 'pcb-slot-name'),
                        node('span', x.source === 'tray' ? '现做' : '库存', 'pcb-source'),
                        textAction('移除', action(() => api.remove(i)), false, '从提交栏移除' + label(x.key)));
                } else slot.append(node('span', '待放入食物'));
                slots.append(slot);
            }
            selected.append(slots, button('提交订单', action(() => api.submit()), r.selection.length === 0));
            parent.append(selected);
        }
        function render() {
            const oldGrid = root.querySelector('.pcb-grid'), top = oldGrid?.scrollTop || 0;
            const s = api.sync(), r = s.session;
            root.replaceChildren();
            if (notice && !(r?.phase === 'closed' && r.day === Math.floor(Time.date.timeStamp / 86400))) {
                const message = node('p', notice, 'pcb-notice'); message.setAttribute('role', 'alert'); root.append(message);
            }
            if (!api.leased()) {
                root.append(node('p', '临街的玻璃窗透进柔和的光，木制柜台后摆着几只空烤盘。烤炉占据了厨房的一角，旁边的操作台擦得干净。门外偶尔传来脚步声，海风轻轻拨动门边的招牌。你感觉很安心。'));
                root.append(node('p', s.leaseUntil ? '租期已到。续租后就能继续使用店面。' : '峭壁街上，一间空置的小店贴着出租告示。推门进去，柜台后是一间配有烤炉的厨房。你可以把这里经营成自己的面包坊。'),
                    node('p', '首版店面：£10,000 / 30 天。租金一次付清，不自动扣款。'),
                    button(s.leaseUntil ? '续租店面' : '签下租约，领取钥匙', action(() => { api.rent(); notice = '钥匙已交到你手里，面包坊现在由你经营。'; }), State.variables.money < api.RENT));
            } else {
                if (r?.phase === 'closed' && r.day === Math.floor(Time.date.timeStamp / 86400)) {
                    root.append(node('p', justClosed
                        ? s.summary.reason + '。今天共完成 ' + s.summary.completed + ' 单，收入 ' + money(s.summary.income) + '。你关上门，为自己的手艺与努力感到自豪。'
                        : '你看了看上锁的门。今天已经和客户说过打烊了，应该不好再开一遍了。'));
                    return;
                }
                root.append(node('p', '临街的玻璃窗透进柔和的光，木制柜台后摆着几只空烤盘。烤炉占据了厨房的一角，旁边的操作台擦得干净。门外偶尔传来脚步声，海风轻轻拨动门边的招牌。你感觉很安心。'));
                root.append(node('p', '租期剩余 ' + (s.leaseUntil - Math.floor(Time.date.timeStamp / 86400)) + ' 天 · 营业时间 08:00—21:00'));
                if (!r || r.day !== Math.floor(Time.date.timeStamp / 86400) || r.paused) {
                    root.append(node('p', r?.paused ? '你暂时挂出了休息的牌子。本局订单、托盘与增益均已保留。' : '烤炉和柜台已经准备好了。'),
                        button(r?.paused ? '继续营业' : '开始今日营业', action(() => api.start())));
                } else {
                    root.append(node('p', '已完成 ' + r.completed + ' 单 · 今日收入 ' + money(r.income)),
                        node('p', '增益：' + (r.buffs.map(k => api.BUFFS[k].name).join('、') || '待选择')));
                    if (r.phase === 'buff') {
                        if (waiting) {
                            root.append(node('h3', '选择下一张订单'), node('p', '你站在柜台前，等待客人中…' + '…'.repeat(waitingDots)));
                        } else {
                            root.append(node('h3', '选择一个营业增益'));
                            for (const key of r.buffOffers || []) {
                                const value = api.BUFFS[key];
                                if (value) root.append(button(value.name + ' · ' + value.text, waitingAction(() => api.chooseBuff(key))));
                            }
                        }
                    } else if (r.phase === 'offers') {
                        root.append(node('h3', '选择下一张订单'));
                        if (waiting) root.append(node('p', '你站在柜台前，等待客人中…' + '…'.repeat(waitingDots)));
                        else r.offers.forEach((o, i) => root.append(button(describe(o), action(() => { api.accept(i); book = []; }))));
                    } else if (r.phase === 'order') {
                        root.append(node('h3', describe(r.current))); renderKitchen(root, r);
                        root.append(button('放弃订单', action(() => api.abandon())));
                    } else if (r.phase === 'settlement') {
                        if (waiting) root.append(node('h3', '选择下一张订单'), node('p', '你站在柜台前，等待客人中…' + '…'.repeat(waitingDots)));
                        else if (r.last?.abandoned) root.append(node('p', '你放弃了这张订单。顾客离开了，结算耗时 5 分钟。'), button('迎接下一位顾客', waitingAction(() => api.next())));
                        else root.append(node('p', '顾客收下食物。评分 ' + r.last.score + '，本单收入 ' + money(r.last.income) + '。'), button('迎接下一位顾客', waitingAction(() => api.next())));
                    }
                    root.append(button('暂停营业，离开', action(leave)));
                    if (closing) {
                        root.append(node('p', '结束今日营业？本局增益和临时托盘将清空，今天不能重新开局。'),
                            button('确认打烊', action(() => { justClosed = true; closing = false; api.close(); })),
                            button('继续营业', action(() => { closing = false; })));
                    } else {
                        root.append(button('今日打烊', () => { closing = true; render(); }));
                    }
                }
            }
            if (oldGrid && root.querySelector('.pcb-grid')) root.querySelector('.pcb-grid').scrollTop = top;
        }
        render();
    }
    function mountOutsideKitchen(root) {
        let filter = '全部', search = '', book = [], notice = '', busy = false;
        const kitchenFilters = ['全部', '甜品', '菜肴', '饮料', '原料'];
        const act = fn => {
            if (busy) return;
            busy = true; notice = '';
            const beforeTime = Time.date.timeStamp;
            try { fn(); } catch (err) { notice = err.message; }
            finally {
                busy = false;
                if (root.isConnected) {
                    render();
                    // Standalone kitchen actions advance the game clock in-place.
                    // Refresh the game's sidebar immediately, just like the bakery UI.
                    if (Time.date.timeStamp !== beforeTime && typeof UIBar !== 'undefined' && typeof UIBar.update === 'function') UIBar.update();
                }
            }
        };
        const action = fn => () => act(fn);
        function renderBook(parent, key) {
            const item = foodCatalog()[key], recipe = item?.recipe;
            if (!item) return;
            const ingredientsList = recipeIngredients(key, item);
            const displayIngredients = ingredientsList.length ? ingredientsList
                : (typeof api.chain === 'function' ? (api.chain(key) || []) : []);
            const pane = node('section', undefined, 'pcb-book');
            pane.id = 'pcb-outside-recipe-' + key;
            const head = node('div', undefined, 'pcb-book-heading');
            head.append(foodIcon(key), node('strong', label(key)));
            const headActions = node('div', undefined, 'pcb-actions');
            if (book.length > 1) headActions.append(textAction('返回上级', action(() => book.pop())));
            headActions.append(textAction('收起', action(() => { book = []; })));
            head.append(headActions);
            pane.append(head);
            if (displayIngredients.length) {
                pane.append(node('div', recipe.cook_minutes + ' 分钟 · 产出 ' + recipe.servings + ' 份', 'pcb-recipe-meta'));
                const ingredients = node('div', undefined, 'pcb-ingredients');
                const needed = {};
                for (const ingredient of displayIngredients) needed[ingredient] = (needed[ingredient] || 0) + 1;
                const supplied = new Set(api.kitchenRules().supplied || []);
                for (const [ingredient, count] of Object.entries(needed)) {
                    const row = node('div', undefined, 'pcb-ingredient');
                    const ingredientName = node('div', undefined, 'pcb-ingredient-name');
                    ingredientName.append(foodIcon(ingredient), textAction(label(ingredient), action(() => {
                        if (!book.includes(ingredient) && foodCatalog()[ingredient]?.recipe?.ingredients?.length) book.push(ingredient);
                    }), false, '查看' + label(ingredient) + '的食谱'), node('span', '×' + count));
                    row.append(ingredientName,
                        node('div', supplied.has(ingredient) ? '厨房提供 ∞' : '库存 ' + api.amount(ingredient), 'pcb-stock-count'));
                    ingredients.append(row);
                }
                pane.append(ingredients);
                const check = api.canCookStandalone(key);
                pane.append(textAction('制作', action(() => api.cookStandalone(key)), !check.ok,
                    check.ok ? '制作一批' + label(key) : check.reason));
                if (!check.ok) pane.append(node('span', check.reason, 'pcb-muted'));
            } else pane.append(node('div', '基础原料 · 库存 ' + api.amount(key), 'pcb-recipe-meta'));
            parent.append(pane);
        }
        function render() {
            root.replaceChildren();
            if (notice) root.append(node('p', notice, 'pcb-notice'));
            const kitchen = node('section', undefined, 'pcb-kitchen pcb-outside-kitchen');
            kitchen.append(node('h3', '食谱', 'pcb-section-heading'));
            const tabs = node('nav', undefined, 'pcb-row');
            for (const name of kitchenFilters) {
                const tab = textAction(name, action(() => { filter = name; }));
                tab.setAttribute('aria-pressed', String(filter === name)); tabs.append(tab);
            }
            const input = node('input'); input.type = 'search'; input.placeholder = '搜索食谱'; input.value = search;
            input.setAttribute('aria-label', '搜索食谱');
            input.addEventListener('input', () => { search = input.value; render(); });
            kitchen.append(tabs, input);
            const grid = node('div', undefined, 'pcb-grid');
            for (const key of api.recipes()) {
                if (filter !== '全部' && api.category(key) !== filter) continue;
                const name = label(key);
                if (search && !name.toLowerCase().includes(search.toLowerCase()) && !key.includes(search.toLowerCase())) continue;
                const item = foodCatalog()[key], recipe = item.recipe, ingredientsList = recipeIngredients(key, item), check = api.canCookStandalone(key);
                const card = node('article', undefined, 'pcb-card');
                const summary = node('div', undefined, 'pcb-food-summary');
                summary.append(foodIcon(key), node('span', name, 'pcb-food-name'), node('span', '库存 ' + api.amount(key), 'pcb-price'));
                const actions = node('div', undefined, 'pcb-actions');
                const details = textAction('详情', action(() => { book = book[0] === key ? [] : [key]; }));
                details.setAttribute('aria-expanded', String(book[0] === key));
                actions.append(details, textAction('制作', action(() => api.cookStandalone(key)),
                    !ingredientsList.length || !check.ok, check.ok ? '制作一批' : check.reason));
                card.append(summary, actions);
                if (book[0] === key) renderBook(card, key);
                grid.append(card);
            }
            if (!grid.children.length) grid.append(node('p', '没有符合条件的已解锁食谱。'));
            kitchen.append(grid); root.append(kitchen);
        }
        render();
    }
    function renderBakerySettings(parent) {
        const options = State.variables.options || (State.variables.options = {});
        const row = node('div', undefined, 'settingsToggleItem pcb-settings');
        const labelNode = node('label');
        const input = node('input'); input.type = 'checkbox'; input.checked = options.pcBakeryReplaceKitchen === true;
        input.addEventListener('change', () => { options.pcBakeryReplaceKitchen = input.checked; });
        labelNode.append(input, node('span', '面包坊外是否替换原版厨房'));
        row.append(labelNode, node('p', '开启后，原版厨房会使用面包坊的食谱界面，只保留详情和制作。', 'small-description'));
        parent.append(row);
    }
    function installBakerySettingsTab() {
        if (!document?.querySelector) return;
        for (const tabs of document.querySelectorAll('#overlayTabs')) {
            const names = Array.from(tabs.querySelectorAll('button')).map(button => button.textContent.trim());
            const isOptionsTabs = ['General', 'Theme', 'Performance', 'Advanced', 'Information', '通用', '主题', '性能', '高级', '信息']
                .some(name => names.includes(name));
            if (!isOptionsTabs || tabs.querySelector('.pcb-settings-tab')) continue;
            const tab = node('button', 'PC面包坊', 'pcb-settings-tab');
            tab.type = 'button';
            tab.addEventListener('click', () => {
                const content = document.querySelector('#customOverlayContent');
                if (!content) return;
                tabs.querySelectorAll('button').forEach(button => button.classList.remove('active'));
                tab.classList.add('active'); content.replaceChildren(); renderBakerySettings(content);
            });
            tabs.append(tab);
        }
    }
    function installBakerySettingsObserver() {
        if (typeof MutationObserver !== 'function' || !document?.body) return;
        const observer = new MutationObserver(installBakerySettingsTab);
        observer.observe(document.body, { childList: true, subtree: true });
        installBakerySettingsTab();
    }
    Macro.add('pcBakeryUI', { handler() {
        const root = node('div', undefined, 'pc-bakery'); this.output.append(root);
        try { mount(root); } catch (err) { root.append(node('p', err.message, 'pcb-notice'), button('返回峭壁街', () => Engine.play('Cliff Street'))); }
    }});
    // The beach link is inside the original Places of interest branch, never a forced event.
    $(document).on(':passagerender.pcBakery', event => {
        // Every original kitchen eventually renders this shared root, including the
        // Avery mansion kitchen which calls it from a nested widget. Detect the root
        // instead of maintaining a passage-name list that can miss future kitchens.
        if (State.variables.options?.pcBakeryReplaceKitchen === true) {
            const original = event.content.querySelector('#kitchenDisplay');
            if (original && !original.closest('.pc-bakery')) {
                // The kitchen widgets build their supplied-ingredient list in
                // temporary state. Capture it before the passage context is gone.
                api.setKitchenRules(api.kitchenRules());
                const replacement = node('div', undefined, 'pc-bakery');
                original.replaceWith(replacement);
                try { mountOutsideKitchen(replacement); }
                catch (err) { replacement.append(node('p', err.message, 'pcb-notice')); }
            }
        }
        if (event.passage.title !== 'Cliff Street') return;
        const content = event.content;
        const beach = content.querySelector('a[data-passage="Beach"]');
        if (!beach || content.querySelector('.pcb-street')) return;
        const wrap = node('span', undefined, 'pcb-street');
        const text = State.variables.pcBakery?.leaseUntil ? '面包坊 (0:01)' : '面包坊出租告示 (0:01)';
        new Wikifier(wrap, '<br><<icon "pc-bakery.png">><<link ' + JSON.stringify(text) + ' "PCBakery">><<pass 1>><</link>>');
        // Retain the street's existing following line break, keeping this a peer of its other places.
        beach.parentNode.insertBefore(wrap, beach.nextSibling);
    });
    $(document).on(':dialogopened.pcBakery :passagedisplay.pcBakery', installBakerySettingsTab);
    installBakerySettingsObserver();
})();
