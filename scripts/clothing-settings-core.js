/* Feature policy and safe return of owned clothes; no bakery gameplay dependency. */
(() => {
    'use strict';
    setup.createPCClothingSettings = env => {
        const enabled = () => env.vars().options?.pcClothingOptimizations !== false;
        function disable() {
            const v = env.vars(), state = v.pcVanity;
            // Validate the destination before touching a trial or owned item.
            // Returning existing property may exceed the wardrobe capacity.
            const hasClothes = state && Object.values(state.worn || {}).some(item => item && item.name !== 'naked');
            let target;
            if (hasClothes) {
                env.vanity.state();
                target = v.wardrobe;
                if (!target || env.vanity.slots().some(slot => !Array.isArray(target[slot])))
                    throw new Error('主衣柜不可用，衣物已保留，请在衣柜可用时关闭。');
            }
            const managedTrial = !!v.tryOn?.pcVanity;
            if (state?.shop) env.cancelShopping();
            let returned = 0;
            if (hasClothes) for (const slot of env.vanity.slots()) returned += env.vanity.strip(slot, target);
            if (state) state.enabled = false;
            (v.options ||= {}).pcClothingOptimizations = false;
            env.resetEditing();
            // Rebuild a native baseline after custom trials have been removed.
            // A purely native trial is left intact.
            if (managedTrial) env.resetNativeTrial();
            return returned;
        }
        function setEnabled(value) {
            const returned = value ? 0 : disable();
            if (value) { (env.vars().options ||= {}).pcClothingOptimizations = true; env.resetEditing(); }
            env.refresh();
            return returned;
        }
        function reconcile() {
            const v = env.vars();
            if (!enabled() && (v.pcVanity?.shop || v.pcVanity?.enabled ||
                Object.values(v.pcVanity?.worn || {}).some(item => item && item.name !== 'naked'))) disable();
        }
        return {enabled, setEnabled, reconcile};
    };
})();
