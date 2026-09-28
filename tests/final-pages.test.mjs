import test, { after } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, logLevel: 'silent' })
after(() => server.close())
const load = path => server.ssrLoadModule('/src/' + path)
const gallery = await load('data/gallery.js')
const booking = await load('data/booking.js')
const { teamMembers } = await load('data/team.js')
const { styleLibrary } = await load('data/style-library.js')
const fields = await load('components/booking/BookingFields.jsx')
const { LookbookView } = await load('components/gallery/Lookbook.jsx')
const LookDetail = (await load('components/gallery/LookDetail.jsx')).default
const { BookingReview } = await load('components/booking/BookingReview.jsx')
const { BookingCompletion } = await load('components/booking/BookingFlow.jsx')
const render = element => renderToString(React.createElement(MemoryRouter, null, element))
function walk(node, callback) {
  if (!node || typeof node !== 'object') return
  callback(node)
  React.Children.forEach(node.props?.children, child => walk(child, callback))
}
const now = new Date(2026, 8, 28, 12)
const valid = { ...booking.createBooking('?service=balayage'), length: 'Long', texture: 'Wavy', condition: 'Healthy', artistId: 'nia', date: '2026-09-29', time: booking.timeWindows('2026-09-29')[0], name: 'Alex Demo', email: 'alex@example.com', phone: '+44 7700 900123', goals: 'Soft movement', notes: 'Fictional test' }

test('18 looks have unique images, resolvable services/styles, and six working filters', () => {
  assert.equal(gallery.galleryEntries.length, 18)
  assert.equal(new Set(gallery.galleryEntries.map(item => item.id)).size, 18)
  assert.equal(new Set(gallery.galleryEntries.map(item => item.image)).size, 18)
  for (const look of gallery.galleryEntries) {
    assert.ok(look.relatedService && look.alt && look.techniques.length)
    if (look.styleId) assert.ok(look.relatedStyle)
    assert.ok(fs.existsSync('.' + look.image))
    const html = render(React.createElement(LookDetail, { look, onClose() {} }))
    assert.ok(html.includes('href="' + gallery.lookBookingUrl(look) + '"'))
    assert.ok(html.includes('aria-labelledby="look-detail-title"'))
  }
  for (const filter of gallery.galleryFilters) {
    let clicked
    const tree = LookbookView({ filter, onFilter: value => { clicked = value }, onSelect: look => { clicked = look.id } })
    const html = render(tree), matches = gallery.filterLooks(filter)
    assert.ok(matches.length)
    assert.equal((html.match(/aria-haspopup="dialog"/g) || []).length, matches.length)
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1)
    walk(tree, node => {
      if (node.type === 'button') {
        node.props.onClick()
        assert.ok(clicked)
      }
    })
  }
  assert.ok(fs.existsSync('.' + gallery.transformation.before))
  assert.ok(fs.existsSync('.' + gallery.transformation.after))
})

test('Gallery, service and existing style/artist handoffs resolve safely', () => {
  for (const look of gallery.galleryEntries) {
    const data = booking.createBooking(gallery.lookBookingUrl(look).split('?')[1])
    assert.equal(data.lookId, look.id)
    assert.equal(data.serviceId, look.serviceId)
    assert.equal(booking.getInspiration(data).title, look.title)
    assert.equal(booking.updateBooking(data, 'removeInspiration').lookId, '')
  }
  for (const service of booking.bookingServices) {
    const data = booking.createBooking('?service=' + service.id)
    assert.equal(data.serviceId, service.id)
    assert.ok(booking.serviceGroups.find(group => group.id === data.category).services.includes(service))
  }
  for (const member of teamMembers) assert.equal(booking.createBooking('', { stylistId: member.id }).artistId, member.id)
  for (const style of styleLibrary) assert.equal(booking.createBooking('', { styleId: style.id }).styleId, style.id)
  assert.deepEqual(booking.createBooking('?look=missing&service=missing', { stylistId: 'missing', styleId: 'missing' }), booking.emptyBooking)
  assert.deepEqual(booking.createBooking('', null), booking.emptyBooking)
})

