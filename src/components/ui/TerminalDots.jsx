import { C } from '../../theme/colors'

const DOT_BASE = {
  width: '10px',
  height: '10px',
  borderRadius: '50%',
  display: 'inline-block',
}

// macOS-style window dots (red/yellow/green) used by every terminal-like panel
export default function TerminalDots({ opacity = 0.85, size }) {
  const style = size ? { ...DOT_BASE, width: size, height: size } : DOT_BASE
  return (
    <>
      <span style={{ ...style, backgroundColor: C.red,    opacity }} />
      <span style={{ ...style, backgroundColor: '#FFD700', opacity }} />
      <span style={{ ...style, backgroundColor: C.green,  opacity }} />
    </>
  )
}
