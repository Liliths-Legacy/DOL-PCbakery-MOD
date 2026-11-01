/* Read-only, player-visible projections. Never expose the raw save or execute widgets. */
(() => {
    'use strict';
    const groups = Object.freeze({
        overview: '可查询的数据范围', status: '时间、金钱及可见状态栏',
        scene: '当前场景和可见选项', panels: '当前打开的日志、属性、社交等面板',
        antiques: '古董和绘画收集进度', food: '拥有的食物及原料',
        recipes: '已学会的配方', clothing: '装备、衣柜和时装',
        plants: '已种植作物和已知种子', extra_stats: '统计 → 额外统计（需开启隐藏数据可读）'
    });
    function own(object, key) {
        if (!object || typeof object !== 'object') return undefined;
        const descriptor = Object.getOwnPropertyDescriptor(object, key);
        return descriptor && Object.hasOwn(descriptor, 'value') ? descriptor.value : undefined;
    }
    function entries(object) {
        return object && typeof object === 'object' ? Object.keys(object).map(key => [key, own(object, key)]) : [];
    }
    const scalar = value => typeof value === 'string' ? value.slice(0, 180) : typeof value === 'number' && Number.isFinite(value) ? value : typeof value === 'boolean' ? value : undefined;
    const pick = (object, keys) => Object.fromEntries(keys.map(key => [key, scalar(own(object, key))]).filter(([, value]) => value !== undefined));
    const at = (object, path) => path.split('.').reduce((value, key) => own(value, key), object);
    function parseAntiqueLabels(text) {
        const keys = [...text.matchAll(/["']((?:antique|painting)[a-zA-Z0-9_]+)["']\s*:\s*\{/g)], result = {};
        const literal = (body, field) => {
            const match = body.match(new RegExp(String.raw`(?:^|[,{\n])\s*(?:${field}|"${field}"|'${field}')\s*:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')`, 'm'));
            if (!match) return undefined;
            // Decode string literals only; never evaluate the widget or its expressions.
            if (match[1][0] === '"') { try { return JSON.parse(match[1]); } catch (_) { return undefined; } }
            return match[1].slice(1, -1).replace(/\\(['\\])/g, '$1');
        };
        keys.forEach((match, index) => {
            const body = text.slice(match.index, keys[index + 1]?.index || text.length);
            const name = literal(body, 'name'), journalName = literal(body, 'journalName');
            if (name) result[match[1]] = { name, journalName };
        });
        return result;
    }
    // Mirror Statistics.extraStatistics, not arbitrary save paths. Never render its widgets.
    function extraStatistics(vars, setup, helpers = {}) {
        const rows = [], value = path => at(vars, path);
        const add = (category, name, input, transform = v => v) => {
            const result = scalar(input);
            if (result !== undefined) {
                const output = scalar(transform(result));
                if (output !== undefined) rows.push({ category, name, value: output });
            }
        };
        const fields = (category, map) => {
            for (const [path, name] of Object.entries(map)) add(category, name, value(path), v => typeof v === 'number' ? Math.trunc(v) : v);
        };
        fields('状态', { pain: '疼痛', arousal: '兴奋', tiredness: '疲劳', stress: '压力', trauma: '创伤', control: '自控', allure: '吸引力', drunk: '醉意', drugged: '药物', hallucinogen: '致幻剂' });
        fields('特征', { purity: '纯洁', beauty: '美貌', physique: '体格', willpower: '意志', awareness: '意识', promiscuity: '放荡', exhibitionism: '暴露癖', deviancy: '异种癖', 'earSlime.corruption': '腐化', submissive: '顺从', masochism: '受虐', sadism: '施虐' });
        if (value('earSlime.growth')) fields('特征', { 'earSlime.growth': '耳史莱姆成长' });
        if (['initiate', 'monk', 'priest'].includes(value('temple_rank'))) fields('特征', { grace: '恩典' });
        add('特征', '异装进度（%）', value('crossdressingTrait') ?? 0, Math.trunc);
        for (const [part, label] of [['mouth', '口部'], ['breast', '胸部'], ['genital', '生殖器'], ['bottom', '臀部']])
            add('特征', label + '敏感度', value(part + 'sensitivity'), n => Number(Number(n).toFixed(2)));
        for (const [part, label] of [['breast', '胸部'], ['bottom', '臀部']]) {
            add('特征', label + '成长（%）', value(part + 'growthtimer'), n => Math.trunc(100 - n / 10));
            const size = value('player.' + part + 'size'), min = value(part + 'sizemin'), max = value(part + 'sizemax');
            if ([size, max].every(Number.isFinite)) add('特征', label + '能否增大', size < max);
            if ([size, min].every(Number.isFinite)) add('特征', label + '能否缩小', size > min);
        }
        add('特征', '正在泌乳', value('lactating') === 1);
        if (value('lactating') === 1) fields('特征', { milk_amount: '乳汁存量', milk_volume: '乳汁容量' });
        if (value('player.penisExist')) {
            const size = value('player.penissize'), timer = value('penisgrowthtimer');
            const min = size >= 1 ? 0 : -400, max = size > 2 ? 1000 : size === 2 ? 1200 : 1500;
            add('特征', '阴茎成长（%）', timer, n => Math.trunc(100 - (n - min) / (max - min) * 100));
            const growth = value('sexStats.pills.pills.penis growth.overdose'), reduction = value('sexStats.pills.pills.penis reduction.overdose');
            const types = value('worn.genitals.type'), dose = growth - reduction - (Array.isArray(types) && types.includes('shrinking') ? 20 : 0);
            if (value('sexStats.pills') && [size, growth, reduction, value('penissizemax'), value('penissizemin')].every(Number.isFinite)) {
                add('特征', '阴茎能否增大', size < value('penissizemax') && (size >= 1 || dose >= 20));
                add('特征', '阴茎能否缩小', size > value('penissizemin') && (value('player.sex') !== 'f' || size > 0) && (size >= 2 || dose <= -20));
            }
            fields('特征', { semen_amount: '精液存量', semen_volume: '精液容量' });
        }
        for (const [slot, wet, label] of [['upper', 'upperwet', '上装'], ['lower', 'lowerwet', '下装'], ['under_upper', 'underupperwet', '内衣'], ['under_lower', 'underlowerwet', '内裤'], ['genitals', null, '生殖器衣物']]) {
            const item = value('worn.' + slot);
            if (typeof own(item, 'name') !== 'string' || own(item, 'name') === 'naked') continue;
            if (wet) add('衣物', label + '湿度', value(wet), Math.trunc);
            add('衣物', label + '耐久', own(item, 'integrity'), Math.trunc);
        }
        fields('社交', { cool: '学校地位', delinquency: '不良', detention: '留堂', orphan_hope: '孤儿院希望', orphan_reb: '孤儿院叛逆' });
        if (value('docks.hired')) fields('社交', { 'docks.status': '码头地位' });
        if (value('pound.progress') >= 1) fields('社交', { stray_happiness: '流浪狗满意度' });
        fields('社交', { 'fame.sex': '性名声', 'fame.prostitution': '卖淫名声', 'fame.rape': '受侵犯名声', 'fame.bestiality': '兽交名声', 'fame.exhibitionism': '暴露名声', 'fame.pregnancy': '怀孕名声', 'fame.impreg': '授孕名声', 'fame.scrap': '战斗名声', 'fame.good': '善良名声', 'fame.business': '商业名声', 'fame.social': '社交名流名声', 'fame.model': '模特名声' });
        if (value('debug') === 1) fields('社交', { 'fame.pimp': '皮条客名声' });
        add('社交', '岛民语言', value('islander_language') ?? 0, Math.trunc);
        add('社交', 'Gwylan 进度', value('gwylan.progress') ?? 0);
        const totals = {}, crimeKeys = ['current', 'history', 'daily', 'count', 'countHistory'];
        for (const [key, name] of entries(own(setup, 'crimeNames'))) {
            const item = value('crime.' + key);
            for (const field of crimeKeys) {
                const number = own(item, field);
                if (Number.isFinite(number)) { add('犯罪', String(name) + ' · ' + field, number, Math.trunc); totals[field] = (totals[field] || 0) + number; }
            }
        }
        for (const field of crimeKeys) add('犯罪', '合计 · ' + field, totals[field]);
        add('社交', '当前犯罪值', totals.current, Math.trunc);
        for (const [key, events] of entries(value('crime.events'))) if (Array.isArray(events))
            add('犯罪事件', scalar(own(own(setup, 'crimeDescs'), key)) || key, events.length);
        fields('转化', { wolfbuild: '狼化进度', wolfgirl: '狼化显现', catbuild: '猫化进度', cat: '猫化显现', cowbuild: '牛化进度', cow: '牛化显现', birdbuild: '鸟化进度', harpy: '鸟化显现', foxbuild: '狐化进度', fox: '狐化显现', angelbuild: '天使化进度', angel: '天使化显现', demonbuild: '恶魔化进度', demon: '恶魔化显现', fallenbuild: '堕天使宽恕进度' });
        add('转化', '堕天使显现', value('fallenangel') ?? 0, Math.trunc);
        const pregnancies = entries(value('pregnancies')).map(([, p]) => p).filter(p => own(p, 'deliveredDate') === null);
        const active = (carrier, orifice) => pregnancies.find(p => own(p, 'carrier') === carrier && (!orifice || own(p, 'orifice') === orifice));
        const pregnancyRow = (category, name, record) => {
            // Only outputs printed by pregnancyStatusBlock: species, litter size, ETA. No donor identity or genes.
            const species = own(record, 'donorSpecies');
            add(category, name + ' · 种类', ['wolfboy', 'wolfgirl'].includes(species) ? 'wolf' : species === 'harpy' ? 'hawk' : species);
            const id = own(record, 'pregnancyId');
            if (id !== undefined && Array.isArray(value('childRecords'))) add(category, name + ' · 数量', value('childRecords').filter(c => own(c, 'pregnancyId') === id).length);
            const eta = helpers.pregnancyEta?.(pick(record, ['conceivedDate', 'donorSpecies', 'gestationVariance', 'layCare']));
            add(category, name + ' · 距生产天数（≤0 为随时）', eta);
        };
        const menstruation = value('sexStats.vagina.menstruation');
        const orifices = value('player.vaginaExist') ? ['anus', 'vagina'] : ['anus'];
        for (const orifice of orifices) {
            const category = '寄生怀孕', label = orifice === 'anus' ? '肛门' : '阴道', p = value('sexStats.' + orifice + '.pregnancy');
            if (own(p, 'type') === 'parasite' || (own(p, 'type') === null && !active('pc', orifice))) {
                const max = own(p, 'motherStatus') === 1 ? 2 : own(p, 'motherStatus') === 2 ? 4 : 1;
                for (let i = 0; i < max; i++) {
                    const fetus = own(own(p, 'fetus'), String(i)), name = label + '槽位 ' + (i + 1);
                    add(category, name, fetus ? '有寄生卵' : '空');
                    if (fetus) {
                        add(category, name + ' · 已受精', own(fetus, 'fertilised'));
                        add(category, name + ' · 种类', own(fetus, 'creature'));
                        const gender = own(own(fetus, 'stats'), 'gender'); add(category, name + ' · 性别', gender);
                        if (own(fetus, 'fertilised')) {
                            if (gender !== 'Hermaphrodite' || value('pregnancyStats.parasiteDoctorEvents') >= 4) add(category, name + ' · 生产剩余天数', own(fetus, 'daysLeft'));
                            else add(category, name + ' · 生产条件', '需要 Harper 医生帮助');
                        }
                    }
                }
            } else add(category, label + '槽位', '已有其他类型孕程；不提供额外内部字段');
        }
        if ((value('player.vaginaExist') || helpers.canCarryAnally?.()) && value('settings.fertilityCycleEnabled')) {
            add('月经周期', '周期正在运行', own(menstruation, 'running'));
            if (own(menstruation, 'running')) {
                add('月经周期', '周期当前天数', own(menstruation, 'currentDay'));
                add('月经周期', '周期最后一天', own(menstruation, 'currentDaysMax'));
                if (own(menstruation, 'currentDaysMax') > 0) {
                    const fertile = helpers.fertileDates?.();
                    for (const [field, label] of [['passed', '本周期易孕期已过'], ['risky', '易孕日期'], ['dangerous', '高风险日期'], ['today', '今日风险']]) add('月经周期', label, own(fertile, field));
                    add('月经周期', '距下次易孕期最少天数', at(fertile, 'nextWindow.min'));
                    add('月经周期', '距下次易孕期最多天数', at(fertile, 'nextWindow.max'));
                }
            }
        }
        for (const [field, label] of [['totalDaysPregnant', '累计怀孕天数'], ['totalDaysPregnancyKnown', '累计已知怀孕天数']]) add('怀孕', label, value('pregnancyStats.' + field), Math.floor);
        for (const orifice of orifices) {
            if (orifice === 'anus' && value('player.vaginaExist') && !active('pc', 'anus') && value('sexStats.anus.pregnancy.type') !== 'parasite') continue;
            const record = active('pc', orifice), name = orifice === 'anus' ? '肛门孕程' : '阴道孕程';
            if (record) { pregnancyRow('怀孕', name, record); continue; }
            const fetus = value('sexStats.' + orifice + '.pregnancy.fetus');
            if (Array.isArray(fetus) && fetus.length) add('怀孕', name, '寄生物阻止怀孕');
            else if ((orifice === 'vagina' && !value('player.vaginaExist')) || !own(menstruation, 'running')) add('怀孕', name, '目前不能怀孕');
            else if (own(menstruation, 'currentState') === 'recovering') add('怀孕', name, '产后恢复中');
            else {
                add('怀孕', name, '当前未怀孕');
                if (value('harpy') >= 4) {
                    if (value('harpyEggs')) add('怀孕', '携带鸟蛋数量', value('harpyEggs.count'));
                    else add('怀孕', '可以产蛋', !value('harpyEggsPrevent'));
                }
                if (value('settings.pregnancyType') === 'realistic') {
                    const timestamp = helpers.timestamp?.(), loads = value('cumLoads.' + orifice);
                    if (Number.isFinite(timestamp) && Array.isArray(loads)) {
                        const live = loads.filter(l => timestamp - own(l, 'time') < own(l, 'lifespan')), donors = new Map();
                        add('怀孕', name + ' · 有效精液份数', live.length);
                        for (const load of live) { const donor = scalar(own(load, 'donor')); if (donor !== undefined) donors.set(donor, (donors.get(donor) || 0) + 1); }
                        for (const [donor, count] of donors) add('怀孕', name + ' · 来源 ' + donor, count);
                    }
                }
            }
        }
        for (const [, npc] of entries(value('NPCName'))) {
            if (own(own(npc, 'pregnancy'), 'enabled') === undefined) continue;
            const name = scalar(own(npc, 'nam')); if (typeof name !== 'string') continue;
            const record = active(name);
            if (record) pregnancyRow('NPC 怀孕', name, record);
            else add('NPC 怀孕', name, own(own(npc, 'pregnancy'), 'enabled') ? '未怀孕' : '玩家已禁用该 NPC 怀孕');
        }
        return rows;
    }
    function createReader(env) {
        const now = env.now || Date.now;
        function createSession({ allowExtraStats = false } = {}) {
            allowExtraStats = allowExtraStats === true;
            let calls = 0;
            const observations = [];
            function paginate(rows, query, offset, limit) {
                const matched = query ? rows.filter(row => JSON.stringify(row).toLocaleLowerCase().includes(query.toLocaleLowerCase())) : rows;
                return { items: matched.slice(offset, offset + limit), total: matched.length,
                    nextOffset: offset + limit < matched.length ? offset + limit : null };
            }
            function read({ group = 'overview', query = '', offset = 0, limit = 60 } = {}) {
                if (++calls > 8) throw new Error('已达到本次游戏数据查询上限，请缩小问题范围。');
                if (!Object.hasOwn(groups, group)) throw new Error('该数据领域尚未开放；不能查询任意存档路径或隐藏变量。');
                if (group === 'extra_stats' && !allowExtraStats) throw new Error('请先在“选项 → PC面包坊”开启“开启隐藏数据可读”。仅开放统计中的额外统计。');
                if (typeof query !== 'string' || query.length > 100 || !Number.isInteger(offset) || offset < 0
                    || !Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error('筛选或分页参数无效。');
                const vars = env.vars();
                if (!vars || typeof vars !== 'object') throw new Error('游戏尚未初始化，请载入存档或开始游戏后再试。');
                const setup = env.setup?.() || {}, text = id => env.visible?.(id) || '';
                let data;
                if (group === 'overview') data = { groups: Object.fromEntries(Object.entries(groups).filter(([key]) => key !== 'extra_stats' || allowExtraStats)), hiddenData: allowExtraStats,
                    note: '额外统计权限：' + (allowExtraStats ? '已开启，仅可查询 extra_stats。' : '关闭。') + '不提供原始变量、额外统计以外的隐藏事件、未知内容或 NPC 精确关系值。其他模块请先打开对应游戏面板，再查询 panels。' };
                if (group === 'extra_stats') data = { ...paginate(extraStatistics(vars, setup, env.extraHelpers), query, offset, limit),
                    note: '仅对应原版“统计 → 额外统计”；沿用该页显示条件和数值精度。缺失字段表示尚未初始化或版本未适配，不能推断为零。请按 nextOffset 翻页；不包含原始存档、NPC 好感或未来事件。' };
                if (group === 'status') data = { moneyPence: scalar(own(vars, 'money')), time: env.clock?.() || null,
                    visibleSidebar: text('sidebar'), note: '状态数值只使用游戏界面实际显示的文字；不从隐藏变量补全。' };
                if (group === 'scene') data = { text: text('scene'), note: '当前可见场景；不读取隐藏选项或未来剧情。' };
                if (group === 'panels') data = { text: text('panels'), note: '如未显示所需内容，请玩家打开相应面板。不会自动切换面板或执行游戏宏。' };
                if (group === 'antiques') {
                    const museum = own(vars, 'museumAntiques');
                    if (own(vars, 'museumintro') !== 1 || !museum) data = { available: false, note: '当前存档尚未开放博物馆收集记录。' };
                    else {
                        const hints = Array.isArray(own(vars, 'museumAntiqueJournalHints')) ? own(vars, 'museumAntiqueJournalHints') : [];
                        const labels = env.antiqueLabels?.() || {};
                        const statusLabels = { found: '已找到，尚未交馆', talk: '已交馆，等待与 Winter 讨论', museum: '已入馆并讨论',
                            stolen: '已被盗', recovered: '已追回', notFound: '已获线索，尚未找到' };
                        const counts = { found: 0, notFound: 0, handedIn: 0, unknownNames: 0 };
                        const rows = [];
                        for (const [key, state] of entries(own(museum, 'antiques'))) {
                            if (typeof state !== 'string' || !Object.hasOwn(statusLabels, state)) continue;
                            if (state === 'notFound') counts.notFound++; else counts.found++;
                            if (['talk', 'museum', 'stolen', 'recovered'].includes(state)) counts.handedIn++;
                            if (state === 'notFound' && !hints.includes(key)) { counts.unknownNames++; continue; }
                            const name = labels[key], displayName = (state === 'notFound' ? name?.journalName : name?.name) || name?.name;
                            rows.push({ key, name: displayName || '已知古董（名称暂未适配）', nameResolved: Boolean(displayName),
                                status: statusLabels[state], missing: state === 'notFound', kind: 'antique' });
                        }
                        if (own(vars, 'museum_paintings_intro')) {
                            for (const [key, state] of entries(own(museum, 'paintings'))) {
                                if (typeof state !== 'string' || !Object.hasOwn(statusLabels, state) || state === 'notFound') continue;
                                const displayName = labels[key]?.journalName || labels[key]?.name;
                                rows.push({ key, name: displayName || '已发现的绘画', nameResolved: Boolean(displayName), status: statusLabels[state], missing: false, kind: 'painting' });
                            }
                        }
                        data = { available: true, counts, ...paginate(rows, query, offset, limit),
                            note: 'counts 仅统计古董；items 包括已知古董和已发现绘画，按 kind 区分。missing=true 是已获线索但未找到的古董；unknownNames 是未返回身份的缺失古董数量。handedIn 包括待讨论、已讨论、被盗和追回，并不等于已讨论数。nameResolved=false 表示名称映射失败。total/nextOffset 描述列表分页；查询结果不包含未知古董的身份。' };
                    }
                }
                if (group === 'food' || group === 'recipes') {
                    const modern = own(vars, 'foodstuff'), stock = modern || own(vars, 'plants');
                    const catalog = own(setup, modern ? 'foodstuff' : 'plants') || {};
                    const rows = [];
                    for (const [key, item] of entries(stock)) {
                        const definition = own(catalog, key), amount = own(item, 'amount');
                        const learned = own(item, modern ? 'knows_recipe' : 'recipe') === true;
                        if (group === 'food' && typeof amount === 'number' && amount > 0)
                            rows.push({ key, name: scalar(own(definition, 'name')) || scalar(own(definition, 'plural')) || key, amount });
                        if (group === 'recipes' && learned) {
                            const ingredients = modern ? own(own(definition, 'recipe'), 'ingredients') : own(definition, 'ingredients');
                            if (Array.isArray(ingredients)) rows.push({ key, name: scalar(own(definition, 'name')) || key,
                                ingredients: ingredients.filter(value => typeof value === 'string').slice(0, 30) });
                        }
                    }
                    data = { available: Boolean(stock), ...paginate(rows, query, offset, limit), note: '只列出现有库存或已学配方；缺失字段表示未适配，不表示数量为零。' };
                }
                if (group === 'clothing') {
                    const rows = [], keys = ['name', 'cn_name', 'colour', 'accessory_colour', 'integrity', 'integrity_max'];
                    for (const field of ['worn', 'carried', 'wardrobe']) for (const [slot, item] of entries(own(vars, field))) {
                        for (const piece of Array.isArray(item) ? item : [item]) {
                            if (typeof own(piece, 'name') === 'string' && own(piece, 'name') !== 'naked') rows.push({ location: field, slot, ...pick(piece, keys) });
                        }
                    }
                    for (const [slot, piece] of entries(own(own(vars, 'pcVanity'), 'worn')))
                        if (typeof own(piece, 'name') === 'string' && own(piece, 'name') !== 'naked') rows.push({ location: '时装', slot, ...pick(piece, keys) });
                    data = { ...paginate(rows, query, offset, limit), note: '只返回拥有的衣物和可见耐久等字段；不公开诅咒、隐藏属性或商店未拥有商品。此列表不包含尚未适配的异地衣柜。' };
                }
                if (group === 'plants') {
                    const rows = [];
                    for (const [location, plots] of entries(own(vars, 'plots'))) if (Array.isArray(plots)) plots.forEach((plot, index) => {
                        if (own(plot, 'plant')) rows.push({ location, index, ...pick(plot, ['plant', 'stage', 'water', 'till']) });
                    });
                    const seeds = own(vars, 'plants_known');
                    data = { ...paginate(rows, query, offset, limit), knownSeeds: Array.isArray(seeds) ? seeds.filter(value => typeof value === 'string').slice(0, 100) : [],
                        note: '只列出本局已种植作物及已知种子，不输出随机生长判定或未来事件。' };
                }
                const observation = { number: observations.length + 1, group, label: groups[group], observedAt: new Date(now()).toISOString() };
                if (group !== 'overview') observations.push(observation);
                return { ok: true, source: { kind: 'current_game', ...observation }, hiddenData: group === 'extra_stats', data };
            }
            return { read, observations, stats: () => ({ calls }) };
        }
        return { createSession };
    }
    setup.createPCGameReader = createReader;
    setup.parsePCAntiqueLabels = parseAntiqueLabels;
    setup.pcGameReader = createReader({
        vars: () => State.variables, setup: () => setup,
        extraHelpers: {
            // Fixed, audited read-only game helpers, never model-selected function names.
            pregnancyEta: record => typeof window.pregnancyDaysEta === 'function' ? window.pregnancyDaysEta(record) : undefined,
            canCarryAnally: () => typeof window.playerCanCarryAnally === 'function' && window.playerCanCarryAnally(),
            fertileDates: () => typeof window.menstrualFertileDates === 'function' ? window.menstrualFertileDates() : undefined,
            timestamp: () => typeof Time !== 'undefined' ? Time.date.timeStamp : undefined
        },
        clock: () => typeof Time !== 'undefined' ? { year: Time.year, month: Time.monthName, day: Time.monthDay, hour: Time.hour, minute: Time.minute } : null,
        visible: group => {
            const selectors = { sidebar: '#story-caption', scene: '#passages .passage', panels: '#customOverlayContent, #ui-dialog-body' };
            const visible = element => {
                for (let node = element; node && node.nodeType === 1; node = node.parentElement) {
                    const style = getComputedStyle(node);
                    if (node.hidden || style.display === 'none' || style.visibility === 'hidden' || style.visibility === 'collapse') return false;
                }
                return true;
            };
            return [...document.querySelectorAll(selectors[group] || '')].filter(visible)
                .map(element => element.innerText || '').join('\n').slice(0, 14000);
        },
        antiqueLabels: () => {
            // This SugarCube build keeps widget passages outside Story.get's regular map.
            // Read the loaded (including translated) widget source without executing it.
            try {
                const story = window.SugarCube?.Story || (typeof Story !== 'undefined' ? Story : null);
                const widgets = typeof story?.getAllWidget === 'function' ? story.getAllWidget() : [];
                const source = widgets.find(passage => passage.title === 'MuseumAntiques')
                    || widgets.find(passage => /<<widget\s+["']museumAntiqueText["']/.test(passage.text));
                if (source) return parseAntiqueLabels(source.text);
                if (story?.has('MuseumAntiques')) return parseAntiqueLabels(story.get('MuseumAntiques').text);
            } catch (_) { /* Missing or changed definitions are reported by nameResolved. */ }
            return {};
        }
    });
})();
