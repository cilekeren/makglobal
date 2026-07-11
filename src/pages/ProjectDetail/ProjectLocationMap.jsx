import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { logoMarkSvg } from '../../components/common/mapMarkerIcon'
import styles from './ProjectLocationMap.module.css'

const MARKER_SIZE = 38
const ZOOM = 14

export default function ProjectLocationMap({ coords }) {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    if (!coords) return

    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
      zoomSnap: 0.5,
    }).setView(coords, ZOOM)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map)

    const icon = L.divIcon({
      className: styles.markerIcon,
      html: `<span class="${styles.markerCircle}">${logoMarkSvg(styles.markerLogo)}</span>`,
      iconSize: [MARKER_SIZE, MARKER_SIZE],
      iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
    })

    L.marker(coords, { icon }).addTo(map)

    return () => {
      map.remove()
    }
  }, [coords])

  if (!coords) return null

  return (
    <section className={styles.section}>
      <div className={styles.mapWrap}>
        <div ref={mapContainerRef} className={styles.map} />
      </div>
    </section>
  )
}
