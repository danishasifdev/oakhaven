# OAKHAVEN: Detailed Build Brief

Read this whole file before writing any code. Follow it in order. Do not invent content that is not here. If something is missing ask one question and wait.

---

## 0. Rules for the builder (Claude)

1. Work in phases (listed in section 9). Finish one phase. Run the build. Report what works and what does not. Then wait for approval.
2. Do not add concepts that are not in this brief. No time of day themes. No clocks. No equations. No poetic filler copy. No invented metaphors.
3. Every claim on the site must come from the content bible in section 3. Never write a number that is not in there.
4. Every section must answer one question for the visitor: **can I trust this developer to deliver?**
5. If a motion effect does not help answer that question remove it.
6. Pin exact dependency versions. Run `npm run build` before saying anything works.

---

## 1. The idea

**Oakhaven is a developer that delivers.**

Luxury property has a trust problem. Buyers commit years before they get keys. Many developers hand over late and smaller than the render. Oakhaven's whole brand is the opposite. We promise a date. We hand over on that date. We can show the proof.

The brand line stays: **A different perspective on living.**
The proof line (used as the hero sub line and repeated in the footer): **Nine homes delivered. Nine on time.**

The site is a portfolio of evidence presented with the calm of an architecture magazine. The visitor should leave thinking: these people have actually built things and they keep their word.

**The narrative spine across the home page**

1. Here is who we are and what we stand for (hero)
2. Here is our promise (philosophy)
3. Here is what we are building now (developments)
4. Here is how we build it (architecture and process)
5. Here is the record (numbers)
6. Here is where (locations)
7. Here is how to reach us (footer)

**Tone of voice**

- Plain. Confident. Specific. Short sentences.
- Say what happened. Give the date. Give the number.
- No adjectives that cannot be checked. Avoid: stunning. exquisite. unparalleled. world class. curated.
- Good: "Handed over 41 days early." Bad: "An unparalleled journey of excellence."
- Headlines can be poetic but the line under them must be factual.

---

## 2. Brand system

Keep the existing system. One dark theme only.

| Token            | Value     |
| ---------------- | --------- |
| ink (background) | `#10110F` |
| raised (surface) | `#191A17` |
| ivory (text)     | `#F0EDE5` |
| muted            | `#A6A399` |
| sand (accent)    | `#B8A995` |

Fonts: Cormorant Garamond (display, weights 300 and 400 plus italic 300) and Manrope (UI and body, 300 400 500).

Type scale (desktop): hero display clamp(3.2rem, 9vw, 8rem). Section headline clamp(2.5rem, 6vw, 5.5rem). Body 15px with 1.7 line height. Eyebrow labels 11px uppercase tracking 0.28em in muted.

Spacing: sections use 128px top and bottom on desktop and 80px on mobile. Side padding 48px desktop and 24px mobile. Max content width 1440px.

Accent rules: sand is for status labels and the single call to action per view. Never use it for body text.

Imagery: warm architectural photography. Real buildings in daylight AND evening. Never stock people smiling at laptops.

---

## 3. Content bible (fictional concept data)

Treat all of this as fictional. It is the single source of truth. Put it in `src/data/`.

### 3.1 Company

- Name: Oakhaven
- Founded: 2008 in Dubai
- Developments: 12 total. 9 delivered. 3 in progress.
- Homes handed over: 2,140
- Developed area: 1.8M sq ft
- Destinations: 8
- Handovers on or before the promised date: 9 of 9
- Average early delivery: 38 days
- Defects reported in the first year per 100 homes: 4 (fictional)

### 3.2 Delivered record (data for the Record page and the numbers section)

| #   | Development         | Location         | Homes | Promised | Delivered | Early by |
| --- | ------------------- | ---------------- | ----- | -------- | --------- | -------- |
| 1   | Harbour Court       | Dubai Marina     | 120   | Mar 2011 | Feb 2011  | 28 days  |
| 2   | Al Wasl Gardens     | Al Wasl          | 64    | Sep 2012 | Aug 2012  | 33 days  |
| 3   | Marjan Residences   | Al Marjan Island | 210   | Dec 2014 | Nov 2014  | 41 days  |
| 4   | The Linden          | Dubai Hills      | 88    | Jun 2016 | May 2016  | 36 days  |
| 5   | Jumeirah Bay Villas | Jumeirah Bay     | 32    | Oct 2017 | Sep 2017  | 29 days  |
| 6   | Saadiyat Court      | Saadiyat Island  | 240   | Mar 2019 | Feb 2019  | 44 days  |
| 7   | Al Mouj Terraces    | Muscat           | 160   | Nov 2020 | Oct 2020  | 47 days  |
| 8   | Palm Quay           | Palm Jumeirah    | 340   | Jun 2022 | May 2022  | 39 days  |
| 9   | One Creek           | Dubai Creek      | 886   | Sep 2024 | Aug 2024  | 45 days  |

