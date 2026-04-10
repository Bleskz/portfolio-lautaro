// Contact section — OPEN_CHANNEL: static terminal simulation + contact form
import { useState, useId } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { useLang } from '../context/LangContext'
import { LINKS } from '../config/links'
import { C } from '../theme/colors'

// Simulated terminal card — static display, not interactive
function Terminal({ t }) {
  return (
    <div
      style={{
        backgroundColor: C.terminalBg,
        borderTop: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.green}`,
        borderRight: `1px solid ${C.g(0.08)}`,
        borderBottom: `1px solid ${C.g(0.08)}`,
        boxShadow: `-4px 0 15px ${C.g(0.2)}`,
      }}
    >
      {/* Window bar: colored dots + terminal title */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: `1px solid ${C.g(0.1)}` }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: C.red, display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFD700', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: C.green, display: 'inline-block' }} />
        <span
          className="ml-2"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.65rem',
            color: C.textFaint,
            letterSpacing: '0.05em',
          }}
        >
          CONTACT_PROTOCOL.TERMINAL
        </span>
      </div>

      {/* Terminal output lines */}
      <div
        className="p-5"
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.76rem',
          lineHeight: '1.9',
        }}
      >
        <p style={{ color: C.w(0.45) }}>$ ping --target lautaro.velo</p>
        <p style={{ color: C.white, paddingLeft: '1rem' }}>
          {t.contact.handshake}
        </p>

        <p className="mt-2" style={{ color: C.w(0.45) }}>
          $ mail --to {LINKS.email}
        </p>
        <p style={{ color: C.cyan, paddingLeft: '1rem' }}>{t.contact.channelOpen}</p>

        <p className="mt-2" style={{ color: C.w(0.45) }}>
          $ connect --discord {LINKS.discord}
        </p>
        <p style={{ color: C.cyan, paddingLeft: '1rem' }}>{t.contact.ready}</p>

        <p className="mt-2" style={{ color: C.w(0.45) }}>
          $ open {LINKS.github.replace('https://', '')}
        </p>
        <p style={{ color: C.cyan, paddingLeft: '1rem' }}>{t.contact.reposAvailable}</p>

        <p className="mt-3" style={{ color: C.green }}>
          $ <span className="terminal-cursor">█</span>
        </p>
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
function TerminalField({ id, as: Tag = 'input', label, placeholder, value, onChange, disabled, type, rows }) {
  const [focused, setFocused] = useState(false)
  const showCursor = value === '' && !focused

  const baseInputStyle = {
    width: '100%',
    backgroundColor: C.cardBg,
    border: `1px solid ${C.g(0.14)}`,
    color: C.white,
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.78rem',
    padding: '0.65rem 0.8rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ...(Tag === 'textarea' ? { resize: 'vertical' } : {}),
  }

  function onFocus(e) {
    setFocused(true)
    e.target.style.border = `1px solid ${C.borderStrong}`
    e.target.style.boxShadow = `0 0 0 1px ${C.borderStrong}, 0 0 20px ${C.g(0.1)}`
  }

  function onBlur(e) {
    setFocused(false)
    e.target.style.border = `1px solid ${C.g(0.14)}`
    e.target.style.boxShadow = 'none'
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
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          required
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
    </div>
  )
}

// Contact form with terminal cursor fields and success state on submit
function ContactForm() {
  const { t } = useLang()
  const [status, setStatus] = useState('idle') // 'idle' | 'sending' | 'transmitted'
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [error, setError] = useState(null)

  // Submits form to Formspree — shows sending → transmitted or error state
  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    try {
      const res = await fetch('https://formspree.io/f/xaqlgeob', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })

      if (!res.ok) throw new Error('non-ok response')

      setStatus('transmitted')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', message: '' })
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <TerminalField
          id="contact-name"
          label="// SENDER_ID"
          placeholder={t.contact.namePlaceholder}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          disabled={disabled}
        />
        <TerminalField
          id="contact-email"
          type="email"
          label="// RETURN_FREQ"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          disabled={disabled}
        />
        <TerminalField
          id="contact-message"
          as="textarea"
          rows={5}
          label="// PAYLOAD"
          placeholder={t.contact.msgPlaceholder}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          disabled={disabled}
        />

        <button
          type="submit"
          disabled={disabled}
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
        </button>

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
      </form>

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
      className="relative min-h-screen py-24 px-6"
      style={{ backgroundColor: C.bg }}
    >
      {/* Decorative background number — anchored to section, not clipped */}
      <span
        className="absolute select-none pointer-events-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: C.g(0.03),
          lineHeight: 1,
          right: '1.5vw',
          bottom: '-1vw',
          zIndex: 0,
        }}
      >
        05
      </span>

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
