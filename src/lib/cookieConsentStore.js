import { useEffect, useState } from 'react'

export const COOKIE_CONSENT_KEY = 'mak-cookie-consent'

// Minimal external store (no context provider) so the floating WhatsApp
// button can react to the cookie consent card's presence/height — only
// these two components care about this state, so a full context is more
// machinery than the problem needs.
let decided = typeof window !== 'undefined' && !!localStorage.getItem(COOKIE_CONSENT_KEY)
// distance from the viewport's bottom edge to the consent card's top edge
// (i.e. its bottom inset + its own height) — measured directly off the
// DOM rather than duplicated as constants, so it stays correct across the
// card's mobile layout (different bottom inset, full-width wrapping).
let cardTopOffset = 0
const decidedListeners = new Set()
const topOffsetListeners = new Set()

export function setCookieConsentDecided(value) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value)
  decided = true
  decidedListeners.forEach((fn) => fn(decided))
}

export function setCookieCardTopOffset(offset) {
  cardTopOffset = offset
  topOffsetListeners.forEach((fn) => fn(offset))
}

export function useCookieConsentDecided() {
  const [state, setState] = useState(decided)
  useEffect(() => {
    decidedListeners.add(setState)
    return () => decidedListeners.delete(setState)
  }, [])
  return state
}

export function useCookieCardTopOffset() {
  const [state, setState] = useState(cardTopOffset)
  useEffect(() => {
    topOffsetListeners.add(setState)
    return () => topOffsetListeners.delete(setState)
  }, [])
  return state
}
