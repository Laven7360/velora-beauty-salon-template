# VELORA — Hair & Grooming Studio

Template 04: a reusable freelance website template for a fictional premium **unisex** salon. Six completed core pages combine editorial imagery with useful service, artist and appointment-enquiry tools.

## Stack and local setup

React 19, Vite 8, React Router 7 and custom CSS. Oxlint and Node's built-in test runner provide checks. No UI framework, remote fonts or backend.

Use Node.js 22.12+ (validated with Node 24) and npm:

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
npm run lint
npm test
```

On Windows PowerShell, use `npm.cmd` if script execution policy blocks `npm`. Production output is written to `dist/`.

## Routes

| Route | Content |
| --- | --- |
| / | Studio introduction, service preview, Style Finder, colour, care, team and gallery previews |
| /about | Philosophy, consultation, craft, studio, people and practical information |
| /services | Inclusive service menus, fictional RM pricing, 48-style library, colour guide and care |
| /team | Six fictional artists, seven specialty filters and expandable profiles |
| /gallery | 18-look editorial collection, six filters, detail dialogs and a transformation concept |
| /book | Five-step appointment enquiry, review and local demo completion |
| Any unknown route | Branded 404 with Home and Services links |

## Brand and features

Velora serves clients of any gender. Services are organised by technique, hair length, texture and needs. The Men/Women inspiration collections do not restrict who can choose a style or service.

- Home Style Finder: 16 portrait references, collection and length/texture filters, expandable previews.
- Services Style Library: 24 references per collection, combined filters, progressive loading, practical detail dialogs and booking links.
- Team specialty finder: cutting, colour, texture, grooming, creative styling and care. Profiles open in a dedicated desktop row; mobile retains the native disclosure layout.
- Lookbook: technique-based filters, photography-led layouts, native dialogs and a clearly labelled fictional before/after concept.
- Booking: Service → Hair Details → Artist → Date & Time → Contact → Review. Validation, backward navigation, editable review, completion and reset are implemented.

## Demo boundaries and data

All salon details, contacts, staff, testimonials, services and prices are fictional. The established studio is in fictional Brookfield, London; pricing is explicitly presented as Malaysian RM demo examples.

**No appointment is submitted, confirmed or saved.** Use fictional contact details. Booking fields exist only in React memory; no localStorage, sessionStorage, cookies, backend, analytics, authentication, payments or calendar integration is used. Leaving or refreshing clears entered details. Reset clears preselection; refresh may reapply the nonpersonal look/service query or existing navigation state.

- `/book?look=dimensional-brunette` resolves a Gallery reference.
- `/book?service=balayage` preselects a known service.
- Existing style and artist navigation state is supported.
- Unknown IDs fail gracefully.
- Demo dates start tomorrow; Mondays are closed. Time windows follow Tuesday–Friday 10am–7pm and Saturday–Sunday 9am–5pm, labelled London time. These are preferences, not live availability.
- Optional image uploading is not implemented.

## Images

All photography is AI-generated demo imagery, not real clients, employees, premises or evidence of service results. Product displays are CSS concept mockups. [Asset documentation](src/assets/README.md) preserves exact prompts, original sources and crop provenance.

Local JPEGs are optimised. Gallery images use native lazy loading below the fold. Shared SVG contact-sheet viewports defer raster requests with IntersectionObserver and load immediately when that API is unavailable. Critical Home, About, Gallery and Team hero imagery remains eager. Original documented source assets are retained and are not imported into the production bundle.

## Accessibility and responsive behaviour

Semantic landmarks, labelled controls, native radio groups, fieldsets, skip navigation, active links, visible focus states, live result counts and reduced-motion support are included. Home filter state has a non-colour indicator. Modal details use native `showModal()`, Escape handling and focus restoration. Team profiles use native `details/summary`, exclusive disclosure names, Escape close and focus return.

Route changes update titles, descriptions and Open Graph text. Normal navigation returns to the top; recognised fragments scroll to their target, including Services links from other pages. Booking queries remain intact.

Layouts use bounded containers, flexible grids and mobile recomposition. Important secondary text and tested text/control contrast pairs have been refined. These are implementation measures, not a claim of independently certified accessibility.

## Project structure

- `src/components/`: shared primitives and Home, About, Services, Team, Gallery and Booking components.
- `src/layouts/`: shared shell, route metadata and scrolling effects.
- `src/pages/`: six core route components.
- `src/data/`: navigation, metadata, services, styles, artists, looks and booking rules.
- `src/styles/`: design tokens, shared styles and page-specific compositions.
- `src/assets/`: local imagery and provenance.
- `tests/final-pages.test.mjs`: rendering, data, navigation and interaction-state regression tests.

## Verification and deployment status

Build, lint and automated tests are run for this project. See [the Stage 8 QA report](QA_REPORT.md) for fixes, test coverage and the outstanding manual checks.

No browser was connected during this QA pass. Actual viewport rendering, native dialog keyboard trapping, mobile menu interaction and image loading must still be checked in a browser at the listed sizes. Automated checks use server rendering, pure state transitions and focused mocks; they are not end-to-end browser tests.

Git has not been initialised and the project has not been deployed. Before deployment, configure the host to serve `index.html` for application routes. No deployed origin is invented in metadata; absolute social-image and canonical URLs can be configured once an origin exists. This client-rendered SPA has base metadata in HTML and route-specific metadata after JavaScript runs.

