// Contact section — OPEN_CHANNEL: static terminal simulation + contact form
import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { useLang } from '../context/LangContext'
import { LINKS } from '../config/links'
import { C } from '../theme/colors'
import TerminalTitleBar from './ui/TerminalTitleBar'

// Types text character by character when active — shows a cursor while typing
function TypewriterText({ text, active, delay = 0, speed = 20, style }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) return
    let timeout, interval
    timeout = setTimeout(() => {
      let i = 0
      interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
    }, delay)
    return () => { clearTimeout(timeout); clearInterval(interval) }
  }, [active, text, delay, speed])

  return (
    <span style={style}>
      {displayed}
      {!done && active && <span style={{ color: C.green, fontStyle: 'normal' }}>▌</span>}
    </span>
  )
}

// Terminal simulation — commands type out sequentially, responses fade in after each
function Terminal({ t }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const speed = 20
  const cmd1 = `$ ping --target lautaro.velo`
  const cmd2 = `$ mail --to ${LINKS.email}`
  const cmd3 = `$ connect --discord ${LINKS.discord}`
  const cmd4 = `$ open ${LINKS.github.replace('https://', '')}`

  // Each command starts after the previous finishes + 150ms buffer
  const d1 = 0
  const d2 = d1 + cmd1.length * speed + 150
  const d3 = d2 + cmd2.length * speed + 150
  const d4 = d3 + cmd3.length * speed + 150
  const dCursor = d4 + cmd4.length * speed + 200

  // Helper: delay in seconds for a response line after its command finishes
  const resp = (start, cmd) => ({ delay: (start + cmd.length * speed + 60) / 1000, duration: 0.2 })

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: C.terminalBg,
        borderTop: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.green}`,
        borderRight: `1px solid ${C.g(0.08)}`,
        borderBottom: `1px solid ${C.g(0.08)}`,
        boxShadow: `-4px 0 15px ${C.g(0.2)}`,
      }}
    >
      <TerminalTitleBar filename="CONTACT_PROTOCOL.TERMINAL" padding="12px 16px" />

      {/* Terminal lines — commands type out, responses fade in after each command */}
      <div className="p-4 sm:p-5" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(0.62rem, 2vw, 0.76rem)', lineHeight: '1.9', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <p style={{ color: C.w(0.45) }}>
          <TypewriterText text={cmd1} active={inView} delay={d1} speed={speed} />
        </p>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={resp(d1, cmd1)}
          style={{ color: C.white, paddingLeft: '1rem' }}>{t.contact.handshake}</motion.p>

        <p className="mt-2" style={{ color: C.w(0.45) }}>
          <TypewriterText text={cmd2} active={inView} delay={d2} speed={speed} />
        </p>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={resp(d2, cmd2)}
          style={{ color: C.cyan, paddingLeft: '1rem' }}>{t.contact.channelOpen}</motion.p>

        <p className="mt-2" style={{ color: C.w(0.45) }}>
          <TypewriterText text={cmd3} active={inView} delay={d3} speed={speed} />
        </p>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={resp(d3, cmd3)}
          style={{ color: C.cyan, paddingLeft: '1rem' }}>{t.contact.ready}</motion.p>

        <p className="mt-2" style={{ color: C.w(0.45) }}>
          <TypewriterText text={cmd4} active={inView} delay={d4} speed={speed} />
        </p>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={resp(d4, cmd4)}
          style={{ color: C.cyan, paddingLeft: '1rem' }}>{t.contact.reposAvailable}</motion.p>

        <motion.p className="mt-3" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: dCursor / 1000, duration: 0.1 }} style={{ color: C.green }}>
          $ <span className="terminal-cursor">█</span>
        </motion.p>
      </div>

      {/* Blinking cursor animation — explicit exception to Framer Motion rule per spec */}
      <style>{`
        .terminal-cursor {
          animation: cursor-blink 1s step-end infinite;
        }
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// Input/textarea with a blinking terminal cursor when the field is empty and unfocused
function TerminalField({
  id, as: Tag = 'input', label, placeholder,
  value, onChange, onBlur: onBlurProp,
  disabled, type, rows, fieldError,
}) {
  const [focused, setFocused] = useState(false)
  const showCursor = value === '' && !focused
  const hasError = Boolean(fieldError)

  const borderColor = hasError ? '#FF003C' : C.g(0.14)
  const baseInputStyle = {
    width: '100%',
    backgroundColor: C.cardBg,
    border: `1px solid ${borderColor}`,
    color: C.white,
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.78rem',
    padding: '0.65rem 0.8rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ...(Tag === 'textarea' ? { resize: 'vertical' } : {}),
  }

  function handleFocus(e) {
    setFocused(true)
    if (!hasError) {
      e.target.style.border = `1px solid ${C.borderStrong}`
      e.target.style.boxShadow = `0 0 0 1px ${C.borderStrong}, 0 0 20px ${C.g(0.1)}`
    }
  }

  function handleBlur(e) {
    setFocused(false)
    e.target.style.border = `1px solid ${hasError ? '#FF003C' : C.g(0.14)}`
    e.target.style.boxShadow = 'none'
    if (onBlurProp) onBlurProp(e)
  }

  return (
    <div>
      <label htmlFor={id} style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        color: C.g(0.6),
        display: 'block',
        marginBottom: '0.4rem',
        letterSpacing: '0.05em',
      }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <Tag
          id={id}
          type={type}
          rows={rows}
          placeholder={showCursor ? '' : placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="contact-input"
          style={baseInputStyle}
        />
        {/* Blinking terminal cursor — visible only when field is empty and unfocused */}
        {showCursor && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '0.8rem',
              top: Tag === 'textarea' ? '0.65rem' : '50%',
              transform: Tag === 'textarea' ? 'none' : 'translateY(-50%)',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.78rem',
              color: C.w(0.25),
              pointerEvents: 'none',
              fontStyle: 'italic',
            }}
          >
            {placeholder}&nbsp;<span className="terminal-cursor" style={{ color: C.green, fontStyle: 'normal' }}>▌</span>
          </span>
        )}
      </div>
      {/* Inline error — visible only when this specific field has an error */}
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.65rem',
            color: '#FF7A8C',
            marginTop: '0.35rem',
            letterSpacing: '0.04em',
          }}
        >
          ✗ {fieldError}
        </p>
      )}
    </div>
  )
}