test('Hair, artist, contact and date validation covers valid choices and invalid boundaries', () => {
  for (const length of booking.hairOptions.length) for (const texture of booking.hairOptions.texture) for (const condition of booking.hairOptions.condition) {
    assert.deepEqual(booking.validateStep(1, { ...valid, length, texture, condition }, now), {})
  }
  for (const artistId of ['', ...teamMembers.map(item => item.id)]) assert.deepEqual(booking.validateStep(2, { ...valid, artistId }, now), {})
  assert.ok(booking.validateStep(2, { ...valid, artistId: 'missing' }, now).artistId)
  assert.ok(booking.validateStep(0, booking.emptyBooking, now).serviceId)
  assert.equal(Object.keys(booking.validateStep(1, booking.emptyBooking, now)).length, 3)
  for (const email of ['', 'alex', 'alex@', 'alex @example.com']) assert.ok(booking.validateStep(4, { ...valid, email }, now).email)
  for (const phone of ['', '123', 'abc123456789', '1234567890123456']) assert.ok(booking.validateStep(4, { ...valid, phone }, now).phone)
  assert.ok(booking.validateStep(4, { ...valid, name: ' ' }, now).name)
  assert.deepEqual(booking.validateStep(4, valid, now), {})
  for (const date of ['', '2026-09-27', '2026-09-28', '2026-10-05', '2026-02-30', 'nonsense']) assert.ok(booking.validateStep(3, { ...valid, date }, now).date)
  assert.equal(booking.timeWindows('2026-10-05').length, 0)
  assert.equal(booking.timeWindows('2026-10-03').length, 2)
  assert.equal(booking.timeWindows('2026-10-04').length, 2)
  assert.equal(booking.timeWindows('2026-09-29').length, 3)
  assert.ok(booking.validateStep(3, { ...valid, date: '2026-10-03', time: booking.timeWindows('2026-09-29')[2] }, now).time)
  assert.equal(booking.updateBooking(valid, 'date', '2026-10-03').time, '')
  assert.equal(booking.tomorrow(new Date(2026,11,31)), '2027-01-01')
  assert.equal(booking.firstInvalidStep(valid, now), null)
})

test('Entire booking flow preserves values through Back, Continue and edits, then completes and resets', () => {
  let state = booking.createBookingFlow()
  state = booking.bookingReducer(state, { type: 'next', now })
  assert.equal(state.step, 0); assert.ok(state.errors.serviceId)
  state = booking.bookingReducer(state, { type: 'update', field: 'category', value: valid.category })
  for (const [field, value] of Object.entries(valid)) if (field !== 'category') state = booking.bookingReducer(state, { type: 'update', field, value })
  for (let step = 0; step < 5; step++) {
    assert.equal(state.step, step)
    state = booking.bookingReducer(state, { type: 'next', now })
    const preserved = state.data
    state = booking.bookingReducer(state, { type: 'back' })
    assert.equal(state.data, preserved)
    state = booking.bookingReducer(state, { type: 'next', now })
  }
  assert.equal(state.step, 5)
  for (let step = 0; step < 5; step++) {
    let edited = booking.bookingReducer(state, { type: 'edit', step })
    assert.equal(edited.step, step); assert.equal(edited.data, state.data)
    while (edited.step < 5) edited = booking.bookingReducer(edited, { type: 'next', now })
    assert.deepEqual(edited.data, valid)
  }
  let movedDate = booking.bookingReducer(state, { type: 'update', field: 'date', value: '2026-09-27' })
  movedDate = booking.bookingReducer(movedDate, { type: 'next', now })
  assert.equal(movedDate.step, 3); assert.equal(movedDate.complete, false)
  state = booking.bookingReducer(state, { type: 'next', now })
  assert.equal(state.complete, true)
  const reset = booking.createBookingFlow()
  assert.equal(reset.step, 0); assert.equal(reset.complete, false)
  assert.equal(reset.data.name, ''); assert.equal(reset.data.email, '')
})

