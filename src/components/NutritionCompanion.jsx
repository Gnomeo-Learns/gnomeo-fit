import { useState } from "react";

const SECTIONS = ["Calculator", "Macros", "Foods", "Meal Plans", "Timing", "Habits"];

const foodGroups = [
  {
    label: "Protein Sources",
    color: "#f97316",
    emoji: "🥩",
    desc: "Build and preserve muscle during fat loss. Eat these at every meal.",
    items: [
      { name: "Chicken breast", per: "3.5 oz", cal: 165, p: 31, c: 0, f: 4, note: "Lean, versatile, cheap" },
      { name: "Canned tuna", per: "1 can (5oz)", cal: 120, p: 26, c: 0, f: 1, note: "Easiest high-protein food" },
      { name: "Eggs (whole)", per: "2 large", cal: 140, p: 12, c: 1, f: 10, note: "Most complete protein" },
      { name: "Greek yogurt (plain, 0%)", per: "1 cup", cal: 100, p: 17, c: 6, f: 0, note: "Doubles as snack or breakfast" },
      { name: "Cottage cheese (low fat)", per: "1 cup", cal: 180, p: 26, c: 8, f: 3, note: "High casein — great before bed" },
      { name: "Ground turkey (93%)", per: "4 oz", cal: 170, p: 22, c: 0, f: 9, note: "Meal-prep friendly" },
      { name: "Salmon", per: "4 oz", cal: 200, p: 28, c: 0, f: 10, note: "Omega-3s aid recovery" },
      { name: "Shrimp", per: "4 oz", cal: 112, p: 24, c: 1, f: 1, note: "Very low calorie, high protein" },
      { name: "Edamame", per: "1 cup", cal: 189, p: 17, c: 16, f: 8, note: "Plant-based complete protein" },
      { name: "Protein powder (whey)", per: "1 scoop", cal: 120, p: 25, c: 3, f: 2, note: "Convenient gap-filler, not a staple" },
    ],
  },
  {
    label: "Complex Carbs",
    color: "#facc15",
    emoji: "🌾",
    desc: "Fuel your workouts and daily function. Prioritize fiber-rich, whole food sources.",
    items: [
      { name: "Brown rice", per: "1 cup cooked", cal: 215, p: 5, c: 45, f: 2, note: "Meal prep staple" },
      { name: "Oats (rolled)", per: "½ cup dry", cal: 150, p: 5, c: 27, f: 3, note: "Best breakfast for satiety" },
      { name: "Sweet potato", per: "1 medium", cal: 105, p: 2, c: 24, f: 0, note: "High fiber, micronutrient dense" },
      { name: "Quinoa", per: "1 cup cooked", cal: 220, p: 8, c: 39, f: 4, note: "Protein + carb combo" },
      { name: "Whole wheat bread", per: "2 slices", cal: 160, p: 8, c: 28, f: 2, note: "Fast, convenient" },
      { name: "Lentils", per: "1 cup cooked", cal: 230, p: 18, c: 40, f: 1, note: "Fiber + protein powerhouse" },
      { name: "Black beans", per: "½ cup", cal: 115, p: 8, c: 20, f: 0, note: "Cheap, filling" },
      { name: "Banana", per: "1 medium", cal: 105, p: 1, c: 27, f: 0, note: "Best pre-workout carb" },
    ],
  },
  {
    label: "Vegetables",
    color: "#4ade80",
    emoji: "🥦",
    desc: "Eat as much of these as you want. They add volume and nutrients with almost no calories.",
    items: [
      { name: "Broccoli", per: "1 cup", cal: 55, p: 4, c: 11, f: 1, note: "Cook it — easier to eat large amounts" },
      { name: "Spinach", per: "2 cups raw", cal: 14, p: 2, c: 2, f: 0, note: "Basically free calories — put it in everything" },
      { name: "Bell peppers", per: "1 large", cal: 45, p: 2, c: 9, f: 0, note: "High vitamin C, great raw or cooked" },
      { name: "Cucumber", per: "1 cup", cal: 16, p: 1, c: 4, f: 0, note: "Great for volume eating" },
      { name: "Cabbage", per: "2 cups", cal: 44, p: 2, c: 10, f: 0, note: "Very cheap, extremely filling" },
      { name: "Zucchini", per: "1 medium", cal: 33, p: 2, c: 6, f: 0, note: "Goes with almost any protein" },
      { name: "Mushrooms", per: "1 cup", cal: 21, p: 3, c: 3, f: 0, note: "Adds umami and texture" },
    ],
  },
  {
    label: "Healthy Fats",
    color: "#a78bfa",
    emoji: "🥑",
    desc: "Don't fear fat — it's essential. Just portion it since it's calorie-dense.",
    items: [
      { name: "Avocado", per: "½ medium", cal: 120, p: 1, c: 6, f: 11, note: "Don't overdo it — calorie-dense" },
      { name: "Olive oil", per: "1 tbsp", cal: 120, p: 0, c: 0, f: 14, note: "Use for cooking or dressing" },
      { name: "Almonds", per: "1 oz (≈23)", cal: 164, p: 6, c: 6, f: 14, note: "Easy snack — portion is key" },
      { name: "Peanut butter (natural)", per: "2 tbsp", cal: 190, p: 8, c: 7, f: 16, note: "Satisfying but watch portions" },
      { name: "Chia seeds", per: "2 tbsp", cal: 140, p: 5, c: 12, f: 9, note: "Add to yogurt or oats" },
      { name: "Walnuts", per: "1 oz", cal: 185, p: 4, c: 4, f: 18, note: "Anti-inflammatory omega-3s" },
    ],
  },
];