// Formspree endpoint — configured via VITE_FORMSPREE_ID environment variable
const FORMSPREE_URL = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`

// Stricter email regex: requires alpha TLD with 2+ chars (rejects a@b.c)
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

// Throttle window between submissions (anti-abuse — protects Formspree free quota)
const SUBMIT_COOLDOWN_MS = 30_000
const THROTTLE_KEY = 'portfolio-last-submit-ts'

// Validates one field — returns null if valid, error string if not
function validateField(name, value) {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Required.'
      return null
    case 'email':
      if (!value.trim()) return 'Required.'
      if (!EMAIL_RE.test(value)) return 'Must be a valid email.'
      return null
    case 'message':
      if (value.trim().length < 10) return 'Min 10 characters.'
      if (value.length > 5000) return 'Max 5000 characters.'
      return null
    default:
      return null
  }
}

// Validates all fields at once — returns map { fieldName: error | null }
function validateAll(form) {
  return {
    name:    validateField('name', form.name),
    email:   validateField('email', form.email),
    message: validateField('message', form.message),
  }
}

// Reads the last submission timestamp safely
function getLastSubmit() {
  try {
    return Number(sessionStorage.getItem(THROTTLE_KEY)) || 0
  } catch {
    return 0
  }
}

// Persists the submission timestamp (silently ignores quota / privacy errors)
function setLastSubmit(ts) {
  try {
    sessionStorage.setItem(THROTTLE_KEY, String(ts))
  } catch { /* storage unavailable — throttle won't persist across reloads */ }
}

// Contact form with terminal cursor fields and success state on submit
function ContactForm() {
  const { t } = useLang()
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'transmitted'
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({ name: null, email: null, message: null })
  const [error, setError] = useState(null)

  // Updates a single field and clears its inline error as the user types
  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
    setFieldErrors((errs) => (errs[name] ? { ...errs, [name]: null } : errs))
    if (error) setError(null)
  }

  // On blur, run per-field validation so the user gets feedback before submitting
  function handleBlur(name) {
    setFieldErrors((errs) => ({ ...errs, [name]: validateField(name, form[name]) }))
  }

  // Submits form to Formspree — shows sending → transmitted or error state
  async function handleSubmit(e) {
    e.preventDefault()

    // Honeypot: if a bot filled the hidden _gotcha field, silently drop the submission
    if (e.target.elements._gotcha && e.target.elements._gotcha.value) {
      setStatus('transmitted')
      return
    }

    const errs = validateAll(form)
    setFieldErrors(errs)
    if (Object.values(errs).some(Boolean)) {
      setError('Check the highlighted fields.')
      return
    }

    // Client-side throttle — prevents accidental double-submits and basic abuse
    const now = Date.now()
    const last = getLastSubmit()
    if (now - last < SUBMIT_COOLDOWN_MS) {
      const wait = Math.ceil((SUBMIT_COOLDOWN_MS - (now - last)) / 1000)
      setError(`Slow down — wait ${wait}s before sending another transmission.`)
      return
    }

    setStatus('sending')
    setError(null)

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })

      if (!res.ok) throw new Error('non-ok response')

      setLastSubmit(Date.now())
      setStatus('transmitted')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
        setFieldErrors({ name: null, email: null, message: null })
      }, 3000)
    } catch {
      setError('TRANSMISSION FAILED — check your connection and retry.')
      setStatus('idle')
    }
  }

  const disabled = status === 'sending' || status === 'transmitted'

  return (
    <>
      {/* Accessible status region — announced by screen readers on change */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'sending' ? 'Transmitting message...' : status === 'transmitted' ? 'Message transmitted successfully.' : ''}
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        noValidate
      >
        {/* Honeypot — hidden from humans, bots fill it and get silently dropped */}
        <input
          type="text"
          name="_gotcha"
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
          <TerminalField
            id="contact-name"
            label="// SENDER_ID"
            placeholder={t.contact.namePlaceholder}
            value={form.name}
            onChange={(e) => setField('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            disabled={disabled}
            fieldError={fieldErrors.name}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
          <TerminalField
            id="contact-email"
            type="email"
            label="// RETURN_FREQ"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setField('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            disabled={disabled}
            fieldError={fieldErrors.email}
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
          <TerminalField
            id="contact-message"
            as="textarea"
            rows={5}
            label="// PAYLOAD"
            placeholder={t.contact.msgPlaceholder}
            value={form.message}
            onChange={(e) => setField('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            disabled={disabled}
            fieldError={fieldErrors.message}
          />
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } }}>
        <motion.button
          type="submit"
          disabled={disabled}
          whileHover={!disabled ? { x: [0, -3, 3, -2, 2, 0], transition: { duration: 0.25 } } : {}}
          whileTap={!disabled ? { scale: 0.96 } : {}}
          style={{
            backgroundColor: status === 'transmitted' ? C.cyan : C.green,
            color: C.bg,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.85rem 2rem',
            border: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.7 : 1,
            clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            transition: 'background-color 0.3s, opacity 0.2s',
            letterSpacing: '0.1em',
            alignSelf: 'flex-start',
          }}
        >
          {status === 'sending' ? 'TRANSMITTING...' : status === 'transmitted' ? t.contact.submitted : t.contact.submit}
        </motion.button>

        {/* Error message — visible only when a transmission error occurs */}
        {error && (
          <p style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.72rem',
            color: '#FF003C',
            letterSpacing: '0.05em',
            marginTop: '0.5rem',
          }}>
            ✗ {error}
          </p>
        )}
        </motion.div>
      </motion.form>

      {/* Placeholder italic + color + cursor blink */}
      <style>{`
        .contact-input::placeholder {
          color: ${C.w(0.2)};
          font-style: italic;
        }
      `}</style>
    </>
  )
}

function Contact() {
  const { t } = useLang()

  return (
    <section
      id="contact"
      className="relative py-10 md:py-16 px-4 sm:px-6"
      style={{ backgroundColor: C.bg }}
    >
      {/* Decorative background number — slow opacity pulse */}
      <motion.span
        className="absolute select-none pointer-events-none"
        animate={{ opacity: [0.03, 0.07, 0.03] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(4rem, 12vw, 16rem)',
          color: C.green,
          lineHeight: 1,
          right: '1.5vw',
          bottom: '-1vw',
          zIndex: 0,
          opacity: 0.03,
        }}
      >
        05
      </motion.span>

      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="SIGNAL_05"
          title="OPEN_"
          accent="CHANNEL"
          subtitle={t.contact.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left — Terminal simulation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <Terminal t={t} />
          </motion.div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
