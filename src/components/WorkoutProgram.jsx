import { useState } from "react";

const phases = [
  {
    id: 1,
    name: "Foundation",
    weeks: "Weeks 1–3",
    daysPerWeek: 3,
    focus: "Build movement habits, learn form, light conditioning",
    color: "#4ade80",
    days: [
      {
        label: "Day A",
        title: "Upper Body + Core",
        timing: "Evening",
        circuits: 2,
        rest: "60s between exercises",
        exercises: [
          {
            name: "Incline Pushups",
            sets: "3",
            reps: "8–12",
            note: "Hands on counter or sturdy chair",
            lowImpact: "Wall pushups — stand further from wall to reduce load",
            harder: "Standard flat pushups",
          },
          {
            name: "Pike Pushups",
            sets: "2",
            reps: "6–10",
            note: "Targets shoulders and upper chest",
            lowImpact: "Reduce range of motion — just a partial dip",
            harder: "Elevate feet on chair",
          },
          {
            name: "Chair Dips",
            sets: "2",
            reps: "8–10",
            note: "Feet flat on floor, knees bent 90°",
            lowImpact: "Bend knees more to reduce load",
            harder: "Legs extended straight out",
          },
          {
            name: "Dead Bug",
            sets: "2",
            reps: "8 each side",
            note: "Slow and controlled — back stays flat on floor",
            lowImpact: "Arms only (keep legs bent and stationary)",
            harder: "Add leg extension fully",
          },
          {
            name: "Plank Hold",
            sets: "3",
            reps: "20–30 sec",
            note: "Elbows or hands — keep hips level",
            lowImpact: "Knee plank",
            harder: "Extend hold to 45s",
          },
          {
            name: "Step Jacks",
            sets: "2",
            reps: "30 sec",
            note: "Low-impact version of jumping jacks — step side to side",
            lowImpact: "This IS the low-impact option",
            harder: "Jumping jacks",
          },
        ],
      },
      {
        label: "Day B",
        title: "Lower Body",
        timing: "Evening",
        circuits: 2,
        rest: "60s between exercises",
        exercises: [
          {
            name: "Bodyweight Squat",
            sets: "3",
            reps: "12–15",
            note: "Feet shoulder width, weight in heels",
            lowImpact: "Assisted squat — hold doorframe for balance",
            harder: "Pause at bottom for 2 sec",
          },
          {
            name: "Reverse Lunge",
            sets: "3",
            reps: "8 each leg",
            note: "Step back — easier on knees than forward lunge",
            lowImpact: "Reduce range of motion — small step back",
            harder: "Forward lunge",
          },
          {
            name: "Glute Bridge",
            sets: "3",
            reps: "12–15",
            note: "Squeeze at top for 1 sec",
            lowImpact: "Reduce range — partial hip lift",
            harder: "Single-leg glute bridge",
          },
          {
            name: "Wall Sit",
            sets: "2",
            reps: "20–30 sec",
            note: "Thighs parallel to floor if possible",
            lowImpact: "Sit higher on the wall (less knee bend)",
            harder: "Hold longer, add weight (backpack)",
          },
          {
            name: "Calf Raises",
            sets: "2",
            reps: "15–20",
            note: "Hold wall for balance if needed",
            lowImpact: "Seated calf raises",
            harder: "Single-leg",
          },
          {
            name: "Marching in Place",
            sets: "1",
            reps: "60 sec",
            note: "High knees, pump arms — end of workout flush",
            lowImpact: "This IS the low-impact option",
            harder: "High knees (run in place)",
          },
        ],
      },
      {
        label: "Day C",
        title: "Full Body Circuit",
        timing: "Morning or Evening",
        circuits: 2,
        rest: "45s between exercises",
        exercises: [
          {
            name: "Standard Pushups",
            sets: "3",
            reps: "6–10",
            note: "Progress from incline if needed",
            lowImpact: "Incline pushups",
            harder: "Close-grip (diamond) pushups",
          },
          {
            name: "Squat to Stand",
            sets: "3",
            reps: "10",
            note: "Squat, touch floor, stand back up — full range mobility",
            lowImpact: "Chair squat (squat to chair, barely touch, stand)",
            harder: "Add jump at top",
          },
          {
            name: "Mountain Climbers (Slow)",
            sets: "3",
            reps: "10 each leg",
            note: "Controlled — plank position, bring knee to chest",
            lowImpact: "Slower pace, reduce range",
            harder: "Speed up for 30 sec",
          },
          {
            name: "Bicycle Crunches",
            sets: "3",
            reps: "10 each side",
            note: "Don't yank your neck — elbow toward opposite knee",
            lowImpact: "Regular crunches",
            harder: "Slow tempo — 3 sec each rep",
          },
          {
            name: "No-Jump Burpee",
            sets: "2",
            reps: "5–8",
            note: "Step back to plank (no jump), do pushup, step back in, stand",
            lowImpact: "Remove the pushup — just step back/forward",
            harder: "Add jump at top",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Build",
    weeks: "Weeks 4–6",
    daysPerWeek: 4,
    focus: "Increase reps and circuits, introduce harder variations, add cardio",
    color: "#facc15",
    days: [
      {
        label: "Day A",
        title: "Push + Core",
        timing: "Evening",
        circuits: 3,
        rest: "45s between exercises",
        exercises: [
          {
            name: "Standard Pushups",
            sets: "4",
            reps: "10–15",
            note: "Full range of motion — chest to 2 inches from floor",
            lowImpact: "Incline pushups",
            harder: "Diamond pushups",
          },
          {
            name: "Pike Pushups",
            sets: "3",
            reps: "8–12",
            note: "Hips high, head toward floor",
            lowImpact: "Partial range",
            harder: "Elevated feet pike pushup",
          },
          {
            name: "Chair Dips",
            sets: "3",
            reps: "10–12",
            note: "Legs extended for more difficulty",
            lowImpact: "Knees bent 90°",
            harder: "Elevate feet on second chair",
          },
          {
            name: "Hollow Body Hold",
            sets: "3",
            reps: "20–30 sec",
            note: "Lower back pressed into floor, arms overhead",
            lowImpact: "Tuck position — knees bent",
            harder: "Arms behind head, legs lower",
          },
          {
            name: "Side Plank",
            sets: "2",
            reps: "20 sec each side",
            note: "Hips stacked",
            lowImpact: "Bottom knee down",
            harder: "Raise top leg",
          },
          {
            name: "Jumping Jacks",
            sets: "3",
            reps: "45 sec",
            note: "Cardio finisher — maintain pace",
            lowImpact: "Step jacks",
            harder: "Increase pace",
          },
        ],
      },
      {
        label: "Day B",
        title: "Lower Body + Glutes",
        timing: "Evening",
        circuits: 3,
        rest: "45s between exercises",
        exercises: [
          {
            name: "Bulgarian Split Squat",
            sets: "3",
            reps: "8 each leg",
            note: "Rear foot on chair — deep lunge position",
            lowImpact: "Reverse lunge (no chair)",
            harder: "Add pause at bottom",
          },
          {
            name: "Jump Squat",
            sets: "3",
            reps: "10",
            note: "Land softly — sink back into squat on landing",
            lowImpact: "Pause squat — no jump",
            harder: "Increase pace",
          },
          {
            name: "Single-Leg Glute Bridge",
            sets: "3",
            reps: "10 each leg",
            note: "Keep hips level",
            lowImpact: "Two-leg glute bridge",
            harder: "Add 2-sec hold at top",
          },
          {
            name: "Lateral Lunge",
            sets: "3",
            reps: "8 each side",
            note: "Step wide, sit into one hip",
            lowImpact: "Reduce step width",
            harder: "Add a pulse at bottom",
          },
          {
            name: "Calf Raises",
            sets: "2",
            reps: "20",
            note: "Single-leg for more challenge",
            lowImpact: "Two-leg",
            harder: "Pause at top for 2 sec",
          },
          {
            name: "High Knees",
            sets: "3",
            reps: "30 sec",
            note: "Drive knees above hip level",
            lowImpact: "Marching in place",
            harder: "Add arm drive overhead",
          },
        ],
      },
      {
        label: "Day C",
        title: "Full Body HIIT Circuit",
        timing: "Evening",
        circuits: 3,
        rest: "30s between exercises, 90s between circuits",
        exercises: [
          {
            name: "Burpees",
            sets: "3",
            reps: "6–8",
            note: "Jump at top, jump back to plank",
            lowImpact: "No-jump burpee",
            harder: "Add pushup in plank",
          },
          {
            name: "Squat Jumps",
            sets: "3",
            reps: "10",
            note: "Explosive — land soft",
            lowImpact: "Regular squat",
            harder: "180° turn in air",
          },
          {
            name: "Mountain Climbers",
            sets: "3",
            reps: "20 sec fast",
            note: "Keep hips down — fast alternating legs",
            lowImpact: "Slow controlled version",
            harder: "Cross-body (knee to opposite elbow)",
          },
          {
            name: "Pushup to Shoulder Tap",
            sets: "3",
            reps: "8 each side",
            note: "After each pushup, tap opposite shoulder",
            lowImpact: "Shoulder taps from plank (no pushup)",
            harder: "Add a 1-sec pause at top of tap",
          },
          {
            name: "Reverse Lunge to Knee Drive",
            sets: "3",
            reps: "8 each leg",
            note: "Step back, lunge, drive front knee up on return",
            lowImpact: "Reverse lunge only",
            harder: "Add jump on knee drive",
          },
        ],
      },
      {
        label: "Day D",
        title: "Active Recovery / Mobility",
        timing: "Morning or Evening",
        circuits: 1,
        rest: "As needed",
        exercises: [
          {
            name: "Hip Flexor Stretch",
            sets: "2",
            reps: "30 sec each side",
            note: "Kneel on one knee, push hips forward",
            lowImpact: "Seated version",
            harder: "Add overhead arm reach",
          },
          {
            name: "Cat-Cow",
            sets: "2",
            reps: "10 reps",
            note: "Slow breath-linked movement",
            lowImpact: "This IS low impact",
            harder: "N/A",
          },
          {
            name: "Downward Dog",
            sets: "2",
            reps: "30 sec hold",
            note: "Pedal heels to stretch calves",
            lowImpact: "Hands on chair instead of floor",
            harder: "Add 3-leg dog variation",
          },
          {
            name: "Thoracic Rotation",
            sets: "2",
            reps: "8 each side",
            note: "Seated or lying — open chest toward ceiling",
            lowImpact: "Reduce range",
            harder: "N/A",
          },
          {
            name: "Light Walk",
            sets: "1",
            reps: "15–20 min",
            note: "Outside if possible — active rest, not exercise",
            lowImpact: "Shorter walk",
            harder: "Brisk pace",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Intensify",
    weeks: "Weeks 7–9",
    daysPerWeek: 4,
    focus: "Advanced variations, increased volume, true HIIT intervals",
    color: "#f97316",
    days: [
      {
        label: "Day A",
        title: "Push Strength",
        timing: "Evening",
        circuits: 4,
        rest: "30s between exercises",
        exercises: [
          {
            name: "Diamond Pushups",
            sets: "4",
            reps: "8–12",
            note: "Hands form triangle under chest",
            lowImpact: "Standard pushups",
            harder: "Archer pushups (weight shifts side to side)",
          },
          {
            name: "Decline Pushups",
            sets: "4",
            reps: "8–10",
            note: "Feet elevated on chair — hits upper chest",
            lowImpact: "Standard pushups",
            harder: "Add clap at top",
          },
          {
            name: "Elevated Chair Dips",
            sets: "3",
            reps: "10–12",
            note: "Feet on second chair, full extension",
            lowImpact: "Knees bent dips",
            harder: "Add pause at bottom",
          },
          {
            name: "T-Pushup",
            sets: "3",
            reps: "6 each side",
            note: "After pushup, rotate into side plank and reach up",
            lowImpact: "Side plank only, no pushup",
            harder: "Add hip dip in side plank",
          },
          {
            name: "Plank to Downdog",
            sets: "3",
            reps: "10",
            note: "Flow between plank and downward dog",
            lowImpact: "Hold each position 5 sec instead of flowing",
            harder: "Add pushup in plank position",
          },
        ],
      },
      {
        label: "Day B",
        title: "Lower Body Power",
        timing: "Evening",
        circuits: 4,
        rest: "30s between exercises",
        exercises: [
          {
            name: "Squat Jump",
            sets: "4",
            reps: "12",
            note: "Continuous — minimal rest at bottom",
            lowImpact: "Pause squat",
            harder: "Add 180° rotation",
          },
          {
            name: "Walking Lunges",
            sets: "4",
            reps: "10 each leg",
            note: "Space required — use hallway",
            lowImpact: "Stationary lunges",
            harder: "Add overhead arms",
          },
          {
            name: "Single-Leg RDL",
            sets: "3",
            reps: "8 each leg",
            note: "Hinge at hip, keep back flat — balance challenge",
            lowImpact: "Hold wall for balance",
            harder: "Add a 2 sec pause at bottom",
          },
          {
            name: "Lateral Bounds",
            sets: "3",
            reps: "8 each side",
            note: "Side-to-side hops — land soft on one foot",
            lowImpact: "Lateral step (no hop)",
            harder: "Add pause on landing leg",
          },
          {
            name: "Step-Up to Knee Drive",
            sets: "3",
            reps: "10 each leg",
            note: "Use sturdy chair or step — step up, drive opposite knee",
            lowImpact: "Step up only",
            harder: "Add a hop at top",
          },
        ],
      },
      {
        label: "Day C",
        title: "HIIT Cardio Blast",
        timing: "Morning or Evening",
        circuits: 4,
        rest: "Work 40 sec, rest 20 sec",
        exercises: [
          {
            name: "Burpees",
            sets: "4",
            reps: "40 sec on / 20 sec off",
            note: "Max effort — count reps to track progress week to week",
            lowImpact: "No-jump burpees",
            harder: "Add pushup + tuck jump",
          },
          {
            name: "High Knees",
            sets: "4",
            reps: "40 sec on / 20 sec off",
            note: "Pump arms — knees above hip height",
            lowImpact: "March in place",
            harder: "Sprint pace",
          },
          {
            name: "Squat Jumps",
            sets: "4",
            reps: "40 sec on / 20 sec off",
            note: "Touch floor at bottom, full jump at top",
            lowImpact: "Fast squats",
            harder: "Narrow stance squat jump",
          },
          {
            name: "Mountain Climbers",
            sets: "4",
            reps: "40 sec on / 20 sec off",
            note: "Full speed — keep hips down",
            lowImpact: "Slow and controlled",
            harder: "Cross-body climbers",
          },
          {
            name: "Plank Jacks",
            sets: "4",
            reps: "40 sec on / 20 sec off",
            note: "In plank, jump feet out and in like jumping jacks",
            lowImpact: "Step feet out alternately",
            harder: "Add pushup every 4 jacks",
          },
        ],
      },
      {
        label: "Day D",
        title: "Full Body Strength Circuit",
        timing: "Evening",
        circuits: 3,
        rest: "45s between exercises",
        exercises: [
          {
            name: "Pushup Variations Ladder",
            sets: "3",
            reps: "Wide / Standard / Diamond — 5 each",
            note: "No rest between variations, move straight through",
            lowImpact: "Incline versions of all three",
            harder: "Add clap at top of standard",
          },
          {
            name: "Bulgarian Split Squat",
            sets: "3",
            reps: "10 each leg",
            note: "Rear foot elevated, deep lunge",
            lowImpact: "Reverse lunge",
            harder: "Add jump at top",
          },
          {
            name: "Towel Row",
            sets: "3",
            reps: "10–12",
            note: "Loop towel around door handle, lean back, pull yourself in",
            lowImpact: "Stand more upright (less lean)",
            harder: "Lean body further back",
          },
          {
            name: "V-Sit",
            sets: "3",
            reps: "8–10",
            note: "Lift legs and torso — hold at top",
            lowImpact: "Boat pose hold (bent knees)",
            harder: "Straight legs, reach arms overhead",
          },
          {
            name: "Broad Jump",
            sets: "3",
            reps: "5",
            note: "Jump forward for distance — walk back to reset",
            lowImpact: "Forward step lunge",
            harder: "Stick landing for 2 sec balance challenge",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Peak",
    weeks: "Weeks 10–12+",
    daysPerWeek: 5,
    focus: "Max intensity, complex movements, fat-burning supersets",
    color: "#f43f5e",
    days: [
      {
        label: "Day A",
        title: "Push Power",
        timing: "Evening",
        circuits: 4,
        rest: "20s between exercises",
        exercises: [
          {
            name: "Plyometric Pushup (Clap)",
            sets: "4",
            reps: "5–8",
            note: "Explosive enough to leave floor — land soft",
            lowImpact: "Regular pushups fast tempo",
            harder: "Double clap",
          },
          {
            name: "Archer Pushup",
            sets: "4",
            reps: "6 each side",
            note: "Wide hands — shift weight to one side, other arm straight",
            lowImpact: "Wide pushup with weight shift only",
            harder: "Full range, chest to floor each side",
          },
          {
            name: "Pike Pushup to Downdog Flow",
            sets: "3",
            reps: "10",
            note: "Pushup at bottom of pike, extend to downdog",
            lowImpact: "Pike pushup only",
            harder: "Add leg raise in downdog",
          },
          {
            name: "Deficit Pushup",
            sets: "3",
            reps: "8–10",
            note: "Hands on books/towels — go below floor level for range",
            lowImpact: "Standard pushup",
            harder: "Slow 3-sec descent",
          },
          {
            name: "L-Sit Hold (Chair)",
            sets: "3",
            reps: "10–15 sec",
            note: "Hands on chair, lift hips and legs off floor",
            lowImpact: "One leg extended, one bent",
            harder: "Full extension both legs",
          },
        ],
      },
      {
        label: "Day B",
        title: "Lower Body + Explosiveness",
        timing: "Evening",
        circuits: 4,
        rest: "20s between exercises",
        exercises: [
          {
            name: "Pistol Squat (Assisted)",
            sets: "3",
            reps: "5 each leg",
            note: "Hold doorframe — single leg squat, other leg extended",
            lowImpact: "Bulgarian split squat",
            harder: "Remove assistance — freestanding",
          },
          {
            name: "Box Jump",
            sets: "4",
            reps: "8",
            note: "Jump onto sturdy chair or step — step down slowly",
            lowImpact: "Step-up with knee drive",
            harder: "Increase height, add depth jump",
          },
          {
            name: "Speed Skaters",
            sets: "4",
            reps: "12 each side",
            note: "Lateral bound, reach hand to opposite foot",
            lowImpact: "Lateral step without bound",
            harder: "Pause on landing for balance",
          },
          {
            name: "Nordic Curl (Towel)",
            sets: "3",
            reps: "5–8",
            note: "Anchor feet under couch, slow lower yourself down",
            lowImpact: "Glute-ham bridge",
            harder: "Full range — chest to floor and back",
          },
          {
            name: "Broad Jump Sprint Combo",
            sets: "3",
            reps: "3 jumps then 20 sec high knees",
            note: "Transition immediately — no break",
            lowImpact: "Forward steps to marching",
            harder: "Add burpee between jumps",
          },
        ],
      },
      {
        label: "Day C",
        title: "HIIT Tabata",
        timing: "Morning",
        circuits: 4,
        rest: "20 sec on / 10 sec off (Tabata format)",
        exercises: [
          {
            name: "Burpee + Tuck Jump",
            sets: "8 rounds",
            reps: "20 on / 10 off",
            note: "Classic Tabata — go all out",
            lowImpact: "No-jump burpee",
            harder: "Add pushup + clap",
          },
          {
            name: "Jump Squat",
            sets: "8 rounds",
            reps: "20 on / 10 off",
            note: "Max height each rep",
            lowImpact: "Fast squat",
            harder: "180° turn",
          },
          {
            name: "Mountain Climbers",
            sets: "8 rounds",
            reps: "20 on / 10 off",
            note: "Sprint pace",
            lowImpact: "Controlled pace",
            harder: "Cross-body",
          },
          {
            name: "High Knees",
            sets: "8 rounds",
            reps: "20 on / 10 off",
            note: "Sprint in place",
            lowImpact: "March",
            harder: "Arms overhead",
          },
        ],
      },
      {
        label: "Day D",
        title: "Full Body Superset",
        timing: "Evening",
        circuits: 4,
        rest: "Superset pairs — 15s between sets, 60s between pairs",
        exercises: [
          {
            name: "Pushup + Squat Jump (superset)",
            sets: "4",
            reps: "10 pushups / 10 jumps",
            note: "Do both back-to-back, then rest",
            lowImpact: "Incline pushup + squat",
            harder: "Diamond pushup + squat jump with spin",
          },
          {
            name: "Dips + Reverse Lunge (superset)",
            sets: "4",
            reps: "12 dips / 10 lunges each leg",
            note: "Push / legs pairing",
            lowImpact: "Reduce reps",
            harder: "Add jump to lunge",
          },
          {
            name: "V-Sit + Glute Bridge (superset)",
            sets: "3",
            reps: "10 v-sits / 15 bridges",
            note: "Core and posterior chain",
            lowImpact: "Boat pose + standard bridge",
            harder: "Single-leg bridge + full L-sit",
          },
          {
            name: "Mountain Climbers + Plank Jacks",
            sets: "3",
            reps: "20 sec each",
            note: "Cardio core finisher — no rest between",
            lowImpact: "Slow both down",
            harder: "Full speed both",
          },
        ],
      },
      {
        label: "Day E",
        title: "Active Recovery",
        timing: "Morning",
        circuits: 1,
        rest: "As needed",
        exercises: [
          {
            name: "Yoga Flow / Stretching",
            sets: "1",
            reps: "20–30 min",
            note: "YouTube: Yoga with Adriene is free and excellent",
            lowImpact: "This IS low impact",
            harder: "N/A",
          },
          {
            name: "Walk",
            sets: "1",
            reps: "20–30 min",
            note: "Outside preferred — light pace, not a workout",
            lowImpact: "Shorter walk",
            harder: "Add some hills",
          },
        ],
      },
    ],
  },
];

const ProgressionTip = () => (
  <div style={{
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "20px 24px",
    marginBottom: "24px",
    fontSize: "13px",
    color: "#94a3b8",
    lineHeight: "1.7",
  }}>
    <div style={{ color: "#e2e8f0", fontWeight: "700", marginBottom: "8px", fontSize: "14px", letterSpacing: "0.05em", textTransform: "uppercase" }}>📋 How to Progress</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div>✅ Finish all sets/reps comfortably for 2 sessions → move to Phase 2</div>
      <div>⬇️ Use lower-impact options anytime — soreness, fatigue, bad day</div>
      <div>🔁 Repeat a phase if needed — no shame, form beats speed</div>
      <div>💡 Fat loss = consistency + slight calorie deficit. This is the engine.</div>
    </div>
  </div>
);

export default function WorkoutProgram() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedExercise, setExpandedExercise] = useState(null);

  const phase = phases[activePhase];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      color: "#e2e8f0",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0a0a0f 100%)",
        borderBottom: "1px solid #1e293b",
        padding: "32px 24px 24px",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: "11px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#64748b",
          marginBottom: "8px",
          fontFamily: "'Courier New', monospace",
        }}>
          Progressive Calisthenics Program
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 5vw, 42px)",
          fontWeight: "400",
          margin: "0 0 8px",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          fontFamily: "'Georgia', serif",
        }}>
          Bodyweight & Fat Loss
        </h1>
        <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
          12+ weeks · Apartment-friendly · No equipment required
        </p>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px 16px" }}>
        {/* Phase Tabs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "24px",
        }}>
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActivePhase(i); setExpandedDay(null); setExpandedExercise(null); }}
              style={{
                background: activePhase === i
                  ? `linear-gradient(135deg, ${p.color}22, ${p.color}11)`
                  : "#111827",
                border: activePhase === i ? `1px solid ${p.color}88` : "1px solid #1f2937",
                borderRadius: "10px",
                padding: "12px 8px",
                cursor: "pointer",
                color: activePhase === i ? p.color : "#6b7280",
                transition: "all 0.2s ease",
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: "700", fontSize: "13px", fontFamily: "'Courier New', monospace" }}>
                Ph. {p.id}
              </div>
              <div style={{ fontSize: "11px", marginTop: "2px", letterSpacing: "0.02em" }}>
                {p.name}
              </div>
              <div style={{ fontSize: "10px", marginTop: "2px", opacity: 0.7 }}>
                {p.weeks}
              </div>
            </button>
          ))}
        </div>

        {/* Phase Header */}
        <div style={{
          background: `linear-gradient(135deg, ${phase.color}15, ${phase.color}08)`,
          border: `1px solid ${phase.color}44`,
          borderRadius: "12px",
          padding: "20px 24px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <div>
            <div style={{ color: phase.color, fontWeight: "700", fontSize: "18px", marginBottom: "4px" }}>
              Phase {phase.id}: {phase.name}
            </div>
            <div style={{ color: "#94a3b8", fontSize: "13px" }}>{phase.focus}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: phase.color, fontSize: "24px", fontWeight: "700", fontFamily: "'Courier New', monospace" }}>
              {phase.daysPerWeek}×
            </div>
            <div style={{ color: "#64748b", fontSize: "11px" }}>per week</div>
          </div>
        </div>

        <ProgressionTip />

        {/* Days */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {phase.days.map((day, di) => (
            <div key={di} style={{
              background: "#111827",
              border: `1px solid ${expandedDay === di ? phase.color + "66" : "#1f2937"}`,
              borderRadius: "12px",
              overflow: "hidden",
              transition: "border-color 0.2s ease",
            }}>
              {/* Day Header */}
              <button
                onClick={() => {
                  setExpandedDay(expandedDay === di ? null : di);
                  setExpandedExercise(null);
                }}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "#e2e8f0",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{
                    background: `${phase.color}22`,
                    color: phase.color,
                    fontFamily: "'Courier New', monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    letterSpacing: "0.05em",
                  }}>
                    {day.label}
                  </span>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "15px" }}>{day.title}</div>
                    <div style={{ color: "#64748b", fontSize: "12px", marginTop: "1px" }}>
                      {day.timing} · {day.circuits} circuit{day.circuits > 1 ? "s" : ""} · {day.exercises.length} exercises
                    </div>
                  </div>
                </div>
                <span style={{ color: "#4b5563", fontSize: "18px", transform: expandedDay === di ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
                  ▼
                </span>
              </button>

              {/* Expanded Day Content */}
              {expandedDay === di && (
                <div style={{ padding: "0 20px 16px", borderTop: "1px solid #1f2937" }}>
                  <div style={{
                    color: "#64748b",
                    fontSize: "12px",
                    padding: "10px 0",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: "0.05em",
                  }}>
                    REST: {day.rest}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {day.exercises.map((ex, ei) => (
                      <div key={ei} style={{
                        background: "#0f172a",
                        border: `1px solid ${expandedExercise === `${di}-${ei}` ? phase.color + "55" : "#1e293b"}`,
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}>
                        <button
                          onClick={() => setExpandedExercise(expandedExercise === `${di}-${ei}` ? null : `${di}-${ei}`)}
                          style={{
                            width: "100%",
                            background: "transparent",
                            border: "none",
                            padding: "12px 14px",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "#e2e8f0",
                            textAlign: "left",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: "600", fontSize: "14px" }}>{ex.name}</div>
                              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "1px", fontFamily: "'Courier New', monospace" }}>
                                {ex.sets} sets · {ex.reps}
                              </div>
                            </div>
                          </div>
                          <div style={{
                            color: phase.color,
                            fontSize: "11px",
                            opacity: 0.8,
                            whiteSpace: "nowrap",
                            marginLeft: "8px",
                          }}>
                            {expandedExercise === `${di}-${ei}` ? "less ▲" : "details ▼"}
                          </div>
                        </button>

                        {expandedExercise === `${di}-${ei}` && (
                          <div style={{
                            padding: "0 14px 14px",
                            borderTop: "1px solid #1e293b",
                            fontSize: "12px",
                            lineHeight: "1.6",
                          }}>
                            <div style={{ color: "#94a3b8", marginTop: "10px" }}>
                              <span style={{ color: "#64748b" }}>Form tip: </span>{ex.note}
                            </div>
                            <div style={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: "8px",
                              marginTop: "10px",
                            }}>
                              <div style={{
                                background: "#0a3d2e",
                                border: "1px solid #064e3b",
                                borderRadius: "6px",
                                padding: "8px 10px",
                              }}>
                                <div style={{ color: "#34d399", fontWeight: "700", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                                  ↓ Easier Option
                                </div>
                                <div style={{ color: "#6ee7b7" }}>{ex.lowImpact}</div>
                              </div>
                              <div style={{
                                background: "#3d1a0a",
                                border: "1px solid #7c2d12",
                                borderRadius: "6px",
                                padding: "8px 10px",
                              }}>
                                <div style={{ color: "#fb923c", fontWeight: "700", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                                  ↑ Harder Option
                                </div>
                                <div style={{ color: "#fdba74" }}>{ex.harder}</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: "32px",
          padding: "20px",
          background: "#0f172a",
          borderRadius: "12px",
          border: "1px solid #1e293b",
          fontSize: "12px",
          color: "#475569",
          lineHeight: "1.7",
          textAlign: "center",
        }}>
          <div style={{ color: "#64748b", fontWeight: "600", marginBottom: "6px" }}>A note on fat loss</div>
          Workouts create the conditions. What you eat determines the rate. Aim for a moderate calorie deficit (300–500 cal/day) and prioritize protein (0.7–1g per lb of bodyweight). Sleep is non-negotiable — it's when your body actually changes.
        </div>
      </div>
    </div>
  );
}
