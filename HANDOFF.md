# CHS Strength Club - Migration Handoff

## Goal
Refactor static HTML site: create shared CSS/JS files, unify nav/footer across all pages, optimize fonts (drop Playfair Display), add lazy loading to images/iframes.

## Constraints
- Static HTML site, no build tools
- JS-based shared files approach
- Use only Oswald/Black Han Sans/DM Sans fonts
- Contact form uses FormSubmit.co to chsstrengthclub@gmail.com

## Shared Files Created
- `/global.css` - shared styles (variables, reset, nav, mobile menu, buttons, modal, footer, reveal, responsive)
- `/script.js` - shared JS (toggleMenu, openModal, closeModal, closeModalOutside, IntersectionObserver, form handler)

## File Status

### DONE (have global.css + script.js, unified nav/footer, no duplicate CSS)
- `index.html`
- `sport-performance.html`
- `senior-strength.html`
- `locations/index.html`
- `blog/index.html`
- `small-group-training-north-charleston.html` (just completed)

### NOT MIGRATED (need full migration)
These 5 blog posts still have:
- Old font link with Playfair Display
- Inline `:root` CSS variables
- Inline reset/body/nav/footer CSS
- Old `.site-header`/`.header-links` nav structure
- Old `.site-footer` footer structure

Files to migrate:
1. `blog/group-strength-classes-north-charleston-wando-woods.html`
2. `blog/robust-aging-senior-fitness-north-charleston.html`
3. `blog/senior-gym-orientation.html`
4. `blog/sport-performance-training-north-charleston.html`
5. `blog/strength-conditioning-specialist-north-charleston.html`

## Migration Steps for Each Blog Post

1. **Replace font link** with global.css link:
   ```html
   <!-- REMOVE: <link href="https://fonts.googleapis.com/css2?family=...Playfair..." rel="stylesheet"> -->
   <!-- ADD: -->
   <link rel="stylesheet" href="/global.css">
   ```

2. **Remove inline CSS blocks** for:
   - `:root { ... }` variables
   - `* { box-sizing... }` reset
   - `body { ... }` base styles
   - `.site-header` / `.header-links` nav styles
   - `.site-footer` footer styles
   - Any `.nav-cta`, `.hamburger`, `.mob-menu`, `.btn`, `.btn-red` definitions

3. **Keep page-specific CSS** like:
   - `.hero` styles specific to that page
   - `.article-body`, `.pullquote`, `.divider`
   - Any unique section styles

4. **Replace old nav HTML**:
   ```html
   <!-- OLD: -->
   <header class="site-header">
     <a href="/index.html">Charleston <span>Strength</span> Club</a>
     <nav class="header-links">...</nav>
   </header>

   <!-- NEW: -->
   <nav>
     <a href="/index.html" class="nav-logo">
       <img src="/logo.png" alt="CHS Strength Club">
       <span class="nav-logo-text">CHS Strength Club</span>
     </a>
     <ul class="nav-links">
       <li><a href="/index.html#programs">Programs</a></li>
       <li><a href="/small-group-training-north-charleston.html">Strength Classes</a></li>
       <li><a href="/sport-performance.html">Sport Performance</a></li>
       <li><a href="/senior-strength.html">Senior Strength</a></li>
       <li><a href="/locations/">Locations</a></li>
       <li><a href="/blog/">Blog</a></li>
       <li><a href="mailto:chsstrengthclub@gmail.com" class="nav-cta">Book a Call</a></li>
     </ul>
     <button class="hamburger" onclick="toggleMenu()" aria-label="Menu">
       <span></span><span></span><span></span>
     </button>
   </nav>

   <div class="mob-menu" id="mobMenu">
     <a href="/index.html#programs" onclick="toggleMenu()">Programs</a>
     <a href="/small-group-training-north-charleston.html" onclick="toggleMenu()">Strength Classes</a>
     <a href="/sport-performance.html" onclick="toggleMenu()">Sport Performance</a>
     <a href="/senior-strength.html" onclick="toggleMenu()">Senior Strength</a>
     <a href="/locations/" onclick="toggleMenu()">Locations</a>
     <a href="/blog/" onclick="toggleMenu()">Blog</a>
     <a href="mailto:chsstrengthclub@gmail.com" class="mob-cta" onclick="toggleMenu()">Book a Call</a>
   </div>
   ```

