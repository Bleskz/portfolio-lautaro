// Contact section — OPEN_CHANNEL: static terminal simulation + contact form
import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

// Simulated terminal card — static display, not interactive
function Terminal() {
  return (
    <div
      style={{
        backgroundColor: 'rgba(2,5,2,0.95)',
        borderTop: '1px solid rgba(0,255,65,0.15)',
        borderLeft: '3px solid #00FF41',
        borderRight: '1px solid rgba(0,255,65,0.08)',
        borderBottom: '1px solid rgba(0,255,65,0.08)',
        boxShadow: '-4px 0 15px rgba(0,255,65,0.2)',
      }}
    >
      {/* Window bar: colored dots + terminal title */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(0,255,65,0.1)' }}
      >
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF003C', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFD700', display: 'inline-block' }} />
        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#00FF41', display: 'inline-block' }} />
        <span
          className="ml-2"
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(232,255,232,0.35)',
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
        <p style={{ color: 'rgba(232,255,232,0.45)' }}>$ ping --target lautaro.velo</p>
        <p style={{ color: '#E8FFE8', paddingLeft: '1rem' }}>
          → Handshake established. Signal strong.
        </p>

        <p className="mt-2" style={{ color: 'rgba(232,255,232,0.45)' }}>
          $ mail --to bleslautaro@gmail.com
        </p>
        <p style={{ color: '#00FFFF', paddingLeft: '1rem' }}>✓ Channel open</p>

        <p className="mt-2" style={{ color: 'rgba(232,255,232,0.45)' }}>
          $ connect --discord Bleskz
        </p>
        <p style={{ color: '#00FFFF', paddingLeft: '1rem' }}>✓ Ready</p>

        <p className="mt-2" style={{ color: 'rgba(232,255,232,0.45)' }}>
          $ open github.com/Bleskz
        </p>
        <p style={{ color: '#00FFFF', paddingLeft: '1rem' }}>✓ 4 repos available</p>

        <p className="mt-3" style={{ color: '#00FF41' }}>
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

// Contact form with focus glow and success state on submit
function ContactForm() {
  const [status, setStatus] = useState('idle') // 'idle' | 'transmitted'
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  // Handles form submission: shows transmitted state, resets after 3s
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      setStatus('transmitted')
      await new Promise((r) => setTimeout(r, 3000))
      setStatus('idle')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Form reset error:', err)
    }
  }

  const baseInputStyle = {
    width: '100%',
    backgroundColor: 'rgba(2,5,2,0.85)',
    border: '1px solid rgba(0,255,65,0.14)',
    color: '#E8FFE8',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.78rem',
    padding: '0.65rem 0.8rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  const labelStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.6rem',
    color: 'rgba(0,255,65,0.6)',
    display: 'block',
    marginBottom: '0.4rem',
    letterSpacing: '0.05em',
  }

  // Applies stronger glow on focus
  function onFocus(e) {
    e.target.style.border = '1px solid rgba(0,255,65,0.5)'
    e.target.style.boxShadow = '0 0 0 1px rgba(0,255,65,0.5), 0 0 20px rgba(0,255,65,0.1)'
  }

  // Removes glow on blur
  function onBlur(e) {
    e.target.style.border = '1px solid rgba(0,255,65,0.14)'
    e.target.style.boxShadow = 'none'
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label style={labelStyle}>// SENDER_ID</label>
          <input
            type="text"
            placeholder="your name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            style={baseInputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
            className="contact-input"
          />
        </div>

        <div>
          <label style={labelStyle}>// RETURN_FREQ</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            style={baseInputStyle}
            onFocus={onFocus}
            onBlur={onBlur}
            className="contact-input"
          />
        </div>

        <div>
          <label style={labelStyle}>// PAYLOAD</label>
          <textarea
            rows={5}
            placeholder="your message"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
            style={{ ...baseInputStyle, resize: 'vertical' }}
            onFocus={onFocus}
            onBlur={onBlur}
            className="contact-input"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: status === 'transmitted' ? '#00FFFF' : '#00FF41',
            color: '#020502',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.85rem 2rem',
            border: 'none',
            cursor: 'pointer',
            clipPath:
              'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
            transition: 'background-color 0.3s',
            letterSpacing: '0.1em',
            alignSelf: 'flex-start',
          }}
        >
          {status === 'transmitted' ? 'TRANSMITTED ✓' : 'TRANSMIT →'}
        </button>
      </form>

      {/* Placeholder italic + color — needs CSS, not achievable inline */}
      <style>{`
        .contact-input::placeholder {
          color: rgba(232, 255, 232, 0.2);
          font-style: italic;
        }
      `}</style>
    </>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      className="min-h-screen py-24 px-6"
      style={{ backgroundColor: '#020502' }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="SIGNAL_05"
          title="OPEN_"
          accent="CHANNEL"
          subtitle="// TRANSMISSION PROTOCOL ACTIVE"
          number="05"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left — Terminal simulation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.4, delay: 0 }}
          >
            <Terminal />
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
