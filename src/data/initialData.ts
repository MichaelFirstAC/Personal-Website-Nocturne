import { ProfileInfo, Project, SkillCategory, ExperienceRole, Accreditation } from '../types';

export const initialProfile: ProfileInfo = {
  name: 'Valerius Mordecai Vance',
  monogram: 'MAC',
  latinMotto: 'In Tenebris Lux Architecturae',
  title: 'Principal Systems Architect & Cryptographic Engineer',
  epithet: 'Orchestrator of High-Throughput Relics & Distributed Fault-Tolerant Citadels',
  bioSummary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  manifesto: [
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    'Omnis enim res, quanto magis ad perfectionis fastigium vergit, tanto maiore severitate ac disciplina indiget. We construct software not as ephemeral sandcastles, but as gothic cathedrals—enduring, monolithic, yet intricately balanced.',
    'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.'
  ],
  location: 'San Francisco, CA / London / Remote Astral Plane',
  status: 'AVAILABLE FOR SELECT ENGAGEMENTS & ARCHITECTURAL COUNCIL',
  email: 'valerius.mordecai@sanctum-void.org',
  phonePlaceholder: '+1 (555) 839-4021',
  pgpKey: '4A8F 9C12 B807 3E55 D1F6 20AA 99B8 E4D1 7C23 F880',
  github: 'https://github.com',
  twitter: 'https://x.com',
  linkedin: 'https://linkedin.com',
  stats: [
    { label: 'Epochs of Lore', value: '10+', subtext: 'Years forging fault-tolerant systems' },
    { label: 'Artifacts Shipped', value: '48+', subtext: 'Distributed engines & production releases' },
    { label: 'Peak Concurrency', value: '14.2M', subtext: 'Concurrent websocket streams orchestrated' },
    { label: 'Zero-Downtime Rate', value: '99.999%', subtext: 'Continuous cathedral resilience' }
  ]
};

