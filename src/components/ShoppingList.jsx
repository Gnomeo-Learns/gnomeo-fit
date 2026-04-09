import { useState, useMemo } from "react";
import { MEAL_DATA, CATEGORIES, STORE_ADS, buildIngredientList } from "../data/meals.js";

// ─── Price disclaimer shown throughout ───────────────────────────────────────
const PRICE_NOTE = "Prices are US market estimates (2025) and will vary by region and store. Always verify at checkout.";

const RADIUS_OPTIONS = [5, 10, 15, 25, 35];

const BULK_ITEMS = [
  { name: "Chicken breast", bulkNote: "Costco/Sam's: ~$2.99/lb vs ~$4.99/lb retail. Buy 5–6 lb, freeze in portions." },
  { name: "Salmon fillet", bulkNote: "Costco: often $9–12/lb vs $14–18/lb retail. Buy whole side, portion and freeze." },
  { name: "Ground turkey (93% lean)", bulkNote: "Sam's Club: multi-pack often 20–30% cheaper. Freeze unused portions." },
  { name: "Rolled oats", bulkNote: "Costco 10 lb bag: ~$0.09/oz vs ~$0.18/oz retail. Oats last 1–2 years." },
  { name: "Brown rice", bulkNote: "Costco 25 lb bag: ~$0.05/oz vs ~$0.12/oz retail. Stores indefinitely sealed." },
  { name: "Quinoa", bulkNote: "Costco: ~30% savings per pound. Keeps 2–3 years sealed." },
  { name: "Whey protein powder", bulkNote: "Costco carries Kirkland whey: ~$0.80–0.90/serving vs $1.20–1.80+ retail." },
  { name: "Almond butter", bulkNote: "Costco 2-pack: often $10–12 vs $14+ for same amount retail." },
  { name: "Olive oil", bulkNote: "Costco 2-liter: significantly cheaper per oz. Keeps 18–24 months." },
  { name: "Eggs, large", bulkNote: "Costco/Sam's 5-doz: typically best per-egg price. Use within 5 weeks." },
  { name: "Plain Greek yogurt (0%)", bulkNote: "Costco Fage or Kirkland: ~40% savings per oz. Check expiry." },
  { name: "Canned tuna in water", bulkNote: "Costco case of 8: ~30–40% savings. Shelf stable 3–5 years." },
  { name: "Black beans (canned)", bulkNote: "Sam's/Costco case packs: ~$0.50/can vs $0.90–1.20 retail." },
  { name: "Almonds", bulkNote: "Costco 3 lb bag: ~$0.40–0.50/oz vs $0.70–0.90/oz retail." },
  { name: "Frozen mixed berries", bulkNote: "Costco 4 lb: great value, equivalent or better quality to fresh." },
  { name: "Shrimp (raw, peeled)", bulkNote: "Costco 2 lb frozen: often $9–12 vs $14–18+ for same at retail." },
];

