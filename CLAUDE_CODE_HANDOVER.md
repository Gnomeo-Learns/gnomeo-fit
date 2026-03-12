# Claude Code Handover — gnomeo-fit GitHub Pages Deployment

## What You're Deploying

An Astro + React static site with three pages:
- `/` — Landing page
- `/workout` — 12-week calisthenics program (interactive React component)
- `/nutrition` — Nutrition companion with calorie calculator (interactive React component)

All files are ready. Your job is to initialize the repo, configure one placeholder, and publish.

---

## Prerequisites

Confirm these are available before starting:
- Node.js 18+ (`node --version`)
- Git configured with GitHub credentials
- The `gnomeo-fit` repository already exists on GitHub (empty is fine)

---

## Step 1 — Update the GitHub Username Placeholder

In `astro.config.mjs`, replace `YOUR_GITHUB_USERNAME` with the actual GitHub username:

```js
site: 'https://ACTUAL_USERNAME.github.io',
```

---

## Step 2 — Install Dependencies

```bash
cd gnomeo-fit
npm install
```

---

## Step 3 — Test the Build Locally (Optional but Recommended)

```bash
npm run build
npm run preview
```

Visit `http://localhost:4321/gnomeo-fit/` to verify all three pages load correctly.

---

## Step 4 — Initialize Git and Push

```bash
git init
git add .
git commit -m "Initial commit — workout program and nutrition companion"
git branch -M main
git remote add origin https://github.com/ACTUAL_USERNAME/gnomeo-fit.git
git push -u origin main
```

---

## Step 5 — Enable GitHub Pages via GitHub Actions

In the GitHub repository settings:
1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Save

The workflow file at `.github/workflows/deploy.yml` handles the rest automatically on every push to `main`.

---

## Step 6 — Verify Deployment

After the Actions workflow completes (usually 2–3 minutes), the site will be live at:

```
https://ACTUAL_USERNAME.github.io/gnomeo-fit/
```

Check all three routes:
- `/gnomeo-fit/`
- `/gnomeo-fit/workout`
- `/gnomeo-fit/nutrition`

---

## File Structure Reference

```
gnomeo-fit/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions CI/CD
├── src/
│   ├── components/
│   │   ├── WorkoutProgram.jsx  ← React component (interactive)
│   │   └── NutritionCompanion.jsx
│   ├── layouts/
│   │   └── Layout.astro        ← Shared nav + HTML shell
│   └── pages/
│       ├── index.astro         ← Landing page
│       ├── workout.astro       ← Wraps WorkoutProgram.jsx
│       └── nutrition.astro     ← Wraps NutritionCompanion.jsx
├── astro.config.mjs            ← Base path + React integration
└── package.json
```

---

## Troubleshooting

**Build fails with React errors:**
Ensure `@astrojs/react` is listed in `astro.config.mjs` integrations — it already is, but verify `npm install` completed cleanly.

**Pages 404 after deploy:**
Double-check that `base: '/gnomeo-fit'` in `astro.config.mjs` matches the exact repository name (case-sensitive).

**GitHub Actions workflow not triggering:**
Confirm the repository's Pages source is set to "GitHub Actions" (not "Deploy from branch").

**Interactive components not working (static only):**
The `.astro` page files use `client:load` on the React components — this is required for interactivity and is already set correctly.