const mealPlans = [
  {
    label: "Training Day",
    color: "#f97316",
    note: "Higher carbs around workout. Protein at every meal.",
    meals: [
      {
        time: "Breakfast (7–8 AM)",
        name: "Oats + Egg Bowl",
        items: ["½ cup rolled oats (cooked)", "1 scoop protein powder stirred in OR 2 scrambled eggs on side", "1 banana", "Black coffee or water"],
        cal: 480, p: 35, c: 58, f: 8,
      },
      {
        time: "Lunch (12–1 PM)",
        name: "Chicken Rice Bowl",
        items: ["5 oz grilled chicken breast", "1 cup brown rice", "1 cup broccoli (steamed)", "1 tbsp olive oil + seasoning"],
        cal: 540, p: 48, c: 52, f: 11,
      },
      {
        time: "Pre-Workout Snack (4–5 PM)",
        name: "Quick Fuel",
        items: ["1 banana", "½ cup Greek yogurt (plain)", "Optional: 1 tbsp peanut butter"],
        cal: 230, p: 12, c: 34, f: 4,
      },
      {
        time: "Post-Workout Dinner (7–8 PM)",
        name: "Salmon + Veg",
        items: ["5 oz salmon fillet", "1 cup roasted zucchini + bell peppers", "½ cup quinoa", "2 cups spinach salad with lemon juice"],
        cal: 520, p: 42, c: 38, f: 16,
      },
      {
        time: "Optional Evening Snack",
        name: "Cottage Cheese Bowl",
        items: ["½ cup low-fat cottage cheese", "Dash of cinnamon", "Skip if not hungry"],
        cal: 90, p: 13, c: 4, f: 2,
      },
    ],
    totals: { cal: 1860, p: 150, c: 186, f: 41 },
  },
  {
    label: "Rest Day",
    color: "#4ade80",
    note: "Slightly fewer carbs, maintain protein. Don't undereat — recovery happens today.",
    meals: [
      {
        time: "Breakfast (8–9 AM)",
        name: "Egg & Veggie Scramble",
        items: ["3 whole eggs scrambled", "1 cup spinach + mushrooms cooked in", "1 slice whole wheat toast", "Black coffee or water"],
        cal: 380, p: 28, c: 24, f: 18,
      },
      {
        time: "Lunch (1–2 PM)",
        name: "Turkey Lentil Bowl",
        items: ["4 oz ground turkey", "½ cup cooked lentils", "½ cup roasted sweet potato", "Big handful of greens"],
        cal: 490, p: 38, c: 44, f: 10,
      },
      {
        time: "Afternoon Snack (3–4 PM)",
        name: "Simple Protein Snack",
        items: ["1 can tuna (drained)", "Cucumber slices + mustard", "OR: Greek yogurt + chia seeds"],
        cal: 160, p: 28, c: 5, f: 2,
      },
      {
        time: "Dinner (6–7 PM)",
        name: "Shrimp Stir-Fry",
        items: ["5 oz shrimp", "2 cups cabbage + bell peppers", "1 tbsp olive oil", "½ cup brown rice"],
        cal: 440, p: 32, c: 44, f: 12,
      },
      {
        time: "Optional Evening",
        name: "Cottage Cheese",
        items: ["½ cup cottage cheese", "5–6 almonds on top"],
        cal: 140, p: 15, c: 5, f: 6,
      },
    ],
    totals: { cal: 1610, p: 141, c: 122, f: 48 },
  },
];

