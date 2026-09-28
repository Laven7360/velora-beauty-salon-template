# Stage 8 — Final QA report

## Outcome

All six pages and the unknown-route view passed the available code-level checks. The approved design remains intact, with targeted layout, navigation, readability and performance corrections.

**Browser QA is outstanding.** No browser was connected. This report does not claim screenshots, rendered overflow checks, native keyboard trapping, screen-reader testing or a full accessibility audit.

## Issues found and fixed

| Finding | Correction |
| --- | --- |
| Team CSS reused Home's artist-grid and artist-role selectors | Isolated Team selectors to prevent cross-page layout and text overrides |
| Expanded Team profiles stretched a grid row beside neighbouring cards | Open profiles occupy a dedicated full-width desktop/tablet row with portrait and detail columns; native disclosure grouping keeps one open |
| Sparse Gallery filter results inherited large editorial offsets | Filtered collections use a bounded three-column desktop/two-column mobile arrangement |
| Cross-page anchors were ignored by route scroll handling | Fragment-aware scrolling and focus; normal navigation returns to top; booking query parameters remain untouched |
| Mobile menu could remain open after same-route logo navigation | Remount navigation on location key changes |
| Book CTA lacked active-route semantics | Uses NavLink with aria-current and an underlined active state |
| Footer service links all led to the Services top | Canonical service labels link to their exact sections |
| Small metadata and disclosures were unnecessarily tiny | Slightly enlarged hero caption, footer notes, Team specialties and service metadata/price qualifiers |
| Muted text on paper and ivory text on clay narrowly missed 4.5:1 | Small colour adjustments, darker text-link hover and stronger form borders; tested pairs pass |
| Home secondary filters signalled selection only by colour | Added an underline to the active filter |
| Phone validator accepted repeated/mid-number plus signs | Limited plus to a single optional leading sign |
| Old booking copy referred to unfinished functionality | Updated to accurate demo-only enquiry wording |
| Generic 404 lacked both recovery actions | Branded salon-related message with Return Home and Explore Services |
| Base metadata had no Open Graph basics | Added type, site name, title and description; route-specific titles/descriptions update consistently |
| SVG contact-sheet images downloaded before reaching the viewport | Shared lazy raster component defers requests; hero images remain eager; no-observer fallback loads immediately |
| Obsolete placeholder CSS and StrandMark component remained | Removed unused preview styles and dead component; preserved source imagery and provenance |
| README described staged/placeholder work | Replaced with completed-project setup, features, data boundaries and verification documentation |

## Pages and interactions checked

- **Home:** render, sections and links, Men/Women filters and four/eight preview states, local image references.
- **About:** source/layout review, render, landmarks, headings, links, image references and existing bounded desktop compositions.
- **Services:** anchors, 24 combined filter states, pagination/reset, all 48 detail renders and open/close state, booking references.
- **Team:** seven specialty outputs, six profile renders, native exclusive disclosure configuration, Escape/focus-return handlers, signature and booking links.
- **Gallery:** six filters, 18 unique look/image records, detail renders, related records, before/after references and booking handoff.
- **Book:** 38 service choices, 60 hair combinations, six artists/No preference, future-date boundaries, Monday closure and weekday/weekend windows; contact validation, backward preservation, review editing, completion and reset.
- **404:** actual router fallback, one primary heading, Home and Services recovery links.
- **Shared:** actual route tree, title/description updates, internal links/anchors, duplicate IDs, ARIA targets, local asset references, reduced-motion CSS, selected contrast pairs.

## Responsive and accessibility changes

Team expanded states now have a deliberate wide layout; mobile stays a native disclosure. Gallery filtered sets keep a useful scale. Existing bounded containers and responsive breakpoints were retained. Text was adjusted selectively rather than globally enlarged.

Native controls remain the primary interaction model. Added non-colour filter state, stronger control boundaries, active booking-link semantics, anchor focus and contrast corrections. Modal opening/focus/scroll restoration was tested with mocks; native browser focus trapping and Escape remain manual checks.

## Performance and image findings

No images were regenerated and no dependencies were added. Existing local JPEGs remain optimised; Lookbook assets total about 696 KB. Critical hero images are eager, Gallery images retain native lazy loading, and below-fold SVG raster requests now defer until near the viewport.

The largest shipped image is approximately 328 KB. The 1.88 MB original hero PNG is preserved as documented source material and is not imported into the production bundle. Removed obsolete placeholder CSS and the unused StrandMark component.

## Files changed

- Shared routing/metadata: `src/App.jsx`, `src/layouts/MainLayout.jsx`, new `src/layouts/route-effects.js`, `src/data/navigation.js`, new `src/data/route-meta.js`, `index.html`.
- Shared UI: `src/components/Navbar.jsx`, `Footer.jsx`, `PageHero.jsx`; new `LazyRasterImage.jsx`; removed `StrandMark.jsx`.
- Image consumers: `components/home/DemoPhoto.jsx`, `StylePortrait.jsx`, `components/about/AboutPhoto.jsx`, `components/team/TeamPortrait.jsx`, `pages/Team.jsx`.
- Interaction/layout/copy: `components/team/TeamFinder.jsx`, `components/gallery/Lookbook.jsx`, `components/services/StyleDetail.jsx`, `components/home/HomeSections.jsx`, `pages/About.jsx`, `pages/Services.jsx`, `data/booking.js`, `data/home.js`.
- Styles: `tokens.css`, `global.css`, `layout.css`, `pages.css`, `home.css`, `style-finder.css`, `services.css`, `team.css`, `gallery.css`, `booking.css`.
- Documentation/tests: `README.md`, `QA_REPORT.md`, `tests/final-pages.test.mjs`.

## Verification results

- Production build: **pass**.
- Oxlint: **pass, no warnings**.
- Automated tests: **14 passed, 0 failed**.
- Checks for booking network/storage calls: **pass**. No backend, analytics, payment, authentication or real submission was added.
- Git initialization: **not performed**.
- Deployment: **not performed**.

## Required manual browser verification

Check all six pages at **1920, 1600, 1440, 1280, 1024, 768, 480, 390 and 360 px**. These widths were considered in source review; none was verified through a rendered browser in this pass.

1. Horizontal overflow, font wrapping, portrait crops, full-width Team expansion and sparse Gallery results.
2. Mobile menu Tab order, Escape, outside-click closing and same-route navigation.
3. Services sticky navigation and direct cross-page fragment links.
4. Native modal Tab/Shift+Tab containment, Escape, background inertness and focus return.
5. Native Team Enter/Space disclosure and exclusive opening across target browsers.
6. Full booking flow with keyboard and screen reader; first-error focus without interruption while typing.
7. Lazy SVG requests on scroll, including images inside opened dialogs; eager hero loading.
8. Browser Back/Forward, query preselection, refresh/reset and route-title updates.
9. Browser console/network review for runtime errors and confirmation that only static resources are requested.

Before hosting, configure an SPA fallback to index.html and verify direct route loads. Absolute canonical/social-image URLs should be set only after a real deployment origin is available. The app currently supplies base HTML metadata and client-updated route metadata.

