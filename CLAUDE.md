# CLAUDE.md — portfolio-lautaro

## PROJECT
Name: portfolio-lautaro
Type: Portfolio SPA (Single Page Application)
Purpose: Personal portfolio for Lautaro Velo, Fullstack Developer
from Neuquen, Argentina. Showcases 4 real projects built from
scratch in 1-2 months.

Styling: Tailwind CSS v3 (utility classes only, no custom CSS files)
Animations: Framer Motion (ALL animations — no CSS keyframes)
No backend, no database, no paid APIs.
Deploy target: Vercel (free tier)

## DESIGN SYSTEM — SIGNAL/NOISE
Aesthetic: Glitch/noise — like an AI signal being reconstructed.
Palette:
  --bg:      #020502  (near-black, base background)
  --green:   #00FF41  (matrix green, primary accent)
  --cyan:    #00FFFF  (glitch color, secondary accent)
  --red:     #FF003C  (error/glitch, use sparingly)
  --white:   #E8FFE8  (near-white text)
  --grey:    rgba(232,255,232,0.12) (subtle borders/cards)
Fonts (Google Fonts — import in index.html):
  Display: Bebas Neue (big titles, hero name)
  Mono: Share Tech Mono (labels, tags, UI elements)
  Body: Space Mono (descriptions, paragraphs)
Section IDs: #home #about #projects #skills #contact

## CONTENT TONE
The portfolio must feel real and direct — not generic.
No empty buzzwords. No 'passionate developer' clichés.
Lautaro is someone who ships things. Show that.
The SIGNAL/NOISE naming convention:
  Home     → SIGNAL DETECTED
  About    → USER_PROFILE
  Projects → PROJECT_LOGS
  Skills   → FREQ_STACK
  Contact  → OPEN_CHANNEL

## CODING RULES (follow strictly in every task)
- Write all code comments in English
- Use async/await — never .then() chains or callbacks
- Wrap async operations in try/catch
- Show errors in the UI — never only in the console
- One function = one responsibility
- Comment every function with a single line explaining what it does
- Never install new dependencies without asking first
- Use Tailwind utility classes for all styling
- ALL animations use Framer Motion
- Scroll-triggered animations: whileInView + viewport once:true
- Animation duration: 0.5s max (fast feels modern, slow feels lazy)

## MANDATORY AFTER EVERY TASK
1. Update CONTEXT.md marking the completed phase
2. List every file created or modified
3. Explain what was done in plain Spanish (non-technical)
4. State the exact next step

## DEVELOPER PROFILE
Name: Lautaro Velo
No formal coding experience — self-taught, fast learner.
Extremely creative. Philosophy: always make something.
All code is written by Claude Code in VS Code (Windows).
No paid APIs — this is a static frontend, free to host.

## PERSONAL DATA (for portfolio content)
GitHub: https://github.com/Bleskz
Email: bleslautaro@gmail.com
Discord: Bleskz
Location: Neuquen, Argentina

## PROJECTS
1. TabFlow — Chrome/Brave extension
   Saves, organizes and restores tab groups across browser
   restarts. Persistent sessions, group naming, one-click restore.
   Stack: Chrome Extensions API, Vanilla JS, HTML/CSS

2. Steam Analyzer — Web app
   Analyzes a Steam profile in depth: total playtime, money
   spent on games, inventory market value, game library stats.
   Stack: React, Steam Web API, Tailwind CSS, Node.js

3. CoreTracker — Windows desktop app
   Electron app for oil companies to register, search and
   manage well samples (cuttings, cores, channels). Includes
   sample loans, Excel and PDF export. 100% offline.
   Stack: Electron, React, SQLite, Node.js

4. TabFlow Landing — Product landing page
   Marketing and download page for the TabFlow extension.
   Stack: HTML, CSS, Vanilla JS

## TECH STACK
Framework: React 18 + Vite (NOT create-react-app)
