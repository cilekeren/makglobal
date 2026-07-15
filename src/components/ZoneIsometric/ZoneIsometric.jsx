import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import styles from './ZoneIsometric.module.css'

// Vertices of the decorative trace line, as [dx, dy] offsets from the
// isometric shape's own center — measured pixel-for-pixel from the
// reference mockup (1760x1394, where the shape rendered at REF_SCALE).
// Offsets are converted to shape-relative units so the whole line
// scales together with the isometric shape instead of staying a fixed
// pixel shift (which broke apart from the shape on resize). The first
// and last points are the flat ends and always stretch to the actual
// left/right edge of the container.
const STAGE_MAX_W = 1100
// shrinks the middle zigzag toward center so it takes up less of the
// screen, leaving the flat left/right runs proportionally longer.
const ZOOM_OUT = 0.63
const TRACE_POINTS_PX = [
  [-302, 206.5],
  [-298, 56],
  [-258, 56],
  [-240, 70],
  [-170, 70],
  [-88, -11],
  [0, -11],
  [28, -32.5],
  [158, -32.5],
  [162, 38.5],
  [212, 38.5],
  [218, -19],
  [260, -19],
  [266, 29.5],
  [356, 29.5],
  [404, -13.5],
]

function TraceLine({ innerRef, wrapRef }) {
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = wrapRef.current
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const refScale = (STAGE_MAX_W * 0.5) / VB.w
  const SW = Math.min(size.w, STAGE_MAX_W)
  const SH = size.h
  const scale = Math.min((SW * 0.5) / VB.w, (SH * 0.5) / VB.h)
  const k = (scale / refScale) * ZOOM_OUT

  const cx = size.w / 2
  const cy = size.h / 2
  const firstY = cy + 206.5 * k
  const lastY = cy + TRACE_POINTS_PX[TRACE_POINTS_PX.length - 1][1] * k

  const d = size.w
    ? [
        `M -200 ${firstY}`,
        ...TRACE_POINTS_PX.map(([dx, dy]) => `L ${cx + dx * k} ${cy + dy * k}`),
        `L ${size.w + 200} ${lastY}`,
      ].join(' ')
    : ''

  return (
    <div className={styles.traceWrap} ref={wrapRef}>
      {d && (
        <svg className={styles.traceSvg} width={size.w} height={size.h}>
          <path
            ref={innerRef}
            d={d}
            fill="none"
            stroke="#78F6FD"
            strokeWidth="1.3"
            pathLength="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
    </div>
  )
}

const POLYS = [
  '.125 33.4489 18.203 15.4914 48.9357 15.4914 64.3021 .125 285.1555 .1853 292.2059 7.2357 292.2059 23.3252 309.9827 41.0417 310.2237 168.3111 233.5728 245.6851 114.3782 245.6851 111.4255 242.7324 85.5739 242.7324 .125 156.9822 .125 33.4489',
  '15.9935 36.5422 26.1172 26.4989 49.4178 26.4989 71.5935 4.6445 261.0515 4.6445 268.2023 11.715 276.3174 11.715 287.4856 22.8833 287.4856 60.4856 294.7168 67.4758 294.7168 136.1723 287.7266 143.2429 287.7266 168.7932 226.904 229.6158 98.2687 229.6158 66.7727 198.0394 63.0768 198.0394 28.1259 162.9279 28.1259 134.3244 15.9935 122.1116 15.9935 36.5422',
  '24.9723 58.0149 45.3402 37.7675 60.5258 37.7675 76.1934 22.2204 95.4766 22.2204 103.0694 14.8687 210.0915 14.8687 214.5507 19.0869 274.5698 19.0869 280.4753 25.2334 280.4753 47.6502 276.0161 52.471 276.0161 79.106 282.2831 85.1923 282.2831 138.5024 277.8439 143.4839 277.8439 159.955 230.6803 207.2793 147.2803 207.2793 141.0936 217.7244 96.019 217.7244 33.5895 154.8932 33.5895 130.2267 24.9723 121.7099 24.9723 58.0149',
  '68.8417 48.7349 84.6298 48.7349 101.8642 31.862 120.7859 31.862 122.4732 29.4516 172.2481 29.4516 176.1047 25.9565 193.2186 25.9565 195.1469 27.6438 234.075 27.6438 264.8077 57.4123 264.8077 76.334 262.3973 78.7444 262.3973 92.1222 280.4753 110.2002 280.4753 128.1577 273.3646 135.2684 259.2637 135.2684 259.2637 158.6494 239.86 177.5711 200.0883 177.5711 188.8799 188.4179 181.7692 188.4179 170.9224 199.0237 131.5122 199.0237 121.0269 188.4179 95.4766 188.4179 46.0633 140.0893 46.0633 126.591 37.2653 117.6725 37.2653 80.5522 68.8417 48.7349',
  '65.447 73.1001 86.1765 52.3706 95.9386 52.3706 108.2317 40.3185 134.5051 40.3185 137.6387 42.8495 151.8601 42.8495 154.1499 40.3185 173.7948 40.3185 177.1693 43.8136 203.6838 43.8136 221.7618 60.9275 225.1364 60.9275 233.5728 69.2434 233.5728 77.3183 237.1884 80.4518 237.1884 132.5768 227.8883 141.7966 227.8883 156.1385 223.3889 161.9235 186.0276 161.9235 173.7345 174.2166 158.2275 174.2166 156.9151 172.2883 142.0778 172.2883 134.927 164.8964 125.6871 164.8964 123.9194 162.5663 97.0032 162.5663 58.5974 124.5622 58.5974 112.3495 65.5876 105.279 65.447 73.1001',
  '98.7106 93.6287 96.2199 96.2801 96.2199 115.6437 122.3728 141.7966 136.7147 141.7966 139.5268 138.864 165.9609 139.105 190.9488 114.1171 199.3049 114.1171 202.4384 111.064 202.4384 96.4408 185.0031 78.9252 180.9858 78.9252 169.3355 67.1142 146.4366 67.1142 142.6603 71.1316 100.9603 71.1316 93.0863 79.0056 93.0863 88.8079 98.7106 93.6287',
]

const RAMPS = [
  { f: '#236666', s: '#072021' },
  { f: '#49786a', s: '#0C2A2B' },
  { f: '#6f8b6e', s: '#123738' },
  { f: '#969d72', s: '#1B4847' },
  { f: '#bcb076', s: '#356765' },
  { f: '#e2c27a', s: '#A8924F' },
]

const VB = { w: 310.3488, h: 245.8101 }
const GAP = 55
const MAX_ROT_X = 60
const MAX_ROT_Z = -42
const RAD = Math.PI / 180

// area labels + their dot markers, positioned in VB units. The reference
// mockup is a zoomed-in crop (same view the shape reaches at full zoom),
// so its pixels don't map to the full VB box — instead each dot's pixel
// position was converted through an affine fit calibrated against the
// innermost polygon (POLYS[5]): its pixel bounding box in the mockup was
// matched to its known VB-space bounding box to solve scale + offset,
// then every dot's pixel coords were run through that same mapping. This
// pins every dot to its true spot on the actual shape at any zoom level,
// not just wherever it happened to fall in the mockup image. `side` is
// which side of the dot the label sits on (matches the mockup).
const MAP_POINTS = [
  { label: 'Camden Town', x: 140.0, y: 57.38, side: 'right' },
  { label: "St. John's Wood", x: 115.26, y: 63.17, side: 'left' },
  { label: "The Regent's Park", x: 129.58, y: 64.95, side: 'right' },
  { label: 'Marylebone', x: 133.47, y: 81.22, side: 'left' },
  { label: 'Notting Hill', x: 89.22, y: 85.02, side: 'left' },
  { label: 'Soho', x: 144.02, y: 85.02, side: 'right' },
  { label: 'Mayfair', x: 135.15, y: 91.36, side: 'left' },
  { label: 'Piccadilly Circus', x: 147.33, y: 92.31, side: 'right' },
  { label: 'Hyde Park', x: 121.04, y: 95.49, side: 'left' },
  { label: 'Knightsbridge', x: 123.49, y: 103.96, side: 'right' },
  { label: 'South Kensington', x: 113.02, y: 108.85, side: 'left' },
  { label: 'Sloane Square', x: 128.69, y: 111.32, side: 'right' },
  { label: 'Chelsea', x: 117.22, y: 116.37, side: 'right' },
  { label: 'Battersea Power Station', x: 138.1, y: 121.24, side: 'right' },
  { label: 'Nine Elms', x: 144.72, y: 125.64, side: 'right' },
]
// short hover description per area, keyed by MAP_POINTS label
const DESCRIPTIONS = {
  'Camden Town':
    'An alternative cultural hotspot famous for its punk heritage, bustling markets, and canal.',
  "St. John's Wood":
    'A leafy, affluent residential area home to the famous Abbey Road Studios and zebra crossing.',
  "The Regent's Park":
    'A grand royal park housing the London Zoo and stunning, manicured rose gardens.',
  Marylebone:
    'A chic and peaceful neighborhood known for its stylish boutiques and the Sherlock Holmes Museum.',
  'Notting Hill':
    'An iconic, picturesque neighborhood famous for pastel-colored houses and Portobello Road Market.',
  Soho: 'A vibrant entertainment hub famous for its lively nightlife, theaters, and colorful streets.',
  Mayfair:
    "London's most upscale district, featuring luxury hotels, art galleries, and Michelin-starred dining.",
  'Piccadilly Circus': "London's iconic, neon-lit square featuring the famous statue of Eros.",
  'Hyde Park': "The city's largest royal park, offering a vast lake, walking paths, and iconic events.",
  Knightsbridge: 'An ultra-luxury district home to world-famous department stores like Harrods.',
  'South Kensington': 'A grand cultural hub home to the Natural History, Science, and V&A Museums.',
  'Sloane Square': 'A fashionable square at the heart of Chelsea, known for high-end fashion and theaters.',
  Chelsea:
    "An affluent area famous for high-end boutiques along King's Road, art galleries, and fine dining.",
  'Battersea Power Station':
    'A historic landmark beautifully restored into a bustling modern shopping and dining destination.',
  'Nine Elms': 'A rapidly developing riverside district known for modern skyscrapers and the US Embassy.',
}

const DOT_R = 1.05
const HIT_R = 3.4
const DOT_GAP = 0.8
const FONT_SIZE = 1.8
// how far below its resting spot a label starts before rising into place
const LABEL_RISE = 2.6

// scroll (0..1) is split into five phases: trace-line draw, zoom in on
// the innermost layer, a hold at full zoom (map points reveal), zoom
// back out (map points hide), then the isometric explosion.
const P1_END = 0.12
const P2_END = 0.3
// reveal (dots + staggered labels) finishes at P2_END + POINTS_FADE — the
// gap between that and P_HOLD_END is scroll room to actually read the
// last label before zoom-out starts.
const P_HOLD_END = 0.52
const P3_END = 0.66
const ZOOM_MAX = 4.4
// extra downward screen-px shift applied once zoomed in — without it the
// topmost map point (Camden Town) lands right under the fixed navbar
// (position:fixed, z-index:100, see Hero.module.css .stickyNavBar), which
// sits on top and blocks hover/click from ever reaching its dot.
const HOLD_Y_SHIFT = 60
// duration (in scroll fraction) of the map points' reveal/hide
const POINTS_FADE = 0.12
// portion of that reveal spent on the dots growing in before the labels
// start rising — dots finish, then labels follow (and reverse: labels
// sink back first, then dots shrink away)
const DOT_PHASE = 0.45
// within the labels' share of the reveal, each one animates over this
// fraction of it, staggered one after another by LABEL_STAGGER
const LABEL_DURATION = 0.35
const LABEL_STAGGER = (1 - LABEL_DURATION) / (MAP_POINTS.length - 1)

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

function centroid(pts) {
  const n = pts.trim().split(/\s+/).map(Number)
  let x = 0,
    y = 0,
    c = 0
  for (let k = 0; k < n.length; k += 2) {
    x += n[k]
    y += n[k + 1]
    c++
  }
  return { x: x / c, y: y / c }
}

const INNER_CENTROID = centroid(POLYS[POLYS.length - 1])

function svgEl(t, a) {
  const e = document.createElementNS('http://www.w3.org/2000/svg', t)
  for (const k in a) e.setAttribute(k, a[k])
  return e
}

// "x1 y1 x2 y2 ..." -> "M x1,y1 L x2,y2 ... Z", for building donut-ring
// shapes as a single evenodd-filled compound path (outer + inner subpath)
// instead of an SVG <mask> — masks force the browser to composite that
// content into a separate offscreen buffer that doesn't reliably
// re-rasterize at full resolution as the shape is scaled up, which is
// what was making the ring layers look soft/blurry once zoomed in.
function polyToPathD(pts) {
  const n = pts.trim().split(/\s+/)
  let d = ''
  for (let i = 0; i < n.length; i += 2) d += `${i === 0 ? 'M' : 'L'}${n[i]},${n[i + 1]} `
  return `${d}Z`
}

function makeSVG() {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  s.setAttribute('viewBox', `0 0 ${VB.w} ${VB.h}`)
  s.style.overflow = 'visible'
  return s
}

// each layer div has `transform-style:preserve-3d` + `will-change:transform`
// (needed for the isometric explosion), which makes browsers composite it
// as a bitmap captured at its CURRENT on-screen size — fine at rest, but
// during the zoom-in (up to ZOOM_MAX) that bitmap gets stretched and turns
// visibly blocky. Rendering each SVG SUPERSAMPLE× bigger than its intended
// box, then scaling it back down with CSS, gives the bitmap enough real
// resolution to stay sharp through the whole zoom range.
const SUPERSAMPLE = 5

// sizes `svg` to occupy exactly w×h on screen while its raster is
// SUPERSAMPLE× that — and wraps it in a div genuinely sized w×h (CSS
// transforms don't affect layout) so the caller's positioning math and
// the parent's shrink-to-fit box are unaffected by the supersampling.
function sizedSvg(svg, w, h) {
  svg.setAttribute('width', w * SUPERSAMPLE)
  svg.setAttribute('height', h * SUPERSAMPLE)
  svg.style.transform = `scale(${1 / SUPERSAMPLE})`
  svg.style.transformOrigin = '0 0'
  const box = document.createElement('div')
  box.style.cssText = `width:${w}px;height:${h}px;`
  box.appendChild(svg)
  return box
}

export default function ZoneIsometric() {
  const navigate = useNavigate()
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const sceneRef = useRef(null)
  const traceRef = useRef(null)
  const traceWrapRef = useRef(null)
  const introRef = useRef(null)
  const tooltipRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const scene = sceneRef.current

    let SW, SH, scale, offX, offY
    let mapOverlay = null
    const layers = []
    const projections = []
    const mapPointEls = []
    // preserve-3d + will-change promote each layer to its own GPU-composited
    // bitmap — required for the isometric explosion's translateZ depth
    // stacking, but during the zoom in/hold/zoom-out phases every layer's
    // translateZ is 0 and .scene isn't rotated, so there's no 3D happening
    // at all yet. Composited layers don't reliably re-rasterize at full
    // resolution as an ANCESTOR's scale() changes dynamically (each nested
    // layer's own "ideal raster scale" doesn't always track it), which is
    // what was making the shape/dots look soft/blocky while zoomed in —
    // toggling 3D mode on only once the explosion actually needs it avoids
    // that entirely: with no extra composited layers, everything just
    // repaints as part of .scene's own layer, in lockstep with its scale.
    let is3D = false

    function build() {
      scene.innerHTML = ''
      layers.length = 0
      projections.length = 0
      // fresh elements always start flat (no inline transform-style/
      // will-change) — force frame()'s toggle to re-apply the current 3D
      // state to them on its next run instead of assuming nothing changed.
      is3D = false

      POLYS.forEach((pts, i) => {
        if (i > 0) {
          const projSvg = makeSVG()
          const pdefs = svgEl('defs', {})
          const patId = `hatch${i}`
          const pat = svgEl('pattern', {
            id: patId,
            width: '3',
            height: '3',
            patternUnits: 'userSpaceOnUse',
            patternTransform: 'rotate(45)',
          })
          pat.appendChild(
            svgEl('line', {
              x1: '0',
              y1: '0',
              x2: '0',
              y2: '3',
              stroke: RAMPS[i].s,
              'stroke-width': '0.6',
              'stroke-opacity': '0.25',
            }),
          )
          pdefs.appendChild(pat)
          projSvg.appendChild(pdefs)
          projSvg.appendChild(
            svgEl('polygon', { points: pts, fill: RAMPS[i].f, 'fill-opacity': '0.7', stroke: 'none' }),
          )
          projSvg.appendChild(svgEl('polygon', { points: pts, fill: `url(#${patId})`, stroke: 'none' }))
          const pw = document.createElement('div')
          pw.style.cssText = `position:absolute;left:${offX}px;top:${offY}px;`
          pw.appendChild(sizedSvg(projSvg, VB.w * scale, VB.h * scale))
          scene.appendChild(pw)
          projections.push(pw)
        } else {
          projections.push(null)
        }

        const svg = makeSVG()
        if (i < POLYS.length - 1) {
          const d = polyToPathD(pts) + ' ' + polyToPathD(POLYS[i + 1])
          svg.appendChild(svgEl('path', { d, fill: RAMPS[i].f, 'fill-rule': 'evenodd' }))
        } else {
          svg.appendChild(svgEl('polygon', { points: pts, fill: RAMPS[i].f }))
        }
        const w = document.createElement('div')
        w.style.cssText = `position:absolute;left:${offX}px;top:${offY}px;`
        w.appendChild(sizedSvg(svg, VB.w * scale, VB.h * scale))
        scene.appendChild(w)
        layers.push(w)
      })

      // map points: rendered as one more SVG layer on top of everything
      // else, in the same VB viewBox as the shape layers above — so it
      // scales/translates/rotates in lockstep with them and every dot
      // stays pinned to its exact spot on the shape at any zoom level.
      // Dots grow in from nothing (r animates 0 -> DOT_R) and labels rise
      // up into place with a fade (y + opacity), driven per-frame from the
      // shared reveal progress. (This used to clip each label through a
      // fixed "slit" via an SVG clipPath instead of fading it — clipPath
      // forces the browser to composite that content into a separate
      // offscreen buffer, which doesn't reliably re-rasterize at full
      // resolution as the shape is scaled up, and was making every label
      // look soft/blurry once zoomed in.)
      const pointsSvg = makeSVG()
      const pointsWrap = document.createElement('div')
      pointsWrap.style.cssText = `position:absolute;left:${offX}px;top:${offY}px;pointer-events:none;`
      pointsWrap.appendChild(sizedSvg(pointsSvg, VB.w * scale, VB.h * scale))
      // appended now (before building the points below) so the SVG is
      // actually live in the document — text.getComputedTextLength() needs
      // real layout/font metrics to measure the label width correctly.
      scene.appendChild(pointsWrap)
      mapOverlay = pointsWrap
      mapPointEls.length = 0
      MAP_POINTS.forEach(({ label, x, y, side }) => {
        const circle = svgEl('circle', { cx: x, cy: y, r: 0, fill: '#b14f50', style: 'pointer-events:none;' })
        pointsSvg.appendChild(circle)

        const tx = side === 'left' ? x - DOT_R - DOT_GAP : x + DOT_R + DOT_GAP
        const text = svgEl('text', {
          x: tx,
          y,
          fill: '#1d3a3a',
          'font-size': FONT_SIZE,
          'font-family': "'Lexend Deca', system-ui, sans-serif",
          'text-anchor': side === 'left' ? 'end' : 'start',
          'dominant-baseline': 'central',
          style: 'pointer-events:none;opacity:0;',
        })
        text.textContent = label
        pointsSvg.appendChild(text)

        const description = DESCRIPTIONS[label]
        let hitRect = null
        if (description) {
          // one combined hit target spanning the dot AND the label — so
          // hovering either (or the gap between them) reads as a single
          // continuous element instead of two separate ones with a dead
          // zone in between.
          const textW = text.getComputedTextLength()
          const left = side === 'left' ? tx - textW : x - HIT_R
          const right = side === 'left' ? x + HIT_R : tx + textW
          const padY = Math.max(HIT_R, FONT_SIZE * 0.9)
          hitRect = svgEl('rect', {
            x: left,
            y: y - padY,
            width: right - left,
            height: padY * 2,
            fill: '#000',
            'fill-opacity': '0',
            style: 'pointer-events:none;cursor:pointer;',
          })
          pointsSvg.appendChild(hitRect)

          const showTooltip = () => {
            const tt = tooltipRef.current
            if (!tt) return
            const r = hitRect.getBoundingClientRect()
            const cy = r.top + r.height / 2
            tt.textContent = description
            tt.style.top = `${cy}px`
            // anchored past the far edge of the combined dot+label area,
            // so the box never sits on top of the label text itself.
            if (side === 'left') {
              tt.style.left = `${r.left - 10}px`
              tt.style.transform = 'translate(-100%, -50%)'
            } else {
              tt.style.left = `${r.right + 10}px`
              tt.style.transform = 'translate(0, -50%)'
            }
            tt.style.opacity = '1'
          }
          const hideTooltip = () => {
            const tt = tooltipRef.current
            if (tt) tt.style.opacity = '0'
          }
          hitRect.addEventListener('mouseenter', showTooltip)
          hitRect.addEventListener('mouseleave', hideTooltip)
        }

        mapPointEls.push({ circle, hitRect, text, restY: y })
      })
    }

    function layout() {
      SW = stage.clientWidth
      SH = stage.clientHeight
      scale = Math.min((SW * 0.5) / VB.w, (SH * 0.5) / VB.h)
      offX = SW / 2 - (VB.w * scale) / 2
      offY = SH / 2 - (VB.h * scale) / 2
      build()
    }

    function frame(t) {
      // phase 1: trace line draws in, shape stays at rest
      const lineProgress = Math.min(1, t / P1_END)

      // phase 2/hold/3: zoom in toward the innermost layer, hold there
      // (map points reveal), then zoom back out (map points hide)
      let zoomT = 0
      if (t <= P1_END) {
        zoomT = 0
      } else if (t <= P2_END) {
        zoomT = (t - P1_END) / (P2_END - P1_END)
      } else if (t <= P_HOLD_END) {
        zoomT = 1
      } else if (t <= P3_END) {
        zoomT = 1 - (t - P_HOLD_END) / (P3_END - P_HOLD_END)
      }
      const zoomEase = easeInOut(Math.max(0, Math.min(1, zoomT)))

      // map points reveal (grow in / rise up) right after zoom-in
      // completes, stay revealed through the hold, then reverse in
      // lockstep with the zoom-out (zoomT already ramps 1 -> 0 there)
      const pointsProgress =
        t <= P2_END
          ? 0
          : t <= P2_END + POINTS_FADE
            ? (t - P2_END) / POINTS_FADE
            : zoomT

      // phase 4: the isometric explosion
      const explosionT = Math.max(0, Math.min(1, (t - P3_END) / (1 - P3_END)))
      const e = easeInOut(explosionT)

      // flip every layer into (or out of) GPU-composited 3D mode only
      // right as the explosion needs it — see the `is3D` declaration above
      // for why this is what keeps the zoomed-in view crisp.
      const want3D = explosionT > 0.0005
      if (want3D !== is3D) {
        is3D = want3D
        const mode = is3D ? 'preserve-3d' : 'flat'
        const wc = is3D ? 'transform' : 'auto'
        layers.forEach((L) => {
          L.style.transformStyle = mode
          L.style.willChange = wc
        })
        projections.forEach((P) => {
          if (!P) return
          P.style.transformStyle = mode
          P.style.willChange = wc
        })
        if (mapOverlay) {
          mapOverlay.style.transformStyle = mode
          mapOverlay.style.willChange = wc
        }
      }

      // .scene's transform-origin defaults to its own center (SW/2, SH/2),
      // so scale() pivots around that point, not (0,0) — the translate
      // needed to bring the target point to center has to account for it.
      const targetX = offX + INNER_CENTROID.x * scale
      const targetY = offY + INNER_CENTROID.y * scale
      const finalTx = ZOOM_MAX * (SW / 2 - targetX)
      const finalTy = ZOOM_MAX * (SH / 2 - targetY)
      const zoomScale = 1 + (ZOOM_MAX - 1) * zoomEase
      const tx = finalTx * zoomEase
      const ty = finalTy * zoomEase + HOLD_Y_SHIFT * zoomEase

      const rx = MAX_ROT_X * e
      const rz = MAX_ROT_Z * e
      scene.style.transform = `translate(${tx}px, ${ty}px) scale(${zoomScale}) rotateX(${rx}deg) rotateZ(${rz}deg)`

      const center = (POLYS.length - 1) / 2
      layers.forEach((L, i) => {
        const z = (i - center) * GAP * e
        L.style.transform = `translateZ(${z}px)`
        if (projections[i]) {
          const pz = (i - 1 - center) * GAP * e + 1 * e
          projections[i].style.transform = `translateZ(${pz}px)`
          projections[i].style.opacity = e
        }
      })

      if (traceRef.current) {
        traceRef.current.style.strokeDashoffset = String(1 - lineProgress)
      }
      if (traceWrapRef.current) {
        // zoom in together with the shape (no rotation yet at this point,
        // so the shared translate/scale keeps the line lined up); scaling
        // the whole wrapper also grows the stroke thickness in the same
        // ratio automatically. Stays visible through the hold (still
        // there when the map points appear) and fades out together with
        // the zoom-out, same timing as the points.
        traceWrapRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${zoomScale})`
        const lineOpacity = t <= P_HOLD_END ? 1 : zoomT
        traceWrapRef.current.style.opacity = String(lineOpacity)
      }
      if (mapOverlay) {
        // mapOverlay is a direct child of .scene, so it already inherits
        // .scene's translate/scale/rotate transform for free — no extra
        // transform needed here, same as layers/projections only adding a
        // local translateZ on top of the inherited parent transform.
        // Dots grow in together first (r: 0 -> DOT_R), then labels rise up
        // one after another through their fixed clip "slit"
        // (y: restY + LABEL_RISE -> restY) — and reverse: labels sink back
        // in the same order first, then dots shrink away, in lockstep with
        // the zoom-out.
        const p = Math.max(0, Math.min(1, pointsProgress))
        const dotReveal = easeInOut(Math.max(0, Math.min(1, p / DOT_PHASE)))
        const textPhase = Math.max(0, Math.min(1, (p - DOT_PHASE) / (1 - DOT_PHASE)))
        // the hit rect only turns on once THAT point's own label has
        // actually finished rising into place — not the moment the dots
        // start growing — and (every point) turns off the instant
        // zoom-out starts (t > P_HOLD_END), rather than fading out
        // gradually along with the visual reveal.
        const inHold = t <= P_HOLD_END
        let anyHitActive = false
        mapPointEls.forEach(({ circle, hitRect, text, restY }, i) => {
          circle.setAttribute('r', DOT_R * dotReveal)
          const localT = (textPhase - i * LABEL_STAGGER) / LABEL_DURATION
          const textReveal = easeInOut(Math.max(0, Math.min(1, localT)))
          text.setAttribute('y', restY + LABEL_RISE * (1 - textReveal))
          text.style.opacity = String(textReveal)
          const hitActive = inHold && textReveal >= 0.98
          if (hitActive) anyHitActive = true
          if (hitRect) hitRect.style.pointerEvents = hitActive ? 'auto' : 'none'
        })
        // scrolling away while a tooltip is open won't fire mouseleave (the
        // dot moves out from under the cursor without a real mouse event),
        // so force it closed once no point's hit target is active anymore.
        if (!anyHitActive && tooltipRef.current) tooltipRef.current.style.opacity = '0'
      }
      if (introRef.current) {
        // exits straight up off the top of the screen during zoom-in
        // (independent of the shape's own centering translate) and comes
        // back down into place during zoom-out; opacity fades the same way.
        const introTy = -SH * 0.7 * zoomEase
        introRef.current.style.transform = `translateY(${introTy}px) scale(${zoomScale})`
        introRef.current.style.opacity = String(1 - zoomEase)
      }
    }

    // A fast reverse scroll (jumping back out of the explosion into the
    // zoomed hold) can move `t` — and so the shape's CSS scale — by a
    // large amount in a single tick. The GPU layers behind the shape
    // (will-change + preserve-3d, needed for the isometric explosion)
    // then have to re-rasterize at a very different resolution all at
    // once, and visibly show a stale/blocky bitmap until they catch up —
    // that's the "pixel pixel" artifact. Smoothing the rendered value
    // toward the real scroll position every frame, instead of snapping to
    // it directly, keeps the change-per-frame small regardless of how
    // fast the user actually scrolls, which the compositor can always
    // keep rasterized crisply.
    let targetT = 0
    let currentT = 0
    const SMOOTH = 0.18

    let tickRaf = null
    function tick() {
      currentT += (targetT - currentT) * SMOOTH
      if (Math.abs(targetT - currentT) < 0.0002) currentT = targetT
      frame(currentT)
      // keep animating while catching up to the target; stop once settled
      // instead of looping forever while the page is idle.
      tickRaf = currentT === targetT ? null : requestAnimationFrame(tick)
    }
    function ensureTicking() {
      if (tickRaf == null) tickRaf = requestAnimationFrame(tick)
    }

    function onScroll() {
      const scrollable = track.offsetHeight - window.innerHeight
      const rect = track.getBoundingClientRect()
      targetT = Math.min(1, Math.max(0, -rect.top / scrollable))
      ensureTicking()
    }

    let scrollRaf = null
    const handleScroll = () => {
      if (scrollRaf) return
      scrollRaf = requestAnimationFrame(() => {
        onScroll()
        scrollRaf = null
      })
    }
    const handleResize = () => {
      layout()
      onScroll()
      currentT = targetT
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    layout()
    onScroll()
    currentT = targetT
    frame(currentT)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (scrollRaf) cancelAnimationFrame(scrollRaf)
      if (tickRaf) cancelAnimationFrame(tickRaf)
    }
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.track} ref={trackRef}>
        <div className={styles.sticky}>
          <div className={styles.introText}>
            <div ref={introRef}>
              <h2 className={styles.heading}>Area Guides</h2>
              <p className={styles.subheading}>
                Your ultimate guide to the capital. Discover London’s top attractions, elite
                student life, and the unique experience of everyday living in this global hub.
              </p>
            </div>
          </div>
          <div className={styles.stage} ref={stageRef}>
            <div className={styles.scene} ref={sceneRef} />
          </div>
          <TraceLine innerRef={traceRef} wrapRef={traceWrapRef} />
          <div className={styles.ctaWrap}>
            <Button label="DISCOVER LONDON" onClick={() => navigate('/discover-london')} />
          </div>
          <div className={styles.tooltip} ref={tooltipRef} />
        </div>
      </div>
    </section>
  )
}
