/* Woodland plots, farm upgrades, and uprooting for PC Bakery crops. */
(() => {
    'use strict';

    const PLOTS = {
        shrub: {
            key: 'pcBakeryShrubs',
            bed: 'pc_shrub',
            levelKey: 'shrubLevel',
            counts: [0, 2, 4, 8],
            size: 'small'
        },
        tree: {
            key: 'pcBakeryTrees',
            bed: 'pc_tree',
            levelKey: 'treeLevel',
            counts: [0, 4, 8, 12],
            size: 'small'
        }
    };

    const UPGRADES = {
        shrub: [
            { level: 1, woodland: 1, count: 2, cost: 300000, days: 3, token: 'pc_bakery_shrub_1' },
            { level: 2, woodland: 2, count: 4, cost: 600000, days: 5, token: 'pc_bakery_shrub_2' },
            { level: 3, woodland: 3, count: 8, cost: 1000000, days: 7, token: 'pc_bakery_shrub_3' }
        ],
        tree: [
            { level: 1, woodland: 2, count: 4, cost: 500000, days: 5, token: 'pc_bakery_tree_1' },
            { level: 2, woodland: 2, count: 8, cost: 1000000, days: 7, token: 'pc_bakery_tree_2' },
            { level: 3, woodland: 3, count: 12, cost: 2000000, days: 10, token: 'pc_bakery_tree_3' }
        ]
    };

    function variables() { return State?.variables; }
    function state() {
        const v = variables();
        if (!v) return null;
        v.pcBakeryFarm ||= { schemaVersion: 1, shrubLevel: 0, treeLevel: 0, notice: '' };
        if (v.pcBakeryFarm.schemaVersion !== 1) v.pcBakeryFarm = { schemaVersion: 1, shrubLevel: 0, treeLevel: 0, notice: '' };
        return v.pcBakeryFarm;
    }

    function level(type) { return Math.max(0, Math.min(3, Number(state()?.[PLOTS[type].levelKey]) || 0)); }
    function count(type) { return PLOTS[type].counts[level(type)]; }
    function currentUpgrade(type) { return UPGRADES[type][level(type)] || null; }

    function blankPlot(type) {
        return {
            plant: 'none', stage: 0, days: 0, water: 0, till: 0,
            quality: 1, size: PLOTS[type].size, bed: PLOTS[type].bed
        };
    }

    function ensurePlots() {
        const v = variables();
        if (!v) return;
        // Older saves can reach the woodland before the original farm plot
        // container has been created. Create it instead of silently skipping
        // the PC Bakery plots.
        v.plots ||= {};
        for (const [type, config] of Object.entries(PLOTS)) {
            const plots = Array.isArray(v.plots[config.key]) ? v.plots[config.key] : (v.plots[config.key] = []);
            while (plots.length < count(type)) plots.push(blankPlot(type));
            for (const plot of plots) {
                if (!plot || typeof plot !== 'object') continue;
                plot.bed = config.bed;
                plot.size ||= config.size;
                plot.plant ??= 'none';
                plot.stage ??= 0;
                plot.days ??= 0;
                plot.water ??= 0;
                plot.till ??= 0;
                plot.quality ??= 1;
            }
        }
    }

    function upgradeState(type) {
        const current = level(type);
        const next = currentUpgrade(type);
        return { type, current, next, count: count(type), building: variables()?.farm?.build === next?.token };
    }

    function startUpgrade(type) {
        const v = variables();
        const farm = v?.farm;
        const s = state();
        const next = currentUpgrade(type);
        if (!farm || !s || !next || farm.build || Number(v.farm_stage) < 7) return false;
        if (Number(farm.woodland) < next.woodland || Number(v.money) < next.cost) return false;
        farm.build = next.token;
        farm.build_timer = next.days;
        v.money -= next.cost;
        return true;
    }

    function applyFinishedBuilds() {
        const v = variables();
        const farm = v?.farm;
        const s = state();
        if (!farm || !s || !Array.isArray(farm.build_finished)) return;
        for (const type of Object.keys(PLOTS)) {
            const next = currentUpgrade(type);
            if (!next || !farm.build_finished.includes(next.token)) continue;
            farm.build_finished = farm.build_finished.filter(token => token !== next.token);
            s[PLOTS[type].levelKey] = next.level;
            s.notice = `${type === 'shrub' ? '灌木地' : '乔木地'}已完成升级，现在有 ${next.count} 块土地可用。`;
        }
        ensurePlots();
    }

    function takeNotice() {
        const s = state();
        const notice = s?.notice || '';
        if (s) s.notice = '';
        return notice;
    }

    function canUproot(plot) { return !!plot && Number(plot.stage) >= 1 && Number(plot.stage) < 5 && plot.plant && plot.plant !== 'none'; }
    function uproot(plot) {
        if (!canUproot(plot)) return false;
        const v = variables();
        plot.plant = 'none';
        plot.stage = 0;
        plot.days = 0;
        plot.water = 0;
        if (v) v.tendingvars ||= {};
        if (v) v.tendingvars.plot_uprooted = true;
        return true;
    }

    setup.pcBakeryFarm = {
        PLOTS, UPGRADES, state, level, count, upgradeState,
        ensurePlots, startUpgrade, applyFinishedBuilds, takeNotice,
        canUproot, uproot
    };

    // The woodland passage changes its available actions as the day advances.
    // Add a normal passage link beside the original Leave link, so entry does
    // not depend on a particular woodland option branch being present.
    $(document).on(':passagerender.pcBakeryFarm', event => {
        if (event.passage.title !== 'Farm Woodland') return;
        const content = event.content;
        if (content.querySelector('[data-pc-bakery-woodland-entry]')) return;
        const leave = content.querySelector('a[data-passage="Farm Work"]');
        if (!leave) return;
        const entry = document.createElement('span');
        entry.dataset.pcBakeryWoodlandEntry = 'true';
        new Wikifier(entry, '<br><<link [[进入PC面包坊种植区 (0:00)|PCBakery Woodland Plots]]>><</link>><br>');
        leave.parentNode.insertBefore(entry, leave.nextSibling);
    });

    $(document).on(':passagestart.pcBakeryFarm', () => {
        setup.pcBakeryFarm.applyFinishedBuilds();
        setup.pcBakeryFarm.ensurePlots();
    });
})();
