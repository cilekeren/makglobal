import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ZoneIsometric.module.css'
import buckinghamPalaceIcon from '../../assets/zones/buckingham-palace.svg'
import londonEyeIcon from '../../assets/zones/london-eye.svg'
import bigBenIcon from '../../assets/zones/big-ben.svg'
import coventGardenIcon from '../../assets/zones/covent-garden.svg'
import canaryWharfIcon from '../../assets/zones/canary-wharf.svg'
import shoreditchIcon from '../../assets/zones/shoreditch.svg'
import towerBridgeIcon from '../../assets/zones/tower-bridge.svg'
import stKatharineDocksIcon from '../../assets/zones/st-katharine-docks.svg'
import wembleyStadiumIcon from '../../assets/zones/wembley-stadium.svg'
import richmondParkIcon from '../../assets/zones/richmond-park.svg'
import wimbledonIcon from '../../assets/zones/wimbledon.svg'
import greenwichIcon from '../../assets/zones/greenwich.svg'
import heathrowIcon from '../../assets/zones/heathrow.svg'
import kewGardensIcon from '../../assets/zones/kew-gardens.svg'
import westfieldStratfordIcon from '../../assets/zones/westfield-stratford.svg'
import kingstonIcon from '../../assets/zones/kingston.svg'
import eppingForestIcon from '../../assets/zones/epping-forest.svg'
import twickenhamStadiumIcon from '../../assets/zones/twickenham-stadium.svg'
import heathrowTerminal5Icon from '../../assets/zones/heathrow-terminal-5.svg'
import londonCityAirportIcon from '../../assets/zones/london-city-airport.svg'
import countrysideIcon from '../../assets/zones/countryside.svg'

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

