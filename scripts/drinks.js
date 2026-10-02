/* Twelve learnable drinks, using one of each listed ingredient. */
(() => {
    'use strict';

    const drinks = {
        pc_bakery_americano: {
            name: '美式咖啡', ingredients: ['coffee_bean'], minutes: 5, price: 250,
            difficulty: 1, icon: 'pcb-americano.png', index: 155
        },
        pc_bakery_latte: {
            name: '拿铁', ingredients: ['coffee_bean', 'bottle_of_milk'], minutes: 8, price: 380,
            difficulty: 1, icon: 'pcb-latte.png', index: 156, milk: true
        },
        pc_bakery_cappuccino: {
            name: '卡布奇诺', ingredients: ['coffee_bean', 'bottle_of_milk', 'cream'], minutes: 10, price: 480,
            difficulty: 2, icon: 'pcb-cappuccino.png', index: 157, milk: true
        },
        pc_bakery_green_apple_americano: {
            name: '青苹果美式', ingredients: ['coffee_bean', 'apple', 'sugar'], minutes: 10, price: 400,
            difficulty: 2, icon: 'pcb-green-apple-americano.png', index: 158
        },
        pc_bakery_plain_tea: {
            name: '清茶', ingredients: ['tea_leaf'], minutes: 5, price: 180,
            difficulty: 1, icon: 'pcb-plain-tea.png', index: 159
        },
        pc_bakery_hot_cocoa: {
            name: '热可可', ingredients: ['cocoa_powder', 'bottle_of_milk', 'sugar'], minutes: 10, price: 450,
            difficulty: 1, icon: 'pcb-hot-cocoa.png', index: 160, milk: true
        },
        pc_bakery_sea_salt_milk_tea: {
            name: '海盐奶盖奶茶', ingredients: ['tea_leaf', 'bottle_of_milk', 'cream', 'salt', 'sugar'], minutes: 15, price: 500,
            difficulty: 2, icon: 'pcb-sea-salt-milk-tea.png', index: 161, milk: true
        },
        pc_bakery_fruit_tea: {
            name: '缤纷果茶', ingredients: ['tea_leaf', 'apple', 'peach', 'blackberry'], minutes: 12, price: 420,
            difficulty: 2, icon: 'pcb-fruit-tea.png', index: 162
        },
        pc_bakery_beer: {
            name: '啤酒', ingredients: ['hops', 'wheat', 'sugar'], minutes: 90, price: 400,
            difficulty: 2, icon: 'pcb-beer.png', index: 163, alcohol: true
        },
        pc_bakery_apple_cider: {
            name: '苹果酒', ingredients: ['apple', 'sugar'], minutes: 60, price: 300,
            difficulty: 2, icon: 'pcb-apple-cider.png', index: 164, alcohol: true
        },
        pc_bakery_sangria: {
            name: '桑格利亚', ingredients: ['red_wine', 'apple', 'peach'], minutes: 10, price: 1000,
            difficulty: 3, icon: 'pcb-sangria.png', index: 165, alcohol: true
        },
        pc_bakery_shandy: {
            name: '香蒂啤酒', ingredients: ['pc_bakery_beer', 'lemonade'], minutes: 5, price: 650,
            difficulty: 2, icon: 'pcb-shandy.png', index: 166, alcohol: true
        }
    };
    const keys = Object.keys(drinks);

    function register() {
        const modern = !!setup.foodstuff;
        const catalog = modern ? setup.foodstuff : setup.plants;
        if (!catalog) return;
        for (const [key, config] of Object.entries(drinks)) {
            if (catalog[key] || !config.ingredients.every(ingredient => !!catalog[ingredient])) continue;
            const tags = [config.milk ? 'vegetarian' : 'vegan', 'drink'];
            if (config.alcohol) tags.push('alcohol');
            if (modern) {
                catalog[key] = {
                    index: config.index, name: config.name, singular: config.name,
                    plural: config.name, icon: config.icon, category: 'dish',
                    kitchen_item_type_icon: 'recipe-food.png', prop_folder: 'drink',
                    shop: { sell_price: config.price },
                    recipe: {
                        recipe_name: config.name, difficulty: config.difficulty,
                        cook_minutes: config.minutes, servings: 1,
                        ingredients: config.ingredients.slice(), tags: []
                    },
                    food: { tags }
                };
            } else {
                catalog[key] = {
                    index: config.index, name: key, recipe_name: config.name,
                    singular: config.name, plural: config.name,
                    plant_cost: config.price, difficulty: config.difficulty,
                    bed: 'kitchen', type: 'food', days: config.minutes,
                    multiplier: 1, special: tags, season: [],
                    ingredients: config.ingredients.slice(), icon: config.icon
                };
            }
        }
    }

    function ensureSave() {
        const v = State?.variables;
        if (!v || v.pcBakeryCropsRemoved) return;
        const inventory = v.foodstuff || v.plants;
        const catalog = v.foodstuff ? setup.foodstuff : setup.plants;
        if (!inventory || !catalog) return;
        for (const key of keys) {
            if (!catalog[key] || inventory[key]) continue;
            inventory[key] = v.foodstuff ? { amount: 0 } : {
                name: key, plural: catalog[key].plural, amount: 0
            };
        }
    }

    function cleanup() {
        const v = State.variables;
        const inventory = v.foodstuff || v.plants || {};
        const keySet = new Set(keys);
        let items = 0;
        for (const key of keys) {
            items += Number(inventory[key]?.amount) || 0;
            delete inventory[key];
        }
        for (const name of ['foodstuff_stall', 'plants_stall', 'foodstuff_inventory', 'plant_inventory']) {
            if (Array.isArray(v[name])) v[name] = v[name].filter(key => !keySet.has(key));
        }
        for (const name of ['stall_foodstuff', 'stall_plant', 'stall_expensive']) {
            if (keySet.has(v[name])) delete v[name];
        }
        return items;
    }

    setup.pcBakeryDrinks = { register, ensureSave, cleanup, keys };
    $(document).on(':passagestart.pcBakeryDrinks', () => { register(); ensureSave(); });
})();
