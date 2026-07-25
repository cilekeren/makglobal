import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { JOURNEY_SVG_MARKUP } from './journeySvgMarkup'
import sideVideo from '../../assets/journey/side-video.mp4'
import sideVideo2 from '../../assets/journey/side-video-2.mp4'
import makStampRing from '../../assets/journey/mak-stamp-ring.svg'
import makStampCenter from '../../assets/journey/mak-stamp-center.svg'
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

const TITLE_OFFSET = { dx: 172, dy: -9.7 }
const BODY_OFFSET_X = 363
const BODY_OFFSET_Y = 110
const BODY_LINE_HEIGHT = 57.6
// preferred wrap width, but this is SVG text: the whole artwork (viewBox
// VBW wide) scales as one image, so "narrower screen -> reflow" doesn't
// apply here the way it would for HTML text in a shrinking box — the
// wrap width is fixed in the artwork's own coordinate space once, at
// mount. If that fixed width pushes wrapped lines past bx + width > VBW,
// they overflow the artwork's own canvas at every screen size alike (just
// hidden on wide viewports by the page margin around the artwork, and
// clipped by .pin's overflow:hidden on narrow ones) — so buildStepText
// below clamps it to whatever room is actually left within the canvas,
// instead of trusting this number to already fit.
const BODY_MAX_WIDTH = 1200
const BODY_RIGHT_MARGIN = 24
const BODY_FONT = { family: 'Lexend Deca, sans-serif', weight: '300', size: '36' }

const SVG_NS = 'http://www.w3.org/2000/svg'

// minimum word count a wrapped line is allowed to end on — avoids an
// orphaned word or two stranded alone on the last line.
const MIN_LAST_LINE_WORDS = 3

// wraps `text` into lines that each fit within `maxWidth` (SVG user
// units), measured with the real font via a throwaway <text> node — so
// the wrap width is an actual, adjustable setting rather than hand-picked
// line breaks. Text that already fits on one line is never wrapped, and
// a wrap that would leave a short trailing line pulls words back from
// the line before it (even past maxWidth, if needed) instead.
function wrapSvgText(svg, text, font, maxWidth) {
  const measurer = document.createElementNS(SVG_NS, 'text')
  measurer.setAttribute('font-family', font.family)
  measurer.setAttribute('font-weight', font.weight)
  measurer.setAttribute('font-size', font.size)
  measurer.style.opacity = '0'
  svg.appendChild(measurer)
  const width = (s) => {
    measurer.textContent = s
    return measurer.getComputedTextLength()
  }

  let lines
  if (width(text) <= maxWidth) {
    lines = [text]
  } else {
    const words = text.split(' ')
    lines = []
    let current = ''
    for (const word of words) {
      const trial = current ? `${current} ${word}` : word
      if (width(trial) > maxWidth && current) {
        lines.push(current)
        current = word
      } else {
        current = trial
      }
    }
    if (current) lines.push(current)

    while (lines.length >= 2) {
      const lastWords = lines[lines.length - 1].split(' ')
      const prevWords = lines[lines.length - 2].split(' ')
      if (lastWords.length >= MIN_LAST_LINE_WORDS || prevWords.length <= 1) break
      lastWords.unshift(prevWords.pop())
      lines[lines.length - 2] = prevWords.join(' ')
      lines[lines.length - 1] = lastWords.join(' ')
    }
    lines = lines.filter((line) => line.length > 0)
  }

  svg.removeChild(measurer)
  return lines
}