test('Every step renders labelled controls, errors, review edit actions and demo completion', () => {
  for (const [index, Component] of [fields.ServiceStep, fields.HairStep, fields.ArtistStep, fields.DateStep, fields.ContactStep].entries()) {
    const errors = booking.validateStep(index, booking.emptyBooking, now)
    const html = render(React.createElement(Component, { data: { ...valid, lookId: gallery.galleryEntries[0].id }, errors, update() {} }))
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    assert.equal(ids.length, new Set(ids).size)
    for (const match of html.matchAll(/(?:for|aria-describedby)="([^"]+)"/g)) for (const id of match[1].split(' ')) assert.ok(ids.includes(id), id)
  }
  const edits = []
  walk(BookingReview({ data: valid, onEdit: step => edits.push(step) }), node => { if (node.type === 'button') node.props.onClick() })
  assert.deepEqual(edits, [0,1,2,3,4])
  let reset = false
  const completion = BookingCompletion({ data: valid, onReset: () => { reset = true } })
  walk(completion, node => { if (node.type === 'button') node.props.onClick() })
  assert.ok(reset)
  const html = render(completion)
  assert.ok(html.includes('Demo request complete.'))
  assert.ok(html.includes('No appointment has been made.'))
  assert.ok(!html.includes('<form'))
})

test('Dialog helper opens, focuses, locks scroll and restores the trigger on close', async () => {
  const { openStyleDialog } = await load('components/services/dialogFocus.js')
  let focusCount = 0, returned = 0
  const document = { activeElement: { isConnected: true, focus() { returned++ } }, body: { style: { overflow: 'auto' } } }
  const dialog = { open: false, showModal() { this.open = true }, close() { this.open = false } }
  const cleanup = openStyleDialog(dialog, { focus() { focusCount++ } }, document)
  assert.ok(dialog.open); assert.equal(focusCount, 1); assert.equal(document.body.style.overflow, 'hidden')
  cleanup()
  assert.equal(dialog.open, false); assert.equal(returned, 1); assert.equal(document.body.style.overflow, 'auto')
})

test('Six routes render one primary heading and unique IDs; Home filters still work', async () => {
  const Layout = (await load('layouts/MainLayout.jsx')).default
  for (const [name,path] of [['Home','/'],['About','/about'],['Services','/services'],['Team','/team'],['Gallery','/gallery'],['Book','/book']]) {
    const Page = (await load('pages/' + name + '.jsx')).default
    const html = renderToString(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(Routes, null, React.createElement(Route, { element: React.createElement(Layout) }, React.createElement(Route, { path, element: React.createElement(Page) })))))
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, name)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    assert.equal(ids.length, new Set(ids).size, name)
  }
  const home = await load('data/hairstyles.js')
  for (const collection of ['men','women']) for (const filter of home.getStyleFilters(collection)) assert.ok(home.filterHairstyles(collection,filter).length)
})

test('Booking implementation has no network, persistent storage or native form submission', () => {
  const files = ['src/pages/Book.jsx','src/data/booking.js', ...fs.readdirSync('src/components/booking').map(name => 'src/components/booking/' + name)]
  for (const path of files) assert.doesNotMatch(fs.readFileSync(path,'utf8'), /localStorage|sessionStorage|document\.cookie|\bfetch\s*\(|XMLHttpRequest|sendBeacon|<form[^>]*action=/)
  assert.match(fs.readFileSync('src/components/booking/BookingFlow.jsx','utf8'), /event\.preventDefault\(\)/)
})

test('Actual router covers all pages and 404, internal anchors, ARIA targets and local images', async () => {
  const { SiteRoutes } = await load('App.jsx')
  const routes = ['/', '/about', '/services', '/team', '/gallery', '/book', '/missing-page']
  const documents = new Map(routes.map(path => [path, renderToString(React.createElement(MemoryRouter, { initialEntries: [path] }, React.createElement(SiteRoutes)))]))
  for (const [path, html] of documents) {
    assert.equal((html.match(/<main\b/g) || []).length, 1, path)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path)
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
    assert.equal(ids.length, new Set(ids).size, path)
    for (const match of html.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g)) for (const id of match[1].split(' ')) assert.ok(ids.includes(id), path + ' / ' + id)
    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      const href = match[1].replaceAll('&amp;', '&')
      if (href.startsWith('mailto:')) continue
      const url = new URL(href, 'https://velora.example' + path)
      assert.ok(documents.has(url.pathname), href)
      if (url.hash) assert.ok(documents.get(url.pathname).includes('id="' + url.hash.slice(1) + '"'), href)
    }
    for (const match of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(match[0], /alt="[^"]+"/)
      const src = match[0].match(/src="([^"]+)"/)?.[1]
      assert.ok(src && fs.existsSync('.' + src), src)
    }
    for (const match of html.matchAll(/<image\b[^>]*href="([^"]+)"/g)) assert.ok(fs.existsSync('.' + match[1]), match[1])
    if (path === '/book') assert.match(html, /class="nav-booking[^"]*"[^>]*aria-current="page"|aria-current="page"[^>]*class="nav-booking[^"]*"/)
  }
  assert.match(documents.get('/missing-page'), /Looks like this one grew out/)
  assert.match(documents.get('/missing-page'), /Return Home/)
  assert.match(documents.get('/missing-page'), /Explore Services/)
})

