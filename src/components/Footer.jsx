// Footer — full-width two-column layout: copyright left, links right
import { LINKS } from '../config/links'

function Footer() {
  const linkStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '0.62rem',
    color: 'rgba(232,255,232,0.35)',
    textDecoration: 'none',
    letterSpacing: '0.08em',
    transition: 'color 0.2s, text-shadow 0.2s',
    cursor: 'pointer',
  }

  // Applies green glow on hover
  function onEnter(e) {
    e.currentTarget.style.color = '#00FF41'
    e.currentTarget.style.textShadow = '0 0 10px rgba(0,255,65,0.6)'
  }

  // Removes glow on mouse leave
  function onLeave(e) {
    e.currentTarget.style.color = 'rgba(232,255,232,0.35)'
    e.currentTarget.style.textShadow = 'none'
  }

  return (
    <footer
      style={{
        width: '100%',
        padding: '1.8rem clamp(1rem, 4vw, 3rem)',
        borderTop: '1px solid rgba(0,255,65,0.1)',
        backgroundColor: '#020502',
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
            color: 'rgba(232,255,232,0.55)',
            letterSpacing: '0.05em',
          }}
        >
          © {new Date().getFullYear()} LAUTARO VELO{' '}
        </span>
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: '#00FF41',
            letterSpacing: '0.05em',
          }}
        >
          // SIGNAL_TRANSMITTED_SUCCESSFULLY
        </span>
      </div>

      {/* RIGHT — external links row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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
        {/* Discord: not an interactive link — displayed as label only */}
        <span
          style={{ ...linkStyle, cursor: 'default', color: 'rgba(232,255,232,0.25)' }}
          title="Discord: Bleskz"
        >
          DISCORD
        </span>
      </div>
    </footer>
  )
}

export default Footer
