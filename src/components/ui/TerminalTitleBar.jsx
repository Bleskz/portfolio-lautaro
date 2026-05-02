import TerminalDots from './TerminalDots'
import { C } from '../../theme/colors'

// Title bar for terminal-like panels — dots + filename. Used by Hero code panel,
// About profile card, and Contact terminal.
export default function TerminalTitleBar({ filename, padding = '10px 14px' }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding,
        borderBottom: `1px solid ${C.g(0.1)}`,
      }}
    >
      <TerminalDots />
      {filename && (
        <span
          style={{
            marginLeft: 6,
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.65rem',
            color: C.g(0.5),
            letterSpacing: '0.04em',
          }}
        >
          {filename}
        </span>
      )}
    </div>
  )
}
