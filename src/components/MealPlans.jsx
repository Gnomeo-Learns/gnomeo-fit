import { useState } from "react";
import { MEAL_DATA } from "../data/meals.js";

function MacroBar({ p, c, f, compact = false }) {
  const total = p * 4 + c * 4 + f * 9 || 1;
  return (
    <div>
      <div style={{ display: "flex", height: compact ? 4 : 6, borderRadius: 3, overflow: "hidden", gap: 1 }}>
        <div style={{ width: `${(p * 4 / total) * 100}%`, background: "#f97316" }} />
        <div style={{ width: `${(c * 4 / total) * 100}%`, background: "#facc15" }} />
        <div style={{ width: `${(f * 9 / total) * 100}%`, background: "#a78bfa" }} />
      </div>
      {!compact && (
        <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11, fontFamily: "'Courier New', monospace" }}>
          <span style={{ color: "#f97316" }}>P {p}g</span>
          <span style={{ color: "#facc15" }}>C {c}g</span>
          <span style={{ color: "#a78bfa" }}>F {f}g</span>
        </div>
      )}
    </div>
  );
}

function MealCard({ option, isSelected, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{
      background: isSelected ? "#0a1f1a" : "#0f172a",
      border: `1px solid ${isSelected ? "#4ade80" : "#1e293b"}`,
      borderRadius: 10,
      overflow: "hidden",
      transition: "border-color 0.15s",
      cursor: "pointer",
    }}>
      <div onClick={() => setExpanded(!expanded)} style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#e2e8f0", marginBottom: 2 }}>{option.name}</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#475569" }}>⏱ {option.prepTime}</span>
              {option.tags.map(t => (
                <span key={t} style={{ background: "#1e293b", color: "#64748b", fontSize: 10, padding: "1px 6px", borderRadius: 4 }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, fontSize: 12, fontFamily: "'Courier New', monospace" }}>
              <span style={{ color: "#94a3b8" }}>{option.cal} cal</span>
              <span style={{ color: "#f97316" }}>P:{option.p}g</span>
              <span style={{ color: "#facc15" }}>C:{option.c}g</span>
              <span style={{ color: "#a78bfa" }}>F:{option.f}g</span>
            </div>
          </div>
          <span style={{ color: "#334155", fontSize: 14, marginLeft: 8 }}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: "0 14px 14px", borderTop: "1px solid #1e293b" }}>
          <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: "10px 0 10px", fontStyle: "italic" }}>
            {option.instructions}
          </p>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>
            <strong style={{ color: "#475569", display: "block", marginBottom: 4 }}>Ingredients:</strong>
            <ul style={{ paddingLeft: 16, display: "flex", flexDirection: "column", gap: 2 }}>
              {option.items.map((item, i) => (
                <li key={i} style={{ color: "#64748b" }}>{item.amount} {item.name}</li>
              ))}
            </ul>
          </div>
          <MacroBar p={option.p} c={option.c} f={option.f} />
        </div>
      )}

      <div
        onClick={() => onSelect(option)}
        style={{
          background: isSelected ? "#166534" : "#111827",
          borderTop: "1px solid #1e293b",
          padding: "9px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          color: isSelected ? "#4ade80" : "#64748b",
          fontSize: 12,
          fontWeight: 600,
          fontFamily: "'Courier New', monospace",
          cursor: "pointer",
          transition: "all 0.15s",
          letterSpacing: "0.05em",
        }}
      >
        {isSelected ? "✓ Selected" : "Select This Meal"}
      </div>
    </div>
  );
}

