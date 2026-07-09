import { useEffect, useRef } from 'react'
import { JOURNEY_SVG_MARKUP } from './journeySvgMarkup'
import sideVideo from '../../assets/journey/side-video.mp4'
import sideVideo2 from '../../assets/journey/side-video-2.mp4'
import makStamp from '../../assets/journey/mak-stamp.svg'
import Button from '../common/Button'
import styles from './BuyingJourney.module.css'

// SVG viewBox size and the vertical centre (in real SVG units) of each
// step's ring group — ported verbatim from the reference mockup
// (COMP_TRIALS/journey_8.html) so the pinned view can pan down to keep
// the active step centred as the user scrolls.
const VBW = 3407.4
const FOCUS = {
  s1: 378,
  s2: 1109,
  s3: 1835,
  s4: 2560,
  s5: 3238.5,
  s6: 3953.5,
  s7: 4668.5,
}
const ORDER = ['s1', 's2', 's3', 's4', 's5', 's6', 's7']

// the spine (data-kind="spine") is drawn from y=60.5 to y=5380.5 — this is
// where it ends, and where the CTA button sits (see .ctaWrap in the CSS
// module, positioned at this same y as a % of the viewBox height).
const CTA_FOCUS_Y = 5380.5
// screen-height fraction the CTA should sit at once the track finishes
// scrolling, so the section ends with the button on screen near the
// bottom rather than scrolled past it — see the `last` calc in frame().
const CTA_SCREEN_FRACTION = 0.85

// true geometric centre of each step's ring (in real SVG units) — used
// to position that step's title/body text relative to its own ring.
const RING_CENTER = {
  s1: { cx: 1990.70, cy: 379.008 },
  s2: { cx: 1990.70, cy: 1091.998 },
  s3: { cx: 1990.70, cy: 1806.0 },
  s4: { cx: 1990.70, cy: 2523.5 },
  s5: { cx: 1990.70, cy: 3238.5 },
  s6: { cx: 1990.70, cy: 3953.5 },
  s7: { cx: 1990.70, cy: 4668.5 },
}

// editable copy for each step — title + body (body is a single paragraph,
// auto-wrapped at BODY_MAX_WIDTH when rendered, see wrapSvgText below).
const STEPS_CONTENT = {
  s1: {
    title: 'Strategic Discovery & Financial Alignment',
    body: 'Before we begin looking for properties, we sit down to define your investment goals and budget. We will review your financing options and all buying costs together, ensuring we build a clear plan that fits your long-term vision.',
  },
  s2: {
    title: 'Property Selection',
    body: 'Aligning with your financial parameters and geographical preferences, we leverage our elite on-market and off-market networks to curate a tailored shortlist of premier developments that match your long-term investment goals.',
  },
  s3: {
    title: 'Mortgage & Financing Assessment',
    body: 'If financing is required, we can introduce you to specialist mortgage brokers who assist both UK residents and international buyers.',
  },
  s4: {
    title: 'Reservation & Securing the Asset',
    body: 'Once you have selected a property, a reservation fee is paid to secure the unit and temporarily remove it from the market.',
  },
  s5: {
    title: 'Legal Due Diligence',
    body: 'Your solicitor will conduct all necessary legal checks, review contracts, and ensure the property is ready for purchase.',
  },
  s6: {
    title: 'Exchange of Contracts',
    body: 'Upon legal clearance, formal contracts are mutually exchanged, and the initial deposit is securely transferred to lock in the transaction.',
  },
  s7: {
    title: 'Completion & Keys Handover',
    body: 'The remaining balance is settled, legal title is seamlessly transferred, and your new London property is officially delivered into your portfolio.',
  },
}

const TITLE_OFFSET = { dx: 172, dy: -9.7 }
const BODY_OFFSET_X = 363
const BODY_OFFSET_Y = 110
const BODY_LINE_HEIGHT = 57.6
const BODY_MAX_WIDTH = 1350
const BODY_FONT = { family: 'Lexend Deca, sans-serif', weight: '300', size: '36' }

const SVG_NS = 'http://www.w3.org/2000/svg'

// wraps `text` into lines that each fit within `maxWidth` (SVG user
// units), measured with the real font via a throwaway <text> node —
// so the wrap width is an actual, adjustable setting rather than
// hand-picked line breaks.
function wrapSvgText(svg, text, font, maxWidth) {
  const measurer = document.createElementNS(SVG_NS, 'text')
  measurer.setAttribute('font-family', font.family)
  measurer.setAttribute('font-weight', font.weight)
  measurer.setAttribute('font-size', font.size)
  measurer.style.opacity = '0'
  svg.appendChild(measurer)

  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word
    measurer.textContent = trial
    if (measurer.getComputedTextLength() > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = trial
    }
  }
  if (current) lines.push(current)

  svg.removeChild(measurer)
  return lines
}

