import { useState, useEffect } from "react";

// ─── Security note ────────────────────────────────────────────────────────────
// This uses a SHA-256 hash of your passphrase stored in localStorage.
// It keeps the log private from casual viewers, but is NOT true server-side
// security — anyone with browser dev tools can read localStorage directly.
// Fine for a personal fitness log; don't store sensitive data here.
// ─────────────────────────────────────────────────────────────────────────────

const HASH_KEY   = "gnomeo_fit_auth_hash";
const LOG_KEY    = "gnomeo_fit_log";
const PHASES     = ["Phase 1 — Foundation", "Phase 2 — Build", "Phase 3 — Intensify", "Phase 4 — Peak"];
const DAYS       = ["Day A", "Day B", "Day C", "Day D", "Day E", "Rest Day"];
const RATINGS    = ["💀 Brutal", "😤 Hard", "💪 Good", "😊 Easy", "🔥 Crushed it"];

async function sha256(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "#475569" }}>
      <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
      <div style={{ fontSize: "15px", marginBottom: "6px", color: "#64748b" }}>No entries yet</div>
      <div style={{ fontSize: "13px" }}>Log your first workout above.</div>
    </div>
  );
}

export default function WorkoutLog() {
  const [authed, setAuthed]           = useState(false);
  const [hasHash, setHasHash]         = useState(false);
  const [passInput, setPassInput]     = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [authError, setAuthError]     = useState("");
  const [entries, setEntries]         = useState([]);
  const [showForm, setShowForm]       = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterPhase, setFilterPhase] = useState("All");
  const [sortDesc, setSortDesc]       = useState(true);

  // Form state
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    phase: PHASES[0],
    day: DAYS[0],
    rating: RATINGS[2],
    weight: "",
    duration: "",
    notes: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(HASH_KEY);
    setHasHash(!!stored);
    const raw = localStorage.getItem(LOG_KEY);
    if (raw) {
      try { setEntries(JSON.parse(raw)); } catch {}
    }
  }, []);

  const saveEntries = (next) => {
    setEntries(next);
    localStorage.setItem(LOG_KEY, JSON.stringify(next));
  };

  // ── Auth ────────────────────────────────────────────────────────────────────

  const handleSetPassword = async () => {
    if (passInput.length < 4) { setAuthError("Passphrase must be at least 4 characters."); return; }
    if (passInput !== confirmInput) { setAuthError("Passphrases don't match."); return; }
    const hash = await sha256(passInput);
    localStorage.setItem(HASH_KEY, hash);
    setHasHash(true);
    setAuthed(true);
    setAuthError("");
    setPassInput(""); setConfirmInput("");
  };

  const handleLogin = async () => {
    const hash = await sha256(passInput);
    const stored = localStorage.getItem(HASH_KEY);
    if (hash === stored) {
      setAuthed(true);
      setAuthError("");
      setPassInput("");
    } else {
      setAuthError("Incorrect passphrase.");
    }
  };

  // ── Log CRUD ────────────────────────────────────────────────────────────────

  const addEntry = () => {
    const entry = { id: Date.now(), ...form };
    saveEntries([entry, ...entries]);
    setShowForm(false);
    setForm({ ...form, date: new Date().toISOString().slice(0, 10), notes: "", weight: "", duration: "" });
  };

  const deleteEntry = (id) => {
    saveEntries(entries.filter(e => e.id !== id));
    setDeleteTarget(null);
  };

  // ── Display ─────────────────────────────────────────────────────────────────

  const filtered = entries
    .filter(e => filterPhase === "All" || e.phase === filterPhase)
    .sort((a, b) => sortDesc ? b.id - a.id : a.id - b.id);

  const totalWorkouts = entries.filter(e => e.day !== "Rest Day").length;
  const streak = (() => {
    if (!entries.length) return 0;
    const sorted = [...entries].sort((a, b) => new Date(b.date) - new Date(a.date));
    let count = 0;
    let prev = new Date(sorted[0].date);
    prev.setHours(0,0,0,0);
    for (const e of sorted) {
      const d = new Date(e.date);
      d.setHours(0,0,0,0);
      const diff = Math.round((prev - d) / 86400000);
      if (diff <= 1) { count++; prev = d; }
      else break;
    }
    return count;
  })();

  // ── Styles ──────────────────────────────────────────────────────────────────

  const inputStyle = {
    background: "#0f172a", border: "1px solid #334155", borderRadius: "6px",
    padding: "9px 12px", color: "#e2e8f0", fontSize: "13px", width: "100%", boxSizing: "border-box",
    fontFamily: "Georgia, serif",
  };
  const labelStyle = { color: "#94a3b8", fontSize: "11px", marginBottom: "4px", display: "block", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Courier New', monospace" };
  const btnPrimary = {
    background: "#166534", border: "1px solid #4ade80", color: "#4ade80",
    padding: "10px 22px", borderRadius: "7px", cursor: "pointer", fontSize: "13px",
    fontWeight: "600", fontFamily: "'Courier New', monospace", letterSpacing: "0.05em",
  };
  const btnSecondary = {
    background: "#111827", border: "1px solid #1f2937", color: "#94a3b8",
    padding: "10px 22px", borderRadius: "7px", cursor: "pointer", fontSize: "13px",
    fontFamily: "'Courier New', monospace",
  };

  // ── Auth Screen ──────────────────────────────────────────────────────────────

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ width: "100%", maxWidth: "380px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🔒</div>
            <h2 style={{ fontSize: "22px", fontWeight: "400", marginBottom: "6px" }}>Workout Log</h2>
            <p style={{ color: "#475569", fontSize: "13px", lineHeight: 1.6 }}>
              {hasHash ? "Enter your passphrase to access your log." : "Set a passphrase to protect your log. This is stored in your browser only."}
            </p>
          </div>

          <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "12px", padding: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={labelStyle}>Passphrase</label>
              <input
                type="password"
                placeholder={hasHash ? "Enter passphrase" : "Choose a passphrase"}
                value={passInput}
                onChange={e => setPassInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") hasHash ? handleLogin() : null; }}
                style={inputStyle}
              />
            </div>

            {!hasHash && (
              <div>
                <label style={labelStyle}>Confirm Passphrase</label>
                <input
                  type="password"
                  placeholder="Re-enter passphrase"
                  value={confirmInput}
                  onChange={e => setConfirmInput(e.target.value)}
                  style={inputStyle}
                />
              </div>
            )}

            {authError && (
              <div style={{ color: "#f87171", fontSize: "12px", background: "#3f0f0f", border: "1px solid #7f1d1d", borderRadius: "6px", padding: "8px 12px" }}>
                {authError}
              </div>
            )}

            <button
              onClick={hasHash ? handleLogin : handleSetPassword}
              style={{ ...btnPrimary, width: "100%", padding: "12px" }}
            >
              {hasHash ? "Unlock Log →" : "Set Passphrase & Start →"}
            </button>

            {hasHash && (
              <button
                onClick={async () => {
                  if (confirm("This will delete ALL log entries and reset your passphrase. Are you sure?")) {
                    localStorage.removeItem(HASH_KEY);
                    localStorage.removeItem(LOG_KEY);
                    setHasHash(false);
                    setEntries([]);
                    setPassInput("");
                    setAuthError("");
                  }
                }}
                style={{ background: "none", border: "none", color: "#475569", fontSize: "11px", cursor: "pointer", textDecoration: "underline" }}
              >
                Reset passphrase (clears all data)
              </button>
            )}
          </div>

          <p style={{ color: "#334155", fontSize: "11px", textAlign: "center", marginTop: "16px", lineHeight: 1.6 }}>
            Your log is stored in this browser's local storage.<br/>
            It is not uploaded or shared anywhere.
          </p>
        </div>
      </div>
    );
  }

  // ── Main Log Screen ──────────────────────────────────────────────────────────

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e2e8f0", fontFamily: "Georgia, serif" }}>

      {/* Page header */}
      <div style={{ background: "linear-gradient(180deg, #0f172a 0%, #0a0a0f 100%)", borderBottom: "1px solid #1e293b", padding: "28px 24px 20px", textAlign: "center" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase", color: "#4b5563", marginBottom: "6px", fontFamily: "'Courier New', monospace" }}>Personal</div>
        <h1 style={{ fontSize: "30px", fontWeight: "400", letterSpacing: "-0.02em" }}>Workout Log</h1>
      </div>

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 16px 48px" }}>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "Total Workouts", value: totalWorkouts },
            { label: "Entries Logged", value: entries.length },
            { label: "Day Streak", value: streak },
          ].map(s => (
            <div key={s.label} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "10px", padding: "14px", textAlign: "center" }}>
              <div style={{ fontSize: "26px", fontWeight: "700", color: "#4ade80", fontFamily: "'Courier New', monospace" }}>{s.value}</div>
              <div style={{ color: "#64748b", fontSize: "11px", marginTop: "2px", letterSpacing: "0.05em", fontFamily: "'Courier New', monospace" }}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Add entry button */}
        {!showForm && (
          <button onClick={() => setShowForm(true)} style={{ ...btnPrimary, width: "100%", padding: "13px", marginBottom: "20px", fontSize: "14px" }}>
            + Log a Workout
          </button>
        )}

        {/* Entry form */}
        {showForm && (
          <div style={{ background: "#111827", border: "1px solid #4ade8044", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
            <div style={{ fontWeight: "600", fontSize: "15px", marginBottom: "16px", color: "#4ade80" }}>New Entry</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Phase</label>
                <select value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                  {PHASES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Day</label>
                <select value={form.day} onChange={e => setForm({ ...form, day: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                  {DAYS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>How'd it feel?</label>
                <select value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} style={{ ...inputStyle, cursor: "pointer" }}>
                  {RATINGS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Bodyweight (lbs) — optional</label>
                <input type="number" placeholder="e.g. 198" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Duration (min) — optional</label>
                <input type="number" placeholder="e.g. 35" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} style={inputStyle} />
              </div>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                rows={3}
                placeholder="How did it go? Any exercises you scaled up or down?"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={addEntry} style={btnPrimary}>Save Entry</button>
              <button onClick={() => setShowForm(false)} style={btnSecondary}>Cancel</button>
            </div>
          </div>
        )}

        {/* Filter + sort */}
        {entries.length > 0 && (
          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "14px", flexWrap: "wrap" }}>
            <select
              value={filterPhase}
              onChange={e => setFilterPhase(e.target.value)}
              style={{ ...inputStyle, width: "auto", fontSize: "12px", padding: "6px 10px" }}
            >
              <option>All</option>
              {PHASES.map(p => <option key={p}>{p}</option>)}
            </select>
            <button
              onClick={() => setSortDesc(!sortDesc)}
              style={{ ...btnSecondary, padding: "6px 12px", fontSize: "12px" }}
            >
              {sortDesc ? "Newest first ↓" : "Oldest first ↑"}
            </button>
            <span style={{ color: "#475569", fontSize: "12px", marginLeft: "auto" }}>
              {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
            </span>
          </div>
        )}

        {/* Entries list */}
        {filtered.length === 0
          ? <EmptyState />
          : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {filtered.map(entry => (
                <div key={entry.id} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: "10px", padding: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: entry.notes ? "10px" : "0" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: "600", fontSize: "14px" }}>{entry.phase.split("—")[0].trim()}</span>
                        <span style={{ background: "#0f172a", color: "#94a3b8", fontSize: "11px", padding: "2px 8px", borderRadius: "4px", fontFamily: "'Courier New', monospace" }}>
                          {entry.day}
                        </span>
                        <span style={{ fontSize: "13px" }}>{entry.rating}</span>
                      </div>
                      <div style={{ display: "flex", gap: "12px", marginTop: "5px" }}>
                        <span style={{ color: "#64748b", fontSize: "12px", fontFamily: "'Courier New', monospace" }}>
                          {formatDate(entry.date)}
                        </span>
                        {entry.duration && <span style={{ color: "#64748b", fontSize: "12px" }}>⏱ {entry.duration} min</span>}
                        {entry.weight && <span style={{ color: "#64748b", fontSize: "12px" }}>⚖️ {entry.weight} lbs</span>}
                      </div>
                    </div>
                    <button
                      onClick={() => setDeleteTarget(entry.id)}
                      style={{ background: "none", border: "none", color: "#374151", cursor: "pointer", fontSize: "16px", padding: "0 0 0 8px", lineHeight: 1 }}
                      title="Delete entry"
                    >
                      ×
                    </button>
                  </div>
                  {entry.notes && (
                    <div style={{ borderTop: "1px solid #1f2937", marginTop: "10px", paddingTop: "10px", color: "#94a3b8", fontSize: "13px", lineHeight: 1.6, fontStyle: "italic" }}>
                      "{entry.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        }
      </div>

      {/* Delete confirm modal */}
      {deleteTarget && (
        <div style={{
          position: "fixed", inset: 0, background: "#000000cc", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 200, padding: "24px",
        }}>
          <div style={{ background: "#111827", border: "1px solid #374151", borderRadius: "12px", padding: "24px", maxWidth: "340px", width: "100%" }}>
            <div style={{ fontWeight: "600", marginBottom: "8px" }}>Delete this entry?</div>
            <div style={{ color: "#64748b", fontSize: "13px", marginBottom: "20px" }}>This can't be undone.</div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => deleteEntry(deleteTarget)} style={{ ...btnPrimary, background: "#7f1d1d", borderColor: "#f87171", color: "#fca5a5" }}>Delete</button>
              <button onClick={() => setDeleteTarget(null)} style={btnSecondary}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
