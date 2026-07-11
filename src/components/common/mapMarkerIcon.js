// Inlined verbatim from assets/hero/logo-mark2.svg -- that file sets
// width/height="100%" with preserveAspectRatio="none", which is fine as
// an inline SVG (Logo.jsx) but breaks when used as an <img src>: browsers
// can't derive an intrinsic size from percentage dimensions and fall back
// to the 300x150 default, stretching the mark way outside the circle.
// Inlining it directly (with a sane preserveAspectRatio) sidesteps that.
export function logoMarkSvg(className) {
  return `
    <svg viewBox="0 0 20.0591 19.2615" preserveAspectRatio="xMidYMid meet" class="${className}">
      <path d="M0 13.5415L2.87297 0H0V13.5415Z" fill="#fff"/>
      <path d="M14.5307 2.28293e-08L0.0405284 19.2615L10.0498 13.5415L20.0591 19.0807V2.28293e-08H14.5307Z" fill="#fff"/>
      <path d="M6.38612 0L0 16.6171L10.355 0H6.38612Z" fill="#fff"/>
    </svg>
  `
}