const timingRules = [
  {
    icon: "🕐",
    title: "Pre-Workout (60–90 min before)",
    color: "#facc15",
    points: [
      "Eat a small carb + protein snack — banana + Greek yogurt is ideal",
      "Avoid heavy fat or fiber right before — slows digestion",
      "Don't train fasted unless you're comfortable with it; energy tanks and intensity suffers",
    ],
  },
  {
    icon: "⚡",
    title: "Post-Workout (within 60 min)",
    color: "#f97316",
    points: [
      "Protein within 60 min — this is your muscle repair window",
      "Pair with fast carbs (white rice, banana) if you trained hard",
      "A shake counts — protein + a piece of fruit is perfectly fine",
    ],
  },
  {
    icon: "🌙",
    title: "Before Bed",
    color: "#a78bfa",
    points: [
      "Cottage cheese or Greek yogurt are excellent — high in casein (slow-digesting protein)",
      "Avoid large meals — digestion disrupts sleep",
      "If hungry: protein snack only. Avoid high carbs at night.",
    ],
  },
  {
    icon: "☀️",
    title: "Morning / Breakfast",
    color: "#4ade80",
    points: [
      "Don't skip it — sets the protein pace for the day",
      "High protein breakfast reduces hunger and cravings all day (research-backed)",
      "Oats + eggs or Greek yogurt are fast, cheap, and effective",
    ],
  },
  {
    icon: "💧",
    title: "Hydration",
    color: "#38bdf8",
    points: [
      "Target half your bodyweight in ounces per day (e.g., 200 lb = 100 oz)",
      "Drink 16 oz water immediately when you wake up — sets the tone",
      "Hunger and thirst signals overlap — drink before you snack",
      "Black coffee and plain tea count toward intake",
    ],
  },
];

const habits = [
  { icon: "📏", title: "Track for 2 weeks, then estimate", body: "You don't need to count calories forever. Tracking for 2 weeks builds accurate portion intuition. After that, you know what a 500-calorie meal looks like." },
  { icon: "🍽️", title: "Protein first on the plate", body: "When you sit down to eat, start with your protein source. By the time you're halfway through it, you're already fuller, and you eat less of everything else." },
  { icon: "🧱", title: "Meal prep Sunday and Wednesday", body: "Cook a batch of rice, protein, and veggies twice a week. When food is ready, you eat well. When it's not, you make bad decisions. Prep is the real strategy." },
  { icon: "🚫", title: "Liquid calories are a silent killer", body: "Juice, sweet coffee drinks, soda, sports drinks — they don't register as food. A single Starbucks latte can cost 250+ calories and leave you just as hungry. Stick to black coffee, tea, and water." },
  { icon: "🔁", title: "Rotate 5–6 meals you actually like", body: "Fat loss isn't about variety — it's about predictability. Find 5 meals you genuinely enjoy that hit your macros and rotate them. Decision fatigue kills compliance." },
  { icon: "📉", title: "Weigh yourself weekly, not daily", body: "Daily weight swings 2–5 lbs based on water, sodium, and digestion. Weekly averages tell the real story. Weigh yourself same day, same time, same conditions." },
  { icon: "🍕", title: "The 90% rule", body: "Eat on plan 90% of the time. One meal out, one beer, one slice of pizza doesn't break anything. Guilt-spiraling into a whole week off is what breaks things." },
  { icon: "💤", title: "Sleep is nutrition", body: "Sleep-deprived bodies produce more ghrelin (hunger hormone) and less leptin (fullness hormone). Poor sleep makes fat loss measurably harder — 7–9 hours is not optional." },
];