export const initialProjects: Project[] = [
  {
    id: 'project-aethelgard',
    title: 'Aethelgard Vault & Consensus Engine',
    codeName: 'PROJECT OBSIDIAN-IX',
    category: 'Systems & Arch',
    period: '2025 — Present',
    summary:
      'Lorem ipsum dolor sit amet: A high-frequency zero-knowledge ledger engine designed with Byzantine fault tolerance and asynchronous state pruning.',
    fullDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Built to withstand adverse network partitions, Aethelgard processes over 240,000 verifiable transactions per second using sub-millisecond cryptographic commit pipelines.',
    architecturalHighlights: [
      'Sub-2ms state synchronization across 32 sovereign geo-zones',
      'Zero-allocation memory layout utilizing custom ring-buffer pools',
      'Formal mathematical verification with TLA+ specifications',
      'Encrypted cold-state persistence with deterministic snapshotting'
    ],
    impactMetric: '240k TPS',
    impactLabel: 'Cryptographic commit benchmark',
    technologies: ['Rust', 'Raft Consensus', 'Zero-Knowledge Proofs', 'eBPF', 'Tokio', 'gRPC'],
    links: {
      preview: 'https://github.com',
      repository: 'https://github.com',
      documentation: 'https://github.com'
    },
    featured: true
  },
  {
    id: 'project-nocturne-protocol',
    title: 'Nocturne Mesh & Neural Gatekeeper',
    codeName: 'PROJECT RELIC-7',
    category: 'Cryptographic',
    period: '2024 — 2025',
    summary:
      'Lorem ipsum dolor sit amet: Ephemeral decentralized message routing fabric with post-quantum lattice encryption and oblivious RAM transport.',
    fullDescription:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Implemented quantum-resistant lattice primitives (Kyber & Dilithium) into high-bandwidth edge proxies.',
    architecturalHighlights: [
      'Post-quantum key encapsulation with instant forward secrecy',
      'Oblivious peer-to-peer gossip protocol with zero metadata leakage',
      'Automated DDoS entropy throttling with cryptographic proof-of-work challenges'
    ],
    impactMetric: '< 18ms',
    impactLabel: 'Global routing latency floor',
    technologies: ['C++20', 'Go', 'Kyber-1024', 'WireGuard Protocol', 'WebAssembly'],
    links: {
      preview: 'https://github.com',
      repository: 'https://github.com'
    },
    featured: true
  },
  {
    id: 'project-basilica-ui',
    title: 'Basilica Terminal & High-Density Canvas',
    codeName: 'OPUS CATHEDRALIS',
    category: 'Engine & UI',
    period: '2024',
    summary:
      'Lorem ipsum dolor sit amet: WebGPU-accelerated real-time observability workstation rendering millions of live telemetry graph edges at 120 FPS.',
    fullDescription:
      'Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. A dark editorial spatial control surface crafted for mission-critical infrastructure operators with tactile keyboard ergonomics.',
    architecturalHighlights: [
      'Custom WebGPU vertex pipeline handling 2.5M nodes without jank',
      'Zero-latency layout calculation via Rust WebAssembly compute shaders',
      'Gothic dark tactile theme with bespoke sub-pixel monospace rendering'
    ],
    impactMetric: '120 FPS',
    impactLabel: 'Sustained canvas framerate at 2M nodes',
    technologies: ['TypeScript', 'WebGPU', 'WebGL', 'WebAssembly', 'Tailwind CSS', 'React'],
    links: {
      preview: 'https://github.com',
      documentation: 'https://github.com'
    },
    featured: true
  },
  {
    id: 'project-sanctum-kernel',
    title: 'Sanctum Microkernel & Memory Fortress',
    codeName: 'PROJECT CRYPT-IV',
    category: 'Security',
    period: '2023 — 2024',
    summary:
      'Lorem ipsum dolor sit amet: Hardened capability-based container isolation hypervisor for executing untrusted guest runtimes in sandboxed enclaves.',
    fullDescription:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Designed for confidential cloud enclaves utilizing hardware-enforced memory encryption.',
    architecturalHighlights: [
      'Capability-oriented micro-kernel with under 15,000 lines of verified core code',
      'Protection against speculative cache-timing side-channels (Spectre/Meltdown mitigation)',
      'Deterministic memory scrub cycles on thread eviction'
    ],
    impactMetric: '0 CVEs',
    impactLabel: 'Audited by three independent tier-1 red teams',
    technologies: ['Rust', 'ASM', 'AMD SEV-SNP', 'Intel SGX', 'Linux KVM'],
    links: {
      repository: 'https://github.com'
    },
    featured: false
  },
  {
    id: 'project-vesper-stream',
    title: 'Vesper Temporal Event Replay Broker',
    codeName: 'CHRONOS BLACK',
    category: 'Systems & Arch',
    period: '2023',
    summary:
      'Lorem ipsum dolor sit amet: Distributed append-only immutable event log engine with hardware-accelerated compression and deterministic replay.',
    fullDescription:
      'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Features direct NVMe kernel bypass via io_uring to achieve maximum I/O throughput on bare-metal clusters.',
    architecturalHighlights: [
      'io_uring zero-copy disk writes matching raw NVMe saturation ceilings',
      'Zstandard dictionary compression fine-tuned for high-cardinality JSON/Protobuf events',
      'Bi-temporal state indexing for immediate time-travel debugging'
    ],
    impactMetric: '4.8 GB/s',
    impactLabel: 'Sustained ingest rate per storage node',
    technologies: ['Rust', 'io_uring', 'Protobuf', 'Zstandard', 'Prometheus'],
    links: {
      repository: 'https://github.com'
    },
    featured: false
  },
  {
    id: 'project-grimoire-compiler',
    title: 'Grimoire Domain Language & Compiler',
    codeName: 'LUA EX MORTIS',
    category: 'Engine & UI',
    period: '2022 — 2023',
    summary:
      'Lorem ipsum dolor sit amet: Type-safe, static-analysis driven domain-specific language for expressing complex cryptographic multi-party contracts.',
    fullDescription:
      'Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat. Includes an interactive language server (LSP) and bytecode emulator.',
    architecturalHighlights: [
      'LLVM backend emitting optimized bytecode targeting both WASM and native x86/ARM',
      'Formal affine type system prohibiting resource double-spend bugs at compile time',
      'Instant hot-reloading REPL embedded within modern terminal shells'
    ],
    impactMetric: '100% Safety',
    impactLabel: 'Compile-time guarantee against reentrancy vulnerabilities',
    technologies: ['Rust', 'LLVM', 'LSP Protocol', 'Treesitter', 'WebAssembly'],
    links: {
      preview: 'https://github.com',
      repository: 'https://github.com'
    },
    featured: false
  }
];

