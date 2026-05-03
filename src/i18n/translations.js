// All UI strings for the portfolio — EN, ES, PT, FR
// Rules:
//   - Tech terms (REACT, NODE.JS, ELECTRON, etc.) are NEVER translated
//   - Project names (TabFlow, Steam Analyzer, CoreTracker, TabFlow Landing) are NEVER translated
//   - Terminal-style labels (SIGNAL_ACTIVE, USER_PROFILE, FREQ_STACK, etc.) are NEVER translated
//   - Signal/codename labels (SIGNAL_DETECTED, OPEN_CHANNEL, PROJECT_LOGS, etc.) are NEVER translated

const translations = {
  en: {
    nav: {
      home:     'HOME',
      about:    'ABOUT',
      projects: 'PROJECTS',
      skills:   'SKILLS',
      contact:  'CONTACT',
      cta:      'OPEN_CHANNEL →',
    },
    hero: {
      subtitle1:   '// AI Engineer & AI-Augmented Builder from Neuquen, AR',
      subtitle2:   '— Ships things. Fast. With whatever it takes.',
      ctaProjects: 'TUNE IN → PROJECTS',
      ctaContact:  'OPEN CHANNEL →',
      scroll:      '─── SCROLL TO RECEIVE',
    },
    about: {
      subtitle:   '// IDENTITY PACKET RECEIVED',
      role:       'AI Engineer & AI-Augmented Builder',
      experience: 'Self-taught, 0 to shipped',
      quotePart1: 'Always',
      quoteWord:  'make',
      quotePart2: 'something.',
      bio1: "I didn't wait for the perfect stack or the idea of the century. I started, broke things, fixed them, and kept going. That's the only way something comes to exist.",
      bio2: "I work with everything I have — code, AI, design. If something can be built, it gets built.",
    },
    projects: {
      subtitle: '// TRANSMISSIONS CAPTURED',
      tabflow: {
        description: 'Chrome/Brave extension that saves and restores tab groups across restarts. Named groups, persistent sessions, one-click restore. No more lost tabs.',
      },
      steam: {
        description: 'Analyzes any Steam profile in depth. Total playtime, real money spent on games, inventory market value, full library breakdown. Raw numbers, zero filter.',
      },
      coretracker: {
        description: 'Windows desktop app for oil companies. Register, search and manage well samples — cuttings, cores, channels. Sample loans, Excel + PDF export. Runs 100% offline.',
      },
      tabflowlanding: {
        description: 'Product page for the TabFlow extension. Fast, minimal, conversion-focused. Built to get installs.',
      },
      outpost: {
        description: 'Survival horror game built in Unity. First-person exploration with environmental storytelling. Currently in active development.',
      },
      chatbot: {
        description: 'AI-powered WhatsApp chatbot for real estate agencies. LLM-driven conversation handles property inquiries, filters leads, and schedules visits 24/7 without human intervention.',
      },
      walkingsim: {
        description: 'First Unity project. A first-person walking experience focused on atmosphere and movement feel. Built to learn the engine from scratch.',
      },
      webclients: {
        description: 'Landing pages and full sites for small businesses: dental clinics, local entrepreneurs, service companies. Built fast, responsive, conversion-focused.',
      },
      viewCode: 'VIEW_CODE',
      liveDemo: 'LIVE_DEMO →',
    },
    skills: {
      subtitle: '// CALIBRATED FREQUENCIES',
    },
    contact: {
      subtitle:        '// TRANSMISSION PROTOCOL ACTIVE',
      handshake:       '→ Handshake established. Signal strong.',
      channelOpen:     '✓ Channel open',
      ready:           '✓ Ready',
      reposAvailable:  '✓ 32+ projects shipped · 12+ clients',
      namePlaceholder: 'your name',
      msgPlaceholder:  'your message',
      submit:          'TRANSMIT →',
      submitted:       'TRANSMITTED ✓',
    },
  },

  es: {
    nav: {
      home:     'INICIO',
      about:    'PERFIL',
      projects: 'PROYECTOS',
      skills:   'SKILLS',
      contact:  'CONTACTO',
      cta:      'CANAL_ABIERTO →',
    },
    hero: {
      subtitle1:   '// AI Engineer y constructor de productos con IA desde Neuquén, AR',
      subtitle2:   '— Construye cosas. Rápido. Con lo que haga falta.',
      ctaProjects: 'VER → PROYECTOS',
      ctaContact:  'ABRIR CANAL →',
      scroll:      '─── DESPLAZÁ PARA VER',
    },
    about: {
      subtitle:   '// PAQUETE DE IDENTIDAD RECIBIDO',
      role:       'AI Engineer y Constructor con IA',
      experience: 'Autodidacta, de 0 a publicado',
      quotePart1: 'Siempre',
      quoteWord:  'hacé',
      quotePart2: 'algo.',
      bio1: 'No esperé tener el stack perfecto ni la idea del siglo. Arranqué, rompí cosas, las arreglé, y así sigo. Esa es la única forma en que algo llega a existir.',
      bio2: 'Trabajo con todo lo que tengo — código, IA, diseño. Si algo se puede construir, se construye.',
    },
    projects: {
      subtitle: '// TRANSMISIONES CAPTURADAS',
      tabflow: {
        description: 'Extensión para Chrome/Brave que guarda y restaura grupos de pestañas. Sesiones persistentes, grupos con nombre, restauración de un click. Nunca más perdés pestañas.',
      },
      steam: {
        description: 'Analiza cualquier perfil de Steam en profundidad. Horas jugadas, plata gastada en juegos, valor del inventario, estadísticas completas de la biblioteca. Números reales, sin filtros.',
      },
      coretracker: {
        description: 'App de escritorio para Windows para empresas petroleras. Registra, busca y gestiona muestras de pozos — ripios, testigos, coronas. Préstamos, exportación a Excel y PDF. 100% offline.',
      },
      tabflowlanding: {
        description: 'Página de producto para la extensión TabFlow. Rápida, minimalista, orientada a conversión. Hecha para conseguir instalaciones.',
      },
      outpost: {
        description: 'Juego de survival horror hecho en Unity. Exploración en primera persona con narrativa ambiental. Actualmente en desarrollo activo.',
      },
      chatbot: {
        description: 'Chatbot de WhatsApp con automatización de IA para inmobiliarias. Conversación orquestada con LLM: atiende consultas, filtra leads y agenda visitas 24/7 sin intervención humana.',
      },
      walkingsim: {
        description: 'Primer proyecto en Unity. Una experiencia walking simulator en primera persona enfocada en la atmósfera y la sensación del movimiento. Hecho para aprender el motor desde cero.',
      },
      webclients: {
        description: 'Landing pages y sitios completos para pequeños negocios: clínicas dentales, emprendedores locales, empresas de servicios. Rápidos, responsive, orientados a conversión.',
      },
      viewCode: 'VER_CÓDIGO',
      liveDemo: 'DEMO_EN_VIVO →',
    },
    skills: {
      subtitle: '// FRECUENCIAS CALIBRADAS',
    },
    contact: {
      subtitle:        '// PROTOCOLO DE TRANSMISIÓN ACTIVO',
      handshake:       '→ Handshake establecido. Señal fuerte.',
      channelOpen:     '✓ Canal abierto',
      ready:           '✓ Listo',
      reposAvailable:  '✓ 32+ proyectos publicados · 12+ clientes',
      namePlaceholder: 'tu nombre',
      msgPlaceholder:  'tu mensaje',
      submit:          'TRANSMITIR →',
      submitted:       'TRANSMITIDO ✓',
    },
  },

  pt: {
    nav: {
      home:     'INÍCIO',
      about:    'SOBRE',
      projects: 'PROJETOS',
      skills:   'SKILLS',
      contact:  'CONTATO',
      cta:      'CANAL_ABERTO →',
    },
    hero: {
      subtitle1:   '// AI Engineer e construtor de produtos com IA de Neuquén, AR',
      subtitle2:   '— Constrói coisas. Rápido. Com o que for preciso.',
      ctaProjects: 'VER → PROJETOS',
      ctaContact:  'ABRIR CANAL →',
      scroll:      '─── ROLE PARA VER',
    },
    about: {
      subtitle:   '// PACOTE DE IDENTIDADE RECEBIDO',
      role:       'AI Engineer e Construtor com IA',
      experience: 'Autodidata, do 0 ao publicado',
      quotePart1: 'Sempre',
      quoteWord:  'faça',
      quotePart2: 'algo.',
      bio1: 'Não esperei ter o stack perfeito nem a ideia do século. Comecei, quebrei coisas, consertei, e assim continuo. Essa é a única forma de algo existir.',
      bio2: 'Trabalho com tudo que tenho — código, IA, design. Se algo pode ser construído, é construído.',
    },
    projects: {
      subtitle: '// TRANSMISSÕES CAPTURADAS',
      tabflow: {
        description: 'Extensão para Chrome/Brave que salva e restaura grupos de abas. Grupos nomeados, sessões persistentes, restauração com um clique. Sem mais abas perdidas.',
      },
      steam: {
        description: 'Analisa qualquer perfil do Steam em profundidade. Tempo jogado, dinheiro gasto em jogos, valor do inventário, estatísticas completas da biblioteca. Números reais, sem filtros.',
      },
      coretracker: {
        description: 'App desktop Windows para empresas de petróleo. Registra, busca e gerencia amostras de poços — calha, testemunho, coquilha. Empréstimos, exportação Excel + PDF. 100% offline.',
      },
      tabflowlanding: {
        description: 'Página de produto para a extensão TabFlow. Rápida, minimalista, focada em conversão. Feita para conseguir instalações.',
      },
      outpost: {
        description: 'Jogo de survival horror feito em Unity. Exploração em primeira pessoa com narrativa ambiental. Atualmente em desenvolvimento ativo.',
      },
      chatbot: {
        description: 'Chatbot de WhatsApp com automação de IA para imobiliárias. Conversa orquestrada com LLM: atende consultas, filtra leads e agenda visitas 24/7 sem intervenção humana.',
      },
      walkingsim: {
        description: 'Primeiro projeto em Unity. Uma experiência walking simulator em primeira pessoa focada na atmosfera e na sensação do movimento. Feito para aprender o motor do zero.',
      },
      webclients: {
        description: 'Landing pages e sites completos para pequenos negócios: clínicas odontológicas, empreendedores locais, empresas de serviços. Rápidos, responsivos, focados em conversão.',
      },
      viewCode: 'VER_CÓDIGO',
      liveDemo: 'DEMO_AO_VIVO →',
    },
    skills: {
      subtitle: '// FREQUÊNCIAS CALIBRADAS',
    },
    contact: {
      subtitle:        '// PROTOCOLO DE TRANSMISSÃO ATIVO',
      handshake:       '→ Handshake estabelecido. Sinal forte.',
      channelOpen:     '✓ Canal aberto',
      ready:           '✓ Pronto',
      reposAvailable:  '✓ 32+ projetos publicados · 12+ clientes',
      namePlaceholder: 'seu nome',
      msgPlaceholder:  'sua mensagem',
      submit:          'TRANSMITIR →',
      submitted:       'TRANSMITIDO ✓',
    },
  },

  fr: {
    nav: {
      home:     'ACCUEIL',
      about:    'PROFIL',
      projects: 'PROJETS',
      skills:   'SKILLS',
      contact:  'CONTACT',
      cta:      'CANAL_OUVERT →',
    },
    hero: {
      subtitle1:   '// AI Engineer et constructeur de produits IA depuis Neuquén, AR',
      subtitle2:   '— Il construit des choses. Vite. Avec ce qu\'il faut.',
      ctaProjects: 'VOIR → PROJETS',
      ctaContact:  'OUVRIR CANAL →',
      scroll:      '─── DÉFILER POUR VOIR',
    },
    about: {
      subtitle:   '// PAQUET D\'IDENTITÉ REÇU',
      role:       'AI Engineer et Constructeur IA',
      experience: 'Autodidacte, de 0 au déploiement',
      quotePart1: 'Toujours',
      quoteWord:  'créer',
      quotePart2: 'quelque chose.',
      bio1: "Je n'ai pas attendu le stack parfait ni l'idée du siècle. J'ai commencé, cassé des choses, réparé, et continué. C'est la seule façon de faire exister quelque chose.",
      bio2: "Je travaille avec tout ce que j'ai — code, IA, design. Si quelque chose peut être construit, ça sera construit.",
    },
    projects: {
      subtitle: '// TRANSMISSIONS CAPTURÉES',
      tabflow: {
        description: "Extension Chrome/Brave qui sauvegarde et restaure les groupes d'onglets. Groupes nommés, sessions persistantes, restauration en un clic. Plus jamais d'onglets perdus.",
      },
      steam: {
        description: "Analyse n'importe quel profil Steam en profondeur. Temps de jeu, argent dépensé en jeux, valeur de l'inventaire, statistiques complètes de la bibliothèque. Chiffres bruts, sans filtre.",
      },
      coretracker: {
        description: "Application bureau Windows pour entreprises pétrolières. Enregistre, recherche et gère des échantillons de puits — déblais, carottes, chenaux. Prêts, export Excel + PDF. 100% hors ligne.",
      },
      tabflowlanding: {
        description: "Page produit pour l'extension TabFlow. Rapide, minimale, axée conversion. Conçue pour obtenir des installations.",
      },
      outpost: {
        description: "Jeu de survival horror conçu sur Unity. Exploration à la première personne avec narration environnementale. Actuellement en développement actif.",
      },
      chatbot: {
        description: "Chatbot WhatsApp avec automatisation IA pour agences immobilières. Conversation orchestrée par LLM : gère les demandes, filtre les leads et planifie les visites 24/7 sans intervention humaine.",
      },
      walkingsim: {
        description: "Premier projet Unity. Une expérience walking simulator à la première personne axée sur l'atmosphère et la sensation du mouvement. Conçu pour apprendre le moteur à partir de zéro.",
      },
      webclients: {
        description: "Landing pages et sites complets pour petites entreprises : cliniques dentaires, entrepreneurs locaux, sociétés de services. Rapides, responsives, orientés conversion.",
      },
      viewCode: 'VOIR_CODE',
      liveDemo: 'DÉMO_EN_DIRECT →',
    },
    skills: {
      subtitle: '// FRÉQUENCES CALIBRÉES',
    },
    contact: {
      subtitle:        '// PROTOCOLE DE TRANSMISSION ACTIF',
      handshake:       '→ Handshake établi. Signal fort.',
      channelOpen:     '✓ Canal ouvert',
      ready:           '✓ Prêt',
      reposAvailable:  '✓ 32+ projets livrés · 12+ clients',
      namePlaceholder: 'votre nom',
      msgPlaceholder:  'votre message',
      submit:          'TRANSMETTRE →',
      submitted:       'TRANSMIS ✓',
    },
  },
}

export default translations
