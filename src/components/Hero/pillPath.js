export const PILL_STROKE_W = 1

export function pillPathD(w, h) {
  const inset = PILL_STROKE_W / 2
  const left = inset
  const top = inset
  const right = w - inset
  const bottom = h - inset
  const r = Math.max((bottom - top) / 2, 0)
  const midX = (left + right) / 2

  return `M ${midX} ${bottom} L ${right - r} ${bottom} A ${r} ${r} 0 0 0 ${right - r} ${top} L ${left + r} ${top} A ${r} ${r} 0 0 0 ${left + r} ${bottom} Z`
}
