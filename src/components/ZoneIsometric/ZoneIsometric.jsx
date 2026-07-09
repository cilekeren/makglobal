import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
            strokeWidth="2"
            pathLength="1"
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
const GAP = 82
const MAX_ROT_X = 60
const MAX_ROT_Z = -42
const RAD = Math.PI / 180

// scroll (0..1) is split into four phases: trace-line draw, zoom in on
// the innermost layer, zoom back out, then the isometric explosion.
const P1_END = 0.12
const P2_END = 0.34
const P3_END = 0.5
const ZOOM_MAX = 4.4

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

function makeSVG() {
  const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  s.setAttribute('viewBox', `0 0 ${VB.w} ${VB.h}`)
  s.style.overflow = 'visible'
  return s
}

export default function ZoneIsometric() {
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const sceneRef = useRef(null)
  const traceRef = useRef(null)
  const traceWrapRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    const stage = stageRef.current
    const scene = sceneRef.current

    let SW, SH, scale, offX, offY
    const layers = []
    const projections = []

    function build() {
      scene.innerHTML = ''
      layers.length = 0
      projections.length = 0

      POLYS.forEach((pts, i) => {
        if (i > 0) {
          const projSvg = makeSVG()
          projSvg.setAttribute('width', VB.w * scale)
          projSvg.setAttribute('height', VB.h * scale)
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
          pw.style.cssText = `position:absolute;left:${offX}px;top:${offY}px;transform-style:preserve-3d;will-change:transform;`
          pw.appendChild(projSvg)
          scene.appendChild(pw)
          projections.push(pw)
        } else {
          projections.push(null)
        }

        const svg = makeSVG()
        svg.setAttribute('width', VB.w * scale)
        svg.setAttribute('height', VB.h * scale)
        if (i < POLYS.length - 1) {
          const id = `msk${i}`
          const defs = svgEl('defs', {})
          const mask = svgEl('mask', { id })
          mask.appendChild(svgEl('rect', { x: 0, y: 0, width: VB.w, height: VB.h, fill: 'white' }))
          mask.appendChild(svgEl('polygon', { points: POLYS[i + 1], fill: 'black' }))
          defs.appendChild(mask)
          svg.appendChild(defs)
          svg.appendChild(svgEl('polygon', { points: pts, fill: RAMPS[i].f, mask: `url(#${id})` }))
        } else {
          svg.appendChild(svgEl('polygon', { points: pts, fill: RAMPS[i].f }))
        }
        const w = document.createElement('div')
        w.style.cssText = `position:absolute;left:${offX}px;top:${offY}px;transform-style:preserve-3d;will-change:transform;`
        w.appendChild(svg)
        scene.appendChild(w)
        layers.push(w)
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

      // phase 2/3: zoom in toward the innermost layer, then back out
      let zoomT = 0
      if (t <= P1_END) {
        zoomT = 0
      } else if (t <= P2_END) {
        zoomT = (t - P1_END) / (P2_END - P1_END)
      } else if (t <= P3_END) {
        zoomT = 1 - (t - P2_END) / (P3_END - P2_END)
      }
      const zoomEase = easeInOut(Math.max(0, Math.min(1, zoomT)))

      // phase 4: the isometric explosion
      const explosionT = Math.max(0, Math.min(1, (t - P3_END) / (1 - P3_END)))
      const e = easeInOut(explosionT)

      // .scene's transform-origin defaults to its own center (SW/2, SH/2),
      // so scale() pivots around that point, not (0,0) — the translate
      // needed to bring the target point to center has to account for it.
      const targetX = offX + INNER_CENTROID.x * scale
      const targetY = offY + INNER_CENTROID.y * scale
      const finalTx = ZOOM_MAX * (SW / 2 - targetX)
      const finalTy = ZOOM_MAX * (SH / 2 - targetY)
      const zoomScale = 1 + (ZOOM_MAX - 1) * zoomEase
      const tx = finalTx * zoomEase
      const ty = finalTy * zoomEase

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
        // ratio automatically. Fades out over the zoom-out phase so it's
        // gone before the explosion/rotation phase begins.
        traceWrapRef.current.style.transform = `translate(${tx}px, ${ty}px) scale(${zoomScale})`
        const lineOpacity =
          t <= P2_END ? 1 : t >= P3_END ? 0 : 1 - (t - P2_END) / (P3_END - P2_END)
        traceWrapRef.current.style.opacity = String(lineOpacity)
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

    function onScroll() {
      const scrollable = track.offsetHeight - window.innerHeight
      const rect = track.getBoundingClientRect()
      const t = Math.min(1, Math.max(0, -rect.top / scrollable))
      frame(t)
    }

    let raf = null
    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        onScroll()
        raf = null
      })
    }
    const handleResize = () => {
      layout()
      onScroll()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    layout()
    onScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (raf) cancelAnimationFrame(raf)
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
            <Button label="DISCOVER LONDON" />
          </div>
        </div>
      </div>
    </section>
  )
}
