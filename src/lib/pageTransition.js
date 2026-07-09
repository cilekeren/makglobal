import gsap from 'gsap'

// Module-scoped, not React state: it only needs to survive the moment
// between "old page unmounts" and "new page's first layout effect runs",
// which a plain variable does fine since this is a client-side route change,
// not a real page load.
let pending = null

// Matches ProjectDetail's .heroOuter/.top layout (20px padding, 50vh tall,
// min 360px, 6px radius) so the floating clone can hand off to the real
// hero <img> with no visible jump.
function getHeroRect() {
  const width = window.innerWidth
  const height = Math.max(window.innerHeight * 0.5, 360)
  return { top: 20, left: 20, width: width - 40, height, radius: 6 }
}

// Called on a project card click. Clones the clicked cover image into a
// fixed-position overlay on top of a white cover (so fading the app never
// reveals body's dark background), zooms the clone into the detail page's
// hero position, then navigates. Everything below the hero (green band,
// title, etc.) is animated on the real ProjectDetail page after it mounts,
// not guessed here -- that's the only way to know its real height.
export function startCardHeroTransition({ imgEl, titleEl, slug, navigate }) {
  const root = document.getElementById('root')

  if (!imgEl || !root) {
    navigate(`/projects/${slug}`)
    return
  }

  const whiteCover = document.createElement('div')
  Object.assign(whiteCover.style, {
    position: 'fixed',
    inset: '0',
    background: '#fff',
    opacity: '0',
    zIndex: '9998',
    pointerEvents: 'none',
  })
  document.body.appendChild(whiteCover)

  const startRect = imgEl.getBoundingClientRect()
  const startRadius = parseFloat(getComputedStyle(imgEl).borderRadius) || 0
  const target = getHeroRect()

  const imgClone = imgEl.cloneNode()
  Object.assign(imgClone.style, {
    position: 'fixed',
    margin: '0',
    top: `${startRect.top}px`,
    left: `${startRect.left}px`,
    width: `${startRect.width}px`,
    height: `${startRect.height}px`,
    borderRadius: `${startRadius}px`,
    objectFit: 'cover',
    zIndex: '9999',
    pointerEvents: 'none',
  })
  document.body.appendChild(imgClone)

  gsap
    .timeline({
      onComplete: () => {
        pending = { slug, imgClone, whiteCover }
        navigate(`/projects/${slug}`)
      },
    })
    .to(root, { opacity: 0, duration: 0.55, ease: 'power2.out' }, 0)
    .to(whiteCover, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0)
    .to(
      imgClone,
      {
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        borderRadius: target.radius,
        duration: 0.9,
        ease: 'power4.inOut',
      },
      0
    )

  // titleEl is unused for now -- kept in the call signature so callers
  // don't need to change when the title gets its own entrance treatment.
  void titleEl
}

// Called from ProjectDetail's layout effect. Returns the floating layers
// left over from the transition if they match this page's slug, so the
// caller can remove them once the real hero image is in place.
export function consumePendingHeroTransition(slug) {
  if (pending && pending.slug === slug) {
    const data = pending
    pending = null
    return data
  }
  return null
}