function MacroBar({ p, c, f }) {
  const total = p * 4 + c * 4 + f * 9;
  const pPct = Math.round((p * 4 / total) * 100);
  const cPct = Math.round((c * 4 / total) * 100);
  const fPct = Math.round((f * 9 / total) * 100);
  return (
    <div style={{ marginTop: "6px" }}>
      <div style={{ display: "flex", height: "6px", borderRadius: "3px", overflow: "hidden", gap: "2px" }}>
        <div style={{ width: `${pPct}%`, background: "#f97316", borderRadius: "3px 0 0 3px" }} />
        <div style={{ width: `${cPct}%`, background: "#facc15" }} />
        <div style={{ width: `${fPct}%`, background: "#a78bfa", borderRadius: "0 3px 3px 0" }} />
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "4px", fontSize: "10px", color: "#64748b", fontFamily: "'Courier New', monospace" }}>
        <span style={{ color: "#f97316" }}>P {p}g</span>
        <span style={{ color: "#facc15" }}>C {c}g</span>
        <span style={{ color: "#a78bfa" }}>F {f}g</span>
      </div>
    </div>
  );
}

function Calculator() {
  const [weight, setWeight] = useState(200);
  const [height, setHeight] = useState(70);
  const [age, setAge] = useState(35);
  const [sex, setSex] = useState("male");
  const [activity, setActivity] = useState(1.375);
  const [goal, setGoal] = useState(-400);
  const [showMacros, setShowMacros] = useState(false);

  const bmr = sex === "male"
    ? 10 * (weight * 0.453592) + 6.25 * (height * 2.54) - 5 * age + 5
    : 10 * (weight * 0.453592) + 6.25 * (height * 2.54) - 5 * age - 161;
  const tdee = Math.round(bmr * activity);
  const target = tdee + goal;
  const protein = Math.round(weight * 0.85);
  const fat = Math.round(weight * 0.35);
  const carbCals = target - (protein * 4) - (fat * 9);
  const carbs = Math.round(carbCals / 4);

  const inputStyle = {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#e2e8f0",
    fontSize: "14px",
    width: "100%",
    boxSizing: "border-box",
  };
  const labelStyle = { color: "#94a3b8", fontSize: "12px", marginBottom: "4px", display: "block" };

  return (
    <div>
      <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px", lineHeight: 1.6 }}>
        This uses the <strong style={{ color: "#94a3b8" }}>Mifflin-St Jeor equation</strong> — the most validated formula for estimating calorie needs. Results are estimates; adjust by ±100 cal based on real-world weight changes over 2 weeks.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
        <div>
          <label style={labelStyle}>Weight (lbs)</label>
          <input type="number" value={weight} onChange={e => setWeight(+e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Height (inches)</label>
          <input type="number" value={height} onChange={e => setHeight(+e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Age</label>
          <input type="number" value={age} onChange={e => setAge(+e.target.value)} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Biological Sex</label>
          <select value={sex} onChange={e => setSex(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: "14px" }}>
        <label style={labelStyle}>Activity Level</label>
        <select value={activity} onChange={e => setActivity(+e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value={1.2}>Sedentary (desk job, little exercise)</option>
          <option value={1.375}>Lightly active (1–3 workouts/week) ← Start here</option>
          <option value={1.55}>Moderately active (3–5 workouts/week)</option>
          <option value={1.725}>Very active (hard training 6–7 days)</option>
        </select>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Calorie Goal Adjustment</label>
        <select value={goal} onChange={e => setGoal(+e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
          <option value={-500}>Aggressive cut (−500 cal) — faster loss, harder to sustain</option>
          <option value={-400}>Moderate cut (−400 cal) ← Recommended</option>
          <option value={-250}>Conservative cut (−250 cal) — slow, sustainable</option>
          <option value={0}>Maintenance (0) — recomp / just starting out</option>
        </select>
      </div>

      {/* Results */}
      <div style={{
        background: "linear-gradient(135deg, #0f2744, #0f172a)",
        border: "1px solid #1e3a5f",
        borderRadius: "12px",
        padding: "20px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "16px" }}>
          {[
            { label: "BMR", value: Math.round(bmr), sub: "Base burn (at rest)" },
            { label: "TDEE", value: tdee, sub: "Total daily burn" },
            { label: "Target", value: target, sub: "Your daily goal", highlight: true },
          ].map(item => (
            <div key={item.label} style={{
              background: item.highlight ? "#1e3a5f" : "#0a1628",
              borderRadius: "8px",
              padding: "14px",
              textAlign: "center",
              border: item.highlight ? "1px solid #3b82f6" : "1px solid #1e293b",
            }}>
              <div style={{ color: item.highlight ? "#60a5fa" : "#475569", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "6px" }}>
                {item.label}
              </div>
              <div style={{ color: item.highlight ? "#93c5fd" : "#94a3b8", fontSize: "24px", fontWeight: "700", fontFamily: "'Courier New', monospace" }}>
                {item.value}
              </div>
              <div style={{ color: "#334155", fontSize: "10px", marginTop: "2px" }}>{item.sub}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowMacros(!showMacros)}
          style={{
            width: "100%",
            background: "#1e40af",
            border: "none",
            borderRadius: "8px",
            padding: "10px",
            color: "#bfdbfe",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {showMacros ? "Hide" : "Show"} Macro Breakdown →
        </button>

        {showMacros && (
          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {[
              { label: "Protein", value: protein, unit: "g/day", color: "#f97316", note: `~${Math.round(protein / 3)}g per meal` },
              { label: "Carbs", value: Math.max(carbs, 50), unit: "g/day", color: "#facc15", note: "More on training days" },
              { label: "Fat", value: fat, unit: "g/day", color: "#a78bfa", note: "From whole food sources" },
            ].map(m => (
              <div key={m.label} style={{
                background: "#0a1628",
                borderRadius: "8px",
                padding: "12px",
                border: `1px solid ${m.color}33`,
                textAlign: "center",
              }}>
                <div style={{ color: m.color, fontSize: "22px", fontWeight: "700", fontFamily: "'Courier New', monospace" }}>
                  {m.value}g
                </div>
                <div style={{ color: "#94a3b8", fontSize: "11px", marginTop: "2px" }}>{m.label}</div>
                <div style={{ color: "#475569", fontSize: "10px", marginTop: "4px" }}>{m.note}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function NutritionCompanion() {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedFood, setExpandedFood] = useState(null);
  const [expandedMeal, setExpandedMeal] = useState(null);
  const [activeMealPlan, setActiveMealPlan] = useState(0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e8f0",
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0f1a0f 0%, #0a0a0f 100%)",
        borderBottom: "1px solid #1a2e1a",
        padding: "32px 24px 24px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#4b5563", marginBottom: "8px", fontFamily: "'Courier New', monospace" }}>
          Nutrition Companion
        </div>
        <h1 style={{ fontSize: "clamp(26px, 5vw, 38px)", fontWeight: "400", margin: "0 0 8px", letterSpacing: "-0.02em" }}>
          Fuel for Fat Loss
        </h1>
        <p style={{ color: "#4b5563", margin: 0, fontSize: "13px" }}>
          Paired with your calisthenics program · Evidence-based, no gimmicks
        </p>
      </div>

      {/* Nav */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{
          display: "flex",
          gap: "4px",
          overflowX: "auto",
          padding: "16px 0",
          scrollbarWidth: "none",
        }}>
          {SECTIONS.map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveSection(i)}
              style={{
                background: activeSection === i ? "#166534" : "#111827",
                border: activeSection === i ? "1px solid #4ade80" : "1px solid #1f2937",
                borderRadius: "8px",
                padding: "8px 14px",
                cursor: "pointer",
                color: activeSection === i ? "#4ade80" : "#6b7280",
                fontSize: "12px",
                whiteSpace: "nowrap",
                fontFamily: "'Courier New', monospace",
                letterSpacing: "0.05em",
                transition: "all 0.15s",
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div style={{ paddingBottom: "40px" }}>
          {/* CALCULATOR */}
          {activeSection === 0 && (
            <div>
              <div style={{ marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 4px", color: "#4ade80" }}>Calorie & Macro Calculator</h2>
                <p style={{ color: "#64748b", fontSize: "13px", margin: 0 }}>Enter your stats to get personalized targets.</p>
              </div>
              <Calculator />
            </div>
          )}

          {/* MACROS EXPLAINED */}
          {activeSection === 1 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 16px", color: "#4ade80" }}>Understanding Your Macros</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  {
                    name: "Protein", color: "#f97316", cal: "4 cal/g", priority: "🥇 #1 Priority",
                    why: "Protein preserves muscle during fat loss. Without it, your body burns muscle alongside fat — leaving you smaller but soft instead of lean. It's also the most satiating macro, meaning it keeps you fuller longer.",
                    target: "0.7–1g per pound of bodyweight. At 200 lbs, that's 140–200g/day.",
                    myth: "Myth: 'High protein is bad for kidneys.' This is only a concern in people with pre-existing kidney disease. For healthy adults, high protein is safe and beneficial.",
                    foods: "Chicken, eggs, Greek yogurt, cottage cheese, tuna, protein powder",
                  },
                  {
                    name: "Carbohydrates", color: "#facc15", cal: "4 cal/g", priority: "⚡ Workout Fuel",
                    why: "Carbs are your primary energy source during high-intensity work — exactly what calisthenics and HIIT demand. Cutting carbs too aggressively makes workouts feel terrible and recovery suffer.",
                    target: "Fill remaining calories after protein and fat. Prioritize around workouts.",
                    myth: "Myth: 'Carbs make you fat.' Excess calories make you fat. Carbs from whole foods are not the enemy — refined sugars and large portions are.",
                    foods: "Brown rice, oats, sweet potato, banana, beans, lentils, quinoa",
                  },
                  {
                    name: "Fat", color: "#a78bfa", cal: "9 cal/g", priority: "🔑 Essential",
                    why: "Fat is required for hormone production — including testosterone and estrogen, which drive muscle building and fat metabolism. Fat also helps absorb fat-soluble vitamins (A, D, E, K). Don't drop fat below 0.3g/lb.",
                    target: "0.3–0.5g per pound of bodyweight. At 200 lbs, that's 60–100g/day.",
                    myth: "Myth: 'Eating fat makes you fat.' Dietary fat and body fat are not the same thing. Calorie surplus is what drives fat gain, regardless of macro source.",
                    foods: "Avocado, olive oil, almonds, walnuts, salmon, eggs",
                  },
                ].map(m => (
                  <div key={m.name} style={{
                    background: "#111827",
                    border: `1px solid ${m.color}33`,
                    borderRadius: "12px",
                    overflow: "hidden",
                  }}>
                    <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <span style={{ color: m.color, fontWeight: "700", fontSize: "16px" }}>{m.name}</span>
                          <span style={{ background: `${m.color}22`, color: m.color, fontSize: "10px", padding: "2px 8px", borderRadius: "4px", fontFamily: "'Courier New', monospace" }}>
                            {m.cal}
                          </span>
                        </div>
                        <div style={{ color: "#64748b", fontSize: "12px", marginTop: "2px" }}>{m.priority}</div>
                      </div>
                    </div>
                    <div style={{ padding: "0 20px 16px", borderTop: "1px solid #1f2937" }}>
                      <p style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.7, margin: "12px 0 8px" }}>{m.why}</p>
                      <div style={{ background: "#0f172a", borderRadius: "8px", padding: "10px 14px", marginBottom: "8px" }}>
                        <div style={{ color: m.color, fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Target</div>
                        <div style={{ color: "#cbd5e1", fontSize: "13px" }}>{m.target}</div>
                      </div>
                      <div style={{ background: "#0c1a0c", border: "1px solid #14532d", borderRadius: "8px", padding: "10px 14px", marginBottom: "8px" }}>
                        <div style={{ color: "#4ade80", fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>Myth Busted</div>
                        <div style={{ color: "#86efac", fontSize: "13px" }}>{m.myth}</div>
                      </div>
                      <div style={{ color: "#64748b", fontSize: "12px" }}>
                        <span style={{ color: "#475569" }}>Best sources: </span>{m.foods}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOODS */}
          {activeSection === 2 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 16px", color: "#4ade80" }}>Food Reference Guide</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {foodGroups.map((group, gi) => (
                  <div key={gi} style={{ background: "#111827", borderRadius: "12px", overflow: "hidden", border: `1px solid ${group.color}22` }}>
                    <div style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "20px" }}>{group.emoji}</span>
                      <div>
                        <div style={{ color: group.color, fontWeight: "700", fontSize: "15px" }}>{group.label}</div>
                        <div style={{ color: "#64748b", fontSize: "12px" }}>{group.desc}</div>
                      </div>
                    </div>
                    <div style={{ borderTop: `1px solid ${group.color}22` }}>
                      {group.items.map((item, ii) => (
                        <div key={ii}>
                          <button
                            onClick={() => setExpandedFood(expandedFood === `${gi}-${ii}` ? null : `${gi}-${ii}`)}
                            style={{
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              borderBottom: "1px solid #0f172a",
                              padding: "10px 20px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              color: "#e2e8f0",
                              textAlign: "left",
                            }}
                          >
                            <div>
                              <span style={{ fontSize: "14px", fontWeight: "500" }}>{item.name}</span>
                              <span style={{ color: "#64748b", fontSize: "11px", marginLeft: "8px" }}>{item.per}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <span style={{ color: "#475569", fontSize: "12px", fontFamily: "'Courier New', monospace" }}>
                                {item.cal} cal
                              </span>
                              <span style={{ color: "#374151", fontSize: "12px" }}>
                                {expandedFood === `${gi}-${ii}` ? "▲" : "▼"}
                              </span>
                            </div>
                          </button>
                          {expandedFood === `${gi}-${ii}` && (
                            <div style={{ padding: "10px 20px 14px", background: "#0f172a" }}>
                              <MacroBar p={item.p} c={item.c} f={item.f} />
                              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "8px", fontStyle: "italic" }}>
                                💡 {item.note}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MEAL PLANS */}
          {activeSection === 3 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 8px", color: "#4ade80" }}>Sample Meal Plans</h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px", lineHeight: 1.6 }}>
                These are templates, not rules. Mix and match meals across plans. Adjust portions to hit your personal calorie target from the Calculator.
              </p>
              <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                {mealPlans.map((plan, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMealPlan(i)}
                    style={{
                      flex: 1,
                      background: activeMealPlan === i ? `${plan.color}22` : "#111827",
                      border: activeMealPlan === i ? `1px solid ${plan.color}88` : "1px solid #1f2937",
                      borderRadius: "8px",
                      padding: "10px",
                      cursor: "pointer",
                      color: activeMealPlan === i ? plan.color : "#6b7280",
                      fontSize: "13px",
                      fontWeight: "600",
                      transition: "all 0.15s",
                    }}
                  >
                    {plan.label}
                  </button>
                ))}
              </div>

              {(() => {
                const plan = mealPlans[activeMealPlan];
                return (
                  <div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "14px", fontStyle: "italic" }}>
                      {plan.note}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {plan.meals.map((meal, mi) => (
                        <div key={mi} style={{
                          background: "#111827",
                          border: "1px solid #1f2937",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}>
                          <button
                            onClick={() => setExpandedMeal(expandedMeal === mi ? null : mi)}
                            style={{
                              width: "100%",
                              background: "transparent",
                              border: "none",
                              padding: "12px 16px",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              color: "#e2e8f0",
                              textAlign: "left",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: "11px", color: "#64748b", fontFamily: "'Courier New', monospace", marginBottom: "2px" }}>
                                {meal.time}
                              </div>
                              <div style={{ fontWeight: "600", fontSize: "14px" }}>{meal.name}</div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                              <div style={{ color: plan.color, fontSize: "16px", fontWeight: "700", fontFamily: "'Courier New', monospace" }}>
                                {meal.cal}
                              </div>
                              <div style={{ color: "#475569", fontSize: "10px" }}>cal</div>
                            </div>
                          </button>
                          {expandedMeal === mi && (
                            <div style={{ padding: "0 16px 14px", borderTop: "1px solid #1f2937" }}>
                              <ul style={{ margin: "10px 0 10px", paddingLeft: "16px", color: "#94a3b8", fontSize: "13px", lineHeight: 1.8 }}>
                                {meal.items.map((item, idx) => <li key={idx}>{item}</li>)}
                              </ul>
                              <MacroBar p={meal.p} c={meal.c} f={meal.f} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Daily Totals */}
                    <div style={{
                      background: `${plan.color}11`,
                      border: `1px solid ${plan.color}33`,
                      borderRadius: "10px",
                      padding: "14px 18px",
                      marginTop: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}>
                      <div style={{ color: "#94a3b8", fontSize: "13px", fontWeight: "600" }}>Daily Total</div>
                      <div style={{ display: "flex", gap: "16px", fontFamily: "'Courier New', monospace", fontSize: "13px" }}>
                        <span style={{ color: plan.color }}>{plan.totals.cal} cal</span>
                        <span style={{ color: "#f97316" }}>P: {plan.totals.p}g</span>
                        <span style={{ color: "#facc15" }}>C: {plan.totals.c}g</span>
                        <span style={{ color: "#a78bfa" }}>F: {plan.totals.f}g</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* TIMING */}
          {activeSection === 4 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 8px", color: "#4ade80" }}>Nutrient Timing</h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px", lineHeight: 1.6 }}>
                <strong style={{ color: "#94a3b8" }}>Total daily intake matters most.</strong> Timing is secondary — but it does make a real difference for performance and recovery when you get the basics right first.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {timingRules.map((rule, i) => (
                  <div key={i} style={{
                    background: "#111827",
                    border: `1px solid ${rule.color}33`,
                    borderRadius: "12px",
                    padding: "16px 20px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                      <span style={{ fontSize: "20px" }}>{rule.icon}</span>
                      <div style={{ color: rule.color, fontWeight: "700", fontSize: "14px" }}>{rule.title}</div>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {rule.points.map((pt, pi) => (
                        <li key={pi} style={{ color: "#94a3b8", fontSize: "13px", lineHeight: 1.6 }}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* HABITS */}
          {activeSection === 5 && (
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 8px", color: "#4ade80" }}>Habits That Actually Work</h2>
              <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px", lineHeight: 1.6 }}>
                The best diet is the one you follow. These habits close the gap between knowing and doing.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {habits.map((h, i) => (
                  <div key={i} style={{
                    background: "#111827",
                    border: "1px solid #1f2937",
                    borderRadius: "10px",
                    padding: "14px",
                  }}>
                    <div style={{ fontSize: "20px", marginBottom: "6px" }}>{h.icon}</div>
                    <div style={{ color: "#e2e8f0", fontWeight: "600", fontSize: "13px", marginBottom: "6px" }}>{h.title}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", lineHeight: 1.7 }}>{h.body}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
