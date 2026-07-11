import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Button from '../../components/common/Button'
import { logoMarkSvg } from '../../components/common/mapMarkerIcon'
import { PROJECTS } from '../../data/projects'
import styles from './ProjectsMap.module.css'

const LONDON_CENTER = [51.4995, -0.14]
const MARKER_SIZE = 38

function MapCard({ project, onNavigate }) {
  return (
    <div className={styles.mapCard} onClick={onNavigate}>
      {project.image ? (
        <img src={project.image} alt={project.name} className={styles.mapCardImage} />
      ) : (
        <div className={styles.mapCardImagePlaceholder} />
      )}

      <div className={styles.mapCardBody}>
        <h3 className={styles.mapCardName}>{project.name}</h3>
        <div className={styles.mapCardPrice}>
          {project.prices?.[0]?.price ? `From ${project.prices[0].price}` : project.price || 'Price on Request'}
        </div>

        <div className={styles.mapCardBtnWrap}>
          <Button
            label="DETAILS"
            variant="filled"
            color="#163a3d"
            textColor="#fff"
            scale={1.5}
            strokeScale={2.5}
            padding={10}
            arrowLength={20}
          />
        </div>
      </div>
    </div>
  )
}

export default function ProjectsMap() {
  const navigate = useNavigate()
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
      zoomSnap: 0.5,
    }).setView(LONDON_CENTER, 10.5)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map)

    const roots = []

    PROJECTS.forEach((project) => {
      if (!project.coords) return

      const icon = L.divIcon({
        className: styles.markerIcon,
        html: `<span class="${styles.markerCircle}">${logoMarkSvg(styles.markerLogo)}</span>`,
        iconSize: [MARKER_SIZE, MARKER_SIZE],
        iconAnchor: [MARKER_SIZE / 2, MARKER_SIZE / 2],
      })

      const marker = L.marker(project.coords, { icon }).addTo(map)

      const popupEl = document.createElement('div')
      let root = null
      let closeTimer = null
      let popupHoverBound = false

      // Invisible strip that fills the gap between the marker and the
      // card (at the marker's own height) so crossing it while moving
      // the mouse from one to the other doesn't count as "leaving".
      const bridge = document.createElement('div')
      bridge.style.cssText = 'position:absolute;display:none;pointer-events:auto;z-index:650;'
      mapContainerRef.current.appendChild(bridge)
      bridge.addEventListener('mouseenter', () => cancelClose())
      bridge.addEventListener('mouseleave', () => scheduleClose())

      function cancelClose() {
        clearTimeout(closeTimer)
      }
      function scheduleClose() {
        clearTimeout(closeTimer)
        closeTimer = setTimeout(() => marker.closePopup(), 100)
      }

      function positionBridge() {
        const mapRect = mapContainerRef.current.getBoundingClientRect()
        const markerRect = marker.getElement().getBoundingClientRect()
        const popupContainer = popupEl.closest('.leaflet-popup')
        if (!popupContainer) return
        const popupRect = popupContainer.getBoundingClientRect()

        bridge.style.left = `${markerRect.right - mapRect.left}px`
        bridge.style.top = `${markerRect.top - mapRect.top}px`
        bridge.style.width = `${Math.max(popupRect.left - markerRect.right, 0)}px`
        bridge.style.height = `${markerRect.height}px`
        bridge.style.display = 'block'
      }

      marker.bindPopup(popupEl, {
        closeButton: false,
        offset: L.point(150, 168),
        className: 'mak-map-popup',
      })

      marker.on('popupopen', () => {
        if (!root) {
          root = createRoot(popupEl)
          roots.push(root)
        }
        root.render(<MapCard project={project} onNavigate={() => navigate(`/projects/${project.slug}`)} />)

        // keep the card open while the cursor is over it or the bridge,
        // close as soon as it leaves all three (small delay so moving
        // between them doesn't flicker-close it in between).
        if (!popupHoverBound) {
          popupHoverBound = true
          const popupContainer = popupEl.closest('.leaflet-popup')
          popupContainer?.addEventListener('mouseenter', cancelClose)
          popupContainer?.addEventListener('mouseleave', scheduleClose)
        }

        requestAnimationFrame(positionBridge)
      })

      marker.on('popupclose', () => {
        bridge.style.display = 'none'
      })

      marker.on('mouseover', () => {
        cancelClose()
        marker.openPopup()
      })
      marker.on('mouseout', scheduleClose)
      marker.on('click', () => navigate(`/projects/${project.slug}`))
    })

    return () => {
      roots.forEach((root) => root.unmount())
      map.remove()
    }
  }, [navigate])

  return (
    <section className={styles.section}>
      <div className={styles.mapWrap}>
        <div ref={mapContainerRef} className={styles.map} />
      </div>
    </section>
  )
}
