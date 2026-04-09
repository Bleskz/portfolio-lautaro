// SIGNAL/NOISE design system — centralized color tokens
// All components import from here instead of hardcoding hex values

export const C = {
  // Base palette
  bg:    '#020502',
  green: '#00FF41',
  cyan:  '#00FFFF',
  white: '#E8FFE8',
  red:   '#FF003C',

  // Alpha helpers — return rgba strings
  g: (a) => `rgba(0,255,65,${a})`,    // green with alpha
  w: (a) => `rgba(232,255,232,${a})`, // white with alpha
  c: (a) => `rgba(0,255,255,${a})`,   // cyan with alpha
  b: (a) => `rgba(2,5,2,${a})`,       // bg with alpha

  // Common combinations used throughout
  border:       'rgba(0,255,65,0.15)',
  borderStrong: 'rgba(0,255,65,0.5)',
  cardBg:       'rgba(2,5,2,0.85)',
  terminalBg:   'rgba(2,5,2,0.95)',
  textDim:      'rgba(232,255,232,0.55)',
  textFaint:    'rgba(232,255,232,0.35)',
}