Note for the builder: the Early by column is rounded fictional data. Show it exactly as written.

### 3.3 In progress (the three signature developments)

**The Solenne**

- Location: Palm Jumeirah. Status: Handover in progress
- Promised handover: 30 Nov 2026
- Homes: 86 apartments and 6 penthouses
- Area: 412,000 sq ft
- Architect (fictional): Atelier Rhein
- Milestones: Foundation Jan 2024. Structure complete Jan 2025. Facade complete Jul 2025. Interiors Jan 2026. Handover Nov 2026
- Detail: Curved terraces. Every home has a private terrace. Sea view from every floor.

**Maison Aria**

- Location: Dubai Hills. Status: Under construction
- Promised handover: 15 Jun 2027
- Homes: 24 villas
- Area: 168,000 sq ft
- Architect: Studio Maren
- Milestones: Foundation Mar 2025. Structure Feb 2026. Facade Sep 2026. Interiors Jan 2027. Handover Jun 2027
- Detail: Villas around shared courtyards. Private pools. Plot sizes 6,200 to 9,800 sq ft.

**The Residences 08**

- Location: Downtown Dubai. Status: Early construction
- Promised handover: 30 Sep 2028
- Homes: 312 residences across eight towers
- Area: 1.1M sq ft
- Architect: Atelier Rhein with Studio Maren
- Milestones: Foundation Oct 2025. Structure Apr 2027. Facade Jan 2028. Interiors Jun 2028. Handover Sep 2028

### 3.4 Locations (8 destinations)

Dubai (Palm Jumeirah. Dubai Hills. Downtown. Jumeirah Bay). Abu Dhabi (Saadiyat Island). Ras Al Khaimah (Al Marjan Island). Muscat (Al Mouj). Red Sea (Sindalah). Each has a status: Delivered. Building. Planned.

### 3.5 People (fictional)

- Karim Alvarez. Founder and CEO
- Leila Haddad. Chief Delivery Officer
- Tomas Brandt. Head of Design
- Dana Cheung. Head of Customer Care

### 3.6 Owner voices (fictional. Always mark as concept copy in code comments)

- "The keys arrived five weeks early. The finish was what the brochure promised." Owner at Palm Quay
- "We moved in. Nothing needed fixing. That has never happened to us before." Owner at The Linden
- "They sent a progress photo every month for three years." Owner at One Creek

### 3.7 Guarantees

1. Handover date written into the contract. Early or we pay.
2. Monthly photo and video progress report to every buyer.
3. Finish specification locked at signing. Material swaps need the buyer's written approval.
4. Ten year structural warranty. Two year fit out warranty.
5. A named customer care contact from signing to year two.

---

## 4. Home page: section by section

Route `/`. Components in `src/sections/`. Build each one fully before moving on.

### 4.1 Hero (HeroSection.vue)

**Purpose:** show the first proof in five seconds. A real building rising.

**Concept:** the hero video is a construction time-lapse of The Solenne from empty plot to finished building. Scrolling plays the build. The visitor literally builds the tower by scrolling.

**Layout (desktop)**

- Full viewport height. Pinned for 250% of viewport height of scroll.
- Video fills the frame. Left to right dark gradient so text stays readable.
- Eyebrow top left of the text block: `Luxury real estate development`.
- Headline (3 lines): `A different` / `perspective` / `on living.`
- Below headline one factual line: `Nine homes delivered. Nine on time.`
- Bottom left: round scroll button with arrow and the label `Scroll to watch it built`.
- Bottom right: location metadata `The Solenne · Palm Jumeirah · Handover Nov 2026`.
- Right side vertical milestone rail with five labels: Foundation. Structure. Facade. Interiors. Handover. The active label is ivory. Past labels are sand. Future labels are muted. The rail follows scroll progress (0 to 20 percent is Foundation and so on).

**Motion**

- Scroll progress maps to `video.currentTime` using one requestAnimationFrame loop with easing factor 0.25.
- Headline characters start at 30 percent opacity and reach full ivory by 80 percent of the pinned scroll.
- The proof line fades in at 60 percent.
- The scroll button fades out in the first 10 percent.

