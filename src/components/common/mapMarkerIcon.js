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

// Same "raw SVG string for a Leaflet divIcon" approach as logoMarkSvg above
// — path lifted verbatim from react-icons/pi's PiGraduationCapFill, used
// for university markers on DiscoverLondonMap.
export function graduationCapSvg(className) {
  return `
    <svg viewBox="0 0 256 256" preserveAspectRatio="xMidYMid meet" class="${className}">
      <path d="M176,207.24a119,119,0,0,0,16-7.73V240a8,8,0,0,1-16,0Zm11.76-88.43-56-29.87a8,8,0,0,0-7.52,14.12L171,128l17-9.06Zm64-29.87-120-64a8,8,0,0,0-7.52,0l-120,64a8,8,0,0,0,0,14.12L32,117.87v48.42a15.91,15.91,0,0,0,4.06,10.65C49.16,191.53,78.51,216,128,216a130,130,0,0,0,48-8.76V130.67L171,128l-43,22.93L43.83,106l0,0L25,96,128,41.07,231,96l-18.78,10-.06,0L188,118.94a8,8,0,0,1,4,6.93v73.64a115.63,115.63,0,0,0,27.94-22.57A15.91,15.91,0,0,0,224,166.29V117.87l27.76-14.81a8,8,0,0,0,0-14.12Z" fill="#fff"/>
    </svg>
  `
}
