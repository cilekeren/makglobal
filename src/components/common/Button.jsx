import { useLayoutEffect, useRef, useState } from 'react'
import styles from './Button.module.css'

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
}) {
  const textRef = useRef(null)
  const [labelWidth, setLabelWidth] = useState(0)

  useLayoutEffect(() => {
    if (textRef.current) {
      setLabelWidth(textRef.current.getBBox().width)
    }
  }, [label])

  const ready = labelWidth > 0
  const hoverBlockWidth = labelWidth + GAP_AFTER_LABEL + arrowLength
  const pillWidth = hoverBlockWidth + padding * 2

  const hoverLabelX = padding
  const arrowX = padding + labelWidth + GAP_AFTER_LABEL
  const restLabelX = (pillWidth - labelWidth) / 2
  const labelHoverShift = hoverLabelX - restLabelX
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
      ref={innerRef}
      onClick={onClick}
      style={{
        '--btn-color': contentColor,
        '--label-hover-shift': `${labelHoverShift}px`,
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
          <g className={styles.arrow}>
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
      </svg>
    </button>
  )
}
