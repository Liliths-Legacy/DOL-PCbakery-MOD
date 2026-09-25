/* Read-only conversion of 0.5.8.10's static plants definitions into the kitchen model.
   The original table and save inventory are never rewritten. */
setup.pcBakeryNormalizeLegacy = function (plants) {
    const result = {};
    for (const [key, item] of Object.entries(plants)) {
        if (!item || typeof item !== 'object') continue;
        result[key] = {
            name: item.name || key,
            icon: item.icon,
            singular: item.singular,
            plural: item.plural,
            category: item.type === 'food' ? 'dish' : item.type,
            food: { tags: Array.isArray(item.special) ? item.special.slice() : [] },
            shop: { sell_price: item.plant_cost },
            recipe: Array.isArray(item.ingredients) && item.ingredients.length ? {
                ingredients: item.ingredients.slice(),
                cook_minutes: item.days,
                servings: item.multiplier,
                difficulty: item.difficulty,
                recipe_name: item.name || key
            } : undefined
        };
    }
    return result;
};