function ZoneLabel({ zone, labelRef }) {
  return (
    <div className={styles.zoneLabel} ref={labelRef} style={{ '--zone-color': RAMPS[zone.i].f }}>
      <h3 className={styles.zoneLabelTitle}>
        <span className={styles.zoneLabelDot} />
        {zone.title}
      </h3>
      <ul className={styles.zoneLabelList}>
        {zone.items.map((item) => (
          <li key={item.label}>
            <img src={item.icon} alt="" className={styles.zoneLabelIcon} />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

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

  // fixed baseline (always the original 0.5 fit-fraction, NOT
  // SHAPE_SCALE_FACTOR) so that scale/refScale below reflects how much
  // bigger the actual shape now is than that baseline — which is exactly
  // the extra zoom the trace line's geometry needs to keep matching it.
  const refScale = (STAGE_MAX_W * 0.5) / VB.w
  const SW = Math.min(size.w, STAGE_MAX_W)
  const SH = size.h
  const shapeScaleFactor =
    size.w > 0 && window.matchMedia(MOBILE_QUERY).matches ? MOBILE_SHAPE_SCALE_FACTOR : SHAPE_SCALE_FACTOR
  const scale = Math.min((SW * shapeScaleFactor) / VB.w, (SH * shapeScaleFactor) / VB.h)
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

// POLYS[5]/RAMPS[5] (gold) is the innermost ring — real-world Zone 1 —
// through POLYS[0]/RAMPS[0] (dark teal) as the outermost ring, Zone 6.
// `anchor` is a point inside that ring's own solid-fill area (in VB
// units, near its leftmost/rightmost vertex on the side matching `side`,
// nudged toward the ring's centroid so the dot sits inside the fill
// instead of straddling its boundary), used as an invisible measurement
// probe — see the "probe" comment in build() below.
const ZONES = [
  {
    i: 5,
    number: 1,
    title: 'Zone 1',
    side: 'left',
    anchor: { x: 100.4654, y: 82.0958 },
    items: [
      { icon: buckinghamPalaceIcon, label: 'Buckingham Palace' },
      { icon: londonEyeIcon, label: 'London Eye' },
      { icon: bigBenIcon, label: 'Big Ben / Houses of Parliament' },
      { icon: coventGardenIcon, label: 'Covent Garden' },
    ],
  },
  {
    i: 4,
    number: 2,
    title: 'Zone 2',
    side: 'right',
    anchor: { x: 210, y: 130 },
    items: [
      { icon: canaryWharfIcon, label: 'Canary Wharf' },
      { icon: shoreditchIcon, label: 'Shoreditch' },
      { icon: towerBridgeIcon, label: 'Tower Bridge' },
      { icon: stKatharineDocksIcon, label: 'St Katharine Docks' },
    ],
  },
  {
    i: 3,
    number: 3,
    title: 'Zone 3',
    side: 'left',
    // biased toward the upper-left of the ring rather than pure
    // leftmost-x, per an earlier explicit request.
    anchor: { x: 75.8705, y: 52.5554 },
    items: [
      { icon: wembleyStadiumIcon, label: 'Wembley Stadium' },
      { icon: richmondParkIcon, label: 'Richmond Park' },
      { icon: wimbledonIcon, label: 'Wimbledon' },
      { icon: greenwichIcon, label: 'Greenwich' },
    ],
  },
  {
    i: 2,
    number: 4,
    title: 'Zone 4',
    side: 'right',
    anchor: { x: 210, y: 190 },
    items: [
      { icon: heathrowIcon, label: 'London Heathrow' },
      { icon: kewGardensIcon, label: 'Kew Gardens' },
      { icon: westfieldStratfordIcon, label: 'Westfield Stratford' },
    ],
  },
  {
    i: 1,
    number: 5,
    title: 'Zone 5',
    side: 'left',
    anchor: { x: 23.3325, y: 39.7264 },
    items: [
      { icon: kingstonIcon, label: 'Kingston upon Thames' },
      { icon: eppingForestIcon, label: 'Epping Forest' },
      { icon: twickenhamStadiumIcon, label: 'Twickenham Stadium' },
    ],
  },
  {
    i: 0,
    number: 6,
    title: 'Zone 6',
    side: 'right',
    anchor: { x: 277, y: 190 },
    items: [
      { icon: heathrowTerminal5Icon, label: 'Heathrow Terminal 5' },
      { icon: londonCityAirportIcon, label: 'London City Airport' },
      { icon: countrysideIcon, label: 'Countryside / Green Belt' },
    ],
  },
]
// connector dot radius, in raw screen px — both dots live in the flat,
// unscaled connector overlay (not the 3D-rotated scene), so they always
// land exactly where the line's endpoints are computed, no matter how
// the shape's rotation shuffles which vertex is visually left/rightmost.
const DOT_R = 3.5

const VB = { w: 310.3488, h: 245.8101 }
// shared by the shape's own layout() and TraceLine's geometry below, so
// the decorative trace line keeps tracing the shape's edges at any size.
const SHAPE_SCALE_FACTOR = 0.58
// on mobile the stage box's own left/right insets already leave the "a
// little smaller than the screen" margin (see .stage in the mobile media
// query), so the shape itself can fill nearly all of that box instead of
// leaving another ~40% of it empty the way the desktop factor does.
const MOBILE_SHAPE_SCALE_FACTOR = 0.92
const GAP = 55
// the shape's own box is much shorter on mobile (fitted between the intro
// text and the bottom cards, see MOBILE_STAGE_GAP below), so the desktop
// layer spacing spreads the exploded stack well past that box — a smaller
// gap keeps the explosion legible without spilling out of it.
const MOBILE_GAP = 22
const MAX_ROT_X = 60
const MAX_ROT_Z = -42
const RAD = Math.PI / 180
// the fixed sticky navbar overlaps the top of the viewport, so centering
// purely on the full 100vh stage box reads as sitting a bit high relative
// to the actually-visible area beneath it — nudge the resting shape down
// to compensate. As the layers separate, ease that nudge back up a bit so
// the fully-exploded state doesn't end up sitting too low.
const STAGE_Y_REST = 100
const STAGE_Y_EXPLODED = 40
// approximate bottom edge (viewport px) of the fixed sticky navbar (.stickyNavBar
// in Hero.module.css: top:20px + its own padding/content height) — used to
// vertically center the intro text group between the navbar and the shape.
const NAVBAR_BOTTOM = 90

// below this width the zone cards move from side columns flanking the
// shape into a bottom-pinned 2-column grid (see the JSX/CSS), so the
// shape's own box has to be measured to fit the strip left between the
// intro text and those cards instead of centering across the full
// sticky viewport.
const MOBILE_QUERY = '(max-width: 700px)'
const MOBILE_STAGE_GAP = 12

// scroll (0..1) is split into three phases: the trace line draws in
// left-to-right, then erases left-to-right the same way, then the
// isometric explosion starts immediately once the line is gone.
const P1_END = 0.12
const P2_END = 0.24

// the six zone labels reveal one after another (Zone 1 first) over the
// back part of the explosion, each stealing ZONE_REVEAL_DURATION of that
// shared window, staggered so they land in sequence rather than at once.
const ZONE_REVEAL_START = 0.35
const ZONE_REVEAL_DURATION = 0.5
const ZONE_STAGGER = (1 - ZONE_REVEAL_DURATION) / (ZONES.length - 1)

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

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
// as a bitmap captured at its CURRENT on-screen size. Rendering each SVG
// SUPERSAMPLE× bigger than its intended box, then scaling it back down
// with CSS, keeps that bitmap sharp through the rotation/explosion.
const SUPERSAMPLE = 5
// mobile Safari's per-tab GPU/compositing memory budget is far tighter
// than desktop — up to ~17 of these composited+supersampled elements at
// SUPERSAMPLE=5, especially once the shape itself got much bigger (see
// MOBILE_SHAPE_SCALE_FACTOR), was enough raster memory to crash the tab
// outright. A much smaller factor keeps the layers reasonably crisp
// without anywhere near that footprint.
const MOBILE_SUPERSAMPLE = 2

// sizes `svg` to occupy exactly w×h on screen while its raster is
// `supersample`× that — and wraps it in a div genuinely sized w×h (CSS
// transforms don't affect layout) so the caller's positioning math and
// the parent's shrink-to-fit box are unaffected by the supersampling.
function sizedSvg(svg, w, h, supersample) {
  svg.setAttribute('width', w * supersample)
  svg.setAttribute('height', h * supersample)
  svg.style.transform = `scale(${1 / supersample})`
  svg.style.transformOrigin = '0 0'
  const box = document.createElement('div')
  box.style.cssText = `width:${w}px;height:${h}px;`
  box.appendChild(svg)
  return box
}

export default function ZoneIsometric() {
  const { t } = useTranslation()
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const sceneRef = useRef(null)
  const traceRef = useRef(null)
  const traceWrapRef = useRef(null)
  const introRef = useRef(null)
  const legendRef = useRef(null)
  const zoneLabelRefs = useRef([])
  const connectorWrapRef = useRef(null)
  const connectorPathRefs = useRef([])
  const connectorStartDotRefs = useRef([])
  const connectorEndDotRefs = useRef([])

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const scene = sceneRef.current

    let SW, SH, scale, offX, offY
    let isMobileNow = false
    const layers = []
    const projections = []
    const zoneProbes = []
    // preserve-3d + will-change promote each layer to its own GPU-composited
    // bitmap — required for the isometric explosion's translateZ depth
    // stacking, but during the trace-line phase every layer's translateZ is
    // 0 and .scene isn't rotated, so there's no 3D happening at all yet.
    // Toggling 3D mode on only once the explosion actually needs it avoids
    // promoting layers to their own composited bitmap before that, so
    // everything just repaints as part of .scene's own layer until then.
    let is3D = false

    function build() {
      scene.innerHTML = ''
      layers.length = 0
      projections.length = 0
      zoneProbes.length = 0
      // fresh elements always start flat (no inline transform-style/
      // will-change) — force frame()'s toggle to re-apply the current 3D
      // state to them on its next run instead of assuming nothing changed.
      is3D = false
      const supersample = isMobileNow ? MOBILE_SUPERSAMPLE : SUPERSAMPLE

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
          pw.appendChild(sizedSvg(projSvg, VB.w * scale, VB.h * scale, supersample))
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
        w.appendChild(sizedSvg(svg, VB.w * scale, VB.h * scale, supersample))
        scene.appendChild(w)
        layers.push(w)
      })

      // one invisible probe per zone: a circle at a real point inside that
      // ring's own polygon, in the same VB coordinate space — as a child
      // of .scene it automatically inherits the shared rotate/translateZ,
      // so its live getBoundingClientRect() each frame gives the exact
      // on-screen spot where that ring currently sits. The visible dot
      // itself is drawn flat in the connector overlay at that measured
      // point — never actually rotated.
      // skipped entirely on mobile: the connector overlay they exist to
      // feed is hidden there (see .connectorWrap), so they'd just be extra
      // composited, supersampled elements for zero visual payoff.
      if (!isMobileNow) {
        ZONES.forEach((zone) => {
          const probeSvg = makeSVG()
          // r must be > 0 (was 0) — Safari has a bug where getBoundingClientRect()
          // on a zero-area SVG shape nested inside a `transform-style: preserve-3d`
          // ancestor doesn't get projected through the 3D transform correctly and
          // collapses to a wrong point (Chrome projects it fine either way), which
          // is what was sending the zone connector lines to the wrong spot only in
          // Safari. A hairline radius gives it real (if visually imperceptible)
          // geometry so that code path behaves like any other shape; opacity:0
          // keeps it invisible in every browser regardless (doesn't affect the
          // geometric bounds getBoundingClientRect() measures).
          const circle = svgEl('circle', {
            cx: zone.anchor.x,
            cy: zone.anchor.y,
            r: 0.05,
            opacity: 0,
          })
          probeSvg.appendChild(circle)
          const pw = document.createElement('div')
          pw.style.cssText = `position:absolute;left:${offX}px;top:${offY}px;`
          pw.appendChild(sizedSvg(probeSvg, VB.w * scale, VB.h * scale, supersample))
          scene.appendChild(pw)
          zoneProbes.push({ zone, wrapEl: pw, circleEl: circle })
        })
      }
    }

    // mobile: the intro text (heading + subheading, treated as one group)
    // sits pinned 10px below the real sticky navbar for the whole time this
    // section is stuck — measured live off the fixed navbar's own rect
    // rather than a guessed constant, since its height varies with
    // content/breakpoint. .sticky itself sits at top:0 while pinned, so a
    // viewport-relative bottom is also the right offset from .sticky's own
    // top edge. The sticky navbar only fades/slides into view once its
    // hero-page counterpart scrolls out (see stickyVisible in Hero.jsx),
    // so this needs to keep re-measuring on scroll too, not just at
    // mount/resize — otherwise it stays frozen at whatever the navbar's
    // (still hidden, translated off-screen) rect was on first layout.
    function updateMobileIntroTop() {
      if (!introRef.current) return
      const navEl = document.querySelector('[data-sticky-nav]')
      const navBottom = navEl ? navEl.getBoundingClientRect().bottom : 0
      introRef.current.style.top = `${Math.max(0, navBottom) + 10}px`
    }

    // sizes/positions the stage box to the room left below the intro text,
    // filling down toward the bottom of the sticky viewport — the zone
    // cards float on top of it (see .zoneLabelsCol z-index) instead of
    // needing their own reserved strip, so the shape doesn't have to stop
    // short of them. Kept separate from build() (cheap rect reads + style
    // writes only) so it can also re-run on every scroll tick — the intro
    // text's own top keeps moving as the sticky navbar slides in (see
    // updateMobileIntroTop), and without re-deriving this from it too, the
    // stage/legend/trace line stay put at their stale position and end up
    // overlapped by the now-lower intro text instead of sitting below it.
    function positionMobileStage() {
      stage.style.top = ''
      stage.style.height = ''
      const stickyRect = stage.parentElement.getBoundingClientRect()
      const introRect = introRef.current ? introRef.current.getBoundingClientRect() : null
      const introBottom = introRect ? introRect.bottom - stickyRect.top : 0

      // capped rather than stretched all the way to the sticky's bottom
      // edge — the shape is centered within this box, so a box that
      // reaches past where the cards float pulls that center down into
      // the cards themselves, leaving barely any of the shape showing
      // above them.
      const top = introBottom + MOBILE_STAGE_GAP
      const maxHeight = stickyRect.height - MOBILE_STAGE_GAP - top
      const height = Math.max(160, Math.min(420, maxHeight))
      stage.style.top = `${top}px`
      stage.style.height = `${height}px`

      // the trace line's own wrap is a sibling of .stage (not nested
      // inside it), so it doesn't automatically follow the box just
      // computed above — without this it stays sized to the full sticky
      // viewport and draws centered on that instead of on the shape.
      if (traceWrapRef.current) {
        traceWrapRef.current.style.top = `${top}px`
        traceWrapRef.current.style.height = `${height}px`
      }
    }

    function reflowMobileIntro() {
      updateMobileIntroTop()
      positionMobileStage()
    }

    function layout() {
      isMobileNow = window.matchMedia(MOBILE_QUERY).matches

      if (isMobileNow) {
        reflowMobileIntro()
      } else {
        stage.style.top = ''
        stage.style.height = ''
        if (traceWrapRef.current) {
          traceWrapRef.current.style.top = ''
          traceWrapRef.current.style.height = ''
        }
      }

      SW = stage.clientWidth
      SH = stage.clientHeight
      const shapeScaleFactor = isMobileNow ? MOBILE_SHAPE_SCALE_FACTOR : SHAPE_SCALE_FACTOR
      scale = Math.min((SW * shapeScaleFactor) / VB.w, (SH * shapeScaleFactor) / VB.h)
      offX = SW / 2 - (VB.w * scale) / 2
      offY = SH / 2 - (VB.h * scale) / 2
      build()

      // center the intro text group between the navbar and the shape's
      // resting top edge (stage fills the sticky viewport exactly, so
      // offY + STAGE_Y_REST is already the shape's top edge in viewport px).
      // mobile skips this — its top comes from CSS, cleared above.
      if (introRef.current && !isMobileNow) {
        const shapeTop = offY + STAGE_Y_REST
        const midY = (NAVBAR_BOTTOM + shapeTop) / 2
        introRef.current.style.top = `${midY - introRef.current.offsetHeight / 2}px`
      }
    }

    function frame(t) {
      // phase 1: trace line draws in left-to-right, shape stays at rest
      const drawProgress = Math.max(0, Math.min(1, t / P1_END))
      // phase 2: trace line erases left-to-right the same way
      const eraseProgress = Math.max(0, Math.min(1, (t - P1_END) / (P2_END - P1_END)))

      // phase 3: the isometric explosion starts immediately once the
      // trace line is fully gone
      const explosionT = Math.max(0, Math.min(1, (t - P2_END) / (1 - P2_END)))
      const e = easeInOut(explosionT)

      // flip every layer into (or out of) GPU-composited 3D mode only
      // right as the explosion needs it — see the `is3D` declaration above
      // for why this is what keeps the view crisp.
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
        zoneProbes.forEach(({ wrapEl }) => {
          wrapEl.style.transformStyle = mode
          wrapEl.style.willChange = wc
        })
      }

      const rx = MAX_ROT_X * e
      const rz = MAX_ROT_Z * e
      scene.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg)`
      // on mobile the stage's box is already fitted exactly between the
      // intro text and the bottom cards (see layout()), so this extra
      // desktop-only nudge — tuned to compensate for the fixed navbar over
      // a full-height stage — would just push the shape out of that box.
      const stageYRest = isMobileNow ? 0 : STAGE_Y_REST
      const stageYExploded = isMobileNow ? 0 : STAGE_Y_EXPLODED
      stage.style.transform = `translateY(${stageYRest + (stageYExploded - stageYRest) * e}px)`

      const gap = isMobileNow ? MOBILE_GAP : GAP
      const center = (POLYS.length - 1) / 2
      layers.forEach((L, i) => {
        const z = (i - center) * gap * e
        L.style.transform = `translateZ(${z}px)`
        if (projections[i]) {
          const pz = (i - 1 - center) * gap * e + 1 * e
          projections[i].style.transform = `translateZ(${pz}px)`
          projections[i].style.opacity = e
        }
      })

      // each zone's label reveals in sequence (Zone 1 first) once the
      // explosion is far enough along — this runs regardless of platform,
      // unlike the connector line/dots below, which only exist on desktop
      // (see build() — the probes they depend on are skipped on mobile
      // since .connectorWrap is hidden there).
      const zoneWindow = Math.max(
        0,
        Math.min(1, (explosionT - ZONE_REVEAL_START) / (1 - ZONE_REVEAL_START)),
      )

      // the mobile-only colour legend (see .zoneLegend) explains the ring
      // colours before the cards carrying the same colour dots arrive —
      // once they start revealing, it fades out fast (over the first
      // quarter of that window) rather than lingering through the whole
      // staggered reveal. Harmless to compute on desktop too since the
      // legend is display:none there regardless of this opacity.
      if (legendRef.current) {
        const legendFade = 1 - easeInOut(Math.min(1, zoneWindow / 0.25))
        legendRef.current.style.opacity = String(Math.max(0, legendFade))
      }

      ZONES.forEach((zone) => {
        const idx = zone.number - 1
        const localT = (zoneWindow - idx * ZONE_STAGGER) / ZONE_REVEAL_DURATION
        const reveal = easeInOut(Math.max(0, Math.min(1, localT)))
        const label = zoneLabelRefs.current[idx]
        if (label) {
          label.style.opacity = String(reveal)
          label.style.transform = `translateY(${(1 - reveal) * 12}px)`
        }
      })

      // the visible dots and line live in the flat connector overlay (not
      // the 3D scene) and both derive from the SAME measured probe point
      // below, so the line always touches both dots with no gap.
      const connectorWrap = connectorWrapRef.current
      const wrapRect = connectorWrap ? connectorWrap.getBoundingClientRect() : null
      zoneProbes.forEach(({ zone, wrapEl, circleEl }) => {
        const idx = zone.number - 1
        const z = (zone.i - center) * gap * e
        wrapEl.style.transform = `translateZ(${z}px)`

        const localT = (zoneWindow - idx * ZONE_STAGGER) / ZONE_REVEAL_DURATION
        const reveal = easeInOut(Math.max(0, Math.min(1, localT)))
        const label = zoneLabelRefs.current[idx]

        const path = connectorPathRefs.current[idx]
        const startDot = connectorStartDotRefs.current[idx]
        const endDot = connectorEndDotRefs.current[idx]
        if (wrapRect) {
          // the probe's live on-screen position — always a real point on
          // this zone's own ring, tracked through whatever the current
          // rotation does to it.
          const probeRect = circleEl.getBoundingClientRect()
          const startX = probeRect.left + probeRect.width / 2 - wrapRect.left
          const startY = probeRect.top + probeRect.height / 2 - wrapRect.top
          let endX = startX
          let endY = startY
          if (label) {
            const labelRect = label.getBoundingClientRect()
            endX = (zone.side === 'left' ? labelRect.right : labelRect.left) - wrapRect.left
            endY = labelRect.top + labelRect.height / 2 - wrapRect.top
          }
          if (path) {
            // elbow connector with two turns: horizontal from the dot to
            // the midpoint, vertical down/up to the label's y, then
            // horizontal into the label — never a diagonal — while both
            // endpoints stay exactly where the dot/label actually are.
            const midX = (startX + endX) / 2
            path.setAttribute(
              'd',
              `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`,
            )
            path.style.strokeDashoffset = String(1 - reveal)
            path.style.opacity = String(reveal)
          }
          if (startDot) {
            startDot.setAttribute('cx', String(startX))
            startDot.setAttribute('cy', String(startY))
            startDot.setAttribute('r', String(DOT_R * reveal))
          }
          if (endDot) {
            endDot.setAttribute('cx', String(endX))
            endDot.setAttribute('cy', String(endY))
            endDot.setAttribute('r', String(DOT_R * reveal))
          }
        }
      })

      if (traceRef.current) {
        if (isMobileNow) {
          // the desktop erase-sweep (below) slides the same dash back off
          // the path a second time, which on a short mobile scroll distance
          // reads as the line drawing in twice in a row — mobile instead
          // holds the fully-drawn line and just fades it out over the same
          // window (see traceWrapRef opacity below).
          traceRef.current.style.strokeDashoffset = String(1 - drawProgress)
        } else {
          // pathLength="1" + stroke-dasharray:1 (dash 1, gap 1) means the
          // dash exactly covers the path when dashoffset is 0. Pushing the
          // offset from 1 -> 0 reveals the path start-to-end (the draw-in);
          // continuing 0 -> -1 slides that same dash off the end, erasing it
          // start-to-end too — both sweeps read as left-to-right since the
          // path itself runs left to right (see TRACE_POINTS_PX/M start).
          traceRef.current.style.strokeDashoffset = String(1 - drawProgress - eraseProgress)
        }
      }
      if (traceWrapRef.current) {
        if (isMobileNow) {
          traceWrapRef.current.style.opacity = String(1 - eraseProgress)
        } else {
          // nothing left to paint once the erase sweep finishes (and the
          // explosion hasn't started yet at that point), so just hide it —
          // avoids the compositor tracking an invisible layer for no reason.
          traceWrapRef.current.style.opacity = eraseProgress >= 1 ? '0' : '1'
        }
      }
    }

    // A fast reverse scroll (jumping back out of the explosion into the
    // flat trace-line phase) can move `t` — and so the shape's rotation —
    // by a large amount in a single tick. Smoothing the rendered value
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
      if (isMobileNow) reflowMobileIntro()
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

    // on mobile, layout() measures the intro text's real rendered height to
    // size/position the stage box against it (see MOBILE_STAGE_GAP above) —
    // if the custom fonts (Petrona/Lexend Deca) haven't loaded yet at mount,
    // that measurement is taken against fallback-font metrics, then the
    // swap to the real font reflows the text taller without anything
    // re-running layout() for it, leaving the stage's box stuck starting
    // above where the text actually ends.
    let cancelled = false
    document.fonts.ready.then(() => {
      if (cancelled) return
      layout()
      onScroll()
      currentT = targetT
    })

    return () => {
      cancelled = true
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
          <div className={styles.introText} ref={introRef}>
            <h2 className={styles.heading}>{t('zoneIsometric.heading')}</h2>
            <p className={styles.subheading}>{t('zoneIsometric.subheading')}</p>
          </div>
          <div className={styles.stage} ref={stageRef}>
            <div className={styles.scene} ref={sceneRef} />
            <div className={styles.zoneLegend} ref={legendRef}>
              {ZONES.map((zone) => (
                <span key={zone.number} className={styles.zoneLegendItem}>
                  <span
                    className={styles.zoneLegendDot}
                    style={{ background: RAMPS[zone.i].f }}
                  />
                  {zone.title}
                </span>
              ))}
            </div>
          </div>
          <TraceLine innerRef={traceRef} wrapRef={traceWrapRef} />

          <div className={`${styles.zoneLabelsCol} ${styles.zoneLabelsLeft}`}>
            {ZONES.filter((zone) => zone.side === 'left').map((zone) => (
              <ZoneLabel
                key={zone.number}
                zone={zone}
                labelRef={(el) => (zoneLabelRefs.current[zone.number - 1] = el)}
              />
            ))}
          </div>
          <div className={`${styles.zoneLabelsCol} ${styles.zoneLabelsRight}`}>
            {ZONES.filter((zone) => zone.side === 'right').map((zone) => (
              <ZoneLabel
                key={zone.number}
                zone={zone}
                labelRef={(el) => (zoneLabelRefs.current[zone.number - 1] = el)}
              />
            ))}
          </div>

          <div className={styles.connectorWrap} ref={connectorWrapRef}>
            <svg className={styles.connectorSvg}>
              {ZONES.map((zone) => (
                <path
                  key={zone.number}
                  ref={(el) => (connectorPathRefs.current[zone.number - 1] = el)}
                  className={styles.connectorPath}
                  pathLength="1"
                />
              ))}
              {ZONES.map((zone) => (
                <circle
                  key={zone.number}
                  ref={(el) => (connectorStartDotRefs.current[zone.number - 1] = el)}
                  className={styles.connectorDot}
                  r="0"
                />
              ))}
              {ZONES.map((zone) => (
                <circle
                  key={zone.number}
                  ref={(el) => (connectorEndDotRefs.current[zone.number - 1] = el)}
                  className={styles.connectorDot}
                  r="0"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