5. **Replace old footer HTML**:
   ```html
   <!-- OLD: -->
   <footer class="site-footer">...</footer>

   <!-- NEW: -->
   <footer>
     <a href="/index.html" class="foot-logo">
       <img src="/logo.png" alt="CHS Strength Club">
       <span>CHS Strength Club</span>
     </a>
     <span class="foot-copy">&copy; 2026 Charleston Strength Club</span>
     <div class="foot-links">
       <a href="https://decentralizedstrength.buzzsprout.com" target="_blank">Podcast</a>
       <a href="https://www.facebook.com/ChsStrengthClub" target="_blank">Facebook</a>
       <a href="https://www.instagram.com/chsstrengthclub/" target="_blank">Instagram</a>
       <a href="https://www.youtube.com/@chsstrengthclub/" target="_blank">YouTube</a>
     </div>
   </footer>
   ```

6. **Add script.js** before closing `</body>`:
   ```html
   <script src="/script.js"></script>
   ```

7. **Replace Playfair references** in any remaining styles:
   - `.pullquote` or `.pull-quote` that use `font-family: "Playfair Display"` should use `font-family: "DM Sans"` with `font-style: italic` instead

## After Blog Migration

### Add lazy loading
Add `loading="lazy"` to all `<img>` and `<iframe>` tags across the site.

### Compress images
- `logo.png` (255KB) - needs compression
- `seniorgymorientation.jpg` (122KB) - needs compression

## Key Decisions Made
- Unified nav: Logo | Programs | Strength Classes | Sport Performance | Senior Strength | Locations | Blog | Book a Call
- "Book a Call" uses modal on index.html, mailto on all other pages
- Mobile menu ID is `mobMenu`, triggered by `toggleMenu()`
- Footer includes Podcast link to decentralizedstrength.buzzsprout.com
- Copyright year 2026

## Reference Files
Look at these completed files as templates:
- `sport-performance.html` - good example of migrated service page
- `senior-strength.html` - good example of migrated service page
- `blog/index.html` - good example of migrated blog listing page

---

## Session: Vertical Jump Calculator (Coaching AI Tools Page)

### New File
- `coaching-ai-tools.html` — full standalone page with inline CSS + JS

### Features Built
- **Convert & analyze**: Enter cm from any tester → shows inches + full analysis
- **Percentile ranking**: Based on age + sex + sport-specific normative data
- **Athlete profiles**: Saved in `localStorage` (key: `vjAthletes`) with multi-test history
- **Date tracking**: Each test recorded with a date (defaults to today, editable)
- **Test history**: Expandable per-athlete view with trend arrows (↗/→/↘)
- **Download report**: Generates `.txt` file with full athlete history
- **Share analysis**: Encodes athlete data as base64 in `?share=` URL param — opens a clean read-only report
- **"Add New Test"**: Pre-fills the form with existing profile data
- **Delete athlete**: Removes profile and all tests

### Suggested Future Tools (placeholder cards exist)
- Sprint Speed Converter
- 1RM Calculator

### Nav Changes
Added "AI Tools" link to main nav + mobile menu on all 5 main pages:
- `index.html`
- `sport-performance.html`
- `small-group-training-north-charleston.html`
- `locations/index.html`
- `coaching-ai-tools.html` (with `active` class)

### SEO Approach
- **Title**: `Vertical Jump Analysis & Calculator — Convert cm to in | Free Athlete Tool`
- **Meta**: Targets coaches + athletes using metric jump testers; keywords: analysis, converter, cm to inches, percentile rankings
- **H1**: "Vertical Jump Analysis & Converter — cm to inches"
- **Schema**: `WebApplication` LD+JSON crediting Adam Oliver, CSCS as builder