function getBulkTip(ingredientName) {
  return BULK_ITEMS.find(b =>
    ingredientName.toLowerCase().includes(b.name.toLowerCase()) ||
    b.name.toLowerCase().includes(ingredientName.toLowerCase().split("(")[0].trim())
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────
function Steps({ current }) {
  const steps = ["Select Meals", "Find Stores", "Review List", "Print"];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28, overflowX: "auto" }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 80 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: i < current ? "#166534" : i === current ? "#4ade80" : "#1f2937",
              border: `2px solid ${i <= current ? "#4ade80" : "#334155"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, color: i === current ? "#0a0a0f" : i < current ? "#4ade80" : "#64748b",
              fontFamily: "'Courier New', monospace",
            }}>{i < current ? "✓" : i + 1}</div>
            <div style={{ fontSize: 10, color: i <= current ? "#94a3b8" : "#475569", textAlign: "center", fontFamily: "'Courier New', monospace", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              {s}
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: i < current ? "#166534" : "#1f2937", margin: "0 4px", marginBottom: 20 }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Meal selector for building the shopping list ─────────────────────────────
function MealSelector({ selections, onChange }) {
  const [dayType, setDayType] = useState("training");
  const dayData = MEAL_DATA[dayType];
  const sel = selections[dayType] || {};

  const handleSelect = (slotKey, opt) => {
    onChange(dayType, slotKey, sel[slotKey]?.id === opt.id ? null : opt);
  };

  const totalSelected = Object.values(selections.training || {}).filter(Boolean).length
    + Object.values(selections.rest || {}).filter(Boolean).length;

  return (
    <div>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
        Choose one option per meal slot for each day type. The shopping list will aggregate all ingredients.
        You can also pre-select on the <a href="/gnomeo-fit/meals" style={{ color: "#4ade80" }}>Meals page</a>.
      </p>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[
          { key: "training", label: "🏋️ Training Day", color: "#f97316" },
          { key: "rest", label: "🛌 Rest Day", color: "#4ade80" },
        ].map(d => {
          const count = Object.values(selections[d.key] || {}).filter(Boolean).length;
          return (
            <button key={d.key} onClick={() => setDayType(d.key)} style={{
              background: dayType === d.key ? `${d.color}22` : "#111827",
              border: `1px solid ${dayType === d.key ? d.color : "#1f2937"}`,
              borderRadius: 8, padding: "8px 18px", cursor: "pointer",
              color: dayType === d.key ? d.color : "#6b7280",
              fontSize: 13, fontWeight: 600, fontFamily: "'Courier New', monospace",
            }}>
              {d.label} {count > 0 && <span style={{ opacity: 0.8 }}>({count})</span>}
            </button>
          );
        })}
      </div>

      {Object.entries(dayData).map(([slotKey, slot]) => (
        <div key={slotKey} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span>{slot.icon}</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0" }}>{slot.label}</span>
            <span style={{ color: "#475569", fontSize: 12, fontFamily: "'Courier New', monospace" }}>{slot.time}</span>
            {sel[slotKey] && <span style={{ marginLeft: "auto", color: "#4ade80", fontSize: 11 }}>✓ {sel[slotKey].name}</span>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
            {slot.options.map(opt => {
              const isSelected = sel[slotKey]?.id === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(slotKey, opt)}
                  style={{
                    background: isSelected ? "#0a1f1a" : "#0f172a",
                    border: `1px solid ${isSelected ? "#4ade80" : "#1e293b"}`,
                    borderRadius: 8, padding: "10px 12px", cursor: "pointer",
                    textAlign: "left", color: "#e2e8f0",
                    transition: "all 0.15s",
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{opt.name}</div>
                  <div style={{ fontSize: 11, color: "#64748b", fontFamily: "'Courier New', monospace" }}>
                    {opt.cal}cal · P:{opt.p}g · {opt.prepTime}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 16, background: "#0f172a", border: "1px solid #1e293b",
        borderRadius: 8, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ color: "#64748b", fontSize: 13 }}>
          {totalSelected} meal{totalSelected !== 1 ? "s" : ""} selected across both day types
        </span>
        <span style={{ color: totalSelected > 0 ? "#4ade80" : "#334155", fontSize: 12, fontFamily: "'Courier New', monospace" }}>
          {totalSelected > 0 ? "Ready to continue →" : "Select at least one meal"}
        </span>
      </div>
    </div>
  );
}

// ─── Store finder ─────────────────────────────────────────────────────────────
function StoreFinder({ zip, setZip, radius, setRadius, preferredStores, setPreferredStores, manualStores, setManualStores }) {
  const [newStore, setNewStore] = useState("");
  const mapsUrl = zip
    ? `https://www.google.com/maps/search/grocery+stores+near+${encodeURIComponent(zip)}`
    : "";

  const addManual = () => {
    const trimmed = newStore.trim();
    if (trimmed && !manualStores.includes(trimmed)) {
      const updated = [...manualStores, trimmed];
      setManualStores(updated);
      // Auto-select if under 3
      if (preferredStores.length < 3 && !preferredStores.includes(trimmed)) {
        setPreferredStores([...preferredStores, trimmed]);
      }
    }
    setNewStore("");
  };

  const toggleStore = (name) => {
    if (preferredStores.includes(name)) {
      setPreferredStores(preferredStores.filter(s => s !== name));
    } else if (preferredStores.length < 3) {
      setPreferredStores([...preferredStores, name]);
    }
  };

  const allStores = [...new Set([...manualStores, ...STORE_ADS.map(s => s.name)])];

  const inputStyle = {
    background: "#0f172a", border: "1px solid #334155", borderRadius: 6,
    padding: "9px 12px", color: "#e2e8f0", fontSize: 13, fontFamily: "Georgia, serif",
  };

  return (
    <div>
      <p style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, marginBottom: 20 }}>
        Enter your ZIP code to find nearby stores on Google Maps, then choose up to 3 preferred stores. Their weekly ads will be linked in your shopping list.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div>
          <label style={{ color: "#94a3b8", fontSize: 11, display: "block", marginBottom: 4, fontFamily: "'Courier New', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            ZIP Code
          </label>
          <input
            type="text"
            placeholder="e.g. 29601"
            maxLength={5}
            value={zip}
            onChange={e => setZip(e.target.value.replace(/\D/g, ""))}
            style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ color: "#94a3b8", fontSize: 11, display: "block", marginBottom: 4, fontFamily: "'Courier New', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Radius: {radius} miles
          </label>
          <select value={radius} onChange={e => setRadius(+e.target.value)} style={{ ...inputStyle, width: "100%", boxSizing: "border-box", cursor: "pointer" }}>
            {RADIUS_OPTIONS.map(r => <option key={r} value={r}>{r} miles</option>)}
            <option value={99}>35+ miles</option>
          </select>
        </div>
      </div>

      {zip.length === 5 && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#1e3a5f", border: "1px solid #3b82f6",
            borderRadius: 8, padding: "10px 18px", color: "#93c5fd",
            textDecoration: "none", fontSize: 13, fontWeight: 600,
            fontFamily: "'Courier New', monospace", marginBottom: 20,
          }}
        >
          🗺️ Find Grocery Stores Near {zip} on Google Maps →
        </a>
      )}

      <div style={{ marginBottom: 20 }}>
        <label style={{ color: "#94a3b8", fontSize: 11, display: "block", marginBottom: 8, fontFamily: "'Courier New', monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Select Up To 3 Preferred Stores
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {allStores.map(name => {
            const isSelected = preferredStores.includes(name);
            const isDisabled = !isSelected && preferredStores.length >= 3;
            const adInfo = STORE_ADS.find(s => s.name === name);
            return (
              <button
                key={name}
                onClick={() => !isDisabled && toggleStore(name)}
                title={adInfo ? adInfo.regions : "Manually added"}
                style={{
                  background: isSelected ? "#0a1f1a" : "#0f172a",
                  border: `1px solid ${isSelected ? "#4ade80" : "#1e293b"}`,
                  borderRadius: 8, padding: "7px 14px", cursor: isDisabled ? "not-allowed" : "pointer",
                  color: isSelected ? "#4ade80" : isDisabled ? "#334155" : "#94a3b8",
                  fontSize: 12, fontWeight: 600, fontFamily: "'Courier New', monospace",
                  opacity: isDisabled ? 0.5 : 1,
                  transition: "all 0.15s",
                }}
              >
                {isSelected && "✓ "}{name}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="text"
            placeholder="Add a store not listed..."
            value={newStore}
            onChange={e => setNewStore(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addManual(); }}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            onClick={addManual}
            disabled={!newStore.trim()}
            style={{
              background: "#111827", border: "1px solid #334155",
              borderRadius: 6, padding: "9px 14px", cursor: "pointer",
              color: "#94a3b8", fontSize: 13, fontFamily: "'Courier New', monospace",
            }}
          >
            Add
          </button>
        </div>
      </div>

      {preferredStores.length > 0 && (
        <div style={{ background: "#0a1f1a", border: "1px solid #166534", borderRadius: 8, padding: "12px 16px" }}>
          <div style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, fontFamily: "'Courier New', monospace", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Your Preferred Stores
          </div>
          {preferredStores.map((s, i) => {
            const ad = STORE_ADS.find(a => a.name === s);
            return (
              <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: "#6ee7b7", fontSize: 13 }}>{i + 1}. {s}</span>
                {ad && (
                  <a href={ad.url} target="_blank" rel="noopener noreferrer"
                    style={{ color: "#4ade80", fontSize: 11, fontFamily: "'Courier New', monospace", textDecoration: "none" }}>
                    Weekly Ad →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Shopping list display ─────────────────────────────────────────────────────
function ListDisplay({ grouped, preferredStores, showBulk, servings, adjustments, onAdjust }) {

  const printList = () => {
    const date = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    const storeStr = preferredStores.length ? preferredStores.join(", ") : "your preferred store";
    const printWindow = window.open("", "_blank", "width=700,height=900");

    let totalEst = 0;
    const rows = [];
    for (const [cat, items] of Object.entries(grouped)) {
      rows.push({ cat, items: items.map(item => {
        const adj = adjustments[item.name] ?? 1;
        const qty = item.qty * adj;
        const price = item.estPrice * adj;
        totalEst += price;
        return { ...item, qty, price };
      })});
    }

    printWindow.document.write(`
      <html><head><title>Gnomeo Fit — Shopping List</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 13px; line-height: 1.6;
               color: #111; padding: 32px; max-width: 680px; margin: 0 auto; }
        h1 { font-size: 18px; margin-bottom: 2px; }
        .meta { color: #666; font-size: 12px; margin-bottom: 24px; }
        .category { margin-bottom: 20px; }
        .cat-header { font-size: 15px; font-weight: bold; border-bottom: 2px solid #333;
                      padding-bottom: 4px; margin-bottom: 8px; }
        .item { display: flex; justify-content: space-between; padding: 4px 0;
                border-bottom: 1px dotted #ccc; }
        .item-name { flex: 1; }
        .item-price { color: #555; font-size: 12px; white-space: nowrap; padding-left: 16px; }
        .checkbox { display: inline-block; width: 14px; height: 14px; border: 1px solid #333;
                    margin-right: 8px; vertical-align: middle; }
        .total { margin-top: 24px; border-top: 2px solid #111; padding-top: 12px;
                 font-weight: bold; font-size: 14px; }
        .disclaimer { margin-top: 12px; font-size: 10px; color: #888; font-style: italic; }
        .store-links { margin-top: 16px; font-size: 11px; color: #555; }
        @media print { body { padding: 16px; } }
      </style></head><body>
      <h1>🛒 Gnomeo Fit Shopping List</h1>
      <div class="meta">
        ${date} · ${servings} serving(s) · Shop at: ${storeStr}
      </div>
      ${rows.map(({ cat, items }) => `
        <div class="category">
          <div class="cat-header">${CATEGORIES[cat]}</div>
          ${items.map(item => `
            <div class="item">
              <div class="item-name"><span class="checkbox"></span>${item.name} <span style="color:#888;font-size:11px;">${item.amount}</span></div>
              <div class="item-price">est. $${item.price.toFixed(2)}</div>
            </div>
          `).join("")}
        </div>
      `).join("")}
      <div class="total">Estimated Total: $${totalEst.toFixed(2)}</div>
      <div class="disclaimer">${PRICE_NOTE}</div>
      ${preferredStores.length > 0 ? `
        <div class="store-links">
          Weekly Ads: ${preferredStores.map(s => {
            const ad = STORE_ADS.find(a => a.name === s);
            return ad ? `${s} (${ad.url})` : s;
          }).join(" | ")}
        </div>` : ""}
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 400);
  };

  let grandTotal = 0;
  const categoryOrder = ["produce", "protein", "dairy", "grains", "canned", "frozen", "pantry", "supplements"];
  const sortedCategories = categoryOrder.filter(c => grouped[c]);

  return (
    <div>
      {/* Store weekly ad links */}
      {preferredStores.length > 0 && (
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            📰 Check Weekly Ads Before You Shop
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {preferredStores.map(s => {
              const ad = STORE_ADS.find(a => a.name === s);
              if (!ad) return <span key={s} style={{ color: "#64748b", fontSize: 12 }}>{s}</span>;
              return (
                <a key={s} href={ad.url} target="_blank" rel="noopener noreferrer" style={{
                  background: "#166534", border: "1px solid #4ade8044", borderRadius: 6,
                  padding: "6px 12px", color: "#4ade80", fontSize: 12, fontWeight: 600,
                  fontFamily: "'Courier New', monospace", textDecoration: "none",
                }}>
                  {s} Deals →
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Servings */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>Shopping List</div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <label style={{ color: "#64748b", fontSize: 12 }}>Servings/week:</label>
          <select
            value={servings}
            onChange={e => onAdjust("__servings__", +e.target.value)}
            style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 6, padding: "4px 8px", color: "#e2e8f0", fontSize: 12, fontFamily: "'Courier New', monospace" }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Category sections */}
      {sortedCategories.map(cat => {
        const items = grouped[cat];
        return (
          <div key={cat} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "#94a3b8", borderBottom: "1px solid #1e293b", paddingBottom: 6, marginBottom: 10, fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>
              {CATEGORIES[cat]}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {items.map(item => {
                const adj = adjustments[item.name] ?? 1;
                const price = item.estPrice * adj;
                grandTotal += price;
                const bulkTip = showBulk && getBulkTip(item.name);
                return (
                  <div key={item.name} style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="checkbox" style={{ accentColor: "#4ade80", width: 16, height: 16 }} />
                      <div style={{ flex: 1 }}>
                        <span style={{ fontWeight: 600, fontSize: 13, color: "#e2e8f0" }}>{item.name}</span>
                        <span style={{ color: "#475569", fontSize: 11, marginLeft: 8 }}>{item.amount}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <select
                          value={adj}
                          onChange={e => onAdjust(item.name, +e.target.value)}
                          title="Quantity multiplier"
                          style={{ background: "#111827", border: "1px solid #334155", borderRadius: 4, padding: "2px 6px", color: "#94a3b8", fontSize: 11, fontFamily: "'Courier New', monospace" }}
                        >
                          {[0.5, 1, 1.5, 2, 3, 4].map(v => <option key={v} value={v}>{v}×</option>)}
                        </select>
                        <span style={{ color: "#64748b", fontSize: 12, fontFamily: "'Courier New', monospace", minWidth: 52, textAlign: "right" }}>
                          ~${price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    {bulkTip && (
                      <div style={{ marginTop: 6, marginLeft: 26, background: "#1a1a3e", border: "1px solid #3730a3", borderRadius: 6, padding: "6px 10px" }}>
                        <span style={{ color: "#818cf8", fontSize: 11 }}>💡 Bulk tip: {bulkTip.bulkNote}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Total + print */}
      <div style={{ background: "#0a1f1a", border: "1px solid #166534", borderRadius: 10, padding: "16px 20px", marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div>
            <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 16 }}>Estimated Total</div>
            <div style={{ color: "#64748b", fontSize: 11 }}>Prices are estimates — see disclaimer below</div>
          </div>
          <div style={{ color: "#4ade80", fontSize: 26, fontWeight: 700, fontFamily: "'Courier New', monospace" }}>
            ${grandTotal.toFixed(2)}
          </div>
        </div>
        <button
          onClick={printList}
          style={{
            width: "100%", padding: "11px 0",
            background: "#166534", border: "1px solid #4ade80",
            borderRadius: 8, color: "#4ade80",
            fontSize: 13, fontWeight: 600, fontFamily: "'Courier New', monospace",
            letterSpacing: "0.05em", cursor: "pointer",
          }}
        >
          🖨️ Print Shopping List
        </button>
      </div>

      <div style={{ marginTop: 14, color: "#334155", fontSize: 11, lineHeight: 1.6, fontStyle: "italic", textAlign: "center" }}>
        {PRICE_NOTE}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function ShoppingList() {
  const [step, setStep] = useState(0);

  // Meal selections: { training: { breakfast: optObj, ... }, rest: { ... } }
  const [mealSelections, setMealSelections] = useState({ training: {}, rest: {} });

  // Store state
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(15);
  const [preferredStores, setPreferredStores] = useState([]);
  const [manualStores, setManualStores] = useState([]);

  // List state
  const [showBulk, setShowBulk] = useState(true);
  const [servings, setServings] = useState(1);
  const [adjustments, setAdjustments] = useState({});

  const handleMealChange = (dayType, slotKey, opt) => {
    setMealSelections(prev => ({
      ...prev,
      [dayType]: { ...prev[dayType], [slotKey]: opt },
    }));
  };

  const handleAdjust = (name, val) => {
    if (name === "__servings__") { setServings(val); return; }
    setAdjustments(prev => ({ ...prev, [name]: val }));
  };

  // Aggregate ingredients from all selected meals
  const grouped = useMemo(() => {
    const allSelections = {};
    for (const [dayType, slots] of Object.entries(mealSelections)) {
      for (const [slotKey, opt] of Object.entries(slots)) {
        if (opt) allSelections[`${dayType}_${slotKey}`] = opt;
      }
    }
    return buildIngredientList("all", allSelections, servings);
  }, [mealSelections, servings]);

  const hasSelections = Object.values(mealSelections.training).some(Boolean)
    || Object.values(mealSelections.rest).some(Boolean);
  const hasItems = Object.keys(grouped).length > 0;

  const btnPrimary = (disabled) => ({
    background: disabled ? "#0f172a" : "#166534",
    border: `1px solid ${disabled ? "#1f2937" : "#4ade80"}`,
    borderRadius: 8, padding: "11px 24px",
    color: disabled ? "#334155" : "#4ade80",
    fontSize: 13, fontWeight: 600, fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em", cursor: disabled ? "not-allowed" : "pointer",
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e2e8f0", fontFamily: "Georgia, serif" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0a0a0f 100%)",
        borderBottom: "1px solid #1e293b",
        padding: "28px 24px 20px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#4b5563", marginBottom: 6, fontFamily: "'Courier New', monospace" }}>
          Meal-Driven
        </div>
        <h1 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 6 }}>
          Shopping List Builder
        </h1>
        <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
          Select your meals → find your stores → get a printable, organized list.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "24px 16px 48px" }}>
        <Steps current={step} />

        {/* Step 0: Select meals */}
        {step === 0 && (
          <div>
            <MealSelector selections={mealSelections} onChange={handleMealChange} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button disabled={!hasSelections} onClick={() => setStep(1)} style={btnPrimary(!hasSelections)}>
                Next: Find Stores →
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Find stores */}
        {step === 1 && (
          <div>
            <StoreFinder
              zip={zip} setZip={setZip}
              radius={radius} setRadius={setRadius}
              preferredStores={preferredStores} setPreferredStores={setPreferredStores}
              manualStores={manualStores} setManualStores={setManualStores}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button onClick={() => setStep(0)} style={{ ...btnPrimary(false), background: "#111827", border: "1px solid #1f2937", color: "#64748b" }}>
                ← Back
              </button>
              <button onClick={() => setStep(2)} style={btnPrimary(false)}>
                {preferredStores.length > 0 ? `Next: Build List with ${preferredStores.join(", ")} →` : "Next: Build List →"}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review list */}
        {step === 2 && (
          <div>
            <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "#94a3b8", fontSize: 13 }}>
                <input
                  type="checkbox"
                  checked={showBulk}
                  onChange={e => setShowBulk(e.target.checked)}
                  style={{ accentColor: "#818cf8", width: 16, height: 16 }}
                />
                Show bulk-buy tips (Costco / Sam's Club)
              </label>
              <span style={{ color: "#475569", fontSize: 12, fontStyle: "italic" }}>
                {Object.values(grouped).flat().length} items across {Object.keys(grouped).length} categories
              </span>
            </div>

            {hasItems
              ? <ListDisplay
                  grouped={grouped}
                  preferredStores={preferredStores}
                  showBulk={showBulk}
                  servings={servings}
                  adjustments={adjustments}
                  onAdjust={handleAdjust}
                />
              : <div style={{ textAlign: "center", padding: "48px 24px", color: "#475569" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>🛒</div>
                  <div>No meals selected yet.</div>
                  <button onClick={() => setStep(0)} style={{ ...btnPrimary(false), marginTop: 16 }}>← Go Back</button>
                </div>
            }

            <div style={{ marginTop: 20 }}>
              <button onClick={() => setStep(1)} style={{ ...btnPrimary(false), background: "#111827", border: "1px solid #1f2937", color: "#64748b" }}>
                ← Back to Stores
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
