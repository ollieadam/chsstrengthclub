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
      "email": "adam@example.com",
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
- No email integration (decided against EmailJS — keep it simple)
- Page matches existing dark theme (Oswald/Black Han Sans/DM Sans, red accents, noise overlay)
- "Coming soon" cards signal this is the first of multiple tools