export const initialSkills: SkillCategory[] = [
  {
    title: 'Architectural Sorcery & Systems Core',
    latinTitle: 'Architectura Fundamentalis',
    iconName: 'Cpu',
    description: 'Low-latency systems, kernel bypass, distributed consensus, and zero-allocation memory paradigms.',
    skills: [
      { name: 'Rust (Async Tokio & Systems)', level: 98, tier: 'Grandmaster', specialty: 'Lockless Data Structures & eBPF' },
      { name: 'Distributed Systems & Raft/Paxos', level: 95, tier: 'Grandmaster', specialty: 'Fault-tolerant multi-master topologies' },
      { name: 'C++20 & Systems Programming', level: 88, tier: 'Master', specialty: 'SIMD Vectorization & Cache Locality' },
      { name: 'Linux Kernel & io_uring', level: 90, tier: 'Master', specialty: 'Zero-copy I/O & Enclave virtualization' },
      { name: 'Go (High-Throughput Services)', level: 92, tier: 'Grandmaster', specialty: 'Concurrent micro-daemons & gRPC' }
    ]
  },
  {
    title: 'Cryptographic Arts & Zero-Knowledge',
    latinTitle: 'Ars Cryptographica',
    iconName: 'Shield',
    description: 'Applied cryptography, post-quantum primitives, zero-knowledge proofs, and secure hardware enclaves.',
    skills: [
      { name: 'Post-Quantum Lattice Encryption', level: 88, tier: 'Master', specialty: 'Kyber / Dilithium algorithm pipelines' },
      { name: 'Zero-Knowledge Proofs (ZK-SNARKs)', level: 84, tier: 'Master', specialty: 'Circuit design & verification constraints' },
      { name: 'Hardware Enclaves (SGX / SEV)', level: 86, tier: 'Master', specialty: 'Confidential cloud compute memory fortress' },
      { name: 'Formal Verification (TLA+)', level: 80, tier: 'Adept', specialty: 'State machine safety proofs' }
    ]
  },
  {
    title: 'Interface Witchcraft & Spatial Ergonomics',
    latinTitle: 'Artificium Visuale',
    iconName: 'Layout',
    description: 'Dark mode mastery, WebGPU shader graphics, high-density telemetry dashboards, and precision ergonomics.',
    skills: [
      { name: 'TypeScript & Modern React', level: 96, tier: 'Grandmaster', specialty: 'Zero-jank 120fps state architecture' },
      { name: 'WebGPU & Shaders (WGSL)', level: 82, tier: 'Master', specialty: 'Massive parallel graph visualization' },
      { name: 'Tailwind CSS & Editorial Systems', level: 95, tier: 'Grandmaster', specialty: 'Gothic typographic hierarchy & micro-shadows' },
      { name: 'Framer Motion & Fluid Choreography', level: 92, tier: 'Grandmaster', specialty: 'Scroll-linked physics & cinematic transitions' }
    ]
  },
  {
    title: 'Infrastructure, Citadels & Reliability',
    latinTitle: 'Munitiones ac Custodia',
    iconName: 'Terminal',
    description: 'Immutable deployments, multi-cloud bare metal, site reliability, and observability telemetry.',
    skills: [
      { name: 'Kubernetes & Bare-Metal Orchestration', level: 90, tier: 'Master', specialty: 'Zero-trust ingress & custom operators' },
      { name: 'Observability & OpenTelemetry', level: 92, tier: 'Master', specialty: 'Distributed tracing at 10M span/sec scale' },
      { name: 'Terraform & Declarative Infra', level: 88, tier: 'Master', specialty: 'Multi-region immutable fortress clusters' },
      { name: 'CI/CD & Hermetic Nix Builds', level: 85, tier: 'Adept', specialty: 'Bit-for-bit reproducible release pipelines' }
    ]
  }
];