### Percentile Logic (embedded in JS)
- **Norms table**: By age group (8-9, 10-12, 13-15, 16-18, 19-29, 30-39, 40-49, 50-59, 60-80) × sex (male/female)
- **Sport adjustments**: basketball +5, volleyball +4, track +3, football +2, soccer/hockey/lacrosse/wrestling +1, baseball/general +0
- **Calculation**: z-score = (jumpIn - mean) / sd → percentile via error function approximation → clamp 1-100 → add sport adjustment
- **Rating thresholds**: Excellent ≥95th, Above Avg ≥75th, Average ≥25th, Below Avg ≥10th, Poor <10th

### Data Model (localStorage)
```json
{
  "vjAthletes": {
    "Adam O": {
      "sport": "basketball",
      "sex": "male",
      "age": 16,
      "heightFt": 5,
      "heightIn": 10,
      "weight": 165,
      "tests": [
        { "date": "2026-01-08", "jumpCm": 55, "jumpIn": 21.7, "percentile": 70, "rating": "Average" }
      ]
    }
  }
}
```

### Key Decisions
- Two-step flow: "Convert & Analyze" button first (shows inches), then "Save Test & Analyze My Results" (saves + shows full analysis)
- No backend — all data lives in browser localStorage
- Share URLs use base64-encoded JSON in query param (no server required)
- Email field removed entirely (privacy) — users download report or share profile link instead
- Page matches existing dark theme (Oswald/Black Han Sans/DM Sans, red accents, noise overlay)
- "Coming soon" cards signal this is the first of multiple tools

---

## Session: Camera Jump Detection (MediaPipe Pose)

### What Changed
All in `coaching-ai-tools.html`:
- **Meta description** — updated to mention camera auto-detection with AI pose tracking
- **CSS** — added ~50 lines of camera section styles (camera-view, cam-btn, countdown, frame-review, cam-result, etc.)
- **HTML** — camera section inserted inside calc-card (before form) with: "or" divider, camera viewport (video + canvas overlay + status + countdown), Record button, 4-thumbnail frame review (Standing/Takeoff/Peak/Landing), result display, Confirm & Use / Re-record buttons, usage tips
- **Module script** (`<script type="module">`) — MediaPipe Pose Landmarker integration with dynamic CDN import

### Camera Detection Flow
1. User fills in weight, age, height, sex, sport (height required for pixel→inch scaling)
2. Page loads → imports MediaPipe WASM (~13MB) from CDN, requests camera via `getUserMedia`
3. Real-time skeleton overlay (hips highlighted in red) + "No person detected" warnings
4. Tap "Record Jump" → 3-2-1 countdown → 3-second recording captures hip/heel/nose Y per frame
5. Analysis: standing baseline (first 10 frames avg) → find dip (deepest squat Y) → takeoff (hip crosses standing height) → peak (minimum Y = highest jump) → landing (hip returns to standing)
6. 4 thumbnails shown with pixel displacement values; tap any thumbnail to select that frame as the jump height
7. "Confirm & Use" fills `jumpCm` field, updates `lastResult`, and calls `convertJump()` to re-run analysis
8. "Re-record" clears and starts over

### Key Technical Details
- **Scale calibration**: `athleteHeightInches / (heelY - noseY)` — uses standing frames to get pixel height of athlete's full body
- **Jump height**: `(standingHipY - peakHipY) * scale` — positive difference from standing baseline to peak
- **Takeoff detection**: After dip, first frame where hip Y ≤ standing hip Y (athlete has extended through standing height)
- **Landing detection**: First frame after peak where hip Y within 1.5% of standing baseline
- **Skeleton connections**: MediaPipe 33-keypoint model with 28 bone connections drawn in red
- **Frame review**: Thumbnails are frozen from the live video with skeleton overlay re-drawn on each; tap to fine-tune detection
- **Model**: Pose Landmarker Lite (fastest, ~13MB WASM) loaded from Google Storage CDN
- **Edge case handling**: <15 frames → "not enough data", height missing → prompts user, jump outside 1-60in → "looked off", camera fail → "enter jump manually"

