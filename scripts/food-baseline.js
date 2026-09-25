/* Standard food definitions extracted from the SHA256-pinned DoL 0.5.11.9.
   Used only when no runtime catalog is available; never supplies inventory or unlocks. */
setup.pcBakeryFoodBaseline = {
  "apple": {
    "name": "apple",
    "singular": "apple",
    "plural": "apples",
    "category": "fruit",
    "shop": {
      "sell_price": 50
    },
    "icon": "apple.png"
  },
  "apple_crumble": {
    "name": "apple crumble",
    "singular": "serving of apple crumble",
    "plural": "servings of apple crumble",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 700
    },
    "icon": "apple-crumble.png"
  },
  "apple_strudel": {
    "name": "apple strudel",
    "singular": "apple strudel",
    "plural": "apple strudels",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1200
    },
    "icon": "apple-strudel.png"
  },
  "arancini": {
    "name": "arancini",
    "singular": "arancini ball",
    "plural": "arancini balls",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 700
    },
    "icon": "arancini.png"
  },
  "baby_bottle_of_breast_milk": {
    "name": "baby bottle of breast milk",
    "singular": "baby bottle of breast milk",
    "plural": "baby bottles of breast milk",
    "category": "produce",
    "shop": {
      "sell_price": 200
    },
    "icon": "babybottle.png"
  },
  "bacon": {
    "name": "bacon",
    "singular": "rasher of bacon",
    "plural": "rashers of bacon",
    "category": "meat",
    "shop": {
      "sell_price": 200,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "bacon.png"
  },
  "bakewell_tart": {
    "name": "Bakewell tart",
    "singular": "Bakewell tart",
    "plural": "Bakewell tarts",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1200
    },
    "icon": "bakewell-tart.png"
  },
  "banana": {
    "name": "banana",
    "singular": "banana",
    "plural": "bananas",
    "category": "fruit",
    "shop": {
      "sell_price": 100,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "banana.png"
  },
  "banana_bread": {
    "name": "banana bread",
    "singular": "loaf of banana bread",
    "plural": "loaves of banana bread",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 500
    },
    "icon": "banana-bread.png"
  },
  "bangers_and_mash": {
    "name": "bangers and mash",
    "singular": "serving of bangers and mash",
    "plural": "servings of bangers and mash",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 1200
    },
    "icon": "bangers-and-mash.png"
  },
  "beef": {
    "name": "beef",
    "singular": "serving of beef",
    "plural": "servings of beef",
    "category": "meat",
    "shop": {
      "sell_price": 1000,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "beef.png"
  },
  "beef_wellington": {
    "name": "beef wellington",
    "singular": "serving of beef wellington",
    "plural": "servings of beef wellington",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 1800
    },
    "icon": "beef-wellington.png"
  },
  "belgian_bun": {
    "name": "belgian bun",
    "singular": "Belgian bun",
    "plural": "Belgian buns",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "belgian-bun.png"
  },
  "bird_egg": {
    "name": "bird egg",
    "singular": "bird egg",
    "plural": "bird eggs",
    "category": "produce",
    "shop": {
      "sell_price": 200
    },
    "icon": "bird-egg.png"
  },
  "blackberry": {
    "name": "blackberry",
    "singular": "blackberry",
    "plural": "blackberries",
    "category": "fruit",
    "shop": {
      "sell_price": 7,
      "stall_size": "small"
    },
    "icon": "blackberry.png"
  },
  "blood_lemon": {
    "name": "blood lemon",
    "singular": "blood lemon",
    "plural": "blood lemons",
    "category": "fruit",
    "food": {
      "tags": [
        "aphrodisiac"
      ]
    },
    "shop": {
      "sell_price": 400
    },
    "icon": "blood-lemon.gif"
  },
  "bottle_of_breast_milk": {
    "name": "bottle of breast milk",
    "singular": "bottle of breast milk",
    "plural": "bottles of breast milk",
    "category": "produce",
    "shop": {
      "sell_price": 3000,
      "stall_size": "large"
    },
    "icon": "breastmilk.png"
  },
  "bottle_of_milk": {
    "name": "bottle of milk",
    "singular": "bottle of milk",
    "plural": "bottles of milk",
    "category": "produce",
    "shop": {
      "sell_price": 100
    },
    "icon": "milk.png"
  },
  "bottle_of_semen": {
    "name": "bottle of semen",
    "singular": "bottle of semen",
    "plural": "bottles of semen",
    "category": "produce",
    "shop": {
      "sell_price": 3000,
      "stall_size": "large"
    },
    "icon": "semenbottle.png"
  },
  "bread": {
    "name": "bread",
    "singular": "piece of bread",
    "plural": "pieces of bread",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "bread.png"
  },
  "broccoli": {
    "name": "broccoli",
    "singular": "broccoli",
    "plural": "broccoli",
    "category": "vegetable",
    "shop": {
      "sell_price": 100
    },
    "icon": "broccoli.png"
  },
  "brownie": {
    "name": "brownie",
    "singular": "brownie",
    "plural": "brownies",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 300
    },
    "icon": "brownie.png"
  },
  "butter": {
    "name": "butter",
    "singular": "spoonful of butter",
    "plural": "spoonfuls of butter",
    "category": "ingredient",
    "recipe": {
      "recipe_name": "butter",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 10,
      "ingredients": [
        "bottle_of_milk"
      ],
      "tags": []
    },
    "shop": {
      "sell_price": 10
    },
    "icon": "butter.png"
  },
  "cabbage": {
    "name": "cabbage",
    "singular": "cabbage",
    "plural": "cabbages",
    "category": "vegetable",
    "shop": {
      "sell_price": 90
    },
    "icon": "cabbage.png"
  },
  "carbonara": {
    "name": "carbonara",
    "singular": "serving of carbonara",
    "plural": "servings of carbonara",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "carbonara.png"
  },
  "carnation": {
    "name": "carnation",
    "singular": "carnation",
    "plural": "carnations",
    "category": "flower",
    "shop": {
      "sell_price": 200
    },
    "icon": "carnation.png"
  },
  "carrot_cake": {
    "name": "carrot cake",
    "singular": "carrot cake",
    "plural": "carrot cakes",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1400
    },
    "icon": "carrot-cake.png"
  },
  "cauliflower": {
    "name": "cauliflower",
    "singular": "cauliflower",
    "plural": "cauliflowers",
    "category": "vegetable",
    "shop": {
      "sell_price": 400
    },
    "icon": "cauliflower.png"
  },
  "cauliflower_cheese": {
    "name": "cauliflower cheese",
    "singular": "serving of cauliflower cheese",
    "plural": "servings of cauliflower cheese",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "cauliflower-cheese.png"
  },
  "cheese": {
    "name": "cheese",
    "singular": "piece of cheese",
    "plural": "pieces of cheese",
    "category": "dish",
    "recipe": {
      "recipe_name": "cheese",
      "difficulty": 1,
      "cook_minutes": 60,
      "servings": 1,
      "ingredients": [
        "bottle_of_milk"
      ],
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 500
    },
    "icon": "cheese.png"
  },
  "cheese_and_crackers": {
    "name": "cheese and crackers",
    "singular": "serving of cheese and crackers",
    "plural": "servings of cheese and crackers",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 800
    },
    "icon": "cheese-and-crackers.png"
  },
  "cheese_topped_trout": {
    "name": "cheese topped trout",
    "singular": "serving of cheese topped trout",
    "plural": "servings of cheese topped trout",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    },
    "shop": {
      "sell_price": 1600
    },
    "icon": "cheese-topped-trout.png"
  },
  "cheeseburger": {
    "name": "cheeseburger",
    "singular": "cheeseburger",
    "plural": "cheeseburgers",
    "category": "dish",
    "recipe": {
      "recipe_name": "cheeseburgers",
      "difficulty": 1,
      "cook_minutes": 15,
      "servings": 2,
      "ingredients": [
        "beef",
        "bread",
        "onion",
        "tomato",
        "cheese"
      ],
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 800
    },
    "icon": "cheeseburger.png"
  },
  "chelsea_bun": {
    "name": "chelsea bun",
    "singular": "Chelsea bun",
    "plural": "Chelsea buns",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 200
    },
    "icon": "chelsea-bun.png"
  },
  "cherry": {
    "name": "cherry",
    "singular": "cherry",
    "plural": "cherries",
    "category": "fruit",
    "shop": {
      "sell_price": 20,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "cherry.png"
  },
  "chicken": {
    "name": "chicken",
    "singular": "serving of chicken",
    "plural": "servings of chicken",
    "category": "meat",
    "shop": {
      "sell_price": 300,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "chicken.png"
  },
  "chicken_egg": {
    "name": "chicken egg",
    "singular": "chicken egg",
    "plural": "chicken eggs",
    "category": "produce",
    "shop": {
      "sell_price": 40
    },
    "icon": "egg.png"
  },
  "chicken_tikka_masala": {
    "name": "chicken tikka masala",
    "singular": "serving of chicken tikka masala",
    "plural": "servings of chicken tikka masala",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    },
    "shop": {
      "sell_price": 1700
    },
    "icon": "chicken-tikka-masala.png"
  },
  "chicken_vindaloo": {
    "name": "chicken vindaloo",
    "singular": "serving of chicken vindaloo",
    "plural": "servings of chicken vindaloo",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    },
    "shop": {
      "sell_price": 1800
    },
    "icon": "chicken-vindaloo.png"
  },
  "chilli_con_carne": {
    "name": "chilli con carne",
    "singular": "serving of chilli con carne",
    "plural": "servings of chilli con carne",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    },
    "shop": {
      "sell_price": 1300
    },
    "icon": "chilli-con-carne.png"
  },
  "chilli_pepper": {
    "name": "chilli pepper",
    "singular": "chilli pepper",
    "plural": "chilli peppers",
    "category": "vegetable",
    "shop": {
      "sell_price": 80
    },
    "icon": "chilli-pepper.png"
  },
  "chips": {
    "name": "chips",
    "singular": "packet of chips",
    "plural": "packets of chips",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    },
    "shop": {
      "sell_price": 400
    },
    "icon": "chips.png"
  },
  "choc_chip_cookie": {
    "name": "choc chip cookie",
    "singular": "chocolate chip cookie",
    "plural": "chocolate chip cookies",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "choc-chip-cookie.png"
  },
  "chocolate": {
    "name": "chocolate",
    "singular": "slab of chocolate",
    "plural": "slabs of chocolate",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 700
    },
    "icon": "chocolate.png"
  },
  "clam": {
    "name": "clam",
    "singular": "clam",
    "plural": "clams",
    "category": "seafood",
    "shop": {
      "sell_price": 400,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "clam.png"
  },
  "clam_chowder": {
    "name": "clam chowder",
    "singular": "serving of clam chowder",
    "plural": "servings of clam chowder",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    },
    "shop": {
      "sell_price": 1300
    },
    "icon": "clam-chowder.png"
  },
  "cocoa_powder": {
    "name": "cocoa powder",
    "singular": "cup of cocoa powder",
    "plural": "cups of cocoa powder",
    "category": "ingredient",
    "shop": {
      "sell_price": 200,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 5
    },
    "icon": "cocoa-powder.png"
  },
  "cod": {
    "name": "cod",
    "singular": "cod",
    "plural": "cod",
    "category": "seafood",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "cod.png"
  },
  "cream": {
    "name": "cream",
    "singular": "spoonful of cream",
    "plural": "spoonfuls of cream",
    "category": "produce",
    "shop": {
      "sell_price": 100
    },
    "icon": "cream.png"
  },
  "creme_brulee": {
    "name": "crème brûlée",
    "singular": "pot of crème brûlée",
    "plural": "pots of crème brûlée",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 600
    },
    "icon": "creme-brulee.png"
  },
  "crumpet": {
    "name": "crumpet",
    "singular": "crumpet",
    "plural": "crumpets",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "crumpet.png"
  },
  "daisy": {
    "name": "daisy",
    "singular": "daisy",
    "plural": "daisies",
    "category": "flower",
    "shop": {
      "sell_price": 150
    },
    "icon": "daisy.png"
  },
  "date": {
    "name": "date",
    "singular": "date",
    "plural": "dates",
    "category": "fruit",
    "shop": {
      "sell_price": 50,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "date.png"
  },
  "fish_and_chips": {
    "name": "fish and chips",
    "singular": "serving of fish and chips",
    "plural": "servings of fish and chips",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    },
    "shop": {
      "sell_price": 1400
    },
    "icon": "fish-and-chips.png"
  },
  "flapjack": {
    "name": "flapjack",
    "singular": "flapjack square",
    "plural": "flapjack squares",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "flapjack.png"
  },
  "flour": {
    "name": "flour",
    "singular": "spoonful of flour",
    "plural": "spoonfuls of flour",
    "category": "ingredient",
    "recipe": {
      "recipe_name": "flour",
      "difficulty": 1,
      "cook_minutes": 20,
      "servings": 10,
      "ingredients": [
        "wheat"
      ],
      "tags": []
    },
    "shop": {
      "sell_price": 10
    },
    "icon": "flour.png"
  },
  "full_english_breakfast": {
    "name": "full english breakfast",
    "singular": "full English breakfast",
    "plural": "full English breakfasts",
    "category": "dish",
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
    },
    "shop": {
      "sell_price": 900
    },
    "icon": "full-english-breakfast.png"
  },
  "garlic_bulb": {
    "name": "garlic bulb",
    "singular": "garlic bulb",
    "plural": "garlic bulbs",
    "category": "vegetable",
    "shop": {
      "sell_price": 100
    },
    "icon": "garlic.png"
  },
  "ghostbrew": {
    "name": "ghostbrew",
    "singular": "bottle of ghostbrew",
    "plural": "bottles of ghostbrew",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "drink",
        "alcohol",
        "tainted"
      ]
    },
    "shop": {
      "sell_price": 3000
    },
    "icon": "ghostbrew.png"
  },
  "ghostshroom": {
    "name": "ghostshroom",
    "singular": "ghostshroom",
    "plural": "ghostshrooms",
    "category": "mushroom",
    "shop": {
      "sell_price": 200
    },
    "icon": "ghostshroom.png"
  },
  "haddock": {
    "name": "haddock",
    "singular": "haddock",
    "plural": "haddock",
    "category": "seafood",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "haddock.png"
  },
  "hamburger": {
    "name": "hamburger",
    "singular": "hamburger",
    "plural": "hamburgers",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 600
    },
    "icon": "burger.png"
  },
  "honey": {
    "name": "honey",
    "singular": "spoonful of honey",
    "plural": "spoonfuls of honey",
    "category": "ingredient",
    "recipe": {
      "recipe_name": "honey",
      "difficulty": 1,
      "cook_minutes": 60,
      "servings": 1200,
      "ingredients": [
        "wild_honeycomb"
      ],
      "tags": []
    },
    "shop": {
      "sell_price": 10
    },
    "icon": "honey.png"
  },
  "honeyed_pork": {
    "name": "honeyed pork",
    "singular": "serving of honeyed pork",
    "plural": "servings of honeyed pork",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "carnivore"
      ]
    },
    "shop": {
      "sell_price": 1100
    },
    "icon": "honeyed-pork.png"
  },
  "jam": {
    "name": "jam",
    "singular": "cup of jam",
    "plural": "cups of jam",
    "category": "ingredient",
    "recipe": {
      "recipe_name": "jam",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 1,
      "ingredients": [
        "strawberry",
        "sugar"
      ],
      "tags": []
    },
    "shop": {
      "sell_price": 200
    },
    "icon": "jam.png"
  },
  "jammie_dodger": {
    "name": "jammie dodger",
    "singular": "jammie dodger",
    "plural": "jammie dodgers",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 80
    },
    "icon": "jammie-dodger.png"
  },
  "kedgeree": {
    "name": "kedgeree",
    "singular": "serving of kedgeree",
    "plural": "servings of kedgeree",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    },
    "shop": {
      "sell_price": 1600
    },
    "icon": "kedgeree.png"
  },
  "lasagne": {
    "name": "lasagne",
    "singular": "serving of lasagne",
    "plural": "servings of lasagne",
    "category": "dish",
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
    },
    "shop": {
      "sell_price": 1400
    },
    "icon": "lasagne.png"
  },
  "lemon": {
    "name": "lemon",
    "singular": "lemon",
    "plural": "lemons",
    "category": "fruit",
    "shop": {
      "sell_price": 120
    },
    "icon": "lemon.png"
  },
  "lemon_meringue_pie": {
    "name": "lemon meringue pie",
    "singular": "lemon meringue pie",
    "plural": "lemon meringue pies",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1600
    },
    "icon": "lemon-meringue-pie.png"
  },
  "lemonade": {
    "name": "lemonade",
    "singular": "glass of lemonade",
    "plural": "glasses of lemonade",
    "category": "dish",
    "recipe": {
      "recipe_name": "lemonade",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 2,
      "ingredients": [
        "lemon",
        "sugar"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "drink"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "lemonade.png"
  },
  "lily": {
    "name": "lily",
    "singular": "lily",
    "plural": "lilies",
    "category": "flower",
    "shop": {
      "sell_price": 200
    },
    "icon": "lily.png"
  },
  "lime": {
    "name": "lime",
    "singular": "lime",
    "plural": "limes",
    "category": "fruit",
    "shop": {
      "sell_price": 250,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "lime.png"
  },
  "linguine": {
    "name": "linguine",
    "singular": "serving of linguine",
    "plural": "servings of linguine",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 700
    },
    "icon": "linguine.png"
  },
  "lotus": {
    "name": "lotus",
    "singular": "lotus",
    "plural": "lotuses",
    "category": "flower",
    "shop": {
      "sell_price": 300
    },
    "icon": "lotus.png"
  },
  "macaroni_cheese": {
    "name": "macaroni cheese",
    "singular": "serving of macaroni and cheese",
    "plural": "servings of macaroni and cheese",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 800
    },
    "icon": "macaroni-cheese.png"
  },
  "melting_moment": {
    "name": "melting moment",
    "singular": "melting moment",
    "plural": "melting moments",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 80
    },
    "icon": "melting-moment.png"
  },
  "mince_pie": {
    "name": "mince pie",
    "singular": "mince pie",
    "plural": "mince pies",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 400
    },
    "icon": "mince-pie.png"
  },
  "mushroom": {
    "name": "mushroom",
    "singular": "mushroom",
    "plural": "mushrooms",
    "category": "mushroom",
    "shop": {
      "sell_price": 100
    },
    "icon": "mushroom.png"
  },
  "naan_bread": {
    "name": "naan bread",
    "singular": "piece of naan bread",
    "plural": "pieces of naan bread",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 200
    },
    "icon": "naan-bread.png"
  },
  "oats": {
    "name": "oats",
    "singular": "cup of oat",
    "plural": "cups of oats",
    "category": "ingredient",
    "shop": {
      "sell_price": 100,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 5
    },
    "icon": "oats.png"
  },
  "omelette": {
    "name": "omelette",
    "singular": "omelette",
    "plural": "omelettes",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 300
    },
    "icon": "omelette.png"
  },
  "onion": {
    "name": "onion",
    "singular": "onion",
    "plural": "onions",
    "category": "vegetable",
    "shop": {
      "sell_price": 120
    },
    "icon": "onion.png"
  },
  "onion_bhaji": {
    "name": "onion bhaji",
    "singular": "onion bhaji",
    "plural": "onion bhajis",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "spicy"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "onion-bhaji.png"
  },
  "orange": {
    "name": "orange",
    "singular": "orange",
    "plural": "oranges",
    "category": "fruit",
    "shop": {
      "sell_price": 300,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "orange.png"
  },
  "orange_juice": {
    "name": "orange juice",
    "singular": "glass of orange juice",
    "plural": "glasses of orange juice",
    "category": "dish",
    "recipe": {
      "recipe_name": "orange juice",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 2,
      "ingredients": [
        "orange",
        "sugar"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "drink"
      ]
    },
    "shop": {
      "sell_price": 55
    },
    "icon": "orange-juice.png"
  },
  "orchid": {
    "name": "orchid",
    "singular": "orchid",
    "plural": "orchids",
    "category": "flower",
    "shop": {
      "sell_price": 500
    },
    "icon": "orchid.png"
  },
  "oyster_pearl": {
    "name": "oyster pearl",
    "singular": "oyster pearl",
    "plural": "oyster pearls",
    "category": "produce",
    "shop": {
      "sell_price": 50000,
      "stall_size": "large"
    },
    "icon": "oyster-pearl.png"
  },
  "pasta": {
    "name": "pasta",
    "singular": "serving of pasta",
    "plural": "servings of pasta",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 200
    },
    "icon": "pasta.png"
  },
  "pastry": {
    "name": "pastry",
    "singular": "piece of pastry",
    "plural": "pieces of pastry",
    "category": "ingredient",
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
      "tags": []
    },
    "shop": {
      "sell_price": 150
    },
    "icon": "pastry.png"
  },
  "peach": {
    "name": "peach",
    "singular": "peach",
    "plural": "peaches",
    "category": "fruit",
    "shop": {
      "sell_price": 65
    },
    "icon": "peach.png"
  },
  "peach_panzanella": {
    "name": "peach panzanella",
    "singular": "serving of peach panzanella",
    "plural": "servings of peach panzanella",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 600
    },
    "icon": "peach-panzanella.png"
  },
  "pear": {
    "name": "pear",
    "singular": "pear",
    "plural": "pears",
    "category": "fruit",
    "shop": {
      "sell_price": 80
    },
    "icon": "pear.png"
  },
  "pepper": {
    "name": "pepper",
    "singular": "pepper",
    "plural": "peppers",
    "category": "vegetable",
    "shop": {
      "sell_price": 100
    },
    "icon": "pepper.png"
  },
  "pink_rose": {
    "name": "pink rose",
    "singular": "pink rose",
    "plural": "pink roses",
    "category": "flower",
    "shop": {
      "sell_price": 400
    },
    "icon": "pink-rose.png"
  },
  "pizza": {
    "name": "pizza",
    "singular": "pizza",
    "plural": "pizzas",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 1200
    },
    "icon": "pizza.png"
  },
  "plum": {
    "name": "plum",
    "singular": "plum",
    "plural": "plums",
    "category": "fruit",
    "shop": {
      "sell_price": 80
    },
    "icon": "plum.png"
  },
  "plum_pudding": {
    "name": "plum pudding",
    "singular": "serving of plum pudding",
    "plural": "servings of plum pudding",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1400
    },
    "icon": "plum-pudding.png"
  },
  "plumeria": {
    "name": "plumeria",
    "singular": "plumeria",
    "plural": "plumerias",
    "category": "flower",
    "shop": {
      "sell_price": 250
    },
    "icon": "plumeria.png"
  },
  "poached_pear": {
    "name": "poached pear",
    "singular": "poached pear",
    "plural": "poached pears",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegan",
        "alcohol",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "poached-pear.png"
  },
  "poppy": {
    "name": "poppy",
    "singular": "poppy",
    "plural": "poppies",
    "category": "flower",
    "shop": {
      "sell_price": 200
    },
    "icon": "poppy.png"
  },
  "pork": {
    "name": "pork",
    "singular": "serving of pork",
    "plural": "servings of pork",
    "category": "meat",
    "shop": {
      "sell_price": 700,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "pork.png"
  },
  "porridge": {
    "name": "porridge",
    "singular": "serving of porridge",
    "plural": "servings of porridge",
    "category": "dish",
    "recipe": {
      "recipe_name": "porridge",
      "difficulty": 1,
      "cook_minutes": 5,
      "servings": 1,
      "ingredients": [
        "oats",
        "bottle_of_milk"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 250
    },
    "icon": "porridge.png"
  },
  "potato": {
    "name": "potato",
    "singular": "potato",
    "plural": "potatoes",
    "category": "vegetable",
    "shop": {
      "sell_price": 50
    },
    "icon": "potato.png"
  },
  "potato_pancake": {
    "name": "potato pancake",
    "singular": "potato pancake",
    "plural": "potato pancakes",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "potato-pancake.png"
  },
  "prawn": {
    "name": "prawn",
    "singular": "prawn",
    "plural": "prawns",
    "category": "seafood",
    "shop": {
      "sell_price": 300,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "prawn.png"
  },
  "prawn_bisque": {
    "name": "prawn bisque",
    "singular": "serving of prawn bisque",
    "plural": "servings of prawn bisque",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "seafood"
      ]
    },
    "shop": {
      "sell_price": 1500
    },
    "icon": "prawn-bisque.png"
  },
  "quiche": {
    "name": "quiche",
    "singular": "serving of quiche",
    "plural": "servings of quiche",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 200
    },
    "icon": "quiche.png"
  },
  "red_rose": {
    "name": "red rose",
    "singular": "red rose",
    "plural": "red roses",
    "category": "flower",
    "shop": {
      "sell_price": 350
    },
    "icon": "red-rose.png"
  },
  "red_wine": {
    "name": "red wine",
    "singular": "bottle of red wine",
    "plural": "bottles of red wine",
    "category": "ingredient",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "red-wine.png"
  },
  "rice": {
    "name": "rice",
    "singular": "cup of rice",
    "plural": "cups of rice",
    "category": "vegetable",
    "shop": {
      "sell_price": 50
    },
    "icon": "rice.png"
  },
  "rich_biscuit": {
    "name": "rich biscuit",
    "singular": "rich biscuit",
    "plural": "rich biscuits",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 50
    },
    "icon": "rich-biscuit.png"
  },
  "roast_dinner": {
    "name": "roast dinner",
    "singular": "serving of roast dinner",
    "plural": "servings of roast dinner",
    "category": "dish",
    "recipe": {
      "recipe_name": "roast dinner",
      "difficulty": 3,
      "cook_minutes": 60,
      "servings": 1,
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
    },
    "shop": {
      "sell_price": 2400
    },
    "icon": "roast-dinner.png"
  },
  "salad": {
    "name": "salad",
    "singular": "serving of salad",
    "plural": "servings of salad",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    },
    "shop": {
      "sell_price": 1100
    },
    "icon": "salad.png"
  },
  "salmon": {
    "name": "salmon",
    "singular": "salmon",
    "plural": "salmon",
    "category": "seafood",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "salmon.png"
  },
  "salmon_wellington": {
    "name": "salmon wellington",
    "singular": "serving of salmon wellington",
    "plural": "servings of salmon wellington",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 1800
    },
    "icon": "salmon-wellington.png"
  },
  "salt": {
    "name": "salt",
    "singular": "pinch of salt",
    "plural": "pinches of salt",
    "category": "ingredient",
    "shop": {
      "sell_price": 5,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 25
    },
    "icon": "salt.png"
  },
  "samosa": {
    "name": "samosa",
    "singular": "samosa",
    "plural": "samosas",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "spicy"
      ]
    },
    "shop": {
      "sell_price": 60
    },
    "icon": "samosa.png"
  },
  "sausage": {
    "name": "sausage",
    "singular": "sausage",
    "plural": "sausages",
    "category": "meat",
    "shop": {
      "sell_price": 200,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "sausage.png"
  },
  "sausage_roll": {
    "name": "sausage roll",
    "singular": "sausage roll",
    "plural": "sausage rolls",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 150
    },
    "icon": "sausage-roll.png"
  },
  "scone": {
    "name": "scone",
    "singular": "scone",
    "plural": "scones",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 150
    },
    "icon": "scone.png"
  },
  "shortbread": {
    "name": "shortbread",
    "singular": "piece of shortbread",
    "plural": "pieces of shortbread",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 150
    },
    "icon": "shortbread.png"
  },
  "souffle": {
    "name": "soufflé",
    "singular": "soufflé",
    "plural": "soufflés",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 3000
    },
    "icon": "souffle.png"
  },
  "spaghetti_bolognese": {
    "name": "spaghetti bolognese",
    "singular": "serving of spaghetti bolognese",
    "plural": "servings of spaghetti bolognese",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": []
    },
    "shop": {
      "sell_price": 1100
    },
    "icon": "spaghetti-bolognese.png"
  },
  "spinach": {
    "name": "spinach",
    "singular": "spinach leaf",
    "plural": "spinach leaves",
    "category": "vegetable",
    "shop": {
      "sell_price": 60
    },
    "icon": "spinach.png"
  },
  "sponge_cake": {
    "name": "sponge cake",
    "singular": "sponge cake",
    "plural": "sponge cakes",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "handheld_gift": true,
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "sponge-cake.png"
  },
  "steak": {
    "name": "steak",
    "singular": "serving of steak",
    "plural": "servings of steak",
    "category": "dish",
    "recipe": {
      "recipe_name": "steak",
      "difficulty": 3,
      "cook_minutes": 25,
      "servings": 1,
      "ingredients": [
        "vegetable_oil",
        "beef"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "carnivore"
      ]
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "steak.png"
  },
  "sticky_toffee_pudding": {
    "name": "sticky toffee pudding",
    "singular": "sticky toffee pudding",
    "plural": "sticky toffee puddings",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1200
    },
    "icon": "sticky-toffee-pudding.png"
  },
  "strange_flower": {
    "name": "strange flower",
    "singular": "strange flower",
    "plural": "strange flowers",
    "category": "flower",
    "food": {
      "tags": [
        "aphrodisiac"
      ]
    },
    "shop": {
      "sell_price": 400
    },
    "icon": "strange-flower.png"
  },
  "strawberry": {
    "name": "strawberry",
    "singular": "strawberry",
    "plural": "strawberries",
    "category": "fruit",
    "shop": {
      "sell_price": 180
    },
    "icon": "strawberry.png"
  },
  "stuffing": {
    "name": "stuffing",
    "singular": "stuffing ball",
    "plural": "stuffing balls",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 100
    },
    "icon": "stuffing.png"
  },
  "sugar": {
    "name": "sugar",
    "singular": "spoonful of sugar",
    "plural": "spoonfuls of sugar",
    "category": "ingredient",
    "shop": {
      "sell_price": 5,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 25
    },
    "icon": "sugar.png"
  },
  "sunflower": {
    "name": "sunflower",
    "singular": "sunflower",
    "plural": "sunflowers",
    "category": "flower",
    "shop": {
      "sell_price": 300
    },
    "icon": "sunflower.png"
  },
  "sweet_and_sour_chicken": {
    "name": "sweet and sour chicken",
    "singular": "serving of sweet and sour chicken",
    "plural": "servings of sweet and sour chicken",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "spicy"
      ]
    },
    "shop": {
      "sell_price": 800
    },
    "icon": "sweet-and-sour-chicken.png"
  },
  "swiss_roll": {
    "name": "swiss roll",
    "singular": "Swiss roll",
    "plural": "Swiss rolls",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1500
    },
    "icon": "swiss-roll.png"
  },
  "tart": {
    "name": "tart",
    "singular": "tart",
    "plural": "tarts",
    "category": "dish",
    "recipe": {
      "recipe_name": "tarts",
      "difficulty": 2,
      "cook_minutes": 30,
      "servings": 1,
      "ingredients": [
        "pastry",
        "chocolate"
      ],
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 1000
    },
    "icon": "tart.png"
  },
  "tomato": {
    "name": "tomato",
    "singular": "tomato",
    "plural": "tomatoes",
    "category": "vegetable",
    "shop": {
      "sell_price": 70
    },
    "icon": "tomato.png"
  },
  "trout": {
    "name": "trout",
    "singular": "trout",
    "plural": "trout",
    "category": "seafood",
    "shop": {
      "sell_price": 800,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "trout.png"
  },
  "truffle": {
    "name": "truffle",
    "singular": "truffle",
    "plural": "truffles",
    "category": "mushroom",
    "shop": {
      "sell_price": 800
    },
    "icon": "truffle.png"
  },
  "tulip": {
    "name": "tulip",
    "singular": "tulip",
    "plural": "tulips",
    "category": "flower",
    "shop": {
      "sell_price": 200
    },
    "icon": "tulip.png"
  },
  "turnip": {
    "name": "turnip",
    "singular": "turnip",
    "plural": "turnips",
    "category": "vegetable",
    "shop": {
      "sell_price": 130
    },
    "icon": "turnip.png"
  },
  "turnip_soup": {
    "name": "turnip soup",
    "singular": "serving of turnip soup",
    "plural": "servings of turnip soup",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegan"
      ]
    },
    "shop": {
      "sell_price": 250
    },
    "icon": "turnip-soup.png"
  },
  "valentines_chocolate": {
    "name": "valentines chocolate",
    "singular": "slab of valentines chocolate",
    "plural": "slabs of valentines chocolate",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "sweet"
      ]
    },
    "shop": {
      "sell_price": 900
    },
    "icon": "valentines-chocolate.png"
  },
  "vegetable_oil": {
    "name": "vegetable oil",
    "singular": "spoonful of vegetable oil",
    "plural": "spoonfuls of vegetable oil",
    "category": "ingredient",
    "shop": {
      "sell_price": 10,
      "available_in": [
        "supermarket"
      ],
      "bought_in_bulk": 25
    },
    "icon": "vegetable-oil.png"
  },
  "wheat": {
    "name": "wheat",
    "singular": "cup of wheat",
    "plural": "cups of wheat",
    "category": "vegetable",
    "shop": {
      "sell_price": 40
    },
    "icon": "wheat.png"
  },
  "white_rose": {
    "name": "white rose",
    "singular": "white rose",
    "plural": "white roses",
    "category": "flower",
    "shop": {
      "sell_price": 350
    },
    "icon": "white-rose.png"
  },
  "white_wine": {
    "name": "white wine",
    "singular": "bottle of white wine",
    "plural": "bottles of white wine",
    "category": "ingredient",
    "shop": {
      "sell_price": 600,
      "available_in": [
        "supermarket"
      ]
    },
    "icon": "white-wine.png"
  },
  "wild_carrot": {
    "name": "wild carrot",
    "singular": "wild carrot",
    "plural": "carrots",
    "category": "vegetable",
    "shop": {
      "sell_price": 80
    },
    "icon": "carrot.png"
  },
  "wild_honeycomb": {
    "name": "wild honeycomb",
    "singular": "wild honeycomb",
    "plural": "wild honeycombs",
    "category": "produce",
    "shop": {
      "sell_price": 12000,
      "stall_size": "large"
    },
    "icon": "wild-honeycomb.png"
  },
  "wolfbrew": {
    "name": "wolfbrew",
    "singular": "bottle of wolfbrew",
    "plural": "bottles of wolfbrew",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian",
        "drink",
        "alcohol",
        "tainted"
      ]
    },
    "shop": {
      "sell_price": 3000
    },
    "icon": "wolfbrew.png"
  },
  "wolfshroom": {
    "name": "wolfshroom",
    "singular": "wolfshroom",
    "plural": "wolfshrooms",
    "category": "mushroom",
    "food": {
      "tags": [
        "aphrodisiac"
      ]
    },
    "shop": {
      "sell_price": 300
    },
    "icon": "wolfshroom.png"
  },
  "yorkshire_pudding": {
    "name": "yorkshire pudding",
    "singular": "yorkshire pudding",
    "plural": "yorkshire puddings",
    "category": "dish",
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
      "tags": []
    },
    "food": {
      "tags": [
        "vegetarian"
      ]
    },
    "shop": {
      "sell_price": 1200
    },
    "icon": "yorkshire-pudding.png"
  }
};
