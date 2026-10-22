/* Standard food definitions extracted from the SHA256-pinned DoL 0.5.12.13.
   Used only when no runtime catalog is available; never supplies inventory or unlocks. */
setup.pcBakeryFoodBaseline = {
  "apple": {
    "index": 8,
    "name": "apple",
    "singular": "苹果",
    "plural": "苹果",
    "icon": "apple.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 28,
      "regrow_days": 7,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 50
    },
    "is_fishing_bait": true
  },
  "apple_crumble": {
    "index": 114,
    "name": "apple crumble",
    "singular": "苹果酥",
    "plural": "苹果酥",
    "icon": "apple-crumble.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 700
    },
    "recipe": {
      "recipe_name": "apple crumble",
      "difficulty": 2,
      "cook_minutes": 35,
      "servings": 1,
      "ingredients": [
        "apple",
        "sugar",
        "flour",
        "butter",
        "oats",
        "cream"
      ],
      "ingredients_cn": [
        "苹果",
        "糖",
        "面粉",
        "黄油",
        "燕麦",
        "奶油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "sweet"
      ]
    }
  },
  "apple_strudel": {
    "index": 94,
    "name": "apple strudel",
    "singular": "苹果卷",
    "plural": "苹果卷",
    "icon": "apple-strudel.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1200
    },
    "recipe": {
      "recipe_name": "apple strudels",
      "difficulty": 2,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "pastry",
        "apple",
        "sugar",
        "honey",
        "butter"
      ],
      "ingredients_cn": [
        "酥皮",
        "苹果",
        "糖",
        "蜂蜜",
        "黄油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "arancini": {
    "index": 136,
    "name": "arancini",
    "singular": "意式炸饭球",
    "plural": "意式炸饭球",
    "icon": "arancini.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1400
    },
    "recipe": {
      "recipe_name": "arancini",
      "difficulty": 3,
      "cook_minutes": 40,
      "servings": 4,
      "ingredients": [
        "vegetable_oil",
        "butter",
        "onion",
        "rice",
        "garlic_bulb",
        "white_wine",
        "cheese",
        "lemon",
        "flour",
        "chicken_egg",
        "truffle"
      ],
      "ingredients_cn": [
        "植物油",
        "黄油",
        "洋葱",
        "米",
        "大蒜",
        "白葡萄酒",
        "芝士",
        "柠檬",
        "面粉",
        "鸡蛋",
        "松露"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "baby_bottle_of_breast_milk": {
    "index": 37,
    "name": "baby bottle of breast milk",
    "singular": "小瓶装母乳",
    "plural": "小瓶装母乳",
    "icon": "babybottle.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": false,
      "tags": []
    },
    "shop": {
      "sell_price": 200
    }
  },
  "bacon": {
    "index": 59,
    "name": "bacon",
    "singular": "培根薄片",
    "plural": "培根薄片",
    "icon": "bacon.png",
    "category": "meat",
    "category_cn": "肉食",
    "kitchen_item_type_icon": "recipe-meat.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 200,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "bait_worm": {
    "index": 165,
    "name": "bait worm",
    "singular": "饵虫",
    "plural": "饵虫",
    "icon": "bait-worm.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "is_fishing_bait": true,
    "shop": {
      "sell_price": 0
    }
  },
  "baitfish": {
    "index": 164,
    "name": "baitfish",
    "singular": "饵鱼",
    "plural": "饵鱼",
    "icon": "baitfish.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "is_fishing_bait": true,
    "shop": {
      "sell_price": 0
    }
  },
  "bakewell_tart": {
    "index": 115,
    "name": "Bakewell tart",
    "singular": "杏仁果酱挞",
    "plural": "杏仁果酱挞",
    "icon": "bakewell-tart.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1200
    },
    "recipe": {
      "recipe_name": "Bakewell tarts",
      "difficulty": 3,
      "cook_minutes": 35,
      "servings": 1,
      "ingredients": [
        "shortbread",
        "cream",
        "cherry"
      ],
      "ingredients_cn": [
        "黄油酥饼",
        "奶油",
        "樱桃"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "sweet"
      ]
    }
  },
  "banana": {
    "index": 10,
    "name": "banana",
    "singular": "香蕉",
    "plural": "香蕉",
    "icon": "banana.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 32,
      "regrow_days": 7,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 100,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "banana_bread": {
    "index": 128,
    "name": "banana bread",
    "singular": "香蕉面包",
    "plural": "香蕉面包",
    "icon": "banana-bread.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 500
    },
    "recipe": {
      "recipe_name": "banana bread",
      "difficulty": 2,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "butter",
        "sugar",
        "chicken_egg",
        "flour",
        "banana"
      ],
      "ingredients_cn": [
        "黄油",
        "糖",
        "鸡蛋",
        "面粉",
        "香蕉"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "is_fishing_bait": true
  },
  "bangers_and_mash": {
    "index": 121,
    "name": "bangers and mash",
    "singular": "土豆泥和香肠",
    "plural": "土豆泥和香肠",
    "icon": "bangers-and-mash.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "bangers and mash",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "vegetable_oil",
        "sausage",
        "butter",
        "bottle_of_milk",
        "potato"
      ],
      "ingredients_cn": [
        "植物油",
        "香肠",
        "黄油",
        "牛奶",
        "土豆"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "bass": {
    "index": 156,
    "name": "bass",
    "singular": "海鲈",
    "plural": "海鲈",
    "icon": "bass.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 800
    }
  },
  "beef": {
    "index": 139,
    "name": "beef",
    "singular": "牛肉",
    "plural": "牛肉",
    "icon": "beef.png",
    "category": "meat",
    "category_cn": "肉食",
    "kitchen_item_type_icon": "recipe-meat.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 1000,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "beef_wellington": {
    "index": 75,
    "name": "beef wellington",
    "singular": "惠灵顿牛肉",
    "plural": "惠灵顿牛肉",
    "icon": "beef-wellington.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1800
    },
    "recipe": {
      "recipe_name": "beef wellington",
      "difficulty": 4,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients": [
        "beef",
        "onion",
        "pastry",
        "chicken_egg",
        "salt",
        "mushroom"
      ],
      "ingredients_cn": [
        "牛肉",
        "洋葱",
        "油酥面皮",
        "鸡蛋",
        "盐",
        "蘑菇"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "belgian_bun": {
    "index": 109,
    "name": "belgian bun",
    "singular": "比利时小圆面包",
    "plural": "比利时小圆面包",
    "icon": "belgian-bun.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 600
    },
    "recipe": {
      "recipe_name": "Belgian buns",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 10,
      "ingredients": [
        "flour",
        "sugar",
        "bottle_of_milk",
        "chicken_egg",
        "lemon",
        "cherry"
      ],
      "ingredients_cn": [
        "面粉",
        "糖",
        "牛奶",
        "鸡蛋",
        "柠檬",
        "樱桃"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "sweet"
      ]
    }
  },
  "bird_egg": {
    "index": 36,
    "name": "bird egg",
    "singular": "鸟蛋",
    "plural": "鸟蛋",
    "icon": "bird-egg.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "shop": {
      "sell_price": 200
    }
  },
  "blackberry": {
    "index": 34,
    "name": "blackberry",
    "singular": "黑莓",
    "plural": "黑莓",
    "icon": "blackberry.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_shrub",
      "growth_days": 16,
      "regrow_days": 3,
      "yield_multiplier": 4,
      "has_seeds": true,
      "seasons": [
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 7,
      "stall_size": "small"
    },
    "is_fishing_bait": true
  },
  "blood_lemon": {
    "index": 12,
    "name": "blood lemon",
    "singular": "血柠",
    "plural": "血柠",
    "icon": "blood-lemon.gif",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 30,
      "regrow_days": 8,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 400
    },
    "food": {
      "tags": [
        "aphrodisiac"
      ]
    },
    "is_fishing_bait": true
  },
  "bottle_of_breast_milk": {
    "index": 28,
    "name": "bottle of breast milk",
    "singular": "瓶装母乳",
    "plural": "瓶装母乳",
    "icon": "breastmilk.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "shop": {
      "sell_price": 3000,
      "stall_size": "large"
    }
  },
  "bottle_of_milk": {
    "index": 26,
    "name": "bottle of milk",
    "singular": "瓶装牛奶",
    "plural": "瓶装牛奶",
    "icon": "milk.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "ingredient_alternatives": {
      "normal": [],
      "lewd": [
        "baby_bottle_of_breast_milk"
      ]
    },
    "tending": {
      "affected_by_tending_skill": false,
      "tags": []
    },
    "shop": {
      "sell_price": 100
    }
  },
  "bottle_of_semen": {
    "index": 29,
    "name": "bottle of semen",
    "singular": "瓶装精液",
    "plural": "瓶装精液",
    "icon": "semenbottle.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": false,
      "tags": []
    },
    "shop": {
      "sell_price": 3000,
      "stall_size": "large"
    }
  },
  "bread": {
    "index": 40,
    "name": "bread",
    "singular": "面包",
    "plural": "面包",
    "icon": "bread.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "is_fishing_bait": true,
    "recipe": {
      "recipe_name": "bread",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 1,
      "ingredients": [
        "flour",
        "salt",
        "vegetable_oil"
      ],
      "ingredients_cn": [
        "面粉",
        "盐",
        "植物油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    }
  },
  "broccoli": {
    "index": 32,
    "name": "broccoli",
    "singular": "西兰花",
    "plural": "西兰花",
    "icon": "broccoli.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 10,
      "yield_multiplier": 3,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 100
    }
  },
  "brownie": {
    "index": 101,
    "name": "brownie",
    "singular": "布朗尼",
    "plural": "布朗尼",
    "icon": "brownie.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 500
    },
    "recipe": {
      "recipe_name": "brownies",
      "difficulty": 2,
      "cook_minutes": 50,
      "servings": 4,
      "ingredients": [
        "butter",
        "flour",
        "chocolate",
        "chicken_egg",
        "salt"
      ],
      "ingredients_cn": [
        "黄油",
        "面粉",
        "巧克力",
        "鸡蛋",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "butter": {
    "index": 55,
    "name": "butter",
    "singular": "黄油",
    "plural": "黄油",
    "icon": "butter.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 10
    },
    "recipe": {
      "recipe_name": "butter",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 10,
      "ingredients": [
        "bottle_of_milk"
      ],
      "ingredients_cn": [
        "牛奶"
      ],
      "tags": []
    }
  },
  "cabbage": {
    "index": 30,
    "name": "cabbage",
    "singular": "卷心菜",
    "plural": "卷心菜",
    "icon": "cabbage.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 8,
      "yield_multiplier": 3,
      "has_seeds": true,
      "seasons": [
        "spring",
        "winter"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 90
    }
  },
  "carbonara": {
    "index": 85,
    "name": "carbonara",
    "singular": "奶油培根意大利面",
    "plural": "奶油培根意大利面",
    "icon": "carbonara.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1200
    },
    "recipe": {
      "recipe_name": "carbonara",
      "difficulty": 3,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "pasta",
        "cheese",
        "flour",
        "bottle_of_milk",
        "pork"
      ],
      "ingredients_cn": [
        "意大利面",
        "芝士",
        "面粉",
        "牛奶",
        "猪肉"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "carnation": {
    "index": 35,
    "name": "carnation",
    "singular": "康乃馨",
    "plural": "康乃馨",
    "icon": "carnation.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 3,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "autumn"
      ],
      "tags": [],
      "featCost": 20
    },
    "shop": {
      "sell_price": 200
    }
  },
  "carrot_cake": {
    "index": 102,
    "name": "carrot cake",
    "singular": "胡萝卜蛋糕",
    "plural": "胡萝卜蛋糕",
    "icon": "carrot-cake.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 800
    },
    "recipe": {
      "recipe_name": "carrot cake",
      "difficulty": 2,
      "cook_minutes": 50,
      "servings": 1,
      "ingredients": [
        "wild_carrot",
        "sugar",
        "chicken_egg",
        "vegetable_oil",
        "flour",
        "lemon",
        "cream",
        "butter"
      ],
      "ingredients_cn": [
        "野生胡萝卜",
        "糖",
        "鸡蛋",
        "植物油",
        "面粉",
        "柠檬",
        "奶油",
        "黄油"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "cauliflower": {
    "index": 141,
    "name": "cauliflower",
    "singular": "花椰菜",
    "plural": "花椰菜",
    "icon": "cauliflower.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 30,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn",
        "winter"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 400
    }
  },
  "cauliflower_cheese": {
    "index": 49,
    "name": "cauliflower cheese",
    "singular": "奶酪花椰菜",
    "plural": "奶酪花椰菜",
    "icon": "cauliflower-cheese.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "cauliflower cheese",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "cauliflower",
        "cheese",
        "garlic_bulb",
        "bottle_of_milk"
      ],
      "ingredients_cn": [
        "花椰菜",
        "芝士",
        "大蒜",
        "牛奶"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "cheese": {
    "index": 46,
    "name": "cheese",
    "singular": "芝士",
    "plural": "芝士",
    "icon": "cheese.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 500
    },
    "recipe": {
      "recipe_name": "cheese",
      "difficulty": 1,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients": [
        "bottle_of_milk"
      ],
      "ingredients_cn": [
        "牛奶"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian"
      ]
    }
  },
  "cheese_and_crackers": {
    "index": 120,
    "name": "cheese and crackers",
    "singular": "芝士与饼干",
    "plural": "芝士与饼干",
    "icon": "cheese-and-crackers.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 800
    },
    "recipe": {
      "recipe_name": "cheese and crackers",
      "difficulty": 1,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "flour",
        "salt",
        "sugar",
        "vegetable_oil",
        "cheese"
      ],
      "ingredients_cn": [
        "面粉",
        "盐",
        "糖",
        "植物油",
        "芝士"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "cheese_topped_trout": {
    "index": 80,
    "name": "cheese topped trout",
    "singular": "芝士鳟鱼",
    "plural": "芝士鳟鱼",
    "icon": "cheese-topped-trout.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1600
    },
    "recipe": {
      "recipe_name": "cheese topped trout",
      "difficulty": 3,
      "cook_minutes": 20,
      "servings": 1,
      "ingredients": [
        "trout",
        "bread",
        "cheese",
        "vegetable_oil",
        "butter",
        "lemon"
      ],
      "ingredients_cn": [
        "鳟鱼",
        "面包",
        "芝士",
        "植物油",
        "黄油",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    }
  },
  "cheeseburger": {
    "index": 78,
    "name": "cheeseburger",
    "singular": "芝士汉堡",
    "plural": "芝士汉堡",
    "icon": "cheeseburger.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 800
    },
    "recipe": {
      "recipe_name": "cheeseburgers",
      "difficulty": 2,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "beef",
        "bread",
        "onion",
        "tomato",
        "cheese"
      ],
      "ingredients_cn": [
        "牛肉",
        "面包",
        "洋葱",
        "番茄",
        "芝士"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "chelsea_bun": {
    "index": 53,
    "name": "chelsea bun",
    "singular": "切尔西小圆面包",
    "plural": "切尔西小圆面包",
    "icon": "chelsea-bun.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 200
    },
    "recipe": {
      "recipe_name": "Chelsea buns",
      "difficulty": 2,
      "cook_minutes": 60,
      "servings": 4,
      "ingredients": [
        "flour",
        "salt",
        "butter",
        "sugar",
        "bottle_of_milk",
        "honey"
      ],
      "ingredients_cn": [
        "面粉",
        "盐",
        "黄油",
        "糖",
        "牛奶",
        "蜂蜜"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "cherry": {
    "index": 108,
    "name": "cherry",
    "singular": "樱桃",
    "plural": "樱桃",
    "icon": "cherry.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 25,
      "regrow_days": 6,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer"
      ]
    },
    "shop": {
      "sell_price": 20,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "chicken": {
    "index": 69,
    "name": "chicken",
    "singular": "鸡肉",
    "plural": "鸡肉",
    "icon": "chicken.png",
    "category": "meat",
    "category_cn": "肉食",
    "kitchen_item_type_icon": "recipe-meat.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 300,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "chicken_egg": {
    "index": 27,
    "name": "chicken egg",
    "singular": "鸡蛋",
    "plural": "鸡蛋",
    "icon": "egg.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "ingredient_alternatives": {
      "normal": [
        "bird_egg"
      ],
      "lewd": []
    },
    "tending": {
      "affected_by_tending_skill": false,
      "tags": []
    },
    "shop": {
      "sell_price": 40
    }
  },
  "chicken_tikka_masala": {
    "index": 86,
    "name": "chicken tikka masala",
    "singular": "鸡肉提卡",
    "plural": "鸡肉提卡",
    "icon": "chicken-tikka-masala.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1700
    },
    "recipe": {
      "recipe_name": "chicken tikka masala",
      "difficulty": 3,
      "cook_minutes": 45,
      "servings": 1,
      "ingredients": [
        "chicken",
        "vegetable_oil",
        "onion",
        "garlic_bulb",
        "tomato",
        "butter",
        "lemon",
        "naan_bread",
        "rice"
      ],
      "ingredients_cn": [
        "鸡肉",
        "植物油",
        "洋葱",
        "大蒜",
        "番茄",
        "黄油",
        "柠檬",
        "馕饼",
        "米"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    }
  },
  "chicken_vindaloo": {
    "index": 106,
    "name": "chicken vindaloo",
    "singular": "温达卢辣鸡肉咖喱",
    "plural": "温达卢辣鸡肉咖喱",
    "icon": "chicken-vindaloo.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1800
    },
    "recipe": {
      "recipe_name": "chicken vindaloo",
      "difficulty": 3,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "chicken",
        "vegetable_oil",
        "chilli_pepper",
        "onion",
        "tomato",
        "lemon",
        "garlic_bulb",
        "naan_bread",
        "rice"
      ],
      "ingredients_cn": [
        "鸡肉",
        "植物油",
        "辣椒",
        "洋葱",
        "番茄",
        "柠檬",
        "大蒜",
        "馕饼",
        "米"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    }
  },
  "chilli_con_carne": {
    "index": 87,
    "name": "chilli con carne",
    "singular": "墨西哥辣肉酱",
    "plural": "墨西哥辣肉酱",
    "icon": "chilli-con-carne.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1300
    },
    "recipe": {
      "recipe_name": "chilli con carne",
      "difficulty": 3,
      "cook_minutes": 45,
      "servings": 1,
      "ingredients": [
        "beef",
        "vegetable_oil",
        "onion",
        "garlic_bulb",
        "tomato",
        "chilli_pepper"
      ],
      "ingredients_cn": [
        "牛肉",
        "植物油",
        "洋葱",
        "大蒜",
        "番茄",
        "辣椒"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    }
  },
  "chilli_pepper": {
    "index": 66,
    "name": "chilli pepper",
    "singular": "辣椒",
    "plural": "辣椒",
    "icon": "chilli-pepper.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "ingredient",
    "tending": {
      "planting_bed": "earth",
      "growth_days": 22,
      "yield_multiplier": 6,
      "has_seeds": true,
      "seasons": [
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 80
    },
    "is_fishing_bait": true
  },
  "chips": {
    "index": 79,
    "name": "chips",
    "singular": "薯条",
    "plural": "薯条",
    "icon": "chips.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 400
    },
    "recipe": {
      "recipe_name": "chips",
      "difficulty": 2,
      "cook_minutes": 20,
      "servings": 1,
      "ingredients": [
        "potato",
        "vegetable_oil",
        "salt"
      ],
      "ingredients_cn": [
        "土豆",
        "植物油",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    }
  },
  "choc_chip_cookie": {
    "index": 91,
    "name": "choc chip cookie",
    "singular": "巧克力曲奇",
    "plural": "巧克力曲奇",
    "icon": "choc-chip-cookie.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "chocolate chip cookies",
      "difficulty": 1,
      "cook_minutes": 15,
      "servings": 10,
      "ingredients": [
        "butter",
        "flour",
        "sugar",
        "chicken_egg",
        "chocolate"
      ],
      "ingredients_cn": [
        "黄油",
        "面粉",
        "糖",
        "鸡蛋",
        "巧克力"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "chocolate": {
    "index": 93,
    "name": "chocolate",
    "singular": "巧克力",
    "plural": "巧克力",
    "icon": "chocolate.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 700
    },
    "recipe": {
      "recipe_name": "chocolate",
      "difficulty": 1,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "butter",
        "bottle_of_milk",
        "cocoa_powder"
      ],
      "ingredients_cn": [
        "黄油",
        "牛奶",
        "可可粉"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "chub": {
    "index": 159,
    "name": "chub",
    "singular": "雅罗鱼",
    "plural": "雅罗鱼",
    "icon": "chub.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 150
    }
  },
  "clam": {
    "index": 118,
    "name": "clam",
    "singular": "蛤蜊",
    "plural": "蛤蜊",
    "icon": "clam.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 400,
      "available_in": [
        "supermarket"
      ]
    }
  },
  "clam_chowder": {
    "index": 119,
    "name": "clam chowder",
    "singular": "蛤蜊浓汤",
    "plural": "蛤蜊浓汤",
    "icon": "clam-chowder.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1300
    },
    "recipe": {
      "recipe_name": "clam chowder",
      "difficulty": 3,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "clam",
        "butter",
        "bacon",
        "onion",
        "flour",
        "bottle_of_milk",
        "cream",
        "potato"
      ],
      "ingredients_cn": [
        "蛤蜊",
        "黄油",
        "培根",
        "洋葱",
        "面粉",
        "牛奶",
        "奶油",
        "土豆"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    }
  },
  "cocoa_powder": {
    "index": 92,
    "name": "cocoa powder",
    "singular": "杯装可可粉",
    "plural": "杯装可可粉",
    "icon": "cocoa-powder.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 200,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 5
    }
  },
  "cod": {
    "index": 116,
    "name": "cod",
    "singular": "鳕鱼",
    "plural": "鳕鱼",
    "icon": "cod.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 700,
      "available_in": []
    }
  },
  "cream": {
    "index": 52,
    "name": "cream",
    "singular": "奶油",
    "plural": "奶油",
    "icon": "cream.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "ingredient_alternatives": {
      "normal": [],
      "lewd": [
        "bottle_of_semen"
      ]
    },
    "shop": {
      "sell_price": 100
    }
  },
  "creme_brulee": {
    "index": 103,
    "name": "crème brûlée",
    "singular": "焦糖布丁罐",
    "plural": "烤布蕾",
    "icon": "creme-brulee.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 600
    },
    "recipe": {
      "recipe_name": "crème brûlée",
      "difficulty": 2,
      "cook_minutes": 50,
      "servings": 1,
      "ingredients": [
        "bottle_of_milk",
        "cream",
        "sugar",
        "chicken_egg"
      ],
      "ingredients_cn": [
        "牛奶",
        "奶油",
        "糖",
        "鸡蛋"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "crumpet": {
    "index": 125,
    "name": "crumpet",
    "singular": "松脆饼",
    "plural": "松脆饼",
    "icon": "crumpet.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "crumpets",
      "difficulty": 2,
      "cook_minutes": 20,
      "servings": 5,
      "ingredients": [
        "flour",
        "butter",
        "salt",
        "sugar"
      ],
      "ingredients_cn": [
        "面粉",
        "黄油",
        "盐",
        "糖"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "daisy": {
    "index": 3,
    "name": "daisy",
    "singular": "雏菊",
    "plural": "雏菊",
    "icon": "daisy.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 7,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 1
    },
    "shop": {
      "sell_price": 150
    }
  },
  "date": {
    "index": 104,
    "name": "date",
    "singular": "椰枣",
    "plural": "椰枣",
    "icon": "date.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 40,
      "regrow_days": 8,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 50,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "eel": {
    "index": 162,
    "name": "eel",
    "singular": "鳗鱼",
    "plural": "鳗鱼",
    "icon": "eel.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 700
    }
  },
  "fish_and_chips": {
    "index": 117,
    "name": "fish and chips",
    "singular": "炸鱼薯条",
    "plural": "炸鱼薯条",
    "icon": "fish-and-chips.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1400
    },
    "recipe": {
      "recipe_name": "fish and chips",
      "difficulty": 2,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "cod",
        "chips",
        "vegetable_oil",
        "flour"
      ],
      "ingredients_cn": [
        "鳕鱼",
        "薯条",
        "植物油",
        "面粉"
      ],
      "ingredient_alternatives": {
        "normal": {
          "cod": [
            "haddock",
            "whiting",
            "flounder",
            "bass",
            "perch",
            "pike"
          ]
        },
        "lewd": {}
      },
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    }
  },
  "flapjack": {
    "index": 107,
    "name": "flapjack",
    "singular": "燕麦小方",
    "plural": "燕麦小方",
    "icon": "flapjack.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "flapjack squares",
      "difficulty": 2,
      "cook_minutes": 25,
      "servings": 6,
      "ingredients": [
        "butter",
        "sugar",
        "oats",
        "lemon"
      ],
      "ingredients_cn": [
        "黄油",
        "糖",
        "燕麦",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "flounder": {
    "index": 155,
    "name": "flounder",
    "singular": "比目鱼",
    "plural": "比目鱼",
    "icon": "flounder.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 400
    }
  },
  "flour": {
    "index": 41,
    "name": "flour",
    "singular": "面粉",
    "plural": "面粉",
    "icon": "flour.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 10
    },
    "recipe": {
      "recipe_name": "flour",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 10,
      "ingredients": [
        "wheat"
      ],
      "ingredients_cn": [
        "小麦"
      ],
      "tags": []
    }
  },
  "full_english_breakfast": {
    "index": 113,
    "name": "full english breakfast",
    "singular": "英式早餐",
    "plural": "英式早餐",
    "icon": "full-english-breakfast.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 900
    },
    "recipe": {
      "recipe_name": "Full English breakfast",
      "difficulty": 2,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "vegetable_oil",
        "bacon",
        "sausage",
        "mushroom",
        "tomato",
        "chicken_egg"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "garlic_bulb": {
    "index": 22,
    "name": "garlic bulb",
    "singular": "大蒜",
    "plural": "大蒜",
    "icon": "garlic.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 8,
      "yield_multiplier": 3,
      "has_seeds": true,
      "seasons": [
        "autumn"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 100
    },
    "is_fishing_bait": true
  },
  "ghostbrew": {
    "index": 138,
    "name": "ghostbrew",
    "singular": "幽灵菇酒",
    "plural": "幽灵菇酒",
    "icon": "ghostbrew.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "drink",
    "shop": {
      "sell_price": 3000
    },
    "recipe": {
      "recipe_name": "ghostbrew",
      "difficulty": 5,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients": [
        "ghostshroom",
        "white_wine",
        "strange_flower"
      ],
      "ingredients_cn": [
        "幽灵菇",
        "白葡萄酒",
        "诡异的"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "drink",
        "alcohol",
        "tainted"
      ]
    }
  },
  "ghostshroom": {
    "index": 33,
    "name": "ghostshroom",
    "singular": "幽灵菇",
    "plural": "幽灵菇",
    "icon": "ghostshroom.png",
    "category": "mushroom",
    "category_cn": "蘑菇",
    "kitchen_item_type_icon": "recipe-shroom.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 200
    }
  },
  "grayling": {
    "index": 163,
    "name": "grayling",
    "singular": "茴鱼",
    "plural": "茴鱼",
    "icon": "grayling.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 900
    }
  },
  "haddock": {
    "index": 73,
    "name": "haddock",
    "singular": "黑线鳕鱼",
    "plural": "黑线鳕鱼",
    "icon": "haddock.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    }
  },
  "hamburger": {
    "index": 77,
    "name": "hamburger",
    "singular": "汉堡",
    "plural": "汉堡",
    "icon": "burger.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 600
    },
    "recipe": {
      "recipe_name": "hamburgers",
      "difficulty": 1,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "beef",
        "bread",
        "onion",
        "tomato"
      ],
      "ingredients_cn": [
        "牛肉",
        "面包",
        "洋葱",
        "番茄"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "herring": {
    "index": 152,
    "name": "herring",
    "singular": "鲱鱼",
    "plural": "鲱鱼",
    "icon": "herring.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 150
    }
  },
  "honey": {
    "index": 54,
    "name": "honey",
    "singular": "蜂蜜",
    "plural": "蜂蜜",
    "icon": "honey.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 10
    },
    "recipe": {
      "recipe_name": "honey",
      "difficulty": 1,
      "cook_minutes": 60,
      "servings": 1200,
      "ingredients": [
        "wild_honeycomb"
      ],
      "ingredients_cn": [
        "野生蜂巢"
      ],
      "tags": []
    }
  },
  "honeyed_pork": {
    "index": 74,
    "name": "honeyed pork",
    "singular": "蜜汁猪肉",
    "plural": "蜜汁猪肉",
    "icon": "honeyed-pork.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1100
    },
    "recipe": {
      "recipe_name": "honeyed pork",
      "difficulty": 2,
      "cook_minutes": 45,
      "servings": 1,
      "ingredients": [
        "pork",
        "salt",
        "honey",
        "chicken_egg"
      ],
      "ingredients_cn": [
        "猪肉",
        "盐",
        "蜂蜜",
        "鸡蛋"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "carnivore"
      ]
    }
  },
  "jam": {
    "index": 95,
    "name": "jam",
    "singular": "杯装果酱",
    "plural": "杯装果酱",
    "icon": "jam.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 200
    },
    "recipe": {
      "recipe_name": "jam",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 1,
      "ingredients": [
        "strawberry",
        "sugar"
      ],
      "ingredients_cn": [
        "草莓",
        "糖"
      ],
      "tags": []
    }
  },
  "jammie_dodger": {
    "index": 94,
    "name": "jammie dodger",
    "singular": "果酱夹心饼干",
    "plural": "果酱夹心饼干",
    "icon": "jammie-dodger.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 80
    },
    "recipe": {
      "recipe_name": "jammie dodgers",
      "difficulty": 1,
      "cook_minutes": 10,
      "servings": 5,
      "ingredients": [
        "flour",
        "sugar",
        "butter",
        "chicken_egg",
        "jam"
      ],
      "ingredients_cn": [
        "面粉",
        "糖",
        "黄油",
        "鸡蛋",
        "果酱"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "kedgeree": {
    "index": 71,
    "name": "kedgeree",
    "singular": "鱼蛋烩饭",
    "plural": "鱼蛋烩饭",
    "icon": "kedgeree.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1600
    },
    "recipe": {
      "recipe_name": "kedgeree",
      "difficulty": 3,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "haddock",
        "rice",
        "chicken_egg",
        "butter",
        "vegetable_oil",
        "lemon",
        "cream"
      ],
      "ingredients_cn": [
        "黑线鳕鱼",
        "米",
        "鸡蛋",
        "黄油",
        "植物油",
        "柠檬",
        "奶油"
      ],
      "ingredient_alternatives": {
        "normal": {
          "haddock": [
            "cod",
            "herring",
            "mackerel",
            "salmon",
            "trout",
            "whiting",
            "eel"
          ]
        },
        "lewd": {}
      },
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    }
  },
  "lasagne": {
    "index": 84,
    "name": "lasagne",
    "singular": "千层面",
    "plural": "千层面",
    "icon": "lasagne.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1400
    },
    "recipe": {
      "recipe_name": "lasagne",
      "difficulty": 3,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "pasta",
        "beef",
        "cheese",
        "flour",
        "garlic_bulb",
        "tomato"
      ],
      "ingredients_cn": [
        "意大利面",
        "牛肉",
        "芝士",
        "面粉",
        "大蒜",
        "番茄"
      ],
      "ingredient_alternatives": {
        "normal": {
          "beef": [
            "chicken"
          ]
        },
        "lewd": {}
      },
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "lemon": {
    "index": 11,
    "name": "lemon",
    "singular": "柠檬",
    "plural": "柠檬",
    "icon": "lemon.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 28,
      "regrow_days": 7,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 120
    },
    "is_fishing_bait": true
  },
  "lemon_meringue_pie": {
    "index": 97,
    "name": "lemon meringue pie",
    "singular": "柠檬酥皮派",
    "plural": "柠檬酥皮派",
    "icon": "lemon-meringue-pie.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1100
    },
    "recipe": {
      "recipe_name": "lemon meringue pie",
      "difficulty": 3,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "pastry",
        "lemon",
        "sugar",
        "butter",
        "chicken_egg"
      ],
      "ingredients_cn": [
        "酥皮",
        "柠檬",
        "糖",
        "黄油",
        "鸡蛋"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "lemonade": {
    "index": 127,
    "name": "lemonade",
    "singular": "杯装柠檬水",
    "plural": "杯装柠檬水",
    "icon": "lemonade.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "drink",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "lemonade",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 2,
      "ingredients": [
        "lemon",
        "sugar"
      ],
      "ingredients_cn": [
        "柠檬",
        "糖"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "drink"
      ]
    }
  },
  "lily": {
    "index": 6,
    "name": "lily",
    "singular": "百合",
    "plural": "百合",
    "icon": "lily.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 10,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 200
    }
  },
  "lime": {
    "index": 110,
    "name": "lime",
    "singular": "酸橙",
    "plural": "酸橙",
    "icon": "lime.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 25,
      "regrow_days": 7,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 250,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "linguine": {
    "index": 111,
    "name": "linguine",
    "singular": "扁意面",
    "plural": "扁意面",
    "icon": "linguine.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 700
    },
    "recipe": {
      "recipe_name": "linguine",
      "difficulty": 3,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "vegetable_oil",
        "lemon",
        "pasta",
        "cream"
      ],
      "ingredients_cn": [
        "植物油",
        "柠檬",
        "意大利面",
        "奶油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "lotus": {
    "index": 5,
    "name": "lotus",
    "singular": "睡莲",
    "plural": "睡莲",
    "icon": "lotus.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "water",
      "growth_days": 5,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn",
        "winter"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 300
    }
  },
  "macaroni_cheese": {
    "index": 47,
    "name": "macaroni cheese",
    "singular": "奶酪通心粉",
    "plural": "奶酪通心粉",
    "icon": "macaroni-cheese.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 800
    },
    "recipe": {
      "recipe_name": "macaroni and cheese",
      "difficulty": 2,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "bottle_of_milk",
        "cheese",
        "flour",
        "pasta",
        "salt"
      ],
      "ingredients_cn": [
        "牛奶",
        "芝士",
        "面粉",
        "意大利面",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "mackerel": {
    "index": 154,
    "name": "mackerel",
    "singular": "鲭鱼",
    "plural": "鲭鱼",
    "icon": "mackerel.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 200
    }
  },
  "melting_moment": {
    "index": 90,
    "name": "melting moment",
    "singular": "入口即化饼干",
    "plural": "入口即化饼干",
    "icon": "melting-moment.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 80
    },
    "recipe": {
      "recipe_name": "melting moments",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 5,
      "ingredients": [
        "butter",
        "flour",
        "sugar",
        "jam"
      ],
      "ingredients_cn": [
        "黄油",
        "面粉",
        "糖",
        "果酱"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "mince_pie": {
    "index": 60,
    "name": "mince pie",
    "singular": "百果馅饼",
    "plural": "百果馅饼",
    "icon": "mince-pie.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 400
    },
    "recipe": {
      "recipe_name": "mince pie",
      "difficulty": 2,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "pastry",
        "blackberry",
        "sugar"
      ],
      "ingredients_cn": [
        "酥皮",
        "黑莓",
        "糖"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "mushroom": {
    "index": 17,
    "name": "mushroom",
    "singular": "蘑菇",
    "plural": "普通蘑菇",
    "icon": "mushroom.png",
    "category": "mushroom",
    "category_cn": "蘑菇",
    "kitchen_item_type_icon": "recipe-shroom.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 100
    }
  },
  "naan_bread": {
    "index": 56,
    "name": "naan bread",
    "singular": "馕饼",
    "plural": "馕饼",
    "icon": "naan-bread.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 200
    },
    "recipe": {
      "recipe_name": "naan bread",
      "difficulty": 2,
      "cook_minutes": 20,
      "servings": 1,
      "ingredients": [
        "bottle_of_milk",
        "flour",
        "vegetable_oil",
        "chicken_egg",
        "salt"
      ],
      "ingredients_cn": [
        "牛奶",
        "面粉",
        "植物油",
        "鸡蛋",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "oats": {
    "index": 142,
    "name": "oats",
    "singular": "杯装燕麦",
    "plural": "杯装燕麦",
    "icon": "oats.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 100,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 5
    }
  },
  "omelette": {
    "index": 144,
    "name": "omelette",
    "singular": "煎蛋卷",
    "plural": "煎蛋卷",
    "icon": "omelette.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 300
    },
    "recipe": {
      "recipe_name": "omelettes",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 1,
      "ingredients": [
        "chicken_egg",
        "vegetable_oil",
        "butter"
      ],
      "ingredients_cn": [
        "鸡蛋",
        "植物油",
        "黄油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "onion": {
    "index": 21,
    "name": "onion",
    "singular": "洋葱",
    "plural": "洋葱",
    "icon": "onion.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 12,
      "yield_multiplier": 3,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 120
    },
    "is_fishing_bait": true
  },
  "onion_bhaji": {
    "index": 65,
    "name": "onion bhaji",
    "singular": "洋葱巴哈吉",
    "plural": "洋葱巴哈吉",
    "icon": "onion-bhaji.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "onion bhajis",
      "difficulty": 2,
      "cook_minutes": 10,
      "servings": 4,
      "ingredients": [
        "flour",
        "onion",
        "chilli_pepper"
      ],
      "ingredients_cn": [
        "面粉",
        "洋葱",
        "辣椒"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "spicy"
      ]
    }
  },
  "orange": {
    "index": 9,
    "name": "orange",
    "singular": "橘子",
    "plural": "橙子",
    "icon": "orange.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 32,
      "regrow_days": 7,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 300,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "orange_juice": {
    "index": 126,
    "name": "orange juice",
    "singular": "杯装橙汁",
    "plural": "杯装橙汁",
    "icon": "orange-juice.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "drink",
    "shop": {
      "sell_price": 55
    },
    "recipe": {
      "recipe_name": "orange juice",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 2,
      "ingredients": [
        "orange",
        "sugar"
      ],
      "ingredients_cn": [
        "橘子",
        "糖"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "drink"
      ]
    }
  },
  "orchid": {
    "index": 2,
    "name": "orchid",
    "singular": "兰花",
    "plural": "兰花",
    "icon": "orchid.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 28,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "summer"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 500
    }
  },
  "oyster_pearl": {
    "index": 39,
    "name": "oyster pearl",
    "singular": "牡蛎珍珠",
    "plural": "牡蛎珍珠",
    "icon": "oyster-pearl.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "shop": {
      "sell_price": 50000,
      "stall_size": "large"
    }
  },
  "pasta": {
    "index": 48,
    "name": "pasta",
    "singular": "意大利面",
    "plural": "意大利面",
    "icon": "pasta.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 200
    },
    "recipe": {
      "recipe_name": "pasta",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 1,
      "ingredients": [
        "flour",
        "chicken_egg",
        "vegetable_oil",
        "salt"
      ],
      "ingredients_cn": [
        "面粉",
        "鸡蛋",
        "植物油",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "pastry": {
    "index": 57,
    "name": "pastry",
    "singular": "酥皮",
    "plural": "酥皮",
    "icon": "pastry.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 150
    },
    "recipe": {
      "recipe_name": "pastries",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 1,
      "ingredients": [
        "butter",
        "flour",
        "salt"
      ],
      "ingredients_cn": [
        "黄油",
        "面粉",
        "盐"
      ],
      "tags": []
    }
  },
  "peach": {
    "index": 15,
    "name": "peach",
    "singular": "桃子",
    "plural": "桃子",
    "icon": "peach.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 28,
      "regrow_days": 5,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer"
      ]
    },
    "shop": {
      "sell_price": 65
    },
    "is_fishing_bait": true
  },
  "peach_panzanella": {
    "index": 132,
    "name": "peach panzanella",
    "singular": "意式蜜桃沙拉",
    "plural": "意式蜜桃沙拉",
    "icon": "peach-panzanella.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 600
    },
    "recipe": {
      "recipe_name": "peach panzanella",
      "difficulty": 2,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "peach",
        "bread",
        "cheese",
        "vegetable_oil",
        "lemon"
      ],
      "ingredients_cn": [
        "桃子",
        "面包",
        "芝士",
        "植物油",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "pear": {
    "index": 13,
    "name": "pear",
    "singular": "梨",
    "plural": "梨",
    "icon": "pear.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 32,
      "regrow_days": 7,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 80
    },
    "is_fishing_bait": true
  },
  "pepper": {
    "index": 70,
    "name": "pepper",
    "singular": "灯笼椒",
    "plural": "灯笼椒",
    "icon": "pepper.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 15,
      "yield_multiplier": 4,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "winter"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 100
    },
    "is_fishing_bait": true
  },
  "perch": {
    "index": 158,
    "name": "perch",
    "singular": "河鲈",
    "plural": "河鲈",
    "icon": "perch.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 250
    }
  },
  "pike": {
    "index": 160,
    "name": "pike",
    "singular": "狗鱼",
    "plural": "狗鱼",
    "icon": "pike.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 800
    }
  },
  "pink_rose": {
    "index": 147,
    "name": "pink rose",
    "singular": "粉玫瑰",
    "plural": "粉玫瑰",
    "icon": "pink-rose.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 14,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": []
    },
    "shop": {
      "sell_price": 400
    }
  },
  "pizza": {
    "index": 44,
    "name": "pizza",
    "singular": "披萨",
    "plural": "披萨",
    "icon": "pizza.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1200
    },
    "recipe": {
      "recipe_name": "pizza",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "bread",
        "tomato",
        "garlic_bulb",
        "cheese"
      ],
      "ingredients_cn": [
        "面包",
        "番茄",
        "大蒜",
        "芝士"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian"
      ]
    }
  },
  "plum": {
    "index": 16,
    "name": "plum",
    "singular": "李子",
    "plural": "李子",
    "icon": "plum.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_tree",
      "growth_days": 28,
      "regrow_days": 5,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ]
    },
    "shop": {
      "sell_price": 80
    },
    "is_fishing_bait": true
  },
  "plum_pudding": {
    "index": 133,
    "name": "plum pudding",
    "singular": "李子布丁",
    "plural": "李子布丁",
    "icon": "plum-pudding.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1200
    },
    "recipe": {
      "recipe_name": "plum pudding",
      "difficulty": 3,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "plum",
        "flour",
        "bread",
        "sugar",
        "orange",
        "lemon",
        "cherry",
        "wild_carrot"
      ],
      "ingredients_cn": [
        "李子",
        "面粉",
        "面包",
        "糖",
        "橘子",
        "柠檬",
        "樱桃",
        "野生胡萝卜"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "plumeria": {
    "index": 38,
    "name": "plumeria",
    "singular": "鸡蛋花",
    "plural": "鸡蛋花",
    "icon": "plumeria.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 12,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 250
    }
  },
  "poached_pear": {
    "index": 131,
    "name": "poached pear",
    "singular": "蜜梨",
    "plural": "蜜梨",
    "icon": "poached-pear.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "poached pears",
      "difficulty": 3,
      "cook_minutes": 21,
      "servings": 1,
      "ingredients": [
        "pear",
        "sugar",
        "red_wine"
      ],
      "ingredients_cn": [
        "梨子",
        "糖",
        "红葡萄酒"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "alcohol",
        "sweet"
      ]
    }
  },
  "poppy": {
    "index": 7,
    "name": "poppy",
    "singular": "罂粟",
    "plural": "罂粟",
    "icon": "poppy.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 8,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 10
    },
    "shop": {
      "sell_price": 200
    }
  },
  "pork": {
    "index": 140,
    "name": "pork",
    "singular": "猪肉",
    "plural": "猪肉",
    "icon": "pork.png",
    "category": "meat",
    "category_cn": "肉食",
    "kitchen_item_type_icon": "recipe-meat.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 700,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "porridge": {
    "index": 145,
    "name": "porridge",
    "singular": "麦片粥",
    "plural": "麦片粥",
    "icon": "porridge.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 250
    },
    "recipe": {
      "recipe_name": "porridge",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 1,
      "ingredients": [
        "oats",
        "bottle_of_milk"
      ],
      "ingredients_cn": [
        "燕麦",
        "牛奶"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "potato": {
    "index": 23,
    "name": "potato",
    "singular": "土豆",
    "plural": "马铃薯",
    "icon": "potato.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 7,
      "yield_multiplier": 5,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn",
        "winter"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 50
    },
    "is_fishing_bait": true
  },
  "potato_pancake": {
    "index": 64,
    "name": "potato pancake",
    "singular": "土豆煎饼",
    "plural": "土豆煎饼",
    "icon": "potato-pancake.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "potato pancakes",
      "difficulty": 2,
      "cook_minutes": 10,
      "servings": 4,
      "ingredients": [
        "potato",
        "onion",
        "chicken_egg",
        "vegetable_oil"
      ],
      "ingredients_cn": [
        "土豆",
        "洋葱",
        "鸡蛋",
        "植物油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "prawn": {
    "index": 143,
    "name": "prawn",
    "singular": "大虾",
    "plural": "大虾",
    "icon": "prawn.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 300,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "prawn_bisque": {
    "index": 51,
    "name": "prawn bisque",
    "singular": "鲜虾浓汤",
    "plural": "鲜虾浓汤",
    "icon": "prawn-bisque.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1200
    },
    "recipe": {
      "recipe_name": "prawn bisque",
      "difficulty": 3,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "prawn",
        "onion",
        "garlic_bulb",
        "vegetable_oil",
        "cream",
        "lemon"
      ],
      "ingredients_cn": [
        "大虾",
        "洋葱",
        "大蒜",
        "植物油",
        "奶油",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    }
  },
  "quiche": {
    "index": 58,
    "name": "quiche",
    "singular": "法式咸派",
    "plural": "法式咸派",
    "icon": "quiche.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 600
    },
    "recipe": {
      "recipe_name": "quiche",
      "difficulty": 3,
      "cook_minutes": 20,
      "servings": 6,
      "ingredients": [
        "pastry",
        "bottle_of_milk",
        "chicken_egg",
        "bacon",
        "cheese",
        "tomato"
      ],
      "ingredients_cn": [
        "酥皮",
        "牛奶",
        "鸡蛋",
        "培根",
        "芝士",
        "番茄"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "red_rose": {
    "index": 0,
    "name": "red rose",
    "singular": "红玫瑰",
    "plural": "红玫瑰",
    "icon": "red-rose.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 14,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 350
    }
  },
  "red_wine": {
    "index": 129,
    "name": "red wine",
    "singular": "红酒",
    "plural": "红酒",
    "icon": "red-wine.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "drink",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    }
  },
  "rice": {
    "index": 72,
    "name": "rice",
    "singular": "杯装米",
    "plural": "杯装米",
    "icon": "rice.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "water",
      "growth_days": 26,
      "yield_multiplier": 20,
      "has_seeds": true,
      "seed_name": "大米",
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 20
    },
    "shop": {
      "sell_price": 50
    }
  },
  "rich_biscuit": {
    "index": 88,
    "name": "rich biscuit",
    "singular": "富贵饼干",
    "plural": "富贵饼干",
    "icon": "rich-biscuit.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 50
    },
    "recipe": {
      "recipe_name": "rich biscuits",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 10,
      "ingredients": [
        "chicken_egg",
        "flour",
        "sugar",
        "lemon"
      ],
      "ingredients_cn": [
        "鸡蛋",
        "面粉",
        "糖",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "roach": {
    "index": 157,
    "name": "roach",
    "singular": "拟鲤",
    "plural": "拟鲤",
    "icon": "roach.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 80
    }
  },
  "roast_dinner": {
    "index": 124,
    "name": "roast dinner",
    "singular": "晚餐烤肉",
    "plural": "晚餐烤肉",
    "icon": "roast-dinner.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 2400
    },
    "recipe": {
      "recipe_name": "roast dinner",
      "difficulty": 3,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients_cn": [
        "约克郡布丁",
        "馅料",
        "鸡肉",
        "牛排",
        "猪肉",
        "土豆",
        "野生胡萝卜",
        "卷心菜",
        "洋葱",
        "大头菜",
        "植物油",
        "盐"
      ],
      "ingredients": [
        "yorkshire_pudding",
        "stuffing",
        "chicken",
        "beef",
        "pork",
        "potato",
        "wild_carrot",
        "cabbage",
        "onion",
        "turnip",
        "vegetable_oil",
        "salt"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "salad": {
    "index": 135,
    "name": "salad",
    "singular": "沙拉",
    "plural": "沙拉",
    "icon": "salad.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1100
    },
    "recipe": {
      "recipe_name": "salad",
      "difficulty": 2,
      "cook_minutes": 10,
      "servings": 1,
      "ingredients": [
        "spinach",
        "tomato",
        "onion",
        "garlic_bulb",
        "chilli_pepper",
        "pepper",
        "lime"
      ],
      "ingredients_cn": [
        "菠菜",
        "番茄",
        "洋葱",
        "大蒜",
        "辣椒",
        "灯笼椒",
        "酸橙"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    }
  },
  "salmon": {
    "index": 81,
    "name": "salmon",
    "singular": "鲑鱼",
    "plural": "鲑鱼",
    "icon": "salmon.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    }
  },
  "salmon_wellington": {
    "index": 76,
    "name": "salmon wellington",
    "singular": "惠灵顿鲑鱼",
    "plural": "惠灵顿鲑鱼",
    "icon": "salmon-wellington.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1600
    },
    "recipe": {
      "recipe_name": "salmon wellington",
      "difficulty": 3,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients": [
        "salmon",
        "broccoli",
        "pastry",
        "chicken_egg",
        "salt"
      ],
      "ingredients_cn": [
        "鲑鱼",
        "西兰花",
        "酥皮",
        "鸡蛋",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "salt": {
    "index": 42,
    "name": "salt",
    "singular": "盐",
    "plural": "盐",
    "icon": "salt.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 5,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 25
    }
  },
  "samosa": {
    "index": 67,
    "name": "samosa",
    "singular": "咖喱角",
    "plural": "咖喱角",
    "icon": "samosa.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 60
    },
    "recipe": {
      "recipe_name": "samosas",
      "difficulty": 3,
      "cook_minutes": 15,
      "servings": 5,
      "ingredients": [
        "pastry",
        "potato",
        "chilli_pepper",
        "lemon"
      ],
      "ingredients_cn": [
        "酥皮",
        "土豆",
        "辣椒",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "spicy"
      ]
    }
  },
  "sausage": {
    "index": 63,
    "name": "sausage",
    "singular": "香肠",
    "plural": "香肠",
    "icon": "sausage.png",
    "category": "meat",
    "category_cn": "肉食",
    "kitchen_item_type_icon": "recipe-meat.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 200,
      "available_in": [
        "supermarket"
      ]
    },
    "is_fishing_bait": true
  },
  "sausage_roll": {
    "index": 62,
    "name": "sausage roll",
    "singular": "香肠卷",
    "plural": "香肠卷",
    "icon": "sausage-roll.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 150
    },
    "recipe": {
      "recipe_name": "sausage rolls",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 6,
      "ingredients": [
        "pastry",
        "salt",
        "sausage",
        "chicken_egg",
        "lemon"
      ],
      "ingredients_cn": [
        "酥皮",
        "盐",
        "香肠",
        "鸡蛋",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "scone": {
    "index": 100,
    "name": "scone",
    "singular": "司康饼",
    "plural": "司康饼",
    "icon": "scone.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 150
    },
    "recipe": {
      "recipe_name": "scones",
      "difficulty": 2,
      "cook_minutes": 20,
      "servings": 4,
      "ingredients": [
        "flour",
        "butter",
        "sugar",
        "salt",
        "bottle_of_milk"
      ],
      "ingredients_cn": [
        "面粉",
        "黄油",
        "糖",
        "盐",
        "牛奶"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "shortbread": {
    "index": 89,
    "name": "shortbread",
    "singular": "黄油酥饼",
    "plural": "黄油酥饼",
    "icon": "shortbread.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 150
    },
    "recipe": {
      "recipe_name": "shortbread",
      "difficulty": 2,
      "cook_minutes": 35,
      "servings": 5,
      "ingredients": [
        "butter",
        "flour",
        "sugar"
      ],
      "ingredients_cn": [
        "黄油",
        "面粉",
        "糖"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "souffle": {
    "index": 95,
    "name": "soufflé",
    "singular": "舒芙蕾",
    "plural": "舒芙蕾",
    "icon": "souffle.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1500
    },
    "recipe": {
      "recipe_name": "soufflés",
      "difficulty": 4,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "chicken_egg",
        "cream",
        "sugar",
        "butter",
        "flour",
        "lemon"
      ],
      "ingredients_cn": [
        "鸡蛋",
        "奶油",
        "糖",
        "黄油",
        "面粉",
        "柠檬"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "spaghetti_bolognese": {
    "index": 83,
    "name": "spaghetti bolognese",
    "singular": "肉酱意大利面",
    "plural": "肉酱意大利面",
    "icon": "spaghetti-bolognese.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1100
    },
    "recipe": {
      "recipe_name": "spaghetti bolognese",
      "difficulty": 3,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "pasta",
        "beef",
        "vegetable_oil",
        "garlic_bulb",
        "tomato"
      ],
      "ingredients_cn": [
        "意大利面",
        "牛肉",
        "植物油",
        "大蒜",
        "番茄"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    }
  },
  "spinach": {
    "index": 134,
    "name": "spinach",
    "singular": "菠菜叶",
    "plural": "菠菜叶",
    "icon": "spinach.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 10,
      "yield_multiplier": 6,
      "has_seeds": true,
      "seed_name": "菠菜",
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 60
    }
  },
  "sponge_cake": {
    "index": 98,
    "name": "sponge cake",
    "singular": "海绵蛋糕",
    "plural": "海绵蛋糕",
    "icon": "sponge-cake.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "sponge cake",
      "difficulty": 2,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "flour",
        "butter",
        "sugar",
        "cream",
        "chicken_egg",
        "jam"
      ],
      "ingredients_cn": [
        "面粉",
        "黄油",
        "糖",
        "奶油",
        "鸡蛋",
        "果酱"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "steak": {
    "index": 112,
    "name": "steak",
    "singular": "牛排",
    "plural": "牛排",
    "icon": "steak.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "steak",
      "difficulty": 3,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "vegetable_oil",
        "beef"
      ],
      "ingredients_cn": [
        "植物油",
        "牛肉"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "carnivore"
      ]
    }
  },
  "sticky_toffee_pudding": {
    "index": 105,
    "name": "sticky toffee pudding",
    "singular": "太妃布丁",
    "plural": "太妃布丁",
    "icon": "sticky-toffee-pudding.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "sticky toffee pudding",
      "difficulty": 2,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "date",
        "flour",
        "chicken_egg",
        "butter",
        "sugar",
        "bottle_of_milk",
        "cream"
      ],
      "ingredients_cn": [
        "椰枣",
        "面粉",
        "鸡蛋",
        "黄油",
        "糖",
        "牛奶",
        "奶油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "strange_flower": {
    "index": 24,
    "name": "strange flower",
    "singular": "奇怪的花",
    "plural": "诡异的花",
    "icon": "strange-flower.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "ingredient_alternatives": {
      "normal": [
        "blood_lemon"
      ],
      "lewd": []
    },
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 28,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn",
        "winter"
      ],
      "tags": []
    },
    "shop": {
      "sell_price": 400
    },
    "food": {
      "tags": [
        "aphrodisiac"
      ]
    }
  },
  "strawberry": {
    "index": 14,
    "name": "strawberry",
    "singular": "草莓",
    "plural": "草莓",
    "icon": "strawberry.png",
    "category": "fruit",
    "category_cn": "水果",
    "kitchen_item_type_icon": "recipe-fruit.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": [],
      "planting_bed": "pc_shrub",
      "growth_days": 12,
      "regrow_days": 3,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer"
      ]
    },
    "shop": {
      "sell_price": 180
    },
    "is_fishing_bait": true
  },
  "stuffing": {
    "index": 123,
    "name": "stuffing",
    "cn_name_cap": "馅料",
    "singular": "馅料丸子",
    "plural": "馅料丸子",
    "icon": "stuffing.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 100
    },
    "recipe": {
      "recipe_name": "stuffing",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 6,
      "ingredients": [
        "butter",
        "vegetable_oil",
        "onion",
        "garlic_bulb",
        "bread",
        "chicken_egg"
      ],
      "ingredients_cn": [
        "黄油",
        "植物油",
        "洋葱",
        "大蒜",
        "面包",
        "鸡蛋"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  },
  "sugar": {
    "index": 61,
    "name": "sugar",
    "singular": "小勺糖",
    "plural": "小勺糖",
    "icon": "sugar.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 5,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 25
    }
  },
  "sunflower": {
    "index": 149,
    "name": "sunflower",
    "singular": "向日葵",
    "plural": "向日葵",
    "icon": "sunflower.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "planting_bed": "earth",
      "growth_days": 7,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "summer"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 300
    }
  },
  "sweet_and_sour_chicken": {
    "index": 68,
    "name": "sweet and sour chicken",
    "singular": "糖醋鸡肉",
    "plural": "糖醋鸡肉",
    "icon": "sweet-and-sour-chicken.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 800
    },
    "recipe": {
      "recipe_name": "sweet and sour chicken",
      "difficulty": 3,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "chicken",
        "vegetable_oil",
        "pepper",
        "sugar",
        "onion"
      ],
      "ingredients_cn": [
        "鸡肉",
        "植物油",
        "灯笼椒",
        "糖",
        "洋葱"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    }
  },
  "swiss_roll": {
    "index": 99,
    "name": "swiss roll",
    "singular": "瑞士卷",
    "plural": "瑞士卷",
    "icon": "swiss-roll.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1300
    },
    "recipe": {
      "recipe_name": "Swiss rolls",
      "difficulty": 3,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "flour",
        "butter",
        "cream",
        "chicken_egg",
        "jam",
        "orange",
        "sugar"
      ],
      "ingredients_cn": [
        "面粉",
        "黄油",
        "奶油",
        "鸡蛋",
        "果酱",
        "橘子",
        "糖"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "tart": {
    "index": 96,
    "name": "tart",
    "singular": "水果挞",
    "plural": "水果挞",
    "icon": "tart.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 1000
    },
    "recipe": {
      "recipe_name": "tarts",
      "difficulty": 2,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "pastry",
        "chocolate"
      ],
      "ingredients_cn": [
        "酥皮",
        "巧克力"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "tomato": {
    "index": 45,
    "name": "tomato",
    "singular": "西红柿",
    "plural": "西红柿",
    "icon": "tomato.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 10,
      "yield_multiplier": 4,
      "has_seeds": true,
      "seasons": [
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 70
    }
  },
  "trout": {
    "index": 82,
    "name": "trout",
    "singular": "鳟鱼",
    "plural": "鳟鱼",
    "icon": "trout.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 800,
      "available_in": [
        "supermarket"
      ]
    }
  },
  "truffle": {
    "index": 25,
    "name": "truffle",
    "singular": "松露",
    "plural": "松露",
    "icon": "truffle.png",
    "category": "mushroom",
    "category_cn": "蘑菇",
    "kitchen_item_type_icon": "recipe-shroom.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 800
    }
  },
  "tulip": {
    "index": 4,
    "name": "tulip",
    "singular": "郁金香",
    "plural": "郁金香",
    "icon": "tulip.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 12,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 200
    }
  },
  "turnip": {
    "index": 31,
    "name": "turnip",
    "singular": "萝卜",
    "plural": "萝卜",
    "icon": "turnip.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 12,
      "yield_multiplier": 2,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn",
        "winter"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 130
    }
  },
  "turnip_soup": {
    "index": 146,
    "name": "turnip soup",
    "singular": "萝卜浓汤",
    "plural": "萝卜浓汤",
    "icon": "turnip-soup.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 250
    },
    "recipe": {
      "recipe_name": "turnip soup",
      "difficulty": 1,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "turnip",
        "potato",
        "onion",
        "vegetable_oil",
        "salt"
      ],
      "ingredients_cn": [
        "萝卜",
        "土豆",
        "洋葱",
        "植物油",
        "盐"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    }
  },
  "valentines_chocolate": {
    "index": 148,
    "name": "valentines chocolate",
    "singular": "情人节巧克力",
    "plural": "情人节巧克力",
    "icon": "valentines-chocolate.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 900
    },
    "recipe": {
      "recipe_name": "valentines chocolate",
      "difficulty": 1,
      "cook_minutes": 15,
      "servings": 1,
      "ingredients": [
        "butter",
        "bottle_of_milk",
        "cocoa_powder",
        "pear"
      ],
      "ingredients_cn": [
        "黄油",
        "牛奶",
        "可可粉",
        "梨"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    }
  },
  "vegetable_oil": {
    "index": 43,
    "name": "vegetable oil",
    "singular": "植物油",
    "plural": "植物油",
    "icon": "vegetable-oil.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 10,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 25
    }
  },
  "wheat": {
    "index": 50,
    "name": "wheat",
    "singular": "杯装小麦",
    "plural": "杯装小麦",
    "icon": "wheat.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 9,
      "yield_multiplier": 12,
      "has_seeds": true,
      "seed_name": "小麦",
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 40
    }
  },
  "white_rose": {
    "index": 1,
    "name": "white rose",
    "singular": "白玫瑰",
    "plural": "白玫瑰",
    "icon": "white-rose.png",
    "category": "flower",
    "category_cn": "花卉",
    "kitchen_item_type_icon": "recipe-flower.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 14,
      "yield_multiplier": 1,
      "has_seeds": true,
      "seasons": [
        "spring",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 350
    }
  },
  "white_wine": {
    "index": 130,
    "name": "white wine",
    "singular": "白葡萄酒",
    "plural": "白葡萄酒",
    "icon": "white-wine.png",
    "category": "ingredient",
    "category_cn": "配料",
    "kitchen_item_type_icon": "recipe-ingredient.png",
    "prop_folder": "drink",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    }
  },
  "whiting": {
    "index": 153,
    "name": "whiting",
    "singular": "牙鳕",
    "plural": "牙鳕",
    "icon": "whiting.png",
    "category": "seafood",
    "category_cn": "海鲜",
    "kitchen_item_type_icon": "recipe-seafood.png",
    "prop_folder": "ingredient",
    "shop": {
      "sell_price": 300
    }
  },
  "wild_carrot": {
    "index": 20,
    "name": "wild carrot",
    "singular": "野胡萝卜",
    "plural": "胡萝卜",
    "icon": "carrot.png",
    "category": "vegetable",
    "category_cn": "蔬菜",
    "kitchen_item_type_icon": "recipe-vegetable.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "planting_bed": "earth",
      "growth_days": 10,
      "yield_multiplier": 3,
      "has_seeds": true,
      "seasons": [
        "spring",
        "summer",
        "autumn"
      ],
      "tags": [],
      "featCost": 5
    },
    "shop": {
      "sell_price": 80
    },
    "is_fishing_bait": true
  },
  "wild_honeycomb": {
    "index": 19,
    "name": "wild honeycomb",
    "singular": "野生蜂巢",
    "plural": "野蜂巢",
    "icon": "wild-honeycomb.png",
    "category": "produce",
    "category_cn": "农产品",
    "kitchen_item_type_icon": "recipe-produce.png",
    "prop_folder": "tending",
    "shop": {
      "sell_price": 12000,
      "stall_size": "large"
    }
  },
  "wolfbrew": {
    "index": 137,
    "name": "wolfbrew",
    "singular": "狼菇酒",
    "plural": "狼菇酒",
    "icon": "wolfbrew.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "drink",
    "shop": {
      "sell_price": 3000
    },
    "recipe": {
      "recipe_name": "wolfbrew",
      "difficulty": 5,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients": [
        "wolfshroom",
        "red_wine",
        "strange_flower"
      ],
      "ingredients_cn": [
        "狼菇",
        "红葡萄酒",
        "诡异的花"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "drink",
        "alcohol",
        "tainted"
      ]
    }
  },
  "wolfshroom": {
    "index": 18,
    "name": "wolfshroom",
    "singular": "狼菇",
    "plural": "狼菇",
    "icon": "wolfshroom.png",
    "category": "mushroom",
    "category_cn": "蘑菇",
    "kitchen_item_type_icon": "recipe-shroom.png",
    "prop_folder": "tending",
    "tending": {
      "affected_by_tending_skill": true,
      "tags": []
    },
    "shop": {
      "sell_price": 300
    },
    "food": {
      "tags": [
        "aphrodisiac"
      ]
    }
  },
  "yorkshire_pudding": {
    "index": 122,
    "name": "yorkshire pudding",
    "singular": "约克郡布丁",
    "plural": "约克郡布丁",
    "icon": "yorkshire-pudding.png",
    "category": "dish",
    "category_cn": "菜肴",
    "kitchen_item_type_icon": "recipe-food.png",
    "prop_folder": "food",
    "shop": {
      "sell_price": 700
    },
    "recipe": {
      "recipe_name": "yorkshire pudding",
      "difficulty": 2,
      "cook_minutes": 40,
      "servings": 1,
      "ingredients": [
        "flour",
        "chicken_egg",
        "bottle_of_milk",
        "vegetable_oil"
      ],
      "ingredients_cn": [
        "面粉",
        "鸡蛋",
        "牛奶",
        "植物油"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    }
  }
};
