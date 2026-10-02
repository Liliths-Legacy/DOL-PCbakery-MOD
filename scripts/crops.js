/* Crop registration shared by DoL 0.5.8.10 and 0.5.11.9. */
(() => {
    'use strict';

    // days to first harvest, days between harvests, and the base yield multiplier.
    const crops = {
        apple:        { seasons: ['spring', 'summer', 'autumn'], days: 28, regrow: 7, yield: 1, bed: 'pc_tree' },
        banana:       { seasons: ['summer', 'autumn'], days: 32, regrow: 7, yield: 2, bed: 'pc_tree' },
        blackberry:   { seasons: ['summer', 'autumn'], days: 16, regrow: 3, yield: 4, bed: 'pc_shrub' },
        blood_lemon:  { seasons: ['summer', 'autumn'], days: 30, regrow: 8, yield: 1, bed: 'pc_tree' },
        cherry:       { seasons: ['spring', 'summer'], days: 25, regrow: 6, yield: 2, bed: 'pc_tree' },
        date:         { seasons: ['summer', 'autumn'], days: 40, regrow: 8, yield: 2, bed: 'pc_tree' },
        lemon:        { seasons: ['spring', 'summer', 'autumn'], days: 28, regrow: 7, yield: 1, bed: 'pc_tree' },
        lime:         { seasons: ['spring', 'summer', 'autumn'], days: 25, regrow: 7, yield: 1, bed: 'pc_tree' },
        orange:       { seasons: ['spring', 'summer', 'autumn'], days: 32, regrow: 7, yield: 1, bed: 'pc_tree' },
        peach:        { seasons: ['spring', 'summer'], days: 28, regrow: 5, yield: 2, bed: 'pc_tree' },
        pear:         { seasons: ['spring', 'summer', 'autumn'], days: 32, regrow: 7, yield: 1, bed: 'pc_tree' },
        plum:         { seasons: ['spring', 'summer', 'autumn'], days: 28, regrow: 5, yield: 2, bed: 'pc_tree' },
        strawberry:   { seasons: ['spring', 'summer'], days: 12, regrow: 3, yield: 2, bed: 'pc_shrub' },
        coffee_bean:  { seasons: ['summer', 'autumn'], days: 35, regrow: 7, yield: 2, bed: 'pc_tree', name: '咖啡豆', plural: '咖啡豆', icon: 'coffee-bean.png', price: 100, index: 150 },
        cocoa_bean:   { seasons: ['summer', 'autumn'], days: 42, regrow: 8, yield: 2, bed: 'pc_tree', name: '可可豆', plural: '可可豆', icon: 'cocoa-bean.png', price: 120, index: 151 },
        grape:        { seasons: ['summer', 'autumn'], days: 28, regrow: 5, yield: 2, bed: 'pc_shrub', name: '葡萄', plural: '葡萄', icon: 'grape.png', price: 80, index: 152, category: 'fruit' },
        hops:         { seasons: ['summer', 'autumn'], days: 24, regrow: 5, yield: 2, bed: 'pc_shrub', name: '啤酒花', plural: '啤酒花', icon: 'hops.png', price: 60, index: 153 },
        tea_leaf:     { seasons: ['spring', 'summer', 'autumn'], days: 22, regrow: 4, yield: 2, bed: 'pc_shrub', name: '茶叶', plural: '茶叶', icon: 'tea-leaf.png', price: 80, index: 154 }
    };
    const keys = Object.keys(crops);
    const added = keys.filter(key => crops[key].icon);

    function register() {
        const modern = !!setup.foodstuff;
        const catalog = modern ? setup.foodstuff : setup.plants;
        if (!catalog) return;
        for (const [key, config] of Object.entries(crops)) {
            if (modern) {
                if (!catalog[key] && config.icon) catalog[key] = {
                    index: config.index, name: config.name, singular: config.name,
                    plural: config.plural, icon: config.icon,
                    category: config.category || 'vegetable',
                    kitchen_item_type_icon: config.category === 'fruit' ? 'recipe-fruit.png' : 'recipe-vegetable.png',
                    prop_folder: 'tending', tending: { affected_by_tending_skill: true, tags: [] },
                    shop: { sell_price: config.price }
                };
                const item = catalog[key];
                if (!item) continue;
                item.tending ||= {};
                Object.assign(item.tending, {
                    planting_bed: config.bed || 'earth', growth_days: config.days, regrow_days: config.regrow,
                    yield_multiplier: config.yield, has_seeds: true, seasons: config.seasons.slice()
                });
            } else {
                if (!catalog[key] && config.icon) catalog[key] = {
                    index: config.index, name: key, singular: config.name,
                    plural: config.plural, plant_cost: config.price, difficulty: 1,
                    bed: 'earth', type: config.category || 'vegetable', special: [],
                    ingredients: [], icon: config.icon
                };
                const item = catalog[key];
                if (!item) continue;
                Object.assign(item, {
                    bed: config.bed || item.bed || 'earth',
                    days: config.days, regrow_days: config.regrow,
                    multiplier: config.yield, season: config.seasons.slice()
                });
            }
        }
    }

    function ensureSave() {
        const v = State?.variables;
        if (!v || v.pcBakeryCropsRemoved || !Array.isArray(v.plants_known)) return;
        const inventory = v.foodstuff || v.plants;
        if (!inventory) return;
        for (const key of keys) {
            if (!inventory[key]) inventory[key] = v.foodstuff ? { amount: 0 } : {
                name: key, plural: setup.plants?.[key]?.plural || key, amount: 0
            };
        }
    }

    function inventoryAmount(key) {
        const v = State?.variables;
        const inventory = v?.foodstuff || v?.plants;
        return Math.max(0, Number(inventory?.[key]?.amount) || 0);
    }

    // Fruit/produce doubles as the planting material. Existing vanilla seeds
    // remain controlled by plants_known; the mod's crops only appear when one
    // matching item is actually held.
    function availablePlantKeys(bed) {
        const known = Array.isArray(State?.variables?.plants_known) ? State.variables.plants_known : [];
        // Woodland plots are deliberately exclusive: a tree plot cannot fall
        // back to ordinary seeds, and a shrub plot cannot accept tree crops.
        // Keep this rule in the data source used by the planting menu so the
        // restriction is visible before the player clicks a recipe.
        if (bed === 'pc_tree' || bed === 'pc_shrub') {
            return keys.filter(key => crops[key].bed === bed && inventoryAmount(key) > 0);
        }
        const result = known.filter(key => !keys.includes(key) ||
            (inventoryAmount(key) > 0 && (!bed || plantingBed(key) === bed)));
        for (const key of keys) {
            if (inventoryAmount(key) > 0 && (!bed || plantingBed(key) === bed) && !result.includes(key)) result.push(key);
        }
        return result;
    }

    function plantingBed(key) {
        return crops[key]?.bed || (State.variables.foodstuff ? setup.foodstuff?.[key]?.tending?.planting_bed : setup.plants?.[key]?.bed);
    }

    function beginPlanting(plot, key) {
        if (!plot || !key) return false;
        if (Number(plot.stage) !== 0 || Number(plot.till) < 1) return false;
        const expectedBed = plantingBed(key);
        if ((plot.bed === 'pc_tree' || plot.bed === 'pc_shrub') && expectedBed !== plot.bed) return false;
        if (expectedBed && plot.bed !== expectedBed) return false;
        if (!keys.includes(key)) return true;
        const v = State?.variables;
        const inventory = v?.foodstuff || v?.plants;
        if (!inventory?.[key] || inventory[key].amount < 1) return false;
        inventory[key].amount -= 1;
        pendingPlanting = { plot, key };
        return true;
    }

    let pendingPlanting = null;
    function installPlantingGuard() {
        if (typeof window.plantSeedsInPlot !== 'function' || window.plantSeedsInPlot.pcBakeryGuard) return;
        const original = window.plantSeedsInPlot;
        const wrapped = function (plot, key) {
            const authorized = pendingPlanting && pendingPlanting.plot === plot && pendingPlanting.key === key;
            pendingPlanting = null;
            if (!authorized && !beginPlanting(plot, key)) return false;
            return original.apply(this, arguments);
        };
        wrapped.pcBakeryGuard = true;
        window.plantSeedsInPlot = wrapped;
    }

    function cleanup() {
        const v = State.variables;
        const inventory = v.foodstuff || v.plants || {};
        const keySet = new Set(keys);
        let plots = 0, items = 0;
        for (const group of Object.values(v.plots || {})) {
            if (!Array.isArray(group)) continue;
            for (const plot of group) {
                if (!plot || !keySet.has(plot.plant)) continue;
                Object.assign(plot, { plant: 'none', stage: 0, days: 0, water: 0, till: 0 });
                plots++;
            }
        }
        for (const key of added) {
            items += Number(inventory[key]?.amount) || 0;
            delete inventory[key];
        }
        const addedSet = new Set(added);
        for (const name of ['foodstuff_stall', 'plants_stall', 'foodstuff_inventory', 'plant_inventory']) {
            if (Array.isArray(v[name])) v[name] = v[name].filter(key => !addedSet.has(key));
        }
        for (const name of ['stall_foodstuff', 'stall_plant', 'stall_expensive']) {
            if (addedSet.has(v[name])) delete v[name];
        }
        setup.pcBakeryIngredientRecipes?.cleanup();
        items += setup.pcBakeryDrinks?.cleanup() || 0;
        if (Array.isArray(v.plants_known)) v.plants_known = v.plants_known.filter(key => !keySet.has(key));
        v.pcBakeryCropsRemoved = true;
        return { plots, items };
    }

    // The original day routine handles watering and irrigation. Restore growth
    // counters for this mod's crops when their season is over.
    function installSeasonPause() {
        if (typeof window.tendingDay !== 'function' || window.tendingDay.pcBakerySeasonPause) return;
        const original = window.tendingDay;
        const wrapped = function (...args) {
            const v = State?.variables;
            const season = window.Time?.season;
            const paused = [];
            for (const group of Object.values(v?.plots || {})) {
                if (!Array.isArray(group)) continue;
                for (const plot of group) {
                    const config = crops[plot?.plant];
                    if (config && !config.seasons.includes(season) && plot.stage >= 1) {
                        paused.push([plot, plot.days, plot.stage]);
                    }
                }
            }
            try { return original.apply(this, args); }
            finally {
                for (const [plot, days, stage] of paused) { plot.days = days; plot.stage = stage; }
            }
        };
        wrapped.pcBakerySeasonPause = true;
        window.tendingDay = wrapped;
    }

    setup.pcBakeryCrops = {
        register, ensureSave, cleanup, installSeasonPause, installPlantingGuard,
        availablePlantKeys, beginPlanting, plantingBed, keys, added
    };
    $(document).on(':passagestart.pcBakeryCrops', () => {
        register();
        ensureSave();
        installPlantingGuard();
        installSeasonPause();
    });
})();