function buildStepText(svg, step, stepsContent) {
  const { cx, cy } = RING_CENTER[step]
  const { title, body } = stepsContent[step]

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
  const maxWidth = Math.min(BODY_MAX_WIDTH, VBW - bx - BODY_RIGHT_MARGIN)
  const lines = wrapSvgText(svg, body, BODY_FONT, maxWidth)
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

// clones a step's ring + icon paths out of the master timeline SVG into
// their own small, standalone <svg> — used for the mobile step list,
// since that layout shows each step as a simple icon/title/description
// card instead of panning through the full-size pinned artwork. Each
// source element's CTM (cumulative transform up to the root SVG) is
// baked directly into its clone so the clone reproduces the exact same
// shape without needing to reconstruct the original nested <g transform>
// wrappers, then the new SVG's viewBox is cropped tightly to their
// combined bounding box so it renders as a nicely-framed icon.
function buildMobileIconSvg(svg, step) {
  const elements = [...svg.querySelectorAll(`[data-step="${step}"]`)].filter((e) =>
    ['ring-navy', 'ring-gold', 'icon'].includes(e.dataset.kind)
  )
  if (!elements.length) return null

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  const clones = elements.map((el) => {
    const bbox = el.getBBox()
    const ctm = el.getCTM()
    let elMinX = Infinity
    let elMinY = Infinity
    let elMaxX = -Infinity
    let elMaxY = -Infinity
    ;[
      [bbox.x, bbox.y],
      [bbox.x + bbox.width, bbox.y],
      [bbox.x, bbox.y + bbox.height],
      [bbox.x + bbox.width, bbox.y + bbox.height],
    ].forEach(([x, y]) => {
      const pt = svg.createSVGPoint()
      pt.x = x
      pt.y = y
      const t = pt.matrixTransform(ctm)
      elMinX = Math.min(elMinX, t.x)
      elMaxX = Math.max(elMaxX, t.x)
      elMinY = Math.min(elMinY, t.y)
      elMaxY = Math.max(elMaxY, t.y)
      minX = Math.min(minX, t.x)
      maxX = Math.max(maxX, t.x)
      minY = Math.min(minY, t.y)
      maxY = Math.max(maxY, t.y)
    })

    // the ring arcs are drawn with a small deliberate gap between their
    // start/end points (so the desktop scroll animation can "spin" them
    // into place) — shown statically here, that gap reads as a broken
    // circle, so the rings are rebuilt as true, unbroken circles from
    // their own bounding box instead of cloning the arc path as-is.
    if (el.dataset.kind === 'ring-navy' || el.dataset.kind === 'ring-gold') {
      // circle has no transform of its own (cx/cy/r are already in final,
      // post-transform space), so the stroke width — still in the
      // element's original local units — needs the same uniform scale
      // factor from the CTM applied to it, or it'd render too thin.
      const scale = Math.hypot(ctm.a, ctm.b)
      const circle = document.createElementNS(SVG_NS, 'circle')
      circle.setAttribute('cx', (elMinX + elMaxX) / 2)
      circle.setAttribute('cy', (elMinY + elMaxY) / 2)
      circle.setAttribute('r', (elMaxX - elMinX + (elMaxY - elMinY)) / 4)
      circle.setAttribute('stroke', el.getAttribute('stroke'))
      circle.setAttribute('stroke-width', parseFloat(el.getAttribute('stroke-width')) * scale)
      return circle
    }

    const clone = el.cloneNode(true)
    clone.removeAttribute('data-step')
    clone.setAttribute('transform', `matrix(${ctm.a} ${ctm.b} ${ctm.c} ${ctm.d} ${ctm.e} ${ctm.f})`)
    return clone
  })

  const w = maxX - minX
  const h = maxY - minY
  const pad = Math.max(w, h) * 0.18
  const mini = document.createElementNS(SVG_NS, 'svg')
  mini.setAttribute('viewBox', `${minX - pad} ${minY - pad} ${w + pad * 2} ${h + pad * 2}`)
  mini.setAttribute('width', '100%')
  mini.setAttribute('height', '100%')
  // the source elements rely on `fill="none"` set once on the master
  // SVG's own root and inherited down — this standalone clone has no
  // such ancestor, so without repeating it here every closed ring/icon
  // path would default to a solid black fill instead of an outline.
  mini.setAttribute('fill', 'none')
  clones.forEach((c) => mini.appendChild(c))
  return mini
}

const MOBILE_BREAKPOINT_QUERY = '(max-width: 700px)'

export default function BuyingJourney() {
  const { t, i18n } = useTranslation()
  const STEPS_CONTENT = {
    s1: { title: t('buyingJourney.steps.s1.title'), body: t('buyingJourney.steps.s1.body') },
    s2: { title: t('buyingJourney.steps.s2.title'), body: t('buyingJourney.steps.s2.body') },
    s3: { title: t('buyingJourney.steps.s3.title'), body: t('buyingJourney.steps.s3.body') },
    s4: { title: t('buyingJourney.steps.s4.title'), body: t('buyingJourney.steps.s4.body') },
    s5: { title: t('buyingJourney.steps.s5.title'), body: t('buyingJourney.steps.s5.body') },
    s6: { title: t('buyingJourney.steps.s6.title'), body: t('buyingJourney.steps.s6.body') },
    s7: { title: t('buyingJourney.steps.s7.title'), body: t('buyingJourney.steps.s7.body') },
  }
  const scrollRef = useRef(null)
  const wrapRef = useRef(null)
  const headingRef = useRef(null)
  const videoMaskRef = useRef(null)
  const videoMaskSecondaryRef = useRef(null)
  const stampRef = useRef(null)
  const mobileSourceRef = useRef(null)
  const mobileIconContainers = useRef({})
  const mobileStepRefs = useRef({})
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_BREAKPOINT_QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_BREAKPOINT_QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // simple, non-scroll-jacked mobile layout: each step is an icon (cloned
  // out of the master timeline SVG below) with its title/description
  // stacked under it, revealed with a plain fade/slide-in as it scrolls
  // into view — the desktop version's pinned pan + spine draw-in doesn't
  // translate to a narrow screen (see the reverted attempt this replaces).
  useEffect(() => {
    if (!isMobile) return
    const sourceSvg = mobileSourceRef.current?.querySelector('svg')
    if (!sourceSvg) return

    ORDER.forEach((step) => {
      const container = mobileIconContainers.current[step]
      if (!container) return
      container.innerHTML = ''
      const mini = buildMobileIconSvg(sourceSvg, step)
      if (mini) container.appendChild(mini)
    })

    const items = ORDER.map((step) => mobileStepRefs.current[step]).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(styles.mobileStepVisible)
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 }
    )
    items.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const scrollEl = scrollRef.current
    const wrap = wrapRef.current
    const heading = headingRef.current
    const videoMask = videoMaskRef.current
    const videoMaskSecondary = videoMaskSecondaryRef.current
    const stamp = stampRef.current
    const svg = wrap.querySelector('svg')

    // guards against React StrictMode's dev-mode double-invoke of this
    // effect (mount -> cleanup -> mount again): buildStepText appends
    // fresh title/body <text> nodes every time it runs, so without this
    // a second invocation would leave two overlapping copies per step.
    svg.querySelectorAll('text[data-kind="title"], text[data-kind="body"]').forEach((e) => e.remove())
    ORDER.forEach((step) => buildStepText(svg, step, STEPS_CONTENT))

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
      // title/body no longer wait for the ring + icon to finish drawing —
      // ring, icon, and text all fire together at the same delay — the
      // ring no longer draws first with the icon following once it's
      // done, and the text no longer waits on either.
      const seq = ['ring-navy', 'ring-gold', 'icon', 'title', 'body']
      const base = 150 + batchStagger
      seq.forEach((kind) => {
        const grp = els.filter((e) => e.dataset.kind === kind)
        grp.forEach((e, k) => drawEl(e, base + k * 60))
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
      const panY = window.innerHeight * CAMERA_ANCHOR - focus
      wrap.style.transform = `translateX(-50%) translateY(${panY}px)`

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
    // i18n.language: buildStepText() writes title/body directly into the
    // SVG imperatively (not through React's render), so switching language
    // needs this whole effect to re-run and rebuild that text — it isn't
    // reactive on its own the way the mobile JSX version below is.
    // STEPS_CONTENT itself is deliberately not listed: it's a fresh object
    // every render, and i18n.language already covers every case its
    // contents actually change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, i18n.language])

  return (
    <section className={styles.section}>
      {isMobile && (
        <div className={styles.mobileDecor}>
          <div className={styles.mobileDecorVideoWrap}>
            <div className={styles.mobileDecorVideo}>
              <video className={styles.sideVideo} src={sideVideo} autoPlay loop muted playsInline />
            </div>
            <div className={styles.mobileDecorStamp}>
              <img className={styles.stampRing} src={makStampRing} alt="" />
              <img className={styles.stampCenter} src={makStampCenter} alt="" />
            </div>
          </div>
        </div>
      )}

      <h2 className={styles.heading} ref={headingRef}>{t('buyingJourney.heading')}</h2>
      <p className={styles.subheading}>{t('buyingJourney.subheading')}</p>

      {isMobile ? (
        <>
          {/* invisible but fully rendered, so getBBox/getCTM below can read
              real geometry off it — purely a cloning source, never shown. */}
          <div className={styles.mobileIconSource} ref={mobileSourceRef} aria-hidden="true">
            <div dangerouslySetInnerHTML={{ __html: JOURNEY_SVG_MARKUP }} />
          </div>

          <div className={styles.mobileSteps}>
            {ORDER.map((step) => (
              <div
                key={step}
                className={styles.mobileStep}
                ref={(el) => (mobileStepRefs.current[step] = el)}
              >
                <div
                  className={styles.mobileStepIcon}
                  ref={(el) => (mobileIconContainers.current[step] = el)}
                />
                <h3 className={styles.mobileStepTitle}>{STEPS_CONTENT[step].title}</h3>
                <p className={styles.mobileStepBody}>{STEPS_CONTENT[step].body}</p>
              </div>
            ))}
          </div>

          <div className={styles.mobileCtaWrap}>
            <Button label={t('buyingJourney.bookConsultant')} color="#0A3332" />
          </div>
        </>
      ) : (
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
              <img className={styles.stampRing} src={makStampRing} alt="" />
              <img className={styles.stampCenter} src={makStampCenter} alt="" />
            </div>
            <div className={styles.wrap} ref={wrapRef}>
              <div dangerouslySetInnerHTML={{ __html: JOURNEY_SVG_MARKUP }} />
              <div className={styles.ctaWrap}>
                <Button label={t('buyingJourney.bookConsultant')} color="#0A3332" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