function SlotSection({ slotKey, slot, selected, onSelect, dayColor }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <span style={{ fontSize: 20 }}>{slot.icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#e2e8f0" }}>{slot.label}</div>
          <div style={{ color: "#475569", fontSize: 12, fontFamily: "'Courier New', monospace" }}>{slot.time}</div>
        </div>
        {selected && (
          <span style={{
            marginLeft: "auto", background: "#0a1f1a", border: "1px solid #4ade80",
            color: "#4ade80", fontSize: 10, padding: "2px 8px", borderRadius: 4,
            fontFamily: "'Courier New', monospace",
          }}>✓ chosen</span>
        )}
      </div>
      <div style={{ color: "#475569", fontSize: 12, marginBottom: 10, fontStyle: "italic" }}>{slot.note}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
        {slot.options.map(opt => (
          <MealCard
            key={opt.id}
            option={opt}
            isSelected={selected?.id === opt.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

function PlanSummary({ dayType, selections, dayData }) {
  const slots = Object.keys(dayData);
  const filled = slots.filter(k => selections[k]).length;
  const totalCal = slots.reduce((sum, k) => sum + (selections[k]?.cal || 0), 0);
  const totalP = slots.reduce((sum, k) => sum + (selections[k]?.p || 0), 0);
  const totalC = slots.reduce((sum, k) => sum + (selections[k]?.c || 0), 0);
  const totalF = slots.reduce((sum, k) => sum + (selections[k]?.f || 0), 0);

  const printPlan = () => {
    const dayLabel = dayType === "training" ? "Training Day" : "Rest Day";
    const lines = [
      `GNOMEO FIT — ${dayLabel} Meal Plan`,
      `Generated: ${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}`,
      "═".repeat(50),
      "",
    ];
    for (const k of slots) {
      const slot = dayData[k];
      const meal = selections[k];
      lines.push(`${slot.icon} ${slot.label.toUpperCase()} — ${slot.time}`);
      if (meal) {
        lines.push(`  ${meal.name} (${meal.cal} cal | P:${meal.p}g C:${meal.c}g F:${meal.f}g)`);
        lines.push(`  Prep: ${meal.prepTime}`);
        lines.push(`  ${meal.instructions}`);
        lines.push("  Ingredients:");
        for (const item of meal.items) lines.push(`    • ${item.amount} ${item.name}`);
      } else {
        lines.push("  — not selected —");
      }
      lines.push("");
    }
    lines.push("─".repeat(50));
    lines.push(`DAILY TOTALS: ${totalCal} cal | Protein: ${totalP}g | Carbs: ${totalC}g | Fat: ${totalF}g`);

    const printWindow = window.open("", "_blank", "width=700,height=900");
    printWindow.document.write(`
      <html><head><title>Gnomeo Fit — ${dayLabel} Meal Plan</title>
      <style>
        body { font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.8;
               color: #111; padding: 40px; max-width: 680px; margin: 0 auto; }
        h1 { font-size: 18px; margin-bottom: 4px; }
        .date { color: #666; font-size: 12px; margin-bottom: 24px; }
        .slot { margin-bottom: 20px; border-top: 1px solid #ccc; padding-top: 14px; }
        .slot-header { font-weight: bold; font-size: 14px; }
        .meal-name { font-size: 15px; margin: 4px 0; }
        .macros { color: #555; font-size: 12px; }
        .ingredients { margin: 6px 0 0 12px; color: #333; }
        .totals { border-top: 2px solid #111; margin-top: 24px; padding-top: 12px; font-weight: bold; }
        .no-meal { color: #999; font-style: italic; }
        @media print { body { padding: 20px; } }
      </style></head><body>
      <h1>GNOMEO FIT — ${dayLabel} Meal Plan</h1>
      <div class="date">${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</div>
      ${slots.map(k => {
        const slot = dayData[k];
        const meal = selections[k];
        return `
          <div class="slot">
            <div class="slot-header">${slot.icon} ${slot.label.toUpperCase()} — ${slot.time}</div>
            ${meal ? `
              <div class="meal-name">${meal.name}</div>
              <div class="macros">${meal.cal} cal &nbsp;|&nbsp; Protein: ${meal.p}g &nbsp;|&nbsp; Carbs: ${meal.c}g &nbsp;|&nbsp; Fat: ${meal.f}g &nbsp;|&nbsp; Prep: ${meal.prepTime}</div>
              <div style="color:#444;font-size:12px;margin:4px 0;">${meal.instructions}</div>
              <div class="ingredients"><strong>Ingredients:</strong><ul style="margin:4px 0;">${meal.items.map(i => `<li>${i.amount} ${i.name}</li>`).join("")}</ul></div>
            ` : `<div class="no-meal">— not selected —</div>`}
          </div>`;
      }).join("")}
      <div class="totals">Daily Totals: ${totalCal} cal &nbsp;|&nbsp; Protein: ${totalP}g &nbsp;|&nbsp; Carbs: ${totalC}g &nbsp;|&nbsp; Fat: ${totalF}g</div>
      </body></html>
    `);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 400);
  };

  return (
    <div style={{
      background: "#0f172a", border: "1px solid #1e293b", borderRadius: 12,
      padding: 18, position: "sticky", top: 72,
    }}>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#e2e8f0", marginBottom: 12 }}>
        My {dayType === "training" ? "Training" : "Rest"} Day Plan
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 11, color: "#475569", fontFamily: "'Courier New', monospace" }}>
        <span>{filled}/{slots.length} meals chosen</span>
        {totalCal > 0 && <span style={{ color: "#94a3b8" }}>{totalCal} cal total</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
        {slots.map(k => {
          const slot = dayData[k];
          const meal = selections[k];
          return (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>{slot.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "#475569", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {slot.label}
                </div>
                {meal
                  ? <div style={{ fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{meal.name}</div>
                  : <div style={{ fontSize: 12, color: "#334155", fontStyle: "italic" }}>not selected</div>
                }
              </div>
              {meal && <span style={{ color: "#4ade80", fontSize: 11, fontFamily: "'Courier New', monospace", whiteSpace: "nowrap" }}>{meal.cal}cal</span>}
            </div>
          );
        })}
      </div>

      {totalCal > 0 && (
        <div style={{ marginBottom: 14 }}>
          <MacroBar p={totalP} c={totalC} f={totalF} />
          <div style={{ display: "flex", gap: 8, marginTop: 6, fontSize: 11, flexWrap: "wrap" }}>
            <span style={{ color: "#f97316" }}>P: {totalP}g</span>
            <span style={{ color: "#facc15" }}>C: {totalC}g</span>
            <span style={{ color: "#a78bfa" }}>F: {totalF}g</span>
          </div>
        </div>
      )}

      <button
        onClick={printPlan}
        disabled={filled === 0}
        style={{
          width: "100%", padding: "10px 0",
          background: filled > 0 ? "#166534" : "#0f172a",
          border: `1px solid ${filled > 0 ? "#4ade80" : "#1f2937"}`,
          borderRadius: 7, color: filled > 0 ? "#4ade80" : "#334155",
          fontSize: 12, fontWeight: 600, fontFamily: "'Courier New', monospace",
          letterSpacing: "0.05em", cursor: filled > 0 ? "pointer" : "default",
          marginBottom: 8,
        }}
      >
        🖨️ Print This Plan
      </button>

      <a
        href="/gnomeo-fit/shopping"
        style={{
          display: "block", width: "100%", padding: "10px 0",
          background: "#111827", border: "1px solid #1f2937",
          borderRadius: 7, color: "#64748b",
          fontSize: 12, fontWeight: 600, fontFamily: "'Courier New', monospace",
          letterSpacing: "0.05em", textAlign: "center", textDecoration: "none",
          boxSizing: "border-box",
        }}
      >
        🛒 Build Shopping List →
      </a>
    </div>
  );
}

export default function MealPlans() {
  const [dayType, setDayType] = useState("training");
  const [trainingSelections, setTrainingSelections] = useState({});
  const [restSelections, setRestSelections] = useState({});

  const dayData = MEAL_DATA[dayType];
  const selections = dayType === "training" ? trainingSelections : restSelections;
  const setSelections = dayType === "training" ? setTrainingSelections : setRestSelections;

  const handleSelect = (slotKey, option) => {
    setSelections(prev => ({
      ...prev,
      [slotKey]: prev[slotKey]?.id === option.id ? null : option,
    }));
  };

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
          Evidence-Based
        </div>
        <h1 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 400, letterSpacing: "-0.02em", marginBottom: 6 }}>
          Meal Plans
        </h1>
        <p style={{ color: "#64748b", fontSize: 13, margin: 0 }}>
          Multiple options per meal slot — pick what fits your day and taste.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Day type toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, justifyContent: "center" }}>
          {[
            { key: "training", label: "🏋️ Training Day", color: "#f97316" },
            { key: "rest", label: "🛌 Rest Day", color: "#4ade80" },
          ].map(d => (
            <button
              key={d.key}
              onClick={() => setDayType(d.key)}
              style={{
                background: dayType === d.key ? `${d.color}22` : "#111827",
                border: `1px solid ${dayType === d.key ? d.color : "#1f2937"}`,
                borderRadius: 10, padding: "10px 24px", cursor: "pointer",
                color: dayType === d.key ? d.color : "#6b7280",
                fontSize: 14, fontWeight: 600, fontFamily: "'Courier New', monospace",
                transition: "all 0.15s",
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "start" }}>

          {/* Meal slots */}
          <div>
            {Object.entries(dayData).map(([slotKey, slot]) => (
              <SlotSection
                key={slotKey}
                slotKey={slotKey}
                slot={slot}
                selected={selections[slotKey]}
                onSelect={(opt) => handleSelect(slotKey, opt)}
                dayColor={dayType === "training" ? "#f97316" : "#4ade80"}
              />
            ))}
          </div>

          {/* Sticky plan summary */}
          <div>
            <PlanSummary
              dayType={dayType}
              selections={selections}
              dayData={dayData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