function buildStepText(svg, step) {
  const { cx, cy } = RING_CENTER[step]
  const { title, body } = STEPS_CONTENT[step]

  const titleEl = document.createElementNS(SVG_NS, 'text')
  titleEl.dataset.step = step
  titleEl.dataset.kind = 'title'
  titleEl.setAttribute('x', cx + TITLE_OFFSET.dx)
  titleEl.setAttribute('y', cy + TITLE_OFFSET.dy)
  titleEl.setAttribute('dominant-baseline', 'central')
  titleEl.setAttribute('font-family', 'Petrona, serif')
  titleEl.setAttribute('font-weight', '300')
  titleEl.setAttribute('font-size', '90')
  titleEl.setAttribute('fill', '#0A3332')
  titleEl.textContent = title
  svg.appendChild(titleEl)

  const bodyEl = document.createElementNS(SVG_NS, 'text')
  bodyEl.dataset.step = step
  bodyEl.dataset.kind = 'body'
  bodyEl.setAttribute('font-family', BODY_FONT.family)
  bodyEl.setAttribute('font-weight', BODY_FONT.weight)
  bodyEl.setAttribute('font-size', BODY_FONT.size)
  bodyEl.setAttribute('fill', '#0A3332')
  const bx = cx + BODY_OFFSET_X
  const lines = wrapSvgText(svg, body, BODY_FONT, BODY_MAX_WIDTH)
  lines.forEach((line, i) => {
    const tspan = document.createElementNS(SVG_NS, 'tspan')
    tspan.setAttribute('x', bx)
    if (i === 0) tspan.setAttribute('y', cy + BODY_OFFSET_Y)
    else tspan.setAttribute('dy', BODY_LINE_HEIGHT)
    tspan.textContent = line
    bodyEl.appendChild(tspan)
  })
  svg.appendChild(bodyEl)
}

