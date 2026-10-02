/* Reusable harvests for crops explicitly configured by this mod or another mod. */
(() => {
    'use strict';

    function crop(key) {
        if (State.variables.foodstuff != null) {
            const item = setup.foodstuff?.[key];
            return item?.tending?.regrow_days == null ? null : {
                growthDays: item.tending.growth_days,
                regrowDays: item.tending.regrow_days
            };
        }
        const item = setup.plants?.[key];
        return item?.regrow_days == null ? null : {
            growthDays: item.days,
            regrowDays: item.regrow_days
        };
    }

    setup.pcBakeryRegrowth = {
        // Called immediately after the original tending_harvest widget awards produce.
        // Returning true lets the original clear_plot widget run as usual.
        afterHarvest(plot) {
            if (!plot || plot.stage < 5 || !plot.plant || plot.plant === 'none') return true;
            const config = crop(plot.plant);
            if (!config) return true;
            const { growthDays, regrowDays } = config;
            if (!Number.isInteger(growthDays) || growthDays < 1 ||
                !Number.isInteger(regrowDays) || regrowDays < 1) return true;

            // tendingDay advances a stage-4 plant at growthDays cumulative watered
            // days. Set its counter so precisely regrowDays watered days remain.
            plot.stage = 4;
            plot.days = growthDays - regrowDays;
            return false;
        }
    };
})();
