import { ProfileInfo, Project, SkillCategory, ExperienceRole, Accreditation } from '../types';

export const initialProfile: ProfileInfo = {
  name: 'Michael Arianno Chandrarieta',
  monogram: 'MAC',
  latinMotto: 'In Tenebris Lux Architecturae',
  title: 'Computer Science Student & Full-Stack Developer',
  epithet: 'Game Developer · Web Engineer · Data Science Enthusiast',
  bioSummary:
    'A Computer Science student at BINUS International, Jakarta — passionate about building things across Game Development, Web Development, and Data Science. I enjoy turning complex ideas into clean, working software.',
  manifesto: [
    'My engineering philosophy is rooted in relentless technical curiosity. I never just stick to one lane—one week I\'m building full-stack applications with Next.js and Firebase, the next I\'m running Graph Neural Networks for drug repurposing, and then I\'m diving into penetration testing on Kali Linux.',
    'I believe that the highly analytical side of computer science needs to be balanced with creative narrative. Whether it\'s co-writing fiction, analyzing villain archetypes, or geeking out over Majapahit history, I bring a storytelling perspective to my technical logic.',
    'Ultimately, I build things to solve real problems and optimize life, always alongside a community. From leading GDG campus events to exchanging machine learning feedback, I thrive on collaboration—fueled by an unwavering loyalty to good food and entertainment.',
    '"To gain, one must lose another. Even heaven demands death."',
  ],
  location: 'Jakarta, Indonesia',
  status: 'OPEN TO OPPORTUNITIES & COLLABORATIONS',
  email: 'mchandrarietta@gmail.com',
  secondaryEmail: 'michael.chandrarietta@binus.ac.id',
  phonePlaceholder: 'Inquire through Email',
  pgpKey: '',
  github: 'https://github.com/MichaelFirstAC',
  twitter: '',
  linkedin: 'https://www.linkedin.com/in/michael-arianno-chandrarieta-06bb0928a/',
  discord: 'https://discord.com/users/503029413764399105',
  instagram: 'https://www.instagram.com/michael.arianno/'
};

