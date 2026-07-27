import { useEffect } from 'react'

const SITE_NAME = 'MAK Global'
const BASE_URL = 'https://makglobal.co.uk'

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

// Updates the *existing* tags already declared in index.html (title, meta
// description, canonical, OG/Twitter title+description+url) rather than
// injecting new ones — keeps a single source of truth per tag instead of
// duplicates piling up across route changes.
//
// This only reaches real users' browser tabs and JS-executing crawlers
// (Googlebot re-renders and waits before indexing) — crawlers that don't
// run JS at all (Facebook/LinkedIn/WhatsApp link previews, some others)
// only ever see index.html's static defaults, regardless of route. That's
// a known, accepted limitation of a client-only SPA without SSR/prerender.
export function useSEO({ title, description, noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | UK Real Estate Investment Advisory`
    document.title = fullTitle
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)

    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }

    const canonicalUrl = `${BASE_URL}${window.location.pathname}`
    setMeta('link[rel="canonical"]', 'href', canonicalUrl)
    setMeta('meta[property="og:url"]', 'content', canonicalUrl)

    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow')
  }, [title, description, noindex])
}
