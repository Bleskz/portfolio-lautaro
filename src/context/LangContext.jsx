// Language context — provides current lang and changeLang to the whole app
import { createContext, useContext, useState } from 'react'
import translations from '../i18n/translations'

const LangContext = createContext(null)

// Wraps the app and provides language state + translations
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio-lang') || 'en')

  // Updates language and persists choice in localStorage
  function changeLang(l) {
    setLang(l)
    localStorage.setItem('portfolio-lang', l)
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