### Known Quirks
- Detect loop runs `requestAnimationFrame` continuously — could be throttled to every 2-3 frames for CPU savings
- `convertJump()` is called after confirm to show the save section; user still fills athlete name and clicks save manually
- If athlete changes height after detection but before confirm, scale will be recalculated from the stored standing heel/nose Y (which is from the actual recorded frames)

---

## Session: Camera Adaptability + Profile Video Storage

### What Changed
All changes in `coaching-ai-tools.html`:

**Camera Adaptability Controls:**
- **Camera switch** — Button cycles through all available video input devices via `enumerateDevices()`. Stops old stream and starts new one with the selected device ID. Status label updates with camera name. Graceful fallback on failure.
- **Duration selector** — Pill buttons: 2s / **3s** / 4s / 5s. Default 3s. Controls how long recording captures after the GO signal. Value read from `getDuration()` before each recording.
- **Sensitivity selector** — Pill buttons: Strict / **Normal** / Relaxed. Maps to `{threshold, minJump}`:
  - Strict: threshold 0.01, min 1.5in
  - Normal: threshold 0.015, min 1.0in
  - Relaxed: threshold 0.025, min 0.5in
  These replace the previously hardcoded values in landing detection and jump validation.

**Camera Data in Athlete Profiles:**
- **Data storage**: `saveAndAnalyze()` now checks `window.__pendingCameraData` and includes it as `cameraData` in each test entry. Cleared after save.
- **cameraData structure** (stored per test):
  ```json
  {
    "duration": 3,
    "sensitivity": "Normal",
    "landingThreshold": 0.015,
    "camLabel": "Rear Camera",
    "frames": ["data:image/jpeg;base64,...", ...],  // 4 thumbnails ~60KB total
    "frameLabels": ["standing", "takeoff", "peak", "landing"],
    "landmarks": [[[x*1000, y*1000], ...], ...],    // ~30 sampled frames × 33 keypoints × 2 ints
    "numFrames": 85,
    "hipYbaseline": 0.55
  }
  ```
- **Thumbnail capture**: During recording, every 5th frame captures a 320×240 JPEG snapshot from the video. After analysis extracts the 4 key frames (standing, takeoff, peak, landing), others are discarded.
- **Landmark compression**: Full landmarks array sampled to ~30 frames (every Nth frame). Each landmark stored as `[x*1000, y*1000]` integers (0.1% precision ~0.6px at 640px).
- **Total storage per camera test**: ~70-80KB. localStorage 5MB limit → comfortable for 60+ tests.

**Jump Review Modal:**
- **"Review" button** appears in test history rows where `cameraData` exists (green-tinted mini button)
- **Modal content**:
  - Subtitle: athlete name, date, jump result
  - 4 thumbnail images from the recording
  - Replay canvas with skeleton animation
  - Play/Pause button + scrubber slider
  - Metadata row: duration, sensitivity, camera, frame count
  - Close button
- **Skeleton replay**: Standalone `drawSkeletonStandalone()` function mirrors the module's skeleton renderer. Steps through stored landmarks at ~30fps (33ms interval). Scrubber jumps to any frame.
- **Modal close**: Registered in DOMContentLoaded to ensure element exists.

### CSS Additions
- `.cam-options`, `.cam-opt-group`, `.cam-opt-btn`, `.cam-opt-btn.active` — pill-style option buttons
- `#switchCamBtn` — camera switch button with icon
- `.replay-overlay`, `.replay-modal`, `.replay-thumbs`, `.replay-canvas-wrap` — modal layout
- `.replay-btn`, `.replay-scrub`, `.replay-frame-count` — playback controls
- `.replay-meta`, `.replay-close` — info + close button
- `.rev-btn` — green "Review" button for test history rows
- Grid updated: `.test-entry` now has 6 columns (added 0.5fr for review button)