export const initialExperience: ExperienceRole[] = [
  {
    id: 'exp-principal-sanctum',
    role: 'Principal Systems Architect & Fellow',
    organization: 'Sanctum Cryptographic Citadel',
    division: 'Deep Systems & Infrastructure Council',
    period: '2023 — Present (Epoch VI)',
    location: 'San Francisco, CA / Geneva',
    seal: 'SC',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Directing the architectural destiny of the core consensus fabric and zero-knowledge privacy layers.',
    achievements: [
      'Lorem ipsum: Redesigned the primary peer-to-peer propagation layer, reducing median latency by 64% across trans-continental nodes.',
      'Led 18 senior infrastructure sorcerers in authoring the formal verification proofs for our sovereign execution runtime.',
      'Sustained 99.999% uptime across three consecutive years of unprecedented adversarial attack traffic.'
    ],
    technologies: ['Rust', 'eBPF', 'Tokio', 'Raft', 'WebAssembly', 'Prometheus']
  },
  {
    id: 'exp-staff-vesper',
    role: 'Staff Distributed Engineer',
    organization: 'Vesper Autonomous Technologies',
    division: 'Edge Intelligence & Real-time Stream Core',
    period: '2020 — 2023 (Epoch V)',
    location: 'London, UK / Remote',
    seal: 'VA',
    summary:
      'Lorem ipsum dolor sit amet: Architected the fault-tolerant telemetry stream broker processing trillions of sensor events weekly.',
    achievements: [
      'Pioneered custom io_uring storage engine that halved AWS bare-metal instance costs while tripling disk write throughput.',
      'Authored internal RFCs on cryptographic event integrity, establishing company-wide standards for audit immutability.',
      'Mentored 8 mid-level and junior engineers into senior technical leads.'
    ],
    technologies: ['Go', 'C++', 'Kafka/Redpanda', 'Kubernetes', 'gRPC', 'PostgreSQL']
  },
  {
    id: 'exp-senior-nocturne',
    role: 'Senior Core Systems Engineer',
    organization: 'Nocturne Defense & Cryptography',
    division: 'Applied Cryptography Guild',
    period: '2017 — 2020 (Epoch IV)',
    location: 'Zurich / Remote',
    seal: 'ND',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Implemented hardened capability hypervisors and encrypted network protocol bridges.',
    achievements: [
      'Delivered zero-knowledge identity authentication system utilized by over 4M enterprise endpoints.',
      'Discovered and patched 2 critical speculative execution vulnerabilities prior to production zero-day disclosure.',
      'Optimized cryptographic handshakes to sub-4ms using vectorized AVX-512 instructions.'
    ],
    technologies: ['C++17', 'Rust', 'OpenSSL/BoringSSL', 'Linux Enclaves', 'Python']
  },
  {
    id: 'exp-founding-engineer',
    role: 'Founding Infrastructure Engineer',
    organization: 'Aethel Labs (Seed to Series B)',
    division: 'Foundation Layer',
    period: '2015 — 2017 (Epoch III)',
    location: 'Cambridge, MA',
    seal: 'AL',
    summary:
      'Lorem ipsum dolor sit amet: Built the ground-up cloud infrastructure, database clusters, and continuous delivery pipeline.',
    achievements: [
      'Scaled system from 0 to 1,000,000 active daily requests with zero dedicated operations staff.',
      'Implemented automated multi-region failover that prevented multiple upstream cloud outages.'
    ],
    technologies: ['Go', 'Docker', 'PostgreSQL', 'Redis', 'AWS', 'Linux']
  }
];

export const initialAccreditations: Accreditation[] = [
  {
    id: 'acc-degree-master',
    title: 'Master of Science in Distributed Systems & Cryptography',
    institution: 'University of Oxford (Honours / Summa Cum Laude)',
    year: '2015',
    type: 'Degree',
    honor: 'First Class Honours with Distinction',
    description: 'Thesis on Byzantine Consensus Resilience under Asymmetric Network Partitions.'
  },
  {
    id: 'acc-degree-bachelor',
    title: 'Bachelor of Science in Computer Science & Pure Mathematics',
    institution: 'Massachusetts Institute of Technology',
    year: '2013',
    type: 'Degree',
    honor: 'Dean’s Honor List',
    description: 'Double focus in Abstract Algebra, Cryptography, and Formal Compiler Verification.'
  },
  {
    id: 'acc-cert-redteam',
    title: 'Offensive Security Certified Expert (OSCE / GXPN)',
    institution: 'GIAC / Offensive Security',
    year: '2021',
    type: 'Certification',
    description: 'Exploitation research, kernel debugging, and cryptographic algorithm penetration testing.'
  },
  {
    id: 'acc-pub-ieee',
    title: 'Paper: "Sub-Millisecond ZK Proof Generation in Memory-Constrained Hardware"',
    institution: 'IEEE Symposium on Security and Privacy',
    year: '2024',
    type: 'Publication',
    description: 'Peer-reviewed research detailing hardware-assisted zero-knowledge proof acceleration pipelines.'
  }
];
