// Language context — provides current lang and changeLang to the whole app
import { createContext, useContext, useState, useEffect } from 'react'
import translations from '../i18n/translations'

const LangContext = createContext(null)

// Languages currently exposed in the UI — anything else falls back to 'en'
const SUPPORTED = ['en', 'es']

// Reads lang from localStorage safely — returns 'en' if storage is unavailable or saved value is no longer supported
function getSavedLang() {
  try {
    const saved = localStorage.getItem('portfolio-lang')
    return SUPPORTED.includes(saved) ? saved : 'en'
  } catch {
    return 'en'
  }
}

// Writes lang to localStorage safely — silently ignores quota or privacy errors
function saveLang(l) {
  try {
    localStorage.setItem('portfolio-lang', l)
  } catch {
    // Storage unavailable (private mode, quota exceeded) — preference won't persist
  }
}

// Wraps the app and provides language state + translations
export function LangProvider({ children }) {
  const [lang, setLang] = useState(getSavedLang)

  // Syncs the HTML lang attribute so screen readers and search engines see the right language
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Updates language, persists choice, and syncs the HTML lang attribute
  function changeLang(l) {
    setLang(l)
    saveLang(l)
  }

  return (
    <LangContext.Provider value={{ lang, changeLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

// Returns { lang, changeLang, t } — t is the full translations object for current lang
export function useLang() {
  return useContext(LangContext)
}
