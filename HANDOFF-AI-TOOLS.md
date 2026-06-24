# AI Coaching Tools — Architecture & Extension Guide

## Overview

`coaching-ai-tools.html` is a single-page multi-tool application for coaches and athletes. It uses **tab-based navigation** to switch between tools (Vertical Jump, Sprint Speed, etc.), with **unified athlete profiles** stored in a single `athletes` localStorage key.

## File Location

`/coaching-ai-tools.html` (~2450 lines, all in one file)

No build tools, no backend, no frameworks — pure static HTML + vanilla JS + MediaPipe CDN.

---

## Architecture

### Tab System

Tabs are driven by a config array at the top of the script:

```js
const TOOLS = [
  { id: 'jump',   label: 'Vertical Jump',   status: 'live' },
  { id: 'sprint', label: 'Sprint Speed',     status: 'live' },
  { id: 'oneRM',  label: '1RM Calculator',   status: 'coming-soon' },
];
```

**Adding a new tool:**
1. Add an entry to `TOOLS` (e.g. `{ id: 'agility', label: 'Agility', status: 'live' }`).
2. Create a `<button class="tab-btn" data-tool="agility">Agility</button>` in the tab bar.
3. Create a `<div class="tool-tab" data-tool="agility">` with your tool's HTML.
4. Add the tool's JS logic inside the existing `<script>` tag.

### Athlete Storage

Single localStorage key: `athletes`

Each athlete object:

```js
{
  name: 'Jane Smith',
  age: '17',
  sex: 'female',
  sport: 'Soccer',
  heightInches: 65,
  weightLbs: 130,
  jumpTests: [
    { date: '2026-06-24', inches: 22.5, ... }
  ],
  sprintTests: [
    { date: '2026-06-24', distance: '40yd', time: 5.2, mph: 15.7, ... }
  ]
}
```

### Key JS Functions

| Function | Purpose |
|---|---|
| `saveAthleteProfile(name, age, sex, sport, height, weight)` | Creates/updates athlete |
| `getAthlete(name)` | Reads from localStorage |
| `saveAthleteData(name, testType, data)` | Pushes to `jumpTests[]` or `sprintTests[]` |
| `renderAthletes()` | Renders all profiles |
| `switchTool(toolId)` | Tab switching + camera lifecycle |
| `getAgeGroup(age, sex)` | Used for norms lookup |
| `downloadReport(name)` | Generates .txt report |
| `shareAthlete(name)` | Creates base64 URL |
| `handleShareView()` | Reads and renders share URL |

### Camera Modules

Each tool that uses camera detection has its own module:

- **Jump**: `startCamera()`, `stopCamera()`, `showJumpReview()`, `confirmJump()`, etc.
- **Sprint**: `startSprintCamera()`, `stopSprintCamera()`, `showSprintReview()`, `confirmSprint()`, etc.

Both use `@mediapipe/pose` (CDN) for landmark detection. The sprint module tracks hip x-position to detect cone crossings.

**Important:** Tab switching calls `stopCamera()` (jump) and `stopSprintCamera()` (sprint), but does not yet stop the other tool's stream. Future enhancement needed.

### MediaPipe Dependencies (CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"></script>
```

---

## Adding a New Tool: Step-by-Step

1. **Add config entry** in `TOOLS` array.
2. **Add tab button** in `.tab-bar` div.
3. **Add tab content** as `<div class="tool-tab" data-tool="your-id">`.
4. **Add JS logic** in the `<script>` block.
5. **If using camera:** prefix all camera functions with the tool name to avoid conflicts (e.g. `startYourToolCamera()`, `stopYourToolCamera()`).
6. **Register tab switch:** the existing `document.querySelectorAll('.tab-btn')` listener handles switching automatically — your tab just needs `data-tool="your-id"`.

### Sharing Pattern

Your tool's `shareAthlete()` function must:
1. Build an object with `type: 'your-tool'`, `toolData: {...}`.
2. Base64 encode the full athlete JSON (including all test types).
3. Set `window.location.hash = encoded`.
4. `handleShareView()` on load reads the hash, identifies the tool type from `athlete.jumpTests` or `athlete.sprintTests`, and renders accordingly.

---

## Nav Links

AI Tools nav link is present on all HTML pages with a `<nav>` element (desktop + mobile menu). See `script.js` section in `HANDOFF-NAV.md` if one exists, or grep for `coaching-ai-tools.html` across the repo.

---

## Things to Know

- **Camera stream cleanup:** Tab switching calls stop functions, but this should be hardened — especially when a camera is actively processing frames.
- **LED OCR (v2):** The sprint tab has placeholder UI for LED assist mode (tap-to-crop + OCR), but Auto mode (MediaPipe hip tracking) ships first. The LED flow needs Tesseract.js integration and crop region management.
- **Mobile nav:** The `<link rel="canonical">` tag is present on all pages. The mobile hamburger menu includes the AI Tools link.
- **Sprint norms:** Hardcoded in `sprintNorms` object — organized by age group (14-15, 16-18, 18+) and distance (10yd, 20yd, 40yd). Four tiers: Elite, Good, Average, Needs Work.
