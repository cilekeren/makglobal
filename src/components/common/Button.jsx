import { useLayoutEffect, useRef, useState } from 'react'
import styles from './Button.module.css'

function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') ref(node)
      else ref.current = node
    })
  }
}

// Height, stroke width, corner radius and arrow geometry are taken
// verbatim from the original hand-built reference button
// (animated-button-1.html). Only the label is swappable: its measured
// width drives how wide the pill needs to be, and the label + arrow
// block is centered in the pill (arrow hidden until hover).
const HEIGHT = 22.1113
const STROKE_W = 0.25
const RX = (HEIGHT - STROKE_W) / 2
const CENTER_Y = HEIGHT / 2
const ARROW_TOTAL_W = 109.7586 - 67.3749
const CHEVRON_W_RATIO = 9.5445 / ARROW_TOTAL_W
const CHEVRON_TOP_RATIO = 3.5644 / ARROW_TOTAL_W
const CHEVRON_BOTTOM_RATIO = 3.8812 / ARROW_TOTAL_W
const GAP_AFTER_LABEL = 6
const PADDING = 14
const SCALE = 3 // matches the hero button's established on-screen size

export default function Button({
  label,
  color,
  textColor,
  variant = 'outline',
  scale = SCALE,
  strokeScale = scale,
  padding = PADDING,
  arrowLength = ARROW_TOTAL_W,
  innerRef,
  onClick,
  type = 'button',
  hovered = false,
  // mirrors the whole interaction: arrow sits before the label and points
  // left, hidden off to the left at rest, label shifts right on hover
  // instead of left — for "back" style buttons.
  reverse = false,
  // stretches the pill to fill its parent's width (e.g. to match a form
  // above it) instead of shrink-wrapping the label — everything below
  // still centers/anchors correctly since the label/arrow positions are
  // all derived from pillWidth, not hardcoded to the tight-fit case.
  fullWidth = false,
}) {
  const textRef = useRef(null)
  const btnElRef = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)

  useLayoutEffect(() => {
    if (textRef.current) {
      setLabelWidth(textRef.current.getBBox().width)
    }
  }, [label])

  useLayoutEffect(() => {
    if (!fullWidth) return
    const parent = btnElRef.current?.parentElement
    if (!parent) return
    const ro = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width)
    })
    ro.observe(parent)
    return () => ro.disconnect()
  }, [fullWidth])

  const ready = labelWidth > 0
  const hoverBlockWidth = labelWidth + GAP_AFTER_LABEL + arrowLength
  const naturalPillWidth = hoverBlockWidth + padding * 2
  const pillWidth =
    fullWidth && containerWidth > 0
      ? Math.max(naturalPillWidth, containerWidth / scale)
      : naturalPillWidth

  // anchored to the pill's edges (padding in from left/right) rather than
  // relative to each other — mathematically identical to the old
  // label-relative formulas when the pill is tightly fit to its content,
  // but (unlike those) still lands correctly when pillWidth is stretched
  // wider by `fullWidth`.
  const hoverLabelX = reverse ? pillWidth - padding - labelWidth : padding
  const arrowX = reverse ? padding : pillWidth - padding - arrowLength
  const restLabelX = (pillWidth - labelWidth) / 2
  const labelHoverShift = hoverLabelX - restLabelX
  const arrowRestShift = reverse ? -12 : 12
  const chevronW = arrowLength * CHEVRON_W_RATIO
  const chevronTop = arrowLength * CHEVRON_TOP_RATIO
  const chevronBottom = arrowLength * CHEVRON_BOTTOM_RATIO
  const strokeW = (STROKE_W * strokeScale) / scale

  const filled = variant === 'filled'
  const fillColor = color || '#fff'
  const contentColor = filled ? textColor || '#fff' : fillColor

  return (
    <button
      type={type}
      className={`${styles.btn} ${hovered ? styles.hovered : ''}`}
      aria-label={label}
      ref={mergeRefs(innerRef, btnElRef)}
      onClick={onClick}
      style={{
        '--btn-color': contentColor,
        '--label-hover-shift': `${labelHoverShift}px`,
        '--arrow-rest-shift': `${arrowRestShift}px`,
        '--stroke-w': `${strokeW}px`,
        width: ready ? pillWidth * scale : undefined,
        height: HEIGHT * scale,
        visibility: ready ? 'visible' : 'hidden',
      }}
    >
      <svg viewBox={`0 0 ${pillWidth || 1} ${HEIGHT}`}>
        <rect
          className={styles.rectShape}
          x={strokeW / 2}
          y={strokeW / 2}
          width={Math.max(pillWidth - strokeW, 0)}
          height={HEIGHT - strokeW}
          rx={RX}
          ry={RX}
          fill={filled ? fillColor : 'none'}
          stroke={filled ? 'none' : fillColor}
        />
        <text
          ref={textRef}
          className={`${styles.cls2} ${styles.label}`}
          x={ready ? restLabelX : 0}
          y={CENTER_Y}
          dominantBaseline="middle"
        >
          {label}
        </text>
        <g transform={`translate(${arrowX}, 0)`}>
          {/* CSS (.arrow) drives the hover slide/fade via `transform` — a
              static SVG `transform` attribute on the same element would be
              overridden by it, so the reverse mirror-flip lives on this
              separate inner group instead. */}
          <g className={styles.arrow}>
            <g transform={reverse ? `translate(${arrowLength}, 0) scale(-1, 1)` : undefined}>
              <line
                className={styles.cls1}
                x1="0"
                y1={CENTER_Y}
                x2={arrowLength}
                y2={CENTER_Y}
              />
              <polyline
                className={styles.cls1}
                points={`${arrowLength - chevronW} ${CENTER_Y - chevronTop} ${arrowLength} ${CENTER_Y} ${arrowLength - chevronW} ${CENTER_Y + chevronBottom}`}
              />
            </g>
          </g>
        </g>
      </svg>
    </button>
  )
}
