export interface ArchitectureNode {
  id: string;
  label: string;
  layer: "client" | "gateway" | "service" | "data";
  tech: string;
  description: string;
  descriptionEn: string;
}

export interface Project {
  id: string;
  slug: string;
  featured: boolean;
  year: string;
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  summary: string;
  summaryEn: string;
  problem: string;
  problemEn: string;
  stack: string[];
  highlights: string[];
  highlightsEn: string[];
  architectureNodes: ArchitectureNode[];
  links: {
    repo?: string;
    demo?: string;
    paper?: string;
  };
  statusNote?: string;
  statusNoteEn?: string;
}

export const projects: Project[] = [
  {
    id: "tcc",
    slug: "trackit",
    featured: true,
    year: "2025",
    category: "Fullstack Multi-App",
    categoryEn: "Fullstack Multi-App",
    title: "TrackIt",
    titleEn: "TrackIt",
    subtitle: "Plataforma de Auditoria e Rastreabilidade Logística",
    subtitleEn: "Logistics Auditability & Delivery Tracking Platform",
    summary:
      "Ecossistema completo de ponta a ponta (API NestJS + Dashboard Next.js + App React Native) com rotas Google Maps, BrasilAPI e testes Jest.",
    summaryEn:
      "End-to-end ecosystem (NestJS API + Next.js Dashboard + React Native App) featuring Google Maps routing, BrasilAPI, and Jest tests.",
    problem:
      "Operações de entrega frequentemente carecem de trilha auditável entre despacho, motorista em campo e conferência cadastral de destinatários. O TrackIt unifica operação web e mobile em uma base única tipada.",
    problemEn:
      "Delivery operations often lack an auditable trail between dispatch, field drivers, and recipient verification. TrackIt unifies web operations and mobile driver tracking on a single strongly-typed architecture.",
    stack: ["NestJS", "Next.js", "React Native", "MySQL", "Google Maps API", "Jest"],
    highlights: [
      "Desenvolvimento fullstack individual da arquitetura completa (API, Web e Mobile)",
      "Modelagem relacional completa em MySQL com Diagrama Entidade-Relacionamento (DER)",
      "Rotas, distância e navegação em tempo real via Google Maps API",
      "Consulta de CNPJ via BrasilAPI usando fetch nativo do Node.js (zero deps HTTP extras)",
      "Testes de integração automatizados em Jest com mock de fetch",
    ],
    highlightsEn: [
      "Solo fullstack engineering across API, Web Dashboard, and Mobile App",
      "Full MySQL relational modeling with Entity-Relationship Diagram (ERD)",
      "Driver routes, distance calculation, and navigation via Google Maps API",
      "Native Node.js fetch integration with BrasilAPI for CNPJ verification (zero extra HTTP deps)",
      "Automated Jest integration tests with mocked fetch boundaries",
    ],
    architectureNodes: [
      {
        id: "clients",
        label: "Web & Mobile",
        layer: "client",
        tech: "Next.js • React Native / Expo",
        description:
          "Dashboard administrativo em Next.js para auditoria e aplicativo React Native para motoristas em rota.",
        descriptionEn:
          "Next.js admin dashboard for auditability and React Native driver app for live route tracking.",
      },
      {
        id: "nestjs",
        label: "API REST NestJS",
        layer: "service",
        tech: "NestJS • TypeScript • Jest",
        description:
          "Backend modular com regras de negócio, validação de entregas e suíte de testes de integração.",
        descriptionEn:
          "Modular backend handling business rules, delivery audit logs, and integration test suites.",
      },
      {
        id: "external",
        label: "Maps & BrasilAPI",
        layer: "gateway",
        tech: "Google Maps • Native Fetch",
        description:
          "Cálculo de rotas e consulta automática de CNPJ sem bibliotecas HTTP externas.",
        descriptionEn:
          "Route calculation and automated CNPJ lookup using native Node.js fetch.",
      },
      {
        id: "mysql",
        label: "MySQL Relacional",
        layer: "data",
        tech: "MySQL • DER",
        description:
          "Banco relacional normalizado para rastreabilidade histórica de entregas e motoristas.",
        descriptionEn:
          "Normalized relational database storing full delivery and driver audit trails.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/TCC_TrackIt",
    },
  },
  {
    id: "vehigo",
    slug: "vehigo",
    featured: true,
    year: "2025",
    category: "Arquitetura Distribuída",
    categoryEn: "Distributed Architecture",
    title: "VehiGo",
    titleEn: "VehiGo",
    subtitle: "Plataforma de Aluguel de Veículos em Microsserviços",
    subtitleEn: "Distributed Vehicle Rental Microservices Platform",
    summary:
      "Plataforma distribuída com API Gateway Nginx, microsserviços desacoplados, PostgreSQL com TypeORM e aplicativo mobile React Native.",
    summaryEn:
      "Distributed platform engineered with Nginx API Gateway, decoupled microservices, PostgreSQL with TypeORM, and a React Native mobile app.",
    problem:
      "Sistemas monolíticos de reserva sofrem com acoplamento entre catálogo, usuários e agendamentos. O VehiGo foi desenhado com DDD, Diagramas C4, ADRs e especificações OpenAPI 3.0 para isolar domínios e escalar serviços de forma independente.",
    problemEn:
      "Monolithic booking systems suffer from tight coupling between users, fleet catalog, and reservations. VehiGo was designed using DDD, C4 Diagrams, ADRs, and OpenAPI 3.0 specs to isolate bounded contexts and scale services independently.",
    stack: ["Node.js", "TypeScript", "Nginx", "PostgreSQL", "React Native", "Docker"],
    highlights: [
      "3 microsserviços desacoplados (usuarios-service, veiculos-service, reservas-service)",
      "API Gateway centralizado em Nginx com proxies reversos e controle de Ingress",
      "Persistência relacional em PostgreSQL 15 com TypeORM e containers Docker",
      "App mobile iOS/Android em React Native (Expo) com autenticação JWT e filtros",
      "Documentação arquitetural completa: Diagramas C4, DDD, ADRs e OpenAPI 3.0",
    ],
    highlightsEn: [
      "3 decoupled microservices (usuarios-service, veiculos-service, reservas-service)",
      "Centralized Nginx API Gateway handling reverse proxies and Ingress routing",
      "Relational persistence in PostgreSQL 15 via TypeORM inside Docker containers",
      "iOS/Android mobile app in React Native (Expo) with JWT auth and fleet filtering",
      "Complete architectural docs: C4 Diagrams, DDD, ADRs, and OpenAPI 3.0 specs",
    ],
    architectureNodes: [
      {
        id: "mobile",
        label: "Mobile App",
        layer: "client",
        tech: "React Native • Expo • JWT",
        description:
          "Cliente iOS/Android responsável pelo fluxo de autenticação, busca filtrada de veículos e criação de reservas.",
        descriptionEn:
          "iOS/Android client handling JWT authentication, filtered vehicle search, and reservation checkout.",
      },
      {
        id: "nginx",
        label: "Nginx Gateway",
        layer: "gateway",
        tech: "Nginx • Reverse Proxy",
        description:
          "Ponto único de entrada que roteia requisições HTTP para os respectivos microsserviços internos sem expor portas diretas.",
        descriptionEn:
          "Single entry point routing HTTP traffic to internal microservices without exposing service ports directly.",
      },
      {
        id: "services",
        label: "Core Services (x3)",
        layer: "service",
        tech: "Node.js • Express • TypeScript",
        description:
          "Serviços isolados por domínio (usuários, veículos e reservas), seguindo Bounded Contexts de DDD e contratos OpenAPI 3.0.",
        descriptionEn:
          "Domain-isolated services (users, vehicles, reservations) following DDD Bounded Contexts and OpenAPI 3.0 contracts.",
      },
      {
        id: "postgres",
        label: "PostgreSQL 15",
        layer: "data",
        tech: "PostgreSQL • TypeORM • Docker",
        description:
          "Camada de persistência relacional containerizada garantindo integridade transacional nas reservas.",
        descriptionEn:
          "Containerized relational persistence layer ensuring transactional integrity across bookings.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/VehiGo",
    },
  },
  {
    id: "go-vit",
    slug: "go-vit",
    featured: true,
    year: "2026",
    category: "Open Source • CLI / TUI em Go",
    categoryEn: "Open Source • Go CLI / TUI",
    title: "go-vit",
    titleEn: "go-vit",
    subtitle: "Gerenciador Visual de Git para Terminal em Golang",
    subtitleEn: "Visual Git Manager TUI Built in Golang",
    summary:
      "Ferramenta TUI open-source escrita em Go para gerenciar branches, diffs coloridos linha a linha, stage/commit, stash e resolução visual de conflitos.",
    summaryEn:
      "Open-source terminal UI (TUI) written in Go for managing branches, line-by-line color diffs, staging/commits, stash, and visual merge conflict resolution.",
    problem:
      "Alternar entre comandos Git verbosos no terminal e IDEs pesadas quebra o fluxo de trabalho. O go-vit entrega uma interface TUI leve, instalável com um único binário Go (`go install`), intuitiva para uso diário.",
    problemEn:
      "Switching between verbose Git CLI commands and heavy IDEs breaks developer flow. go-vit delivers a fast, single-binary Go TUI (`go install`) built for everyday Git workflows.",
    stack: ["Go (Golang)", "TUI", "Git CLI", "Open Source"],
    highlights: [
      "Instalável via `go install github.com/FelipeSrutkoske/go-vit@latest`",
      "Gerenciamento completo de branches locais/remotas com opção automática de Stash + Switch",
      "Visualização de diff linha a linha com destaque semântico (+ / -) e navegação estilo Vim (j/k/g/G)",
      "Detector visual de conflitos de merge (Ours / Theirs / abrir direto no $EDITOR)",
    ],
    highlightsEn: [
      "Distributable via `go install github.com/FelipeSrutkoske/go-vit@latest`",
      "Full local/remote branch management with automatic Stash + Switch safety",
      "Line-by-line semantic diff viewer with Vim-style keyboard navigation (j/k/g/G)",
      "Visual merge conflict resolver (Ours / Theirs / open directly in $EDITOR)",
    ],
    architectureNodes: [
      {
        id: "tui",
        label: "TUI Event Loop",
        layer: "client",
        tech: "Go • Keybindings (Vim)",
        description:
          "Interface dividida em abas (Branches / Alterações & Conflitos) com atalhos de teclado responsivos.",
        descriptionEn:
          "Tabbed terminal interface (Branches / Changes & Conflicts) driven by responsive keyboard shortcuts.",
      },
      {
        id: "git-engine",
        label: "Git Command Runner",
        layer: "service",
        tech: "Go os/exec • Parsers",
        description:
          "Orquestra status, diff, stash, fetch/pull e parseia marcadores de conflito em tempo real.",
        descriptionEn:
          "Orchestrates status, diff, stash, fetch/pull and parses conflict markers in real time.",
      },
      {
        id: "repo",
        label: "Local Git Repo",
        layer: "data",
        tech: "Git • $EDITOR",
        description:
          "Opera diretamente sobre o repositório local com abertura imediata de conflitos no editor padrão.",
        descriptionEn:
          "Operates directly on local Git objects with instant fallback to $EDITOR.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/go-vit",
    },
  },
  {
    id: "look4",
    slug: "look4",
    featured: false,
    year: "2026",
    category: "Desktop Linux • Rust & GTK4",
    categoryEn: "Linux Desktop • Rust & GTK4",
    title: "Look4",
    titleEn: "Look4",
    subtitle: "Verificador de Links & Redirecionamentos para GNOME",
    subtitleEn: "Fast URL Security & Redirect Tracer for GNOME / Linux",
    summary:
      "Aplicativo nativo Linux em Rust + GTK4/Libadwaita com atalhos globais para análise via VirusTotal e rastreamento de URL final.",
    summaryEn:
      "Native Linux app built in Rust + GTK4/Libadwaita with global shortcuts for VirusTotal threat scanning and final redirect URL tracing.",
    problem:
      "Links encurtados e suspeitos exigem inspeção rápida sem abrir abas inseguras no navegador. O Look4 roda em background no GNOME e responde instantaneamente via atalhos globais.",
    problemEn:
      "Shortened and suspicious links need fast inspection without opening unsafe browser tabs. Look4 runs in the GNOME background and responds instantly via global shortcuts.",
    stack: ["Rust", "GTK4", "Libadwaita", "Linux", "VirusTotal API"],
    highlights: [
      "Binário nativo compilado em Rust com interface GTK4 / Libadwaita integrada ao GNOME",
      "Atalhos globais (Ctrl+Alt+V para scan de segurança, Ctrl+Alt+R para rastrear redirecionamentos)",
      "Instalador automatizado com launcher no menu de aplicativos e autostart do usuário",
    ],
    highlightsEn: [
      "Native Rust binary with GTK4 / Libadwaita UI integrated into GNOME",
      "Global shortcuts (Ctrl+Alt+V for threat scan, Ctrl+Alt+R for final redirect trace)",
      "Automated user-space installer with desktop launcher and autostart",
    ],
    architectureNodes: [
      {
        id: "gnome",
        label: "GNOME & Shortcuts",
        layer: "client",
        tech: "GTK4 • Libadwaita • DBus",
        description: "Atalhos globais e janela nativa integrada ao ambiente Linux.",
        descriptionEn: "Global keyboard shortcuts and native Linux desktop window.",
      },
      {
        id: "rust-core",
        label: "Rust Core Tracer",
        layer: "service",
        tech: "Rust • OpenSSL • HTTP",
        description: "Segue cadeias de redirecionamento HTTP e consulta reputação.",
        descriptionEn: "Resolves HTTP redirect chains and queries link reputation.",
      },
      {
        id: "vt-api",
        label: "VirusTotal API",
        layer: "data",
        tech: "REST v3",
        description: "Verificação de ameaças diretamente da área de transferência.",
        descriptionEn: "Real-time threat checks straight from clipboard.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/look4",
    },
  },
  {
    id: "skypass-features",
    slug: "skypass-enterprise",
    featured: false,
    year: "08/2025 — 08/2026",
    category: "Produção & Infra Linux",
    categoryEn: "Production & Linux Infra",
    title: "Skypass Modules",
    titleEn: "Skypass Modules",
    subtitle: "Sistemas Corporativos Multi-Empresa & Sustentação",
    subtitleEn: "Multi-Tenant Enterprise Systems & Infrastructure",
    summary:
      "Desenvolvimento do zero de Ordem de Serviço, módulo automatizado de alertas de faturamento (Nodemailer), automações Python/SSH e segurança Linux.",
    summaryEn:
      "Zero-to-production Service Order system, automated billing alerts (Nodemailer), Python/SSH monitoring automations, and Linux incident mitigation.",
    problem:
      "Ambientes corporativos multi-empresa exigem zero downtime, rastreabilidade financeira e resposta rápida a incidentes de banco de dados e servidor em produção.",
    problemEn:
      "Multi-tenant enterprise environments demand zero downtime, financial accuracy, and rapid incident response across production databases and Linux servers.",
    stack: ["PHP", "Node.js", "MySQL", "Oracle", "Python", "Linux SSH"],
    highlights: [
      "Ordem de Serviço criada do zero: modelagem MySQL/Oracle, backend PHP, telas e deploy",
      "Alertas automatizados de faturamento cruzando vendas/cancelamentos via Nodemailer",
      "Scripts Python de monitoramento de disco via SSH e conferência de importações em JS",
      "Diagnóstico e mitigação de comprometimento de servidor Linux em produção",
    ],
    highlightsEn: [
      "Zero-to-production Service Order module: MySQL/Oracle modeling, PHP backend, UI, and deploy",
      "Automated billing alerts querying ticket sales/cancellations via Nodemailer",
      "Python SSH disk-monitoring scripts and JS cross-tenant import verification",
      "Investigation and mitigation of Linux server security incidents in production",
    ],
    architectureNodes: [
      {
        id: "apps",
        label: "ERP & OS Web",
        layer: "client",
        tech: "PHP • Angular • Node.js",
        description: "Módulos multi-empresa utilizados diariamente em operação.",
        descriptionEn: "Multi-tenant modules used daily in live operations.",
      },
      {
        id: "jobs",
        label: "Automações & Alertas",
        layer: "service",
        tech: "Node.js • Nodemailer • Python",
        description: "Rotinas automatizadas de faturamento e monitoramento SSH.",
        descriptionEn: "Automated billing notifications and SSH health checks.",
      },
      {
        id: "infra",
        label: "Linux + MySQL/Oracle",
        layer: "data",
        tech: "Linux SSH • MySQL • Oracle",
        description: "Bancos relacionais corporativos, deploys e hardening de servidores.",
        descriptionEn: "Enterprise relational databases, deployments, and server hardening.",
      },
    ],
    links: {},
    statusNote: "Código privado (Produção)",
    statusNoteEn: "Private code (Production)",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
