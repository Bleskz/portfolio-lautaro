// Footer — full-width two-column layout: copyright left, links right
import { useState } from 'react'
import { LINKS } from '../config/links'
import { C } from '../theme/colors'

function Footer() {
  const [discordCopied, setDiscordCopied] = useState(false)

  const linkStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.62rem',
    color: C.textFaint,
    textDecoration: 'none',
    letterSpacing: '0.08em',
    transition: 'color 0.2s, text-shadow 0.2s',
    cursor: 'pointer',
  }

  // Applies green glow on hover
  function onEnter(e) {
    e.currentTarget.style.color = C.green
    e.currentTarget.style.textShadow = `0 0 10px ${C.g(0.6)}`
  }

  // Removes glow on mouse leave
  function onLeave(e) {
    e.currentTarget.style.color = C.textFaint
    e.currentTarget.style.textShadow = 'none'
  }

  // Copies the Discord handle to clipboard, falls back silently if clipboard API is unavailable
  async function copyDiscord() {
    try {
      await navigator.clipboard.writeText(LINKS.discord)
      setDiscordCopied(true)
      setTimeout(() => setDiscordCopied(false), 1800)
    } catch {
      // Clipboard blocked — leave the user to copy manually from the tooltip
    }
  }

  return (
    <footer
      style={{
        width: '100%',
        padding: '1.8rem clamp(1rem, 4vw, 3rem)',
        borderTop: `1px solid ${C.g(0.1)}`,
        backgroundColor: C.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {/* LEFT — copyright + signal status */}
      <div>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: C.textDim,
            letterSpacing: '0.05em',
          }}
        >
          © {new Date().getFullYear()} LAUTARO BLESKZ{' '}
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: C.green,
            letterSpacing: '0.05em',
          }}
        >
          // SIGNAL_TRANSMITTED_SUCCESSFULLY
        </span>
      </div>

      {/* RIGHT — external links row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <a
          href={LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
        >
          GITHUB
        </a>
        <a
          href={LINKS.emailHref}
          style={linkStyle}
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onFocus={onEnter}
          onBlur={onLeave}
        >
          EMAIL
        </a>
        {/* Discord — click to copy handle to clipboard */}
        <button
          type="button"
          onClick={copyDiscord}
          style={{
            ...linkStyle,
            background: 'none',
            border: 'none',
            padding: 0,
            color: discordCopied ? C.green : C.textFaint,
          }}
          onMouseEnter={onEnter}
          onMouseLeave={(e) => {
            if (!discordCopied) onLeave(e)
          }}
          title={`Click to copy Discord handle: ${LINKS.discord}`}
          aria-label={`Copy Discord handle ${LINKS.discord} to clipboard`}
        >
          {discordCopied ? '✓ COPIED' : 'DISCORD'}
        </button>
      </div>
    </footer>
  )
}

export default Footer