### Data Model Update
```
TestEntry now optionally includes:
{
  ...existing fields...,
  cameraData: {
    duration: number,
    sensitivity: string,
    landingThreshold: number,
    camLabel: string,
    frames: [string|null, string|null, string|null, string|null],
    frameLabels: [string, string, string, string],
    landmarks: [[[number, number], ...], ...],
    numFrames: number,
    hipYbaseline: number
  }
}
```

### Edge Cases
- **Only one camera**: Switch button shows "Only one camera available" and does nothing
- **Camera switch fails**: Falls back to default camera via `startCamera()`
- **No camera data on save**: `saveAndAnalyze()` works normally without cameraData
- **Review on deleted athlete data**: `showJumpReview()` checks athlete exists and has cameraData

---

## Session: Remove Email Field (2026-06-21)

### Changes
- Removed the email input from the save section in `coaching-ai-tools.html`
- Stripped all email references from JS: `saveAndAnalyze()`, `prefillAthlete()`, athlete card display, `downloadReport()`, and `shareAthlete()`
- Updated `HANDOFF.md` data model example to remove `email` field

### Rationale
- Privacy: no email collection means no data exposure risk
- Users can still download a report (plain text) or share a profile link (base64 in URL param)

### Storage
- Existing localStorage entries may still contain `email` keys on users' browsers — they're ignored by the updated code
- No migration needed; stale `email` values are harmless

---

## Session: Metric/Imperial Unit Toggles for All Measurements (2026-06-21)

### What Changed
All in `coaching-ai-tools.html`:

**Unit Toggles Added (inline buttons like Male/Female selector):**
- **Weight**: lbs ↔ kg toggle next to label
- **Height**: ft/in ↔ cm toggle next to label (switches between dual ft/in inputs and single cm input)
- **Jump Height**: cm ↔ in toggle next to label

**Behavior:**
- Each toggle switches the input placeholder, min/max, and helper text
- Weight: lbs range 20-700, kg range 10-320
- Height: Imperial shows ft+in, metric shows single cm input
- Jump height: cm mode "Enter cm from tester — we'll convert to inches", in mode "Enter inches directly — no conversion needed"

**Dual-Unit Display Everywhere:**
- Light results card: shows both inches (large) and cm (small)
- Full analysis card: shows both jumpIn and jumpCm
- Athlete list cards: height as `6'2" (188 cm)`, weight as `185 lbs (83.9 kg)`
- Test history table: both cm and in columns (unchanged)
- Download report: height `6'2" (188 cm)`, weight `185 lbs (83.9 kg)`
- Share view: both units in banner and table
- Camera detection: respects height unit for pixel-to-inch scaling

**Storage Format (canonical both units):**
```json
{
  "vjAthletes": {
    "Athlete Name": {
      "sport": "basketball",
      "sex": "male",
      "age": 16,
      "weightLbs": 185,
      "weightKg": 83.9,
      "heightFt": 6,
      "heightIn": 2,
      "heightCm": 188,
      "tests": [
        { "date": "2026-06-21", "jumpCm": 71.1, "jumpIn": 28.0, "percentile": 85, "rating": "Above Average" }
      ]
    }
  }
}
```

**Key Technical Changes:**
- `analyzeJump(jumpIn, age, sex, sport)` — now takes inches directly (no internal cm→in conversion)
- `convertJump()` — reads active jump unit, computes both in/cm, stores in `lastResult`
- `saveAndAnalyze()` — canonicalizes weight (both lbs/kg), height (both ft+in/cm), jump (both cm/in)
- `analyzeFrames()` — reads active height unit for pixel-to-inch scaling
- Camera confirm: fills `jumpHeight` in the active unit
- `localStorage.removeItem('vjAthletes')` on load — clears old profiles, starts fresh with new format
- `prefillAthlete()` — restores all three height fields and weight from canonical storage

### CSS Added
- `.unit-group`, `.unit-btn`, `.unit-btn.active` — pill-style unit toggles matching `.sex-btn` pattern
- `.hidden-input` — utility to hide inactive height input

### User Experience
- Users can enter jump height in cm (converts to inches) OR inches (no conversion)
- All reports and displays show both metric and standard
- Old data wiped on first load — clean slate with new format
