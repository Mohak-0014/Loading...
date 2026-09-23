# Implementation Guide

Fifteen blocks. Follow them in order. The app must run and demo at the end of
every block.

Times assume one person. Parallelise across a team by taking whole blocks, not
whole files, and keep block 2 on one person only — everything downstream
depends on those signatures.

---

## Block 1 — Scaffold (45 min)

`npm install && npm run dev`, app shell, six nav tabs pointing at stub pages,
design tokens wired, contrast toggle working.

Files: `App.jsx`, `components/BottomNavigation.jsx`, `components/OperatorHeader.jsx`

**Tailwind v4 gotcha.** There is no `tailwind.config.js` and no
`npx tailwindcss init`. It is a Vite plugin plus `@import "tailwindcss"` in
`src/index.css`, and tokens go in an `@theme` block. Teams lose half an hour
here following v3 tutorials. The config is already correct in this repo; do
not "fix" it.

*Done when:* all six tabs switch, contrast toggle visibly inverts.

---

## Block 2 — Data and engines, zero UI (85 min)

The most important block. Everything after it is rendering.

Files: all of `src/data/`, all of `src/services/` except `assistant`,
`handover`, `persistence`. Plus `utils/stats.js`, `hooks/useTelemetryClock.js`,
`state/store.jsx`.

Seed data must open with the judges' four sample rows verbatim, then ~200
synthetic rows with real variance. Flat data produces a model with no
explanatory power and the contributor breakdown will look invented.

*Done when:* you can call `assessRisk`, `detectAnomalies` and `predict` from
the console and get sensible output. No UI yet.

---

## Block 3 — Home (90 min)

The screen judges look at longest. Take it to polish floor now, not later.

Files: `pages/Home.jsx`, `MissionCard`, `TelemetryCard`, `StatusBadge`,
`MetricCard`, plus glance mode.

*Done when:* someone who has not seen it can state task, schedule status and
safety state in three seconds.

---

## Block 4 — Safety engine and alert (75 min)

Files: `pages/Safety.jsx`, `components/SafetyAlert.jsx`, `LongPressButton`.

Includes the four states, the why-panel, hold-to-acknowledge, seatbelt
critical path, and the decision-support disclaimer on the surface itself.

---

## Block 5 — Hazard Memory (55 min)

Files: `pages/Safety.jsx` additions, `components/ZoneMap.jsx`, `HazardCard`,
`services/hazardMemory.js`.

Static inline SVG map. Do not reach for a mapping library.

---

## Block 6 — Report hazard and photo (45 min)

Files: `pages/ReportHazard.jsx`, `components/PhotoCapture.jsx`,
`utils/image.js`.

Build the shared downscale utility here; block 10 reuses it.

**Use `<input type="file" accept="image/*" capture="environment">`**, not
`getUserMedia`. Native camera on mobile, file picker on desktop, no permission
prompt, cannot fail on stage.

**Downscale to 800 px before storing.** localStorage is about 5 MB; one
full-resolution photo can exceed that alone. Cap at three per report, wrap
writes in try/catch. A quota error mid-demo wipes the state you are
presenting.

*Done when:* reporting a hazard increments Zone C on screen.

---

## Block 7 — Tasks and ETA (55 min)

Files: `pages/Tasks.jsx`, `components/TaskCard.jsx`.

ETA renders inline on the card. There is no detail screen; it was cut.

---

## Block 8 — Coach and Unusual Activity (55 min)

Files: `pages/Coach.jsx`, `components/CoachCard.jsx`,
`services/coachEngine.js`.

The link from the one improvement into a training module is what closes the
learning loop. Without it the Coach is a dead end.

---

## Block 9 — Training Hub (35 min)

Files: `pages/Training.jsx`, `components/TrainingCard.jsx`,
`data/trainingModules.js`.

Three formats. The video tile is a poster and a duration, labelled as a module
— do not ship a play button that does nothing.

---

## Block 10 — Machine and fault lookup (35 min)

Files: `pages/Machine.jsx`, `data/faultSymbols.js`.

Photo → candidate symbol grid → tap the match → meaning, urgency, action.
No classification claim anywhere in the copy. Logging a fault writes to recent
observations, which reaches the handover.

---

## Block 11 — Shift handover (25 min)

Files: `pages/Handover.jsx`, `services/handover.js`.

Generated from live state. This is where you prove the lineage.

---

## Block 12 — Demo controls, Ask sheet, persistence (55 min)

Files: `demo/DemoControls.jsx`, `demo/demoScenarios.js`,
`components/AskSheet.jsx`, `services/assistant.js`,
`services/persistence.js`.

Build **Play demo** as a hands-free sequence. Clicking seven buttons while
talking is how demos derail.

Pause the telemetry clock while a scenario runs, or the random walk will
overwrite your scripted values. This bug appears during rehearsal, not before.

---

## Block 13 — Polish (45 min)

Tablet breakpoints, empty states, focus rings, reduced motion, the
disclaimer, and removing anything that only half works.

---

## Block 14 — Freeze (45 min)

Stop building. Rehearse the full flow five times. **Record a clean screen
capture.** Write the three-minute pitch.

Do not skip the recording. Teams lose hackathons to a merge conflict at 11:40,
not to a missing feature.

---

## Block 15 — Voice, on a branch (50 min)

Only after block 14 is complete and the video exists.

Files: `hooks/useSpeech.js`, additions to `AskSheet`.

Hold-to-talk, live transcript on screen, local intent match, spoken answer,
tap-chips always visible underneath, scripted-transcript fallback for a loud
room.

Chrome and Edge only. Test on the actual demo laptop at actual room volume.
Merge only if it runs clean twice. If not, revert one commit and your demo is
exactly as strong as it was an hour ago.

---

## Tripwires

At hour 6 you should have Home, Safety and Hazard Memory working.
At hour 9, Coach done.

If you are behind, cut in this order and do not improvise a different order
late at night:

1. Instructor booking
2. Training video tile
3. Play demo runner (click the buttons manually)
4. Unusual Activity collapses into a single Coach card
5. Voice

Never cut from block 14. That block is why you have a demo at all.

## Definition of done for any block

It runs, it is reachable from the nav, it reads from the store rather than
local mock state, every intelligent surface has a provenance line, and it does
not contain a number that was not computed.
