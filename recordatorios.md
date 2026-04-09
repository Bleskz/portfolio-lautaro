# Recordatorios — portfolio-lautaro

## Sobre el proyecto
- Portfolio personal de Lautaro Velo, Fullstack Developer, Neuquen Argentina
- SPA en React 18 + Vite + Tailwind CSS v3 + Framer Motion
- Deploy destino: Vercel (tier gratuito)
- Sin backend, sin base de datos, sin APIs pagas

## Aesthetic — SIGNAL/NOISE
- Fondo: #020502 | Verde: #00FF41 | Cyan: #00FFFF | Rojo: #FF003C
- Texto: #E8FFE8 | Bordes/cards: rgba(232,255,232,0.12)
- Fuentes: Bebas Neue (títulos) · Share Tech Mono (labels) · Space Mono (cuerpo)
- Animaciones: solo Framer Motion, max 0.5s, nunca CSS keyframes

## Secciones y nombres
- Home     → SIGNAL DETECTED
- About    → USER_PROFILE
- Projects → PROJECT_LOGS
- Skills   → FREQ_STACK
- Contact  → OPEN_CHANNEL

## Datos personales
- GitHub: https://github.com/Bleskz
- Email: bleslautaro@gmail.com
- Discord: Bleskz

## Proyectos y links
| Proyecto         | Stack                              | GitHub                                          | Demo                        |
|------------------|------------------------------------|-------------------------------------------------|-----------------------------|
| TabFlow          | Chrome API, Vanilla JS, HTML/CSS   | https://github.com/Bleskz/tabflow               | # (no en Chrome Web Store)  |
| Steam Analyzer   | React, Steam API, Tailwind, Node   | https://github.com/Bleskz/steam-analyzer        | # (sin deploy activo)       |
| CoreTracker      | Electron, React, SQLite, Node      | https://github.com/Bleskz/coretracker           | # (app de escritorio)       |
| TabFlow Landing  | HTML, CSS, Vanilla JS              | https://github.com/Bleskz/tabflow-landing       | # (pendiente)               |

## Pendiente — actualizar demoUrl cuando esté listo
- TabFlow: subir a Chrome Web Store → actualizar demoUrl en Projects.jsx
- Steam Analyzer: hacer deploy a Vercel → actualizar demoUrl en Projects.jsx
- TabFlow Landing: confirmar URL de deploy → actualizar demoUrl en Projects.jsx
- CoreTracker: es desktop, demoUrl queda en '#' para siempre

## Decisiones de diseño tomadas
- Hero glitch: animación de letras con caracteres aleatorios que se "resuelven" al nombre real (Framer Motion)
- Navbar mobile: hamburger menu con overlay de pantalla completa
- Skills: tag pills (no barras de progreso — son deshonestas en portfolios)
- Tono del contenido: directo y real, sin buzzwords, sin "apasionado por el código"

## GitHub del portfolio
- Repo para el portfolio todavía NO está creado
- Hay que crearlo antes de la Phase 9 (Deploy)

## Reglas de código (recordar en cada tarea)
- Comentarios en inglés
- async/await siempre — nunca .then()
- try/catch en todo lo async
- Errores visibles en UI, nunca solo en consola
- Una función = una responsabilidad
- Tailwind para todo el estilo
- Framer Motion para toda animación

## Después de cada tarea (obligatorio)
1. Actualizar CONTEXT.md marcando la fase completada
2. Listar archivos creados o modificados
3. Explicar qué se hizo en español simple
4. Decir cuál es el próximo paso exacto