export const initialProjects: Project[] = [
  {
    id: 'project-cpu-scheduler',
    title: 'CPU Scheduling Simulation',
    codeName: 'OS VISUALIZER',
    category: 'Algorithms',
    period: '2026',
    summary:
      'A fully animated, editable, and deployable CPU scheduling simulation built with TypeScript and React. Visualizes FCFS, SJF, SRTF, Round Robin, Priority, and Multilevel Queue algorithms in real-time.',
    fullDescription:
      'An interactive CPU scheduling visualization tool that lets users input custom processes and watch scheduling algorithms execute step-by-step with smooth animations. Built with a clean, modern UI featuring Gantt charts, timeline views, and comparative analytics across multiple algorithms. Deployed on Vercel for instant access.',
    architecturalHighlights: [
      'Real-time Gantt chart visualization with smooth CSS animations',
      'Support for 6 major scheduling algorithms (FCFS, SJF, SRTF, RR, Priority, MLQ)',
      'Editable process parameters with instant re-simulation',
      'Responsive design with comparative algorithm analytics'
    ],
    impactMetric: '6 Algorithms',
    impactLabel: 'Fully visualized & interactive',
    technologies: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Vercel'],
    links: {
      preview: 'https://cpu-scheduling-simulation-six.vercel.app',
      repository: 'https://github.com/MichaelFirstAC/CPU-Scheduling-Simulation'
    },
    featured: true
  },
  {
    id: 'project-solar-system',
    title: '3D Solar System Simulation',
    codeName: 'THREE.JS COSMOS',
    category: '3D & Graphics',
    period: '2026',
    summary:
      'An interactive 3D solar system simulation built with Three.js featuring realistic planet orbits, textures, lighting, and camera controls. Deployed on Vercel with GitHub Pages support.',
    fullDescription:
      'A WebGL-powered solar system simulator that renders all major planets with accurate relative sizing, orbital mechanics, and detailed textures. Features orbit path visualization, interactive camera controls for zooming and rotating around the system, and ambient space lighting effects.',
    architecturalHighlights: [
      'Realistic 3D planet rendering with texture mapping',
      'Orbital mechanics simulation with accurate relative distances',
      'Interactive camera controls (orbit, zoom, pan)',
      'Ambient lighting and space environment effects'
    ],
    impactMetric: 'WebGL 3D',
    impactLabel: 'Real-time solar system rendering',
    technologies: ['JavaScript', 'Three.js', 'WebGL', 'HTML5', 'Vercel'],
    links: {
      preview: 'https://3-d-solar-system-using-three-9gf2f5hsa-michaelfirstacs-projects.vercel.app/',
      repository: 'https://github.com/MichaelFirstAC/3D-Solar-System-using-Three.js'
    },
    featured: true
  },
  {
    id: 'project-treasure-keeper',
    title: 'TreasureKeeper — Expense Tracker',
    codeName: 'FINTECH APP',
    category: 'Web App',
    period: '2024',
    summary:
      'A feature-rich expense tracking web application with calendar views, statistical analysis dashboards, and category-based budgeting. Built as the HCI Final Project at BINUS.',
    fullDescription:
      'TreasureKeeper is a comprehensive personal finance management tool that enables users to track income and expenses with category tagging, visualize spending patterns through interactive charts, and review transactions on a calendar view. Features responsive design and persistent data storage.',
    architecturalHighlights: [
      'Calendar-based transaction view with daily summaries',
      'Statistical analysis with chart visualizations',
      'Category-based expense grouping and budgeting',
      'Responsive design for mobile and desktop use'
    ],
    impactMetric: '3 Stars',
    impactLabel: 'Most starred project',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'GitHub Pages'],
    links: {
      preview: 'https://michaelfirstac.github.io/TreasureKeeper/',
      repository: 'https://github.com/MichaelFirstAC/TreasureKeeper'
    },
    featured: true
  },
  {
    id: 'project-drug-repurposing',
    title: 'Drug Repurposing with Graph Neural Networks',
    codeName: 'GNN RESEARCH',
    category: 'Data Science',
    period: '2025',
    summary:
      'A research project using Graph Neural Networks (GCN) to predict novel drug-disease associations for drug repurposing. Leverages biomedical knowledge graphs and deep learning.',
    fullDescription:
      'This project applies Graph Convolutional Networks to biomedical knowledge graphs to discover potential drug repurposing candidates. The model learns from existing drug-disease-gene associations to predict previously unknown therapeutic uses for existing drugs, accelerating the drug discovery pipeline.',
    architecturalHighlights: [
      'Graph Convolutional Network architecture for biomedical data',
      'Knowledge graph construction from drug-disease-gene triples',
      'Link prediction for novel drug-disease associations',
      'Evaluation metrics: AUC-ROC, precision, recall analysis'
    ],
    impactMetric: 'GCN Model',
    impactLabel: 'Drug discovery via deep learning',
    technologies: ['Python', 'PyTorch', 'Graph Neural Networks', 'Pandas', 'scikit-learn'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/Drug-Repurposing-using-Graph-Neural-Networks'
    },
    featured: true
  },
  {
    id: 'project-witch-hell',
    title: "A Witch's Hell — Bullet Hell Game",
    codeName: 'PYGAME ARCADE',
    category: 'Game Dev',
    period: '2024',
    summary:
      'An endless bullet hell game built with Pygame featuring dynamic enemy patterns, power-ups, scoring systems, and progressively escalating difficulty. AlgoProg Final Project at BINUS.',
    fullDescription:
      'A Witch\'s Hell is an arcade-style bullet hell game where players dodge increasingly complex projectile patterns while defeating waves of enemies. Features a polished game loop with sprite animations, collision detection, particle effects, and a persistent high-score system.',
    architecturalHighlights: [
      'Dynamic bullet pattern generation with escalating difficulty',
      'Sprite-based animation system with particle effects',
      'Collision detection and physics-based projectile movement',
      'Score tracking and progressive difficulty scaling'
    ],
    impactMetric: 'Endless',
    impactLabel: 'Progressively escalating bullet patterns',
    technologies: ['Python', 'Pygame', 'OOP', 'Sprite Animation'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/A-WITCH-S-HELL'
    },
    featured: true
  },
  {
    id: 'project-maze-solver',
    title: 'Maze Generator & Solver',
    codeName: 'DS FINAL PROJECT',
    category: 'Algorithms',
    period: '2025',
    summary:
      'A maze generation and solving application using data structures including stacks, queues, and graph traversal algorithms. Implements DFS, BFS, and A* pathfinding with visual step-through.',
    fullDescription:
      'Built as the Data Structures & OOP final project, this application generates randomized mazes using recursive backtracking and solves them using multiple algorithms. Features a visual step-through mode to observe how different algorithms explore the maze, demonstrating the trade-offs between BFS, DFS, and A* search.',
    architecturalHighlights: [
      'Recursive backtracking maze generation algorithm',
      'Multiple pathfinding algorithms (DFS, BFS, A*)',
      'Visual step-through mode for algorithm comparison',
      'Stack and queue-based data structure implementations'
    ],
    impactMetric: '3 Algorithms',
    impactLabel: 'DFS, BFS, and A* pathfinding',
    technologies: ['Java', 'Data Structures', 'Graph Algorithms', 'OOP'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/Maze-Maker-Solver'
    },
    featured: true
  },
  {
    id: 'project-event-manager',
    title: 'EventManager — Database CRUD App',
    codeName: 'DB TECH PROJECT',
    category: 'Web App',
    period: '2024',
    summary:
      'A full-stack event management application built as the Database Technology final project. Features CRUD operations, user authentication, and relational database design.',
    fullDescription:
      'EventManager is a web application for creating, managing, and tracking events with user authentication and role-based access. Built with a focus on proper relational database design, normalization, and efficient query patterns.',
    architecturalHighlights: [
      'Full CRUD operations for event management',
      'Relational database schema with proper normalization',
      'User authentication and session management',
      'Responsive web interface with form validation'
    ],
    impactMetric: 'Full-Stack',
    impactLabel: 'Complete database-driven app',
    technologies: ['JavaScript', 'Node.js', 'SQL', 'HTML/CSS'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/EventManager'
    },
    featured: false
  },
  {
    id: 'project-image-compressor',
    title: 'Image Compressor — ADA Final Project',
    codeName: 'ALGORITHM DESIGN',
    category: 'Algorithms',
    period: '2025',
    summary:
      'An image compression tool implementing algorithmic approaches to reduce file sizes while maintaining visual quality. Final project for Algorithm Design & Analysis.',
    fullDescription:
      'This project applies algorithm design principles to implement efficient image compression. Explores lossy and lossless compression techniques, comparing trade-offs between compression ratio and visual fidelity.',
    architecturalHighlights: [
      'Implementation of compression algorithms',
      'Comparison of lossy vs lossless techniques',
      'Compression ratio and quality metrics analysis',
      'Batch processing support for multiple images'
    ],
    impactMetric: 'Compression',
    impactLabel: 'Algorithmic image optimization',
    technologies: ['Python', 'Pillow', 'NumPy', 'Algorithm Design'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/ImageCompressor'
    },
    featured: false
  },
  {
    id: 'project-movie-catalog',
    title: 'MovieCatalog — Data Science Project',
    codeName: 'DATA SCIENCE',
    category: 'Data Science',
    period: '2025',
    summary:
      'A movie catalog and recommendation system built as the Data Science final project, featuring data analysis, visualization, and machine learning-based recommendations.',
    fullDescription:
      'MovieCatalog leverages data science techniques to analyze movie datasets, generate insights through visualizations, and provide personalized movie recommendations using collaborative filtering and content-based approaches.',
    architecturalHighlights: [
      'Exploratory data analysis with Pandas and Matplotlib',
      'Recommendation engine using collaborative filtering',
      'Interactive data visualizations and dashboards',
      'Data preprocessing and feature engineering pipeline'
    ],
    impactMetric: 'ML Model',
    impactLabel: 'Movie recommendation engine',
    technologies: ['Python', 'Pandas', 'scikit-learn', 'Matplotlib'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/MovieCatalog'
    },
    featured: false
  },
  {
    id: 'project-pentest-report',
    title: 'Ethical Hacking Penetration Test Report',
    codeName: 'CYBERSECURITY',
    category: 'Algorithms',
    period: '2026',
    summary:
      'A comprehensive penetration testing report documenting vulnerability assessment, exploitation techniques, and remediation strategies using Kali Linux tools.',
    fullDescription:
      'A detailed ethical hacking penetration testing report conducted for the BINUS International cybersecurity course. Documents the full pentest lifecycle including reconnaissance, scanning, exploitation, and post-exploitation phases with real-world tools and methodologies.',
    architecturalHighlights: [
      'Full penetration testing lifecycle documentation',
      'Vulnerability scanning with Nmap, Nikto, and Burp Suite',
      'Exploitation techniques and proof-of-concept demonstrations',
      'Remediation recommendations and risk assessment'
    ],
    impactMetric: 'Full Report',
    impactLabel: 'Complete pentest lifecycle',
    technologies: ['Kali Linux', 'Nmap', 'Burp Suite', 'Metasploit'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/Ethical-Hacking-Pentest-Report'
    },
    featured: false
  },
  {
    id: 'project-image-compressor',
    title: 'Image Compressor & Optimizer',
    codeName: 'IMAGE-COMPRESSOR',
    category: 'Algorithms',
    period: '2025',
    summary: 'A sophisticated image compression tool implementing core algorithms built for the Algorithm Design and Analysis final project.',
    fullDescription: 'Developed an efficient image compressor showcasing advanced algorithm design. Implements compression techniques to significantly reduce file sizes while maintaining visual fidelity, built as a capstone project for ADA.',
    architecturalHighlights: [
      'Implementation of efficient compression algorithms',
      'Performance profiling and algorithmic optimization'
    ],
    impactMetric: 'Algorithm Design',
    impactLabel: 'Capstone ADA Project',
    technologies: ['Python', 'Algorithms', 'Data Structures'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/ImageCompressor'
    },
    featured: false
  },
  {
    id: 'project-event-manager',
    title: 'Event Management Database System',
    codeName: 'EVENTMANAGER',
    category: 'Data Science',
    period: '2025',
    summary: 'A robust database-backed event management system designed for the Database Technology final project.',
    fullDescription: 'A comprehensive database management application built to handle complex relational data for event planning and execution. Features advanced queries, robust schema design, and transactional integrity.',
    architecturalHighlights: [
      'Relational database schema design and normalization',
      'Complex SQL queries and data aggregation'
    ],
    impactMetric: 'Database Tech',
    impactLabel: 'Robust Architecture',
    technologies: ['SQL', 'Database Design', 'Python'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/EventManager'
    },
    featured: false
  },
  {
    id: 'project-ethical-hacking',
    title: 'Penetration Testing Framework',
    codeName: 'PENTEST-REPORT',
    category: 'Algorithms',
    period: '2025',
    summary: 'Comprehensive ethical hacking and penetration testing report executed for BINUS International University.',
    fullDescription: 'A detailed security analysis and penetration testing engagement focusing on vulnerability assessment, exploit identification, and mitigation strategies using Kali Linux and industry-standard tools.',
    architecturalHighlights: [
      'Vulnerability scanning and threat modeling',
      'Execution of controlled exploits within secure boundaries',
      'Comprehensive security reporting and mitigation strategies'
    ],
    impactMetric: 'Cybersecurity',
    impactLabel: 'Security Analysis',
    technologies: ['Kali Linux', 'Penetration Testing', 'Security Assessment'],
    links: {
      repository: 'https://github.com/MichaelFirstAC/Ethical-Hacking-Pentest-Report'
    },
    featured: false
  }
];