export default function BuyingJourney() {
  const scrollRef = useRef(null)
  const wrapRef = useRef(null)
  const headingRef = useRef(null)
  const videoMaskRef = useRef(null)
  const videoMaskSecondaryRef = useRef(null)
  const stampRef = useRef(null)

  useEffect(() => {
    const scrollEl = scrollRef.current
    const wrap = wrapRef.current
    const heading = headingRef.current
    const videoMask = videoMaskRef.current
    const videoMaskSecondary = videoMaskSecondaryRef.current
    const stamp = stampRef.current
    const svg = wrap.querySelector('svg')

    ORDER.forEach((step) => buildStepText(svg, step))

    const all = [...svg.querySelectorAll('[data-step]')]
    const steps = { s1: [], s2: [], s3: [], s4: [], s5: [], s6: [], s7: [] }
    const spine = svg.querySelector('[data-kind="spine"]')
    all.forEach((e) => {
      const s = e.dataset.step
      if (steps[s]) steps[s].push(e)
    })

    function prep(e) {
      const kind = e.dataset.kind
      const hasStroke = e.getAttribute('stroke') && e.getAttribute('stroke') !== 'none'
      if (kind === 'title' || kind === 'body') {
        e.style.opacity = '0'
        e.style.transition = 'opacity .5s ease'
        e._mode = 'fade'
        return
      }
      if (hasStroke) {
        let L = 0
        try {
          L = e.getTotalLength()
        } catch (_) {
          /* not a path/shape with a length */
        }
        if (L > 0) {
          e.style.strokeDasharray = L
          e.style.strokeDashoffset = L
          e._mode = 'draw'
          return
        }
      }
      e.style.opacity = '0'
      e.style.transition = 'opacity .5s ease'
      e._mode = 'fade'
    }
    all.forEach(prep)

    let spineL = 0
    if (spine) {
      spineL = spine.getTotalLength()
      spine.style.strokeDasharray = spineL
      spine.style.strokeDashoffset = spineL
    }
    // absolute page scrollY at the exact moment step 1 is revealed — the
    // spine's whole draw (0 to 1) is mapped linearly across the scroll
    // distance from this point to the end of the track, so it moves at
    // one constant speed relative to scroll, no phases, no easing.
    let spineTriggerScrollY = null

    function drawEl(e, delay) {
      if (e._mode === 'fade') {
        setTimeout(() => {
          e.style.opacity = '1'
        }, delay)
        return
      }
      e.style.transition = `stroke-dashoffset .8s ease ${delay}ms`
      requestAnimationFrame(() => {
        e.style.strokeDashoffset = '0'
      })
    }

    const fired = {}
    // if two steps become "due" within the same scroll tick (their
    // trigger points end up very close together for a given viewport
    // size), stagger them instead of letting both animate in at once —
    // reset every frame so steps due in genuinely separate scroll ticks
    // are unaffected.
    let revealBatchIndex = 0
    function reveal(stepKey) {
      if (fired[stepKey]) return
      fired[stepKey] = true
      if (stepKey === ORDER[0] && spineTriggerScrollY === null) {
        spineTriggerScrollY = window.scrollY
      }
      const batchStagger = revealBatchIndex * 350
      revealBatchIndex += 1
      const els = steps[stepKey]
      const seq = ['ring-navy', 'ring-gold', 'icon', 'title', 'body']
      let base = 150 + batchStagger
      seq.forEach((kind) => {
        const grp = els.filter((e) => e.dataset.kind === kind)
        grp.forEach((e, k) => drawEl(e, base + k * 60))
        if (grp.length) {
          base += kind === 'icon' ? 500 : kind === 'ring-navy' ? 700 : kind === 'ring-gold' ? 300 : 250
        }
      })
    }

    function spineTo(p) {
      if (!spine) return
      spine.style.transition = 'stroke-dashoffset .15s linear'
      spine.style.strokeDashoffset = String(spineL * (1 - p))
    }

    const N = ORDER.length

    function frame() {
      revealBatchIndex = 0
      const max = scrollEl.offsetHeight - window.innerHeight
      const rect = scrollEl.getBoundingClientRect()
      const prog = Math.min(1, Math.max(0, -rect.top / max))

      const w = wrap.clientWidth
      const scale = w / VBW
      const CAMERA_ANCHOR = 0.22
      const firstFocusRaw = FOCUS[ORDER[0]]
      const first = firstFocusRaw * scale
      // target the CTA's own screen position at the very end of the track
      // (instead of pinning the last ring to CAMERA_ANCHOR) so the section
      // finishes with the button visible near the bottom of the viewport,
      // not already scrolled past during the sticky/pin hand-off.
      const last = CTA_FOCUS_Y * scale - window.innerHeight * (CTA_SCREEN_FRACTION - CAMERA_ANCHOR)
      const focus = first + (last - first) * prog
      wrap.style.transform = `translateX(-50%) translateY(${window.innerHeight * CAMERA_ANCHOR - focus}px)`

      // the two side videos drift upward at their own (different) speeds
      // as the journey scrolls, independent of the artwork's pan — a
      // simple two-layer parallax so they read as sitting at a different
      // depth than the timeline itself.
      if (videoMask) {
        videoMask.style.transform = `translateY(${-prog * window.innerHeight * 0.18}px)`
      }
      if (videoMaskSecondary) {
        videoMaskSecondary.style.transform = `translateY(${-prog * window.innerHeight * 0.32}px)`
      }
      if (stamp) {
        stamp.style.transform = `translateY(${-prog * window.innerHeight * 0.24}px)`
      }

      // same trigger for every step: reveal once its own reference point
      // (the heading for step 1, the ring itself for the rest) scrolls up
      // to just before the centre of the screen.
      const REVEAL_LINE = window.innerHeight * 0.5 + 220
      if (heading && heading.getBoundingClientRect().top <= REVEAL_LINE) {
        reveal(ORDER[0])
      }

      // the spine's whole draw is one straight line from 0 (at the scroll
      // position where step 1 was triggered, above) to 1 (at the end of
      // the track) — a single constant speed relative to scroll the whole
      // way, no phases, no time-based easing.
      if (spineTriggerScrollY !== null) {
        const trackEndScrollY = rect.top + window.scrollY + max
        const spineSpan = trackEndScrollY - spineTriggerScrollY
        const spineProgress =
          spineSpan > 0 ? Math.max(0, Math.min(1, (window.scrollY - spineTriggerScrollY) / spineSpan)) : 1
        spineTo(spineProgress)
      }
      // the ring positions only mean anything once the track has actually
      // been scrolled into (rect.top <= 0) — before that, .pin isn't even
      // on screen yet, so these checks must not fire regardless of what
      // the (clamped-to-0) prog-based math would otherwise say.
      if (rect.top <= 0) {
        for (let i = 1; i < N; i++) {
          const ringScreenY = window.innerHeight * CAMERA_ANCHOR - focus + FOCUS[ORDER[i]] * scale
          if (ringScreenY <= REVEAL_LINE) reveal(ORDER[i])
        }
      }
    }

    let raf = null
    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        frame()
        raf = null
      })
    }
    const handleResize = () => frame()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    frame()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className={styles.section}>
      <h2 className={styles.heading} ref={headingRef}>How to Buy Property in UK</h2>
      <p className={styles.subheading}>
        Your Roadmap Through Offers, Legal Checks, Exchange of Contracts and Key Handover
      </p>
      <div className={styles.scroll} ref={scrollRef}>
        <div className={styles.pin}>
          <div className={styles.sideVideoMask} ref={videoMaskRef}>
            <video
              className={styles.sideVideo}
              src={sideVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className={styles.sideVideoMaskSecondary} ref={videoMaskSecondaryRef}>
            <video
              className={styles.sideVideo}
              src={sideVideo2}
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className={styles.stampWrap} ref={stampRef}>
            <img className={styles.stamp} src={makStamp} alt="" />
          </div>
          <div className={styles.wrap} ref={wrapRef}>
            <div dangerouslySetInnerHTML={{ __html: JOURNEY_SVG_MARKUP }} />
            <div className={styles.ctaWrap}>
              <Button label="BOOK A CONSULTANT" color="#0A3332" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