**Behaviour rules**

- Wait for `loadedmetadata` before seeking.
- Bind the video src from a constant so the build never fails when the file is missing.
- If the video is missing or errors show the poster image with a slow scale from 1.12 to 1.
- Touch devices: pin for 130 percent. Use a 720p version of the video.
- Reduced motion: no pin. No scrub. Show the finished building poster and the full headline.

**Accessibility**

- One `h1` with `aria-label`. Split characters are `aria-hidden`.
- The milestone rail is decorative. Mark `aria-hidden` and add a visually hidden sentence.

**Done when:** scrolling feels smooth at 60fps. The rail and video stay in sync. No layout shift.

### 4.2 Promise — Implemented; build not verified (PhilosophySection.vue)

**Purpose:** state the promise in one sentence and back it.

**Layout:** two columns on desktop. Left 5 columns text. Right 7 columns image. Section id `promise`.

**Copy**

- Eyebrow: `01 · Our promise`
- Headline: `We promise a date.` then italic muted `And we hand over on it.`
- Body: `Every Oakhaven contract names a handover date. Nine times we have reached it early. We publish every date we promised next to the date we delivered.`
- Link: `See the full record →` goes to `/record`

**Image:** a real finished delivered building in daylight with a hand over keys moment or the facade detail. Mask reveal on enter.

**Done when:** copy matches exactly. The link works.

### 4.3 Signature developments — Implemented; build not verified (DevelopmentsSection.vue)

**Purpose:** show what is being built right now and when it is due.

**Layout:** pinned horizontal scroll on desktop. Stacked on mobile. First panel is the intro. Then three project panels. Last panel links to all projects.

**Intro panel copy**

- Eyebrow: `02 · Building now`
- Headline: `Three developments. Three dates.`
- Line: `Follow each one from foundation to handover.`

**Each project panel (62vw by 72vh)**

- Full bleed image with bottom gradient.
- Top right: index `01 02 03`.
- Bottom: status chip (sand) such as `Handover in progress`. Project name in display type. Under it one factual line: `86 apartments · Promised 30 Nov 2026`.
- A thin progress bar under the line showing months elapsed versus months planned. Label like `Structure complete`.
- Whole panel links to `/developments/:slug`.

**Reduced motion:** no pin. Use native horizontal scroll with snap.

**Done when:** projects show real data from the content bible. The progress bar width comes from the milestone dates.

### 4.4 How we build — Implemented; build not verified (ArchitectureSection.vue)

**Purpose:** show craft and process. This replaces the old material gallery.

**Layout:** raised background. Large headline then a sequence of four steps in a two column editorial layout. Each step has an image and a short caption.

**Copy**

- Eyebrow: `03 · How we build`
- Headline: `Nothing is a surprise. We show you every month.`
- Steps:
  1. `Design locked.` The finish specification is signed before construction starts.
  2. `Monthly reports.` Photos and video from site go to every buyer each month.
  3. `Independent inspection.` A third party signs off before handover.
  4. `Handover day.` Every home is checked with the owner room by room.

**Images:** site photography. Concrete pour. Facade install. Inspection with a clipboard. Handover walk through.

**Done when:** four steps are visible. Each image reveals with a mask. Captions do not shift layout.

### 4.5 The record — Implemented; build not verified (MetricsSection.vue)

**Purpose:** put the numbers up front.

**Layout:** full width over a dimmed skyline image. Three large numbers then a link.

**Content**

- Eyebrow: `04 · The record`
- Headline: `Built. Delivered. Documented.`
- Numbers: `9 of 9` handovers on time. `2,140` homes handed over. `38 days` average early delivery.
- Under the numbers a small line: `Based on contract dates and signed handover certificates.`
- Link: `See every handover →` goes to `/record`

**Motion:** numbers count up once when they enter view. Respect reduced motion by showing final numbers.

**Done when:** numbers match section 3.1.

### 4.6 Owner voices — Implemented; build not verified (new section inside MetricsSection or its own component)

Three short quotes from section 3.6 in a calm row. Display type italic. Under each name the development and the year. Add a code comment saying these are concept quotes.

### 4.7 Locations — Implemented; build not verified (LocationsSection.vue)

**Purpose:** show reach.

**Layout:** left text. Right dark map image with glowing points for the eight destinations. Section id `locations`.

