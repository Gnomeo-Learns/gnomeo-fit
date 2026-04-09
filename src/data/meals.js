// Shared meal data — imported by MealPlans.jsx and ShoppingList.jsx
// All macros are per serving. Ingredient prices are US market estimates (2025).
// Sources: USDA FoodData Central, American College of Sports Medicine nutrition guidelines,
// International Society of Sports Nutrition position stands.

export const CATEGORIES = {
  produce:      "🥦 Produce",
  protein:      "🥩 Protein & Meat",
  dairy:        "🥛 Dairy & Eggs",
  grains:       "🌾 Grains & Bread",
  canned:       "🥫 Canned & Dry Goods",
  frozen:       "🧊 Frozen",
  pantry:       "🫙 Pantry & Condiments",
  supplements:  "💊 Supplements",
};

// ingredient shape:
// { name, amount (display), qty (number), unit, category, estPrice (USD per serving used) }

export const MEAL_DATA = {
  training: {
    breakfast: {
      label: "Breakfast",
      time: "7–8 AM",
      icon: "☀️",
      note: "High protein to set the tone for the day. Pair with carbs for energy.",
      options: [
        {
          id: "tb1",
          name: "Oat Protein Bowl",
          prepTime: "5 min",
          tags: ["quick", "meal-prep"],
          cal: 480, p: 35, c: 58, f: 8,
          instructions: "Cook oats with water or milk. Stir in protein powder off heat. Top with sliced banana and almond butter.",
          items: [
            { name: "Rolled oats", amount: "½ cup dry", qty: 0.5, unit: "cup", category: "grains", estPrice: 0.20 },
            { name: "Whey protein powder", amount: "1 scoop", qty: 1, unit: "scoop", category: "supplements", estPrice: 1.50 },
            { name: "Banana", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.25 },
            { name: "Almond butter", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.40 },
          ],
        },
        {
          id: "tb2",
          name: "Scrambled Eggs & Toast",
          prepTime: "8 min",
          tags: ["whole food", "quick"],
          cal: 400, p: 28, c: 28, f: 18,
          instructions: "Scramble eggs in olive oil over medium heat. Add spinach in last 30 seconds. Serve with toasted whole wheat bread.",
          items: [
            { name: "Eggs, large", amount: "3 eggs", qty: 3, unit: "each", category: "dairy", estPrice: 0.90 },
            { name: "Whole wheat bread", amount: "2 slices", qty: 2, unit: "slice", category: "grains", estPrice: 0.40 },
            { name: "Baby spinach", amount: "1 cup", qty: 1, unit: "cup", category: "produce", estPrice: 0.30 },
            { name: "Olive oil", amount: "1 tsp", qty: 1, unit: "tsp", category: "pantry", estPrice: 0.10 },
          ],
        },
        {
          id: "tb3",
          name: "Greek Yogurt Parfait",
          prepTime: "3 min",
          tags: ["no-cook", "quick", "meal-prep"],
          cal: 380, p: 26, c: 48, f: 8,
          instructions: "Layer yogurt with oats and berries. Drizzle honey and sprinkle chia seeds. Can be prepped the night before.",
          items: [
            { name: "Plain Greek yogurt (0%)", amount: "1 cup", qty: 1, unit: "cup", category: "dairy", estPrice: 1.00 },
            { name: "Rolled oats", amount: "¼ cup dry", qty: 0.25, unit: "cup", category: "grains", estPrice: 0.10 },
            { name: "Blueberries", amount: "½ cup", qty: 0.5, unit: "cup", category: "produce", estPrice: 0.75 },
            { name: "Honey", amount: "1 tsp", qty: 1, unit: "tsp", category: "pantry", estPrice: 0.10 },
            { name: "Chia seeds", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
          ],
        },
        {
          id: "tb4",
          name: "Banana Protein Pancakes",
          prepTime: "12 min",
          tags: ["weekend", "whole food"],
          cal: 360, p: 24, c: 40, f: 10,
          instructions: "Blend banana, eggs, oats, and cinnamon until smooth. Cook in non-stick pan over medium heat, 2–3 min per side. Top with Greek yogurt.",
          items: [
            { name: "Banana", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.25 },
            { name: "Eggs, large", amount: "2 eggs", qty: 2, unit: "each", category: "dairy", estPrice: 0.60 },
            { name: "Rolled oats", amount: "⅓ cup dry", qty: 0.33, unit: "cup", category: "grains", estPrice: 0.13 },
            { name: "Plain Greek yogurt (0%)", amount: "¼ cup (topping)", qty: 0.25, unit: "cup", category: "dairy", estPrice: 0.25 },
            { name: "Cinnamon", amount: "¼ tsp", qty: 0.25, unit: "tsp", category: "pantry", estPrice: 0.02 },
          ],
        },
      ],
    },

    lunch: {
      label: "Lunch",
      time: "12–1 PM",
      icon: "🥗",
      note: "Largest meal of the day. Load up on protein and complex carbs for sustained energy.",
      options: [
        {
          id: "tl1",
          name: "Chicken Rice Bowl",
          prepTime: "25 min (15 min meal-prepped)",
          tags: ["meal-prep", "classic"],
          cal: 540, p: 48, c: 52, f: 11,
          instructions: "Season chicken with salt, pepper, garlic powder. Cook in skillet 6–7 min per side. Slice and serve over brown rice and steamed broccoli. Drizzle with olive oil.",
          items: [
            { name: "Chicken breast", amount: "5 oz", qty: 5, unit: "oz", category: "protein", estPrice: 1.80 },
            { name: "Brown rice", amount: "1 cup cooked", qty: 0.5, unit: "cup dry", category: "grains", estPrice: 0.20 },
            { name: "Broccoli", amount: "1 cup florets", qty: 1, unit: "cup", category: "produce", estPrice: 0.50 },
            { name: "Olive oil", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
          ],
        },
        {
          id: "tl2",
          name: "Turkey Quinoa Power Bowl",
          prepTime: "20 min",
          tags: ["high-fiber", "meal-prep"],
          cal: 520, p: 42, c: 45, f: 14,
          instructions: "Brown turkey with cumin, chili powder. Cook quinoa. Layer quinoa, beans, turkey, and salsa. Top with sliced avocado.",
          items: [
            { name: "Ground turkey (93% lean)", amount: "4 oz", qty: 4, unit: "oz", category: "protein", estPrice: 1.40 },
            { name: "Quinoa", amount: "½ cup dry", qty: 0.5, unit: "cup", category: "grains", estPrice: 0.50 },
            { name: "Black beans", amount: "½ cup canned", qty: 0.5, unit: "cup", category: "canned", estPrice: 0.30 },
            { name: "Avocado", amount: "¼ medium", qty: 0.25, unit: "each", category: "produce", estPrice: 0.40 },
            { name: "Salsa", amount: "¼ cup", qty: 0.25, unit: "cup", category: "pantry", estPrice: 0.20 },
          ],
        },
        {
          id: "tl3",
          name: "High-Protein Tuna Wrap",
          prepTime: "5 min",
          tags: ["no-cook", "quick"],
          cal: 380, p: 38, c: 32, f: 8,
          instructions: "Mix tuna with Greek yogurt, mustard, diced cucumber. Spread on tortilla with spinach. Roll tightly and slice.",
          items: [
            { name: "Canned tuna in water", amount: "1 can (5 oz)", qty: 1, unit: "can", category: "canned", estPrice: 1.20 },
            { name: "Whole wheat tortilla (10\")", amount: "1 tortilla", qty: 1, unit: "each", category: "grains", estPrice: 0.40 },
            { name: "Baby spinach", amount: "1 cup", qty: 1, unit: "cup", category: "produce", estPrice: 0.30 },
            { name: "Cucumber", amount: "¼ cucumber", qty: 0.25, unit: "each", category: "produce", estPrice: 0.25 },
            { name: "Plain Greek yogurt (0%)", amount: "2 tbsp", qty: 2, unit: "tbsp", category: "dairy", estPrice: 0.25 },
            { name: "Yellow mustard", amount: "1 tsp", qty: 1, unit: "tsp", category: "pantry", estPrice: 0.02 },
          ],
        },
        {
          id: "tl4",
          name: "Egg & Lentil Bowl",
          prepTime: "15 min",
          tags: ["plant-forward", "fiber-rich"],
          cal: 420, p: 28, c: 48, f: 10,
          instructions: "Cook lentils until tender. Roast diced sweet potato at 400°F for 20 min. Fry eggs to preference. Bowl with spinach base, top with lentils, sweet potato, eggs, and turmeric-olive oil drizzle.",
          items: [
            { name: "Eggs, large", amount: "2 eggs", qty: 2, unit: "each", category: "dairy", estPrice: 0.60 },
            { name: "Lentils (dry)", amount: "¼ cup dry", qty: 0.25, unit: "cup", category: "canned", estPrice: 0.30 },
            { name: "Sweet potato", amount: "½ medium", qty: 0.5, unit: "each", category: "produce", estPrice: 0.50 },
            { name: "Baby spinach", amount: "2 cups", qty: 2, unit: "cup", category: "produce", estPrice: 0.40 },
            { name: "Olive oil", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
            { name: "Turmeric", amount: "¼ tsp", qty: 0.25, unit: "tsp", category: "pantry", estPrice: 0.02 },
          ],
        },
      ],
    },

    preworkout: {
      label: "Pre-Workout Snack",
      time: "60–90 min before training",
      icon: "⚡",
      note: "Fast-digesting carbs + light protein. Avoid heavy fat or fiber right before training.",
      options: [
        {
          id: "tp1",
          name: "Banana + Greek Yogurt",
          prepTime: "1 min",
          tags: ["quick", "no-cook"],
          cal: 180, p: 12, c: 34, f: 0,
          instructions: "Eat banana and yogurt together. Simple, effective, fast-digesting.",
          items: [
            { name: "Banana", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.25 },
            { name: "Plain Greek yogurt (0%)", amount: "½ cup", qty: 0.5, unit: "cup", category: "dairy", estPrice: 0.50 },
          ],
        },
        {
          id: "tp2",
          name: "Rice Cakes + Peanut Butter",
          prepTime: "1 min",
          tags: ["quick", "portable"],
          cal: 190, p: 6, c: 28, f: 7,
          instructions: "Spread peanut butter on rice cakes. Fast carbs from rice cakes fuel the session; PB provides minor fat and flavor.",
          items: [
            { name: "Rice cakes (plain)", amount: "2 cakes", qty: 2, unit: "each", category: "grains", estPrice: 0.30 },
            { name: "Natural peanut butter", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.25 },
          ],
        },
        {
          id: "tp3",
          name: "Apple + Protein Shake",
          prepTime: "2 min",
          tags: ["quick"],
          cal: 210, p: 26, c: 28, f: 1,
          instructions: "Shake protein powder with water. Eat apple alongside.",
          items: [
            { name: "Apple", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.50 },
            { name: "Whey protein powder", amount: "1 scoop", qty: 1, unit: "scoop", category: "supplements", estPrice: 1.50 },
          ],
        },
        {
          id: "tp4",
          name: "Medjool Dates + Almonds",
          prepTime: "0 min",
          tags: ["no-cook", "portable", "whole food"],
          cal: 200, p: 4, c: 38, f: 7,
          instructions: "Eat dates and almonds together. Dates provide fast natural sugar for energy; almonds add light protein.",
          items: [
            { name: "Medjool dates", amount: "3 dates", qty: 3, unit: "each", category: "produce", estPrice: 0.90 },
            { name: "Almonds", amount: "12 almonds", qty: 12, unit: "each", category: "pantry", estPrice: 0.30 },
          ],
        },
      ],
    },

    dinner: {
      label: "Post-Workout Dinner",
      time: "Within 60 min after training",
      icon: "🍽️",
      note: "Biggest protein hit of the day. Pair with fast carbs to replenish glycogen.",
      options: [
        {
          id: "td1",
          name: "Salmon + Quinoa + Broccoli",
          prepTime: "25 min",
          tags: ["omega-3", "anti-inflammatory"],
          cal: 520, p: 42, c: 38, f: 16,
          instructions: "Season salmon with salt, pepper, lemon zest. Sear skin-down 4 min, flip 3 min. Cook quinoa per package. Steam broccoli 5 min. Plate and squeeze fresh lemon.",
          items: [
            { name: "Salmon fillet", amount: "5 oz", qty: 5, unit: "oz", category: "protein", estPrice: 3.50 },
            { name: "Quinoa", amount: "½ cup dry", qty: 0.5, unit: "cup", category: "grains", estPrice: 0.50 },
            { name: "Broccoli", amount: "1.5 cups florets", qty: 1.5, unit: "cup", category: "produce", estPrice: 0.60 },
            { name: "Lemon", amount: "½ lemon", qty: 0.5, unit: "each", category: "produce", estPrice: 0.30 },
            { name: "Olive oil", amount: "1 tsp", qty: 1, unit: "tsp", category: "pantry", estPrice: 0.10 },
          ],
        },
        {
          id: "td2",
          name: "Ground Turkey Stir-Fry",
          prepTime: "20 min",
          tags: ["meal-prep", "budget-friendly"],
          cal: 490, p: 40, c: 44, f: 12,
          instructions: "Brown turkey in wok or skillet over high heat. Add bell peppers and zucchini. Toss with soy sauce, garlic, ginger. Serve over brown rice.",
          items: [
            { name: "Ground turkey (93% lean)", amount: "5 oz", qty: 5, unit: "oz", category: "protein", estPrice: 1.75 },
            { name: "Brown rice", amount: "½ cup dry", qty: 0.5, unit: "cup dry", category: "grains", estPrice: 0.20 },
            { name: "Bell pepper", amount: "1 large", qty: 1, unit: "each", category: "produce", estPrice: 0.90 },
            { name: "Zucchini", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.70 },
            { name: "Low-sodium soy sauce", amount: "2 tbsp", qty: 2, unit: "tbsp", category: "pantry", estPrice: 0.15 },
            { name: "Garlic (minced)", amount: "2 cloves", qty: 2, unit: "clove", category: "produce", estPrice: 0.10 },
          ],
        },
        {
          id: "td3",
          name: "Shrimp + Sweet Potato Bowl",
          prepTime: "25 min",
          tags: ["low-calorie", "high-protein"],
          cal: 400, p: 34, c: 42, f: 8,
          instructions: "Roast sweet potato cubes at 400°F for 20 min. Season shrimp with paprika, salt, garlic powder. Cook in skillet 2 min per side. Steam green beans. Combine in bowl.",
          items: [
            { name: "Shrimp (raw, peeled)", amount: "5 oz", qty: 5, unit: "oz", category: "frozen", estPrice: 2.50 },
            { name: "Sweet potato", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.90 },
            { name: "Green beans", amount: "1 cup", qty: 1, unit: "cup", category: "produce", estPrice: 0.40 },
            { name: "Olive oil", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
            { name: "Smoked paprika", amount: "½ tsp", qty: 0.5, unit: "tsp", category: "pantry", estPrice: 0.03 },
          ],
        },
        {
          id: "td4",
          name: "Chicken Breast + Veggie Medley",
          prepTime: "20 min",
          tags: ["low-carb", "simple"],
          cal: 380, p: 44, c: 18, f: 12,
          instructions: "Pound chicken to even thickness. Season and cook in oven at 425°F for 18 min. Roast broccoli, zucchini, and carrots with olive oil on same sheet pan last 12 min.",
          items: [
            { name: "Chicken breast", amount: "5 oz", qty: 5, unit: "oz", category: "protein", estPrice: 1.80 },
            { name: "Broccoli", amount: "1 cup florets", qty: 1, unit: "cup", category: "produce", estPrice: 0.40 },
            { name: "Zucchini", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.70 },
            { name: "Carrots", amount: "2 medium", qty: 2, unit: "each", category: "produce", estPrice: 0.30 },
            { name: "Olive oil", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
          ],
        },
      ],
    },

    snack: {
      label: "Evening Snack",
      time: "Optional — 1–2 hrs before bed",
      icon: "🌙",
      note: "Slow-digesting protein (casein) supports overnight muscle repair. Keep calories light.",
      options: [
        {
          id: "ts1",
          name: "Cottage Cheese Bowl",
          prepTime: "2 min",
          tags: ["casein", "high-protein"],
          cal: 120, p: 14, c: 10, f: 2,
          instructions: "Top cottage cheese with cinnamon and blueberries. High in casein protein — digests slowly overnight.",
          items: [
            { name: "Low-fat cottage cheese", amount: "½ cup", qty: 0.5, unit: "cup", category: "dairy", estPrice: 0.80 },
            { name: "Blueberries", amount: "¼ cup", qty: 0.25, unit: "cup", category: "produce", estPrice: 0.40 },
            { name: "Cinnamon", amount: "¼ tsp", qty: 0.25, unit: "tsp", category: "pantry", estPrice: 0.02 },
          ],
        },
        {
          id: "ts2",
          name: "Greek Yogurt + Chia Seeds",
          prepTime: "1 min",
          tags: ["casein", "quick"],
          cal: 100, p: 12, c: 8, f: 3,
          instructions: "Stir chia seeds into yogurt. Let sit 5 min to thicken. Greek yogurt is high in casein for slow overnight digestion.",
          items: [
            { name: "Plain Greek yogurt (0%)", amount: "½ cup", qty: 0.5, unit: "cup", category: "dairy", estPrice: 0.50 },
            { name: "Chia seeds", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
          ],
        },
        {
          id: "ts3",
          name: "Casein Shake",
          prepTime: "1 min",
          tags: ["supplement", "ultra-quick"],
          cal: 120, p: 24, c: 5, f: 1,
          instructions: "Mix casein with cold water. Casein forms a thick gel and digests over 5–7 hours — ideal before sleep. Whey works if that's what you have.",
          items: [
            { name: "Casein protein powder", amount: "1 scoop", qty: 1, unit: "scoop", category: "supplements", estPrice: 1.80 },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────── REST DAY ───────────────────────────────────

  rest: {
    breakfast: {
      label: "Breakfast",
      time: "8–9 AM",
      icon: "☀️",
      note: "Rest day means no need to rush. Take time to cook something more elaborate if you want.",
      options: [
        {
          id: "rb1",
          name: "Veggie Egg Scramble & Toast",
          prepTime: "10 min",
          tags: ["whole food", "savory"],
          cal: 400, p: 28, c: 26, f: 18,
          instructions: "Sauté mushrooms and bell pepper in olive oil 3 min. Add spinach, cook 1 min. Whisk eggs, pour in, scramble to your liking. Serve with toasted bread.",
          items: [
            { name: "Eggs, large", amount: "3 eggs", qty: 3, unit: "each", category: "dairy", estPrice: 0.90 },
            { name: "Baby spinach", amount: "1 cup", qty: 1, unit: "cup", category: "produce", estPrice: 0.30 },
            { name: "Mushrooms", amount: "½ cup sliced", qty: 0.5, unit: "cup", category: "produce", estPrice: 0.40 },
            { name: "Bell pepper", amount: "½ pepper", qty: 0.5, unit: "each", category: "produce", estPrice: 0.45 },
            { name: "Whole wheat bread", amount: "2 slices", qty: 2, unit: "slice", category: "grains", estPrice: 0.40 },
            { name: "Olive oil", amount: "1 tsp", qty: 1, unit: "tsp", category: "pantry", estPrice: 0.10 },
          ],
        },
        {
          id: "rb2",
          name: "Overnight Oats",
          prepTime: "5 min (night before)",
          tags: ["meal-prep", "no-cook", "high-fiber"],
          cal: 380, p: 18, c: 50, f: 12,
          instructions: "Night before: mix oats, milk, chia seeds, and almond butter in a jar. Refrigerate. Morning: top with blueberries and eat cold or warm in microwave.",
          items: [
            { name: "Rolled oats", amount: "½ cup dry", qty: 0.5, unit: "cup", category: "grains", estPrice: 0.20 },
            { name: "Low-fat milk", amount: "¾ cup", qty: 0.75, unit: "cup", category: "dairy", estPrice: 0.30 },
            { name: "Chia seeds", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
            { name: "Almond butter", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.40 },
            { name: "Blueberries", amount: "½ cup", qty: 0.5, unit: "cup", category: "produce", estPrice: 0.75 },
          ],
        },
        {
          id: "rb3",
          name: "Avocado Toast + Poached Eggs",
          prepTime: "12 min",
          tags: ["trending", "healthy fat"],
          cal: 420, p: 22, c: 36, f: 20,
          instructions: "Toast bread. Mash avocado with lemon, salt, red pepper flakes. Poach eggs 3 min in simmering water. Layer avocado on toast, top with eggs.",
          items: [
            { name: "Whole wheat bread", amount: "2 slices", qty: 2, unit: "slice", category: "grains", estPrice: 0.40 },
            { name: "Avocado", amount: "½ medium", qty: 0.5, unit: "each", category: "produce", estPrice: 0.80 },
            { name: "Eggs, large", amount: "2 eggs", qty: 2, unit: "each", category: "dairy", estPrice: 0.60 },
            { name: "Lemon", amount: "¼ lemon", qty: 0.25, unit: "each", category: "produce", estPrice: 0.20 },
            { name: "Red pepper flakes", amount: "pinch", qty: 1, unit: "pinch", category: "pantry", estPrice: 0.01 },
          ],
        },
        {
          id: "rb4",
          name: "Protein Smoothie Bowl",
          prepTime: "5 min",
          tags: ["no-cook", "quick", "post-workout feel"],
          cal: 360, p: 28, c: 44, f: 6,
          instructions: "Blend protein powder, frozen berries, banana, and almond milk until very thick (use minimal liquid). Pour into bowl, top with granola and chia seeds.",
          items: [
            { name: "Whey protein powder", amount: "1 scoop", qty: 1, unit: "scoop", category: "supplements", estPrice: 1.50 },
            { name: "Frozen mixed berries", amount: "¾ cup", qty: 0.75, unit: "cup", category: "frozen", estPrice: 0.80 },
            { name: "Banana", amount: "½ medium (frozen)", qty: 0.5, unit: "each", category: "produce", estPrice: 0.13 },
            { name: "Unsweetened almond milk", amount: "¼ cup", qty: 0.25, unit: "cup", category: "dairy", estPrice: 0.10 },
            { name: "Low-sugar granola", amount: "2 tbsp", qty: 2, unit: "tbsp", category: "grains", estPrice: 0.30 },
            { name: "Chia seeds", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
          ],
        },
      ],
    },

    lunch: {
      label: "Lunch",
      time: "1–2 PM",
      icon: "🥗",
      note: "Slightly fewer carbs than training days. Keep protein high; this is still a recovery day.",
      options: [
        {
          id: "rl1",
          name: "Turkey Lentil Bowl",
          prepTime: "20 min",
          tags: ["high-fiber", "meal-prep"],
          cal: 490, p: 38, c: 44, f: 10,
          instructions: "Brown turkey with garlic, cumin, salt. Cook lentils until just tender. Roast sweet potato. Serve over fresh spinach.",
          items: [
            { name: "Ground turkey (93% lean)", amount: "4 oz", qty: 4, unit: "oz", category: "protein", estPrice: 1.40 },
            { name: "Lentils (dry)", amount: "¼ cup dry", qty: 0.25, unit: "cup", category: "canned", estPrice: 0.30 },
            { name: "Sweet potato", amount: "½ medium", qty: 0.5, unit: "each", category: "produce", estPrice: 0.50 },
            { name: "Baby spinach", amount: "2 cups", qty: 2, unit: "cup", category: "produce", estPrice: 0.40 },
            { name: "Garlic (minced)", amount: "1 clove", qty: 1, unit: "clove", category: "produce", estPrice: 0.05 },
          ],
        },
        {
          id: "rl2",
          name: "Big Tuna Salad",
          prepTime: "5 min",
          tags: ["no-cook", "quick", "low-calorie"],
          cal: 290, p: 30, c: 10, f: 12,
          instructions: "Drain tuna. Toss with mixed greens, sliced cucumber, cherry tomatoes, olive oil, and lemon juice. Season with salt and pepper.",
          items: [
            { name: "Canned tuna in water", amount: "1 can (5 oz)", qty: 1, unit: "can", category: "canned", estPrice: 1.20 },
            { name: "Mixed greens", amount: "3 cups", qty: 3, unit: "cup", category: "produce", estPrice: 0.70 },
            { name: "Cucumber", amount: "½ cucumber", qty: 0.5, unit: "each", category: "produce", estPrice: 0.40 },
            { name: "Cherry tomatoes", amount: "½ cup", qty: 0.5, unit: "cup", category: "produce", estPrice: 0.70 },
            { name: "Olive oil", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
            { name: "Lemon", amount: "½ lemon", qty: 0.5, unit: "each", category: "produce", estPrice: 0.30 },
          ],
        },
        {
          id: "rl3",
          name: "Chicken Veggie Soup",
          prepTime: "30 min",
          tags: ["meal-prep", "anti-inflammatory"],
          cal: 280, p: 32, c: 18, f: 6,
          instructions: "Simmer diced chicken, celery, carrots, and onion in broth for 20 min. Add spinach last 2 min. Season with salt, pepper, thyme.",
          items: [
            { name: "Chicken breast", amount: "4 oz diced", qty: 4, unit: "oz", category: "protein", estPrice: 1.45 },
            { name: "Low-sodium chicken broth", amount: "2 cups", qty: 2, unit: "cup", category: "canned", estPrice: 0.60 },
            { name: "Celery", amount: "2 stalks", qty: 2, unit: "stalk", category: "produce", estPrice: 0.20 },
            { name: "Carrots", amount: "2 medium", qty: 2, unit: "each", category: "produce", estPrice: 0.30 },
            { name: "Yellow onion", amount: "½ onion", qty: 0.5, unit: "each", category: "produce", estPrice: 0.30 },
            { name: "Baby spinach", amount: "1 cup", qty: 1, unit: "cup", category: "produce", estPrice: 0.30 },
          ],
        },
        {
          id: "rl4",
          name: "Black Bean Rice Bowl",
          prepTime: "10 min",
          tags: ["plant-based", "budget-friendly"],
          cal: 420, p: 18, c: 58, f: 10,
          instructions: "Warm black beans with cumin and garlic powder. Serve over rice. Top with sliced avocado, salsa, and a dollop of Greek yogurt in place of sour cream.",
          items: [
            { name: "Black beans (canned)", amount: "½ cup drained", qty: 0.5, unit: "cup", category: "canned", estPrice: 0.30 },
            { name: "Brown rice", amount: "½ cup dry", qty: 0.5, unit: "cup dry", category: "grains", estPrice: 0.20 },
            { name: "Avocado", amount: "¼ medium", qty: 0.25, unit: "each", category: "produce", estPrice: 0.40 },
            { name: "Salsa", amount: "¼ cup", qty: 0.25, unit: "cup", category: "pantry", estPrice: 0.20 },
            { name: "Plain Greek yogurt (0%)", amount: "2 tbsp", qty: 2, unit: "tbsp", category: "dairy", estPrice: 0.25 },
          ],
        },
      ],
    },

    dinner: {
      label: "Dinner",
      time: "6–7 PM",
      icon: "🍽️",
      note: "Lighter carbs than training day dinner. Protein stays high. Let your body recover.",
      options: [
        {
          id: "rdi1",
          name: "Shrimp Stir-Fry",
          prepTime: "20 min",
          tags: ["quick", "low-calorie"],
          cal: 420, p: 32, c: 42, f: 10,
          instructions: "Cook rice. Stir-fry shrimp over high heat 2 min per side. Remove shrimp, stir-fry cabbage and bell pepper 4 min. Return shrimp, add soy sauce and sesame oil, toss.",
          items: [
            { name: "Shrimp (raw, peeled)", amount: "5 oz", qty: 5, unit: "oz", category: "frozen", estPrice: 2.50 },
            { name: "Cabbage (green)", amount: "2 cups shredded", qty: 2, unit: "cup", category: "produce", estPrice: 0.30 },
            { name: "Bell pepper", amount: "1 large", qty: 1, unit: "each", category: "produce", estPrice: 0.90 },
            { name: "Brown rice", amount: "½ cup dry", qty: 0.5, unit: "cup dry", category: "grains", estPrice: 0.20 },
            { name: "Low-sodium soy sauce", amount: "2 tbsp", qty: 2, unit: "tbsp", category: "pantry", estPrice: 0.15 },
            { name: "Sesame oil", amount: "1 tsp", qty: 1, unit: "tsp", category: "pantry", estPrice: 0.15 },
          ],
        },
        {
          id: "rdi2",
          name: "Baked Salmon + Broccoli",
          prepTime: "22 min",
          tags: ["omega-3", "simple", "high-protein"],
          cal: 380, p: 36, c: 10, f: 18,
          instructions: "Place salmon on foil-lined baking sheet. Drizzle with olive oil, lemon, garlic. Surround with broccoli florets. Bake at 400°F for 14–16 min.",
          items: [
            { name: "Salmon fillet", amount: "5 oz", qty: 5, unit: "oz", category: "protein", estPrice: 3.50 },
            { name: "Broccoli", amount: "2 cups florets", qty: 2, unit: "cup", category: "produce", estPrice: 0.70 },
            { name: "Lemon", amount: "½ lemon", qty: 0.5, unit: "each", category: "produce", estPrice: 0.30 },
            { name: "Garlic (minced)", amount: "2 cloves", qty: 2, unit: "clove", category: "produce", estPrice: 0.10 },
            { name: "Olive oil", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.20 },
          ],
        },
        {
          id: "rdi3",
          name: "Turkey Meatballs + Zucchini Noodles",
          prepTime: "25 min",
          tags: ["low-carb", "comfort food"],
          cal: 380, p: 36, c: 18, f: 14,
          instructions: "Mix turkey with egg, garlic, Italian seasoning. Form into balls and bake at 400°F for 18 min. Spiralize or ribbon zucchini, sauté 2 min. Warm marinara, plate everything.",
          items: [
            { name: "Ground turkey (93% lean)", amount: "5 oz", qty: 5, unit: "oz", category: "protein", estPrice: 1.75 },
            { name: "Zucchini", amount: "2 medium", qty: 2, unit: "each", category: "produce", estPrice: 1.20 },
            { name: "Marinara sauce (low sugar)", amount: "½ cup", qty: 0.5, unit: "cup", category: "canned", estPrice: 0.50 },
            { name: "Eggs, large", amount: "1 egg", qty: 1, unit: "each", category: "dairy", estPrice: 0.30 },
            { name: "Garlic (minced)", amount: "2 cloves", qty: 2, unit: "clove", category: "produce", estPrice: 0.10 },
          ],
        },
        {
          id: "rdi4",
          name: "Light Chicken Curry",
          prepTime: "25 min",
          tags: ["anti-inflammatory", "warming"],
          cal: 420, p: 38, c: 28, f: 12,
          instructions: "Cook chicken in skillet, set aside. Sauté onion and garlic, add curry powder and turmeric. Pour in coconut milk, add cauliflower and spinach. Simmer 10 min, return chicken. Serve over small portion of rice.",
          items: [
            { name: "Chicken breast", amount: "5 oz diced", qty: 5, unit: "oz", category: "protein", estPrice: 1.80 },
            { name: "Light coconut milk", amount: "½ cup", qty: 0.5, unit: "cup", category: "canned", estPrice: 0.70 },
            { name: "Cauliflower", amount: "1.5 cups florets", qty: 1.5, unit: "cup", category: "produce", estPrice: 0.60 },
            { name: "Baby spinach", amount: "1 cup", qty: 1, unit: "cup", category: "produce", estPrice: 0.30 },
            { name: "Yellow onion", amount: "½ onion", qty: 0.5, unit: "each", category: "produce", estPrice: 0.30 },
            { name: "Garlic (minced)", amount: "2 cloves", qty: 2, unit: "clove", category: "produce", estPrice: 0.10 },
            { name: "Curry powder", amount: "1.5 tsp", qty: 1.5, unit: "tsp", category: "pantry", estPrice: 0.05 },
            { name: "Brown rice", amount: "¼ cup dry", qty: 0.25, unit: "cup dry", category: "grains", estPrice: 0.10 },
          ],
        },
      ],
    },

    snack: {
      label: "Evening Snack",
      time: "Optional — before bed",
      icon: "🌙",
      note: "Keep it light on rest days. Focus on slow protein or skip entirely if not hungry.",
      options: [
        {
          id: "rs1",
          name: "Cottage Cheese + Walnuts",
          prepTime: "1 min",
          tags: ["casein", "omega-3"],
          cal: 180, p: 15, c: 6, f: 10,
          instructions: "Top cottage cheese with walnut halves. Casein protein + anti-inflammatory omega-3s from walnuts.",
          items: [
            { name: "Low-fat cottage cheese", amount: "½ cup", qty: 0.5, unit: "cup", category: "dairy", estPrice: 0.80 },
            { name: "Walnuts", amount: "6 halves", qty: 6, unit: "each", category: "pantry", estPrice: 0.40 },
          ],
        },
        {
          id: "rs2",
          name: "Apple + Almond Butter",
          prepTime: "1 min",
          tags: ["whole food", "fiber"],
          cal: 160, p: 4, c: 24, f: 7,
          instructions: "Slice apple. Dip in almond butter. Simple, satisfying, minimal insulin spike.",
          items: [
            { name: "Apple", amount: "1 medium", qty: 1, unit: "each", category: "produce", estPrice: 0.50 },
            { name: "Almond butter", amount: "1 tbsp", qty: 1, unit: "tbsp", category: "pantry", estPrice: 0.40 },
          ],
        },
        {
          id: "rs3",
          name: "String Cheese + Cucumber",
          prepTime: "1 min",
          tags: ["quick", "portable"],
          cal: 140, p: 14, c: 5, f: 8,
          instructions: "Eat string cheese with sliced cucumber. Light, high-protein, satisfying without being heavy.",
          items: [
            { name: "String cheese (mozzarella)", amount: "2 sticks", qty: 2, unit: "each", category: "dairy", estPrice: 0.70 },
            { name: "Cucumber", amount: "1 cup sliced", qty: 1, unit: "cup", category: "produce", estPrice: 0.40 },
          ],
        },
      ],
    },
  },
};

// ── Helper: flatten all ingredients from a set of selected meals ──────────────
// selectedMeals: { slotKey: mealOption } object
// dayType: "training" | "rest"
// servings: number (multiplier)
export function buildIngredientList(dayType, selectedMeals, servings = 1) {
  const aggregated = {};

  for (const [slotKey, option] of Object.entries(selectedMeals)) {
    if (!option) continue;
    for (const item of option.items) {
      const key = item.name.toLowerCase();
      if (aggregated[key]) {
        aggregated[key].qty += item.qty * servings;
        aggregated[key].estPrice += item.estPrice * servings;
      } else {
        aggregated[key] = {
          ...item,
          qty: item.qty * servings,
          estPrice: item.estPrice * servings,
          sources: [slotKey],
        };
      }
    }
  }

  // Group by category
  const grouped = {};
  for (const item of Object.values(aggregated)) {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  }

  return grouped;
}

// Major grocery chain weekly ad links (accurate as of 2025)
export const STORE_ADS = [
  { name: "Kroger", url: "https://www.kroger.com/weeklyad", regions: "Midwest, South, West" },
  { name: "Publix", url: "https://www.publix.com/savings/weekly-ad", regions: "Southeast" },
  { name: "ALDI", url: "https://www.aldi.us/en/weekly-specials/", regions: "Nationwide" },
  { name: "Walmart", url: "https://www.walmart.com/shop/deals/grocery", regions: "Nationwide" },
  { name: "Target", url: "https://www.target.com/c/weekly-ad-target/-/N-5q0ev", regions: "Nationwide" },
  { name: "Food Lion", url: "https://www.foodlion.com/weekly-specials/", regions: "Southeast" },
  { name: "Harris Teeter", url: "https://www.harristeeter.com/savings/weekly-specials", regions: "Southeast" },
  { name: "Trader Joe's", url: "https://www.traderjoes.com/home/fearless-flyer", regions: "Major cities" },
  { name: "Sprouts", url: "https://www.sprouts.com/deals/weekly-ad/", regions: "South, West, Midwest" },
  { name: "Whole Foods", url: "https://www.wholefoodsmarket.com/sales-flyer", regions: "Major cities" },
  { name: "Costco", url: "https://www.costco.com/warehouse-specials.html", regions: "Nationwide (bulk)" },
  { name: "Sam's Club", url: "https://www.samsclub.com/savings", regions: "Nationwide (bulk)" },
];