test('Route titles, descriptions and scroll handling cover normal navigation, anchors and malformed hashes', async () => {
  const { getRouteMeta } = await load('data/route-meta.js')
  const { updateRouteMetadata, restoreRouteViewport } = await load('layouts/route-effects.js')
  const expected = { '/': 'Home', '/about': 'About', '/services': 'Services', '/team': 'Our Team', '/gallery': 'Gallery', '/book': 'Book Appointment' }
  for (const [path, title] of Object.entries(expected)) {
    assert.equal(getRouteMeta(path).title, title + ' | Velora Hair & Grooming Studio')
    assert.ok(getRouteMeta(path).description.length > 50)
    assert.deepEqual(getRouteMeta(path), getRouteMeta(path.toUpperCase() + (path === '/' ? '' : '/')))
    const content = new Map()
    const doc = { title: '', querySelector(selector) { return { setAttribute(name, value) { content.set(selector, value) } } } }
    updateRouteMetadata(path, doc)
    assert.equal(doc.title, getRouteMeta(path).title)
    assert.equal(content.get('meta[property="og:title"]'), doc.title)
    assert.equal(content.get('meta[name="description"]'), getRouteMeta(path).description)
  }
  assert.ok(getRouteMeta('/missing-page').title.startsWith('404'))
  let anchored = false, focused = false, topped = false
  const target = { focus() { focused = true }, scrollIntoView() { anchored = true } }
  const doc = { getElementById(id) { return id === 'style-library' ? target : null } }
  restoreRouteViewport('#style-library', null, doc, { scrollTo() { topped = true } })
  assert.ok(anchored && focused && !topped)
  for (const hash of ['', '#missing', '#%ZZ']) {
    let mainFocus = false, top = false
    restoreRouteViewport(hash, { focus() { mainFocus = true } }, doc, { scrollTo() { top = true } })
    assert.ok(mainFocus && top)
  }
})

test('Home filter controls and Services combinations, pagination and all style detail references', async () => {
  const home = await load('data/hairstyles.js')
  const { StyleFinderView } = await load('components/home/StyleFinder.jsx')
  for (const collection of ['men','women']) for (const filter of home.getStyleFilters(collection)) {
    let state = { ...home.initialStyleState, collection, filter }
    const html = render(React.createElement(StyleFinderView, { state, dispatch() {} }))
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 2)
    if (filter === 'All') {
      assert.equal((html.match(/class="style-item"/g) || []).length, 4)
      state = home.styleFinderReducer(state, { type: 'toggle-preview' })
      assert.equal((render(React.createElement(StyleFinderView, { state, dispatch() {} })).match(/class="style-item"/g) || []).length, 8)
    }
  }
  const library = await load('data/style-library.js')
  const { StyleLibraryView } = await load('components/services/StyleLibrary.jsx')
  const Detail = (await load('components/services/StyleDetail.jsx')).default
  for (const collection of ['men','women']) for (const length of library.lengthFilters) for (const texture of library.textureFilters) {
    let state = { ...library.initialLibraryState, collection, length, texture }
    const results = library.getLibraryResults(state)
    const html = render(React.createElement(StyleLibraryView, { state, dispatch() {} }))
    assert.equal((html.match(/aria-haspopup="dialog"/g) || []).length, Math.min(8,results.length))
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 3)
    state = library.libraryReducer(state, { type: 'more' })
    assert.equal(state.limit, Math.min(16,results.length))
    state = library.libraryReducer(state, { type: 'reset' })
    assert.equal(state.collection, collection); assert.equal(state.length, 'All')
  }
  for (const style of library.styleLibrary) {
    const html = render(React.createElement(Detail, { style, onClose() {} }))
    assert.ok(html.includes('href="/book"'))
    assert.ok(fs.existsSync('.' + style.image.src))
    let state = library.libraryReducer({ ...library.initialLibraryState, collection: style.collection }, { type: 'open', value: style.id })
    assert.equal(state.selectedId,style.id)
    assert.equal(library.libraryReducer(state,{type:'close'}).selectedId,null)
  }
})