**Copy**

- Eyebrow: `05 · Where we build`
- Headline: `Eight destinations.`
- Line: `Nine delivered communities and three in progress across the UAE and the wider Gulf.`
- Link: `Explore locations →` goes to `/locations`

**Done when:** map markers match section 3.4. Each marker has an accessible label.

### 4.8 Footer — Implemented; build not verified (AppFooter.vue)

**Layout:** oversized `OAKHAVEN` wordmark as a background element in sand at 15 percent opacity. Links layered above.

**Content**

- Closing line in display type: `Nine homes delivered. Nine on time.`
- Left links: Developments. Record. About. Locations.
- Right links: Instagram. LinkedIn. YouTube. Button `Request a viewing` goes to `/contact`.
- Small line: `© 2026 Oakhaven. Concept project. All names and figures are fictional.`

**Motion:** the wordmark rises and scales from 0.92 to 1 as the footer enters.

---

## 5. Other pages

All pages share a `PageHero` with an eyebrow. A word by word reveal headline. An optional lead paragraph.

### 5.1 Developments — Implemented; build not verified `/developments`

- Headline: `Every development. One standard.`
- Filter tabs: All. Delivered. Building. Planned. Use real buttons with `aria-pressed`.
- List rows: index. name. location. status chip. promised date. For delivered rows also the delivered date.
- On hover or focus a thumbnail reveals. On touch show the thumbnail always.
- Data from sections 3.2 and 3.3 combined.

### 5.2 Project — Implemented; build not verified `/developments/:slug`

Order of sections:

1. **Hero:** full bleed image with parallax. Name. Location. Status chip.
2. **Key facts:** homes. area. architect. promised handover. status.
3. **Build timeline:** vertical timeline from milestones in 3.3. Each milestone has a date. A photo. A status (Complete. In progress. Upcoming). A short factual caption.
4. **Promise versus reality:** a plain table. Promised date. Current forecast. Days ahead of schedule. For delivered projects show the delivered date.
5. **Progress report archive:** the latest three monthly updates with a photo and two lines each.
6. **Residences:** simple list of home types with size range and a floor plan image.
7. **Gallery:** three images with captions.
8. **Request a viewing:** short form.
9. **Next project:** large link.

### 5.3 Record — Implemented; build not verified `/record` (new)

- Headline: `Every promise. Every date.`
- Lead: `We publish the date we promised and the date we delivered.`
- Table from section 3.2 with columns Development. Location. Homes. Promised. Delivered. Early by.
- Summary strip above the table with the three numbers.
- Under the table list the five guarantees from 3.7 each with a one line explanation.
- On mobile turn each row into a stacked card. No horizontal scroll tables.

### 5.4 About — Implemented; build not verified `/about`

- Headline: `Built by people who stay until handover.`
- Section 1: Story. Founded 2008. The reason: the founder waited two years past a promised date on his own first home. Oakhaven exists so buyers do not. (Fictional.)
- Section 2: Three principles. `Date first.` `Show the work.` `Stay after handover.` Each with two sentences.
- Section 3: Team grid with the four people. Name. Role. One line. Use portrait placeholders in a consistent crop.
- Section 4: Partners. A simple row of five fictional names: architects. engineering. inspection. Do not use real brand logos.

### 5.5 Locations — Implemented; build not verified `/locations`

- Headline: `Eight destinations.`
- Map image behind the top. A list of eight rows. Name. Region. Status. Number of homes delivered or planned. No dusk times.
- Clicking a row scrolls to or opens the related development when one exists.

### 5.6 Contact — Implemented; build not verified `/contact`

- Headline: `Request a private viewing.`
- Left column: sales gallery address. email. phone. opening hours (all concept values).
- Form fields: name. email. phone. interested development (select). preferred day (date input). message.
- Real labels. Required attributes. Inline validation. A success message in a `role="status"` region.
- Add a second block: `Already an owner?` with a link to customer care and the name Dana Cheung.

### 5.7 Not found — Implemented; build not verified `*`

Short page. Headline `This page has not been handed over.` Link home.

---

## 6. Motion system

- Library: GSAP with ScrollTrigger. Create all triggers inside `gsap.context` and call `revert` on unmount.
- Call `ScrollTrigger.refresh()` after each route transition finishes.
- Route transition: opacity fade 450ms with out in mode.
- Reveals: opacity 0 to 1 plus translateY 32 to 0 over 1.2s `power3.out`. Image reveals use `clip-path: inset(0 0 100% 0)` to full.
- Pinned scenes allowed in exactly two places: the hero and the home developments row.
- Do not add parallax anywhere else except the project page hero.
- Reduced motion: disable all pinning and scrubbing. Show final states.
- Never animate width height top or left. Use transform and opacity only.
- Lenis is out of scope for now.

