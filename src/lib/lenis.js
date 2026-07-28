// Module-scoped, not React state or context: App.jsx creates the single
// Lenis instance for the whole app, but nav components (which mount/unmount
// on every route change) need to trigger a scroll on it without threading
// a prop or context down through the tree.
let instance = null

export function setLenis(lenis) {
  instance = lenis
}

// Scrolls to an element every time it's called, regardless of current
// scroll/hash state -- unlike a hash-change effect, this doesn't skip a
// repeat click just because the URL hash didn't change (e.g. clicking
// "Talk to us" again after manually scrolling back up).
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (instance) {
    instance.resize()
    instance.scrollTo(el, { offset: -140 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