test('Team specialties, exclusive profiles, Escape/focus-return and book/style links', async () => {
  const { teamFilters, filterTeam } = await load('data/team.js')
  const { TeamFinderView, TeamMember } = await load('components/team/TeamFinder.jsx')
  for (const filter of teamFilters) {
    const html = render(React.createElement(TeamFinderView,{filter,onFilter(){}}))
    assert.equal((html.match(/<details/g) || []).length, filterTeam(filter).length)
    assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1)
  }
  for (const member of teamMembers) {
    const tree = TeamMember({member}), details = tree.props.children
    assert.equal(details.props.name,'velora-artist')
    let focused = false
    const element = { open: true, closest() { return this }, querySelector() { return { focus() { focused = true } } } }
    details.props.onKeyDown({ key: 'Escape', currentTarget: element, preventDefault() {} })
    assert.ok(focused && !element.open)
    const html = render(tree)
    assert.ok(html.includes('href="/services#style-library"'))
    assert.ok(html.includes('href="/book"'))
  }
})

test('Core text and control colour pairs meet their contrast thresholds; obsolete profile collisions stay removed', () => {
  const tokens = fs.readFileSync('src/styles/tokens.css','utf8')
  const colour = name => tokens.match(new RegExp('--color-' + name + ': (#[0-9a-f]+)'))[1]
  const luminance = hex => {
    const rgb = hex.slice(1).match(/../g).map(value => parseInt(value,16)/255).map(value => value <= .04045 ? value/12.92 : ((value+.055)/1.055)**2.4)
    return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722
  }
  const contrast = (a,b) => (Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05)
  for (const background of ['ivory','paper']) assert.ok(contrast(colour('muted'),colour(background)) >= 4.5)
  assert.ok(contrast('#ffffff',colour('clay')) >= 4.5)
  assert.ok(contrast('#927e73','#fcf8f4') >= 3)
  const teamCss = fs.readFileSync('src/styles/team.css','utf8')
  assert.doesNotMatch(teamCss,/\.artist-grid\b|\.artist-role\b/)
  assert.match(teamCss,/:has\(\.artist-profile\[open\]\)/)
  assert.match(fs.readFileSync('src/styles/global.css','utf8'), /prefers-reduced-motion/)
  for (const phone of ['++447700900123','44+7700900123']) assert.ok(booking.validateStep(4,{...valid,phone},now).phone)
})

test('Raster viewports defer below-fold requests, keep hero requests eager and have a no-observer fallback', async () => {
  const Raster = (await load('components/LazyRasterImage.jsx')).default
  const photo = gallery.galleryEntries[0].image
  const deferred = render(React.createElement('svg',null,React.createElement(Raster,{href:photo,width:100,height:150})))
  assert.ok(!deferred.includes('href='))
  const eager = render(React.createElement('svg',null,React.createElement(Raster,{href:photo,eager:true,width:100,height:150})))
  assert.ok(eager.includes('href="' + photo + '"'))
  const previous = globalThis.window
  try {
    globalThis.window = {}
    const fallback = render(React.createElement('svg',null,React.createElement(Raster,{href:photo,width:100,height:150})))
    assert.ok(fallback.includes('href="' + photo + '"'))
  } finally {
    if (previous === undefined) delete globalThis.window
    else globalThis.window = previous
  }
  const { resolve, dirname } = await import('node:path')
  function inspect(directory) {
    for (const entry of fs.readdirSync(directory,{withFileTypes:true})) {
      const path = directory + '/' + entry.name
      if (entry.isDirectory()) inspect(path)
      else if (/\.(jsx|js)$/.test(path)) {
        for (const match of fs.readFileSync(path,'utf8').matchAll(/from ['"]([^'"]+\.(?:jpg|png))['"]/g)) assert.ok(fs.existsSync(resolve(dirname(path),match[1])), path + ': ' + match[1])
      }
    }
  }
  inspect('src')
})