export const initialSkills: SkillCategory[] = [
  {
    title: 'Programming Languages',
    latinTitle: 'Lingua Programmandi',
    iconName: 'Cpu',
    description: 'Core languages used across web, game, and data science projects.',
    skills: [
      { name: 'Python', level: 90, tier: 'Grandmaster', specialty: 'Pygame, Flask, Data Science, ML' },
      { name: 'JavaScript', level: 88, tier: 'Master', specialty: 'Three.js, Node.js, DOM, ES6+' },
      { name: 'TypeScript', level: 85, tier: 'Master', specialty: 'React, Next.js, Vite' },
      { name: 'Java', level: 80, tier: 'Master', specialty: 'OOP, Data Structures, Algorithms' },
      { name: 'HTML5 & CSS3', level: 92, tier: 'Grandmaster', specialty: 'Responsive design, animations' }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    latinTitle: 'Instrumenta Architecturae',
    iconName: 'Layout',
    description: 'Modern frameworks for building web apps, 3D experiences, and games.',
    skills: [
      { name: 'React & Next.js', level: 85, tier: 'Master', specialty: 'SPA, SSR, component architecture' },
      { name: 'Three.js & WebGL', level: 78, tier: 'Adept', specialty: '3D rendering, shaders, camera systems' },
      { name: 'Tailwind CSS', level: 88, tier: 'Master', specialty: 'Utility-first styling, responsive design' },
      { name: 'Pygame', level: 82, tier: 'Master', specialty: 'Game loops, sprite systems, collision' },
      { name: 'Flask & Node.js', level: 80, tier: 'Master', specialty: 'REST APIs, backend services' }
    ]
  },
  {
    title: 'Data Science & Machine Learning',
    latinTitle: 'Scientia Datorum',
    iconName: 'Shield',
    description: 'Applied ML, deep learning, and data analysis for research and projects.',
    skills: [
      { name: 'PyTorch & Graph Neural Networks', level: 78, tier: 'Adept', specialty: 'GCN, drug repurposing research' },
      { name: 'scikit-learn', level: 80, tier: 'Master', specialty: 'Classification, clustering, evaluation' },
      { name: 'Pandas & NumPy', level: 85, tier: 'Master', specialty: 'Data wrangling, feature engineering' },
      { name: 'Data Visualization', level: 82, tier: 'Master', specialty: 'Matplotlib, charts, dashboards' }
    ]
  },
  {
    title: 'Tools, Platforms & Security',
    latinTitle: 'Instrumenta et Securitas',
    iconName: 'Terminal',
    description: 'Development tools, deployment platforms, and cybersecurity fundamentals.',
    skills: [
      { name: 'Git & GitHub', level: 90, tier: 'Grandmaster', specialty: 'Version control, CI/CD, collaboration' },
      { name: 'Vercel & Deployment', level: 85, tier: 'Master', specialty: 'Static sites, serverless functions' },
      { name: 'Linux & Kali Linux', level: 75, tier: 'Adept', specialty: 'Penetration testing, CLI tools' },
      { name: 'Vite & Build Tools', level: 82, tier: 'Master', specialty: 'Module bundling, HMR, optimization' }
    ]
  }
];

export const initialExperience: ExperienceRole[] = [
  {
    id: 'exp-binus-cs',
    title: 'Computer Science Student',
    organization: 'BINUS International University',
    seal: 'BI',
    period: '2024 — 2027',
    summary:
      'Pursuing a Bachelor of Science in Computer Science with focus areas in web development, game development, data science, and algorithm design.',
    achievements: [
      'Built 33+ public repositories spanning web apps, 3D simulations, games, and ML research projects.',
      'Developed a CPU Scheduling Simulation visualizing 6 major OS algorithms with full interactivity.',
      'Conducted ethical hacking penetration testing with comprehensive vulnerability documentation.',
      'Completed research on Drug Repurposing using Graph Neural Networks with PyTorch.'
    ],
    technologies: ['Python', 'Java', 'TypeScript', 'React', 'Three.js', 'PyTorch']
  },
  {
    id: 'exp-rmit',
    title: 'Double Degree CS Program',
    organization: 'RMIT University',
    seal: 'RMIT',
    period: '2028',
    summary:
      'Transitioning to RMIT University to complete the dual degree program, expanding on global tech perspectives and advanced computing modules.',
    achievements: [
      'Engaging in international tech curriculum and advanced research projects.',
      'Expanding collaborative networks in a globally diverse academic environment.'
    ],
    technologies: ['Advanced Algorithms', 'Software Engineering', 'Global Tech']
  }
];

export const initialAccreditations: Accreditation[] = [
  {
    id: 'acc-binus-cs',
    title: 'Bachelor of Science in Computer Science',
    institution: 'BINUS International University',
    year: '2024 — Present',
    type: 'Degree',
    honor: 'BS28 Cohort',
    description: 'Computer Science program with coursework in algorithms, data structures, web development, databases, operating systems, and cybersecurity.'
  },
  {
    id: 'acc-pentest',
    title: 'Ethical Hacking & Penetration Testing',
    institution: 'BINUS International — Cybersecurity Course',
    year: '2026',
    type: 'Certification',
    description: 'Completed comprehensive penetration testing project using Kali Linux, Nmap, Burp Suite, and Metasploit with full documentation.'
  },
  {
    id: 'acc-drug-research',
    title: 'Drug Repurposing via Graph Neural Networks',
    institution: 'Independent Research Project',
    year: '2025',
    type: 'Publication',
    description: 'Research applying Graph Convolutional Networks to biomedical knowledge graphs for predicting novel drug-disease associations.'
  },
  {
    id: 'acc-algo-design',
    title: 'Algorithm Design & Analysis',
    institution: 'BINUS International',
    year: '2025',
    type: 'Certification',
    description: 'Coursework covering algorithm complexity, greedy algorithms, dynamic programming, graph algorithms (Kruskal\'s, Prim\'s), and image compression techniques.'
  }
];