---

## 7. Responsive behaviour

| Breakpoint  | Rules                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1280 and up | Full cinematic. Pinned hero. Horizontal developments.                                                                              |
| 768 to 1279 | Pinned hero with a shorter distance. Developments stack as two column grid.                                                        |
| Below 768   | Poster or short video. Hero pinned for 130 percent. Stacked layouts. Large touch targets of at least 44px. No hover only features. |

Art direct the hero focal point at each breakpoint with `object-position`. Desktop 65 percent center. Mobile 70 percent center.

---

## 8. Technical specification

**Stack:** Vue 3.5 with `<script setup lang="ts">`. Vite 6. Tailwind CSS 4.1.4 with `@tailwindcss/vite`. GSAP 3.12.5. Vue Router 4.5.

**Lessons from the previous attempt (do not repeat)**

- Do not use `@apply` with custom theme tokens. Use plain CSS variables.
- Never write `src="/video/hero.mp4"` as a static attribute. Bind it from a constant.
- Always create ScrollTriggers inside `gsap.context` and revert on unmount.
- Run `npm run build` after every phase.
- Never use the same image crop for large and small slots. Upscaled low resolution crops look soft.

**Folder structure**

```text
src/
  components/  AppHeader  AppFooter  ScrollReveal  PageHero  StatusChip  Timeline  RecordTable
  sections/    HeroSection  PhilosophySection  DevelopmentsSection  ArchitectureSection  MetricsSection  LocationsSection
  pages/       HomePage  DevelopmentsPage  ProjectPage  RecordPage  AboutPage  LocationsPage  ContactPage  NotFoundPage
  composables/ useScrollVideo  useReducedMotion  useCountUp
  data/        company.ts  projects.ts  record.ts  locations.ts  team.ts
  styles/      main.css
  router.ts
```

**Performance budget**

- Hero poster under 150 KB in AVIF or WebP.
- Hero video 1080p under 8 MB. 720p under 4 MB. All intra frames so seeking is smooth: `ffmpeg -i in.mp4 -g 1 -an -vf scale=1920:-2 -crf 26 hero.mp4`.
- All below the fold images lazy loaded with explicit aspect ratios.
- LCP under 2.5s on a mid range phone. CLS under 0.05.

**Accessibility**

- Skip link to main content.
- Visible focus ring in sand.
- Contrast ratio of at least 4.5 for body text.
- Menu button reports `aria-expanded`.
- All images have meaningful alt text or empty alt if decorative.

---

## 9. Build phases (stop after each)

1. **Foundation — Done.** Project setup. Tokens. Fonts. Router. Header. Footer. Data files from section 3. Build passes.
2. **Hero — Done.** Section 4.1 only. Includes video fallback and reduced motion.
3. **Home sections — Implemented; build not verified.** Sections 4.2 to 4.8.
4. **Project page and Developments page — Implemented; build not verified.** Sections 5.1 and 5.2.
5. **Record page and About page — Implemented; build not verified.** Sections 5.3 and 5.4.
6. **Locations, Contact, and Not found — Implemented; build not verified.** Sections 5.5 to 5.7.
7. **Polish — Validation pending.** Motion and responsive/accessibility updates are implemented; production build and Lighthouse performance have not been verified.

---

## 10. Asset shot list

Replace the moodboard crops with real or licensed images before launch.

**Hero video:** 20 to 30 second construction time-lapse of one tower from empty plot to finished. Fixed camera. 16:9 and a 9:16 variant.

**Photography**

- Three signature developments in daylight and evening. Wide and detail.
- Delivered buildings with lived in balconies and gardens.
- Site process: pour. facade install. inspection. handover walk through.
- Interior details: stone. timber. brass. stairs.
- Team portraits in a consistent studio style.
- Aerial of each destination.

---

## 11. Definition of done

- Every number on the site matches section 3.
- Every section answers the trust question.
- No leftover dusk. clock. equation or poetic filler copy.
- Build passes. Lighthouse performance above 85 on mobile.
- Keyboard only navigation works across all pages.
- Reduced motion shows all content without pinning.
- All concept content is marked as fictional in the footer.
