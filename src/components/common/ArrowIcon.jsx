// Same chevron geometry as the arrow inside Button.jsx (same ratios), so the
// chevron itself always matches the button's. `lineLength` separately
// controls how long the shaft before it is.
const ARROW_TOTAL_W = 109.7586 - 67.3749
const CHEVRON_W_RATIO = 9.5445 / ARROW_TOTAL_W
const CHEVRON_TOP_RATIO = 3.5644 / ARROW_TOTAL_W
const CHEVRON_BOTTOM_RATIO = 3.8812 / ARROW_TOTAL_W

export default function ArrowIcon({ length = ARROW_TOTAL_W, lineLength = length - length * CHEVRON_W_RATIO, className }) {
  const chevronW = length * CHEVRON_W_RATIO
  const chevronTop = length * CHEVRON_TOP_RATIO
  const chevronBottom = length * CHEVRON_BOTTOM_RATIO
  const height = chevronTop + chevronBottom
  const viewWidth = chevronW + lineLength

  return (
    <svg className={className} viewBox={`0 0 ${viewWidth} ${height}`} fill="none">
      {lineLength > 0 && (
        <line x1="0" y1={chevronTop} x2={viewWidth} y2={chevronTop} vectorEffect="non-scaling-stroke" />
      )}
      <polyline
        points={`${viewWidth - chevronW} 0 ${viewWidth} ${chevronTop} ${viewWidth - chevronW} ${height}`}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
