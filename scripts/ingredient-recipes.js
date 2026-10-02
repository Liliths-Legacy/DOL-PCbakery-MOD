/* Make three existing DoL ingredients learnable kitchen recipes. */
(() => {
    'use strict';

    const recipes = {
        cocoa_powder: { ingredient: 'cocoa_bean', minutes: 20, difficulty: 1 },
        red_wine: { ingredient: 'grape', minutes: 90, difficulty: 2 },
        white_wine: { ingredient: 'grape', minutes: 90, difficulty: 2 }
    };

    function register() {
        const modern = !!setup.foodstuff;
        const catalog = modern ? setup.foodstuff : setup.plants;
        if (!catalog) return;
        for (const [key, config] of Object.entries(recipes)) {
            const item = catalog[key];
            if (!item || !catalog[config.ingredient]) continue;
            if (modern) {
                // Keep recipes supplied by another mod if one is already present.
                if (item.recipe?.ingredients?.length) continue;
                item.recipe = {
                    recipe_name: item.name,
                    difficulty: config.difficulty,
                    cook_minutes: config.minutes,
                    servings: 1,
                    ingredients: [config.ingredient],
                    tags: []
                };
            } else {
                if (item.ingredients?.length) continue;
                item.recipe_name = item.recipe_name || item.name.replace(/_/g, ' ');
                item.difficulty = config.difficulty;
                item.days = config.minutes;
                item.multiplier = 1;
                item.ingredients = [config.ingredient];
            }
        }
    }

    function cleanup() {
        const inventory = State.variables.foodstuff || State.variables.plants;
        if (!inventory) return;
        for (const key of Object.keys(recipes)) {
            if (inventory[key]) {
                delete inventory[key].knows_recipe;
                delete inventory[key].recipe;
            }
        }
    }

    setup.pcBakeryIngredientRecipes = { register, cleanup, keys: Object.keys(recipes) };
    $(document).on(':passagestart.pcBakeryIngredientRecipes', register);
})();
