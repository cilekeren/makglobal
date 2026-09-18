import { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Button from '../../components/common/Button'
import { logoMarkSvg, graduationCapSvg } from '../../components/common/mapMarkerIcon'
import { MapCard } from '../Projects/ProjectsMap'
import projectsMapStyles from '../Projects/ProjectsMap.module.css'
import { PROJECTS } from '../../data/projects'
import { UNIVERSITIES } from '../../data/universities'
import styles from './DiscoverLondonMap.module.css'

// smaller than ProjectsMap's own 38px — this page's map is university
// -led, so property pins step back to a secondary, glanceable size.
const PROJECT_MARKER_SIZE = 24
const UNIVERSITY_MARKER_SIZE = 32

function UniversityMapCard({ uni, onViewDetails }) {
  const { t } = useTranslation()

  return (
    <div className={styles.mapCard} onClick={onViewDetails}>
      <img src={uni.image} alt={uni.name} className={styles.mapCardImage} />

      <div className={styles.mapCardBody}>
        <h3 className={styles.mapCardName}>{uni.name}</h3>
        <div className={styles.mapCardLocation}>{uni.location}</div>

        <div className={styles.mapCardBtnWrap}>
          <Button
            label={t('common.details')}
            variant="filled"
            color="#8b3a3a"
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

export default function DiscoverLondonMap({ onSelectUniversity }) {
  const navigate = useNavigate()
  const mapContainerRef = useRef(null)

  useEffect(() => {
    const map = L.map(mapContainerRef.current, {
      scrollWheelZoom: false,
      zoomSnap: 0.5,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_2y9n_1_fcd49803f56c4f6b828bcff5', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(map)

    const roots = []
    const allCoords = []

    // Invisible strip bridging a marker and its popup (see ProjectsMap's
    // own copy of this trick) so moving the cursor between them doesn't
    // count as "leaving" and close the popup early.
    function attachHoverBridge(marker, popupEl) {
      let closeTimer = null
      let popupHoverBound = false
      const bridge = document.createElement('div')
      bridge.style.cssText = 'position:absolute;display:none;pointer-events:auto;z-index:650;'
      mapContainerRef.current.appendChild(bridge)
      bridge.addEventListener('mouseenter', cancelClose)
      bridge.addEventListener('mouseleave', scheduleClose)

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

      marker.on('popupopen', () => {
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
        // real coordinates mean several pins can sit right on top of each
        // other — without this, whichever one Leaflet stacks underneath
        // is impossible to hover/click at all, since the marker above it
        // eats the cursor first.
        marker.setZIndexOffset(1000)
        marker.openPopup()
      })
      marker.on('mouseout', () => {
        marker.setZIndexOffset(0)
        scheduleClose()
      })
    }

    PROJECTS.forEach((project) => {
      if (!project.coords) return
      allCoords.push(project.coords)

      const icon = L.divIcon({
        className: projectsMapStyles.markerIcon,
        html: `<span class="${projectsMapStyles.markerCircle}">${logoMarkSvg(projectsMapStyles.markerLogo)}</span>`,
        iconSize: [PROJECT_MARKER_SIZE, PROJECT_MARKER_SIZE],
        iconAnchor: [PROJECT_MARKER_SIZE / 2, PROJECT_MARKER_SIZE / 2],
      })

      const marker = L.marker(project.coords, { icon }).addTo(map)
      const popupEl = document.createElement('div')
      let root = null

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
      })
      marker.on('click', () => navigate(`/projects/${project.slug}`))

      attachHoverBridge(marker, popupEl)
    })

    UNIVERSITIES.forEach((uni, index) => {
      if (!uni.coords) return
      allCoords.push(uni.coords)

      const icon = L.divIcon({
        className: styles.markerIcon,
        html: `<span class="${styles.markerCircle}">${graduationCapSvg(styles.markerLogo)}</span>`,
        iconSize: [UNIVERSITY_MARKER_SIZE, UNIVERSITY_MARKER_SIZE],
        iconAnchor: [UNIVERSITY_MARKER_SIZE / 2, UNIVERSITY_MARKER_SIZE / 2],
      })

      const marker = L.marker(uni.coords, { icon }).addTo(map)
      const popupEl = document.createElement('div')
      let root = null
      const openModal = () => onSelectUniversity?.(index)

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
        root.render(<UniversityMapCard uni={uni} onViewDetails={openModal} />)
      })
      marker.on('click', openModal)

      attachHoverBridge(marker, popupEl)
    })

    if (allCoords.length) {
      // invalidateSize + a rAF, *then* fitBounds: right on mount the
      // container can still report a stale/zero size to Leaflet (this
      // section sits below content whose own height settles a beat after
      // first paint), and fitBounds silently computes a wrong zoom
      // against that.
      requestAnimationFrame(() => {
        map.invalidateSize()
        map.fitBounds(L.latLngBounds(allCoords), { padding: [32, 32] })
      })
    }

    return () => {
      roots.forEach((root) => root.unmount())
      map.remove()
    }
  }, [navigate, onSelectUniversity])

  return (
    <section className={styles.section}>
      <div className={styles.mapWrap}>
        <div ref={mapContainerRef} className={styles.map} />
      </div>
    </section>
  )
}
