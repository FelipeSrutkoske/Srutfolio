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
    id: "vt-shield",
    slug: "vt-shield",
    featured: true,
    year: "2025",
    category: "Cibersegurança",
    categoryEn: "Cybersecurity",
    title: "VT Shield",
    titleEn: "VT Shield",
    subtitle: "Extensão Chromium de Análise Cibernética em Tempo Real",
    subtitleEn: "Real-Time Chromium Cyber Threat Scanner Extension",
    summary:
      "Extensão Manifest V3 com Service Workers para análise instantânea de links e textos suspeitos integrada à API v3 do VirusTotal.",
    summaryEn:
      "Manifest V3 browser extension powered by Service Workers for instant link and text threat scanning via VirusTotal API v3.",
    problem:
      "Copiar links suspeitos manualmente para analisadores web quebra o fluxo de navegação e expõe usuários a phishing. O VT Shield coloca inteligência de ameaças direto no menu de contexto do navegador.",
    problemEn:
      "Manually copying suspicious links into web scanners breaks browsing flow and exposes users to phishing. VT Shield brings threat intelligence directly to the browser context menu.",
    stack: ["JavaScript", "Manifest V3", "Service Workers", "VirusTotal API v3"],
    highlights: [
      "Arquitetura moderna Manifest V3 para navegadores baseados em Chromium",
      "Service Workers em background para contornar CORS e orquestrar chamadas assíncronas",
      "Integração com menu de contexto (clique direito) para links e textos selecionados",
      "Submissão automática e polling inteligente para URLs ainda não catalogadas",
    ],
    highlightsEn: [
      "Modern Manifest V3 architecture for Chromium-based browsers",
      "Background Service Workers bypassing CORS restrictions and managing async workflows",
      "Right-click context menu scanning for both URLs and selected text",
      "Automated URL submission and polling for uncatalogued links",
    ],
    architectureNodes: [
      {
        id: "context",
        label: "Context Menu UI",
        layer: "client",
        tech: "Chrome Extension • HTML/CSS",
        description:
          "Captura seleção de texto ou URL via clique direito e exibe o veredito de segurança ao usuário.",
        descriptionEn:
          "Captures right-click link or text selections and surfaces threat verdicts cleanly.",
      },
      {
        id: "worker",
        label: "Service Worker",
        layer: "service",
        tech: "Manifest V3 • Background",
        description:
          "Gerencia ciclo de vida assíncrono, contorno seguro de CORS e fila de polling.",
        descriptionEn:
          "Manages async lifecycle, CORS-safe requests, and polling queue.",
      },
      {
        id: "virustotal",
        label: "VirusTotal API v3",
        layer: "data",
        tech: "REST v3 • Threat Intel",
        description:
          "Consulta reputação de URLs e submete links inéditos para análise multi-engine.",
        descriptionEn:
          "Queries URL reputation and submits uncatalogued links for multi-engine scanning.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/VT_SHIELD",
    },
  },
  {
    id: "memedio",
    slug: "memedio",
    featured: false,
    year: "2026",
    category: "Mobile Offline-First",
    categoryEn: "Offline-First Mobile",
    title: "Memedio",
    titleEn: "Memedio",
    subtitle: "Gestão de Medicamentos 100% Offline",
    subtitleEn: "100% Offline Medication & Inventory Manager",
    summary:
      "App Android em React Native com Clean Architecture, módulo nativo AlarmManager para alertas exatos na tela de bloqueio e controle de estoque.",
    summaryEn:
      "Android React Native app built with Clean Architecture, native AlarmManager exact-time lock-screen alerts, and automatic pill inventory control.",
    problem:
      "Apps de saúde falham quando dependem de internet ou notificações imprecisas do SO. O Memedio garante disparo no minuto exato mesmo offline com confirmação direta na tela de bloqueio.",
    problemEn:
      "Health apps fail when relying on network connectivity or OS-throttled notifications. Memedio guarantees exact-minute alerts completely offline with lock-screen dose confirmation.",
    stack: ["React Native", "TypeScript", "Clean Architecture", "AlarmManager", "Reanimated"],
    highlights: [
      "Agendamento de doses e baixa automática de estoque funcionando 100% offline",
      "Clean Architecture com separação clara entre domínio, casos de uso e persistência local",
      "Integração com módulo nativo Android AlarmManager para alarmes exatos",
      "Animações acessíveis com Reanimated e testes automatizados",
    ],
    highlightsEn: [
      "Daily dose scheduling and automatic inventory deduction running 100% offline",
      "Clean Architecture separating domain, use cases, and local storage",
      "Native Android AlarmManager integration for exact-time lock-screen alerts",
      "Accessible Reanimated interactions and automated test coverage",
    ],
    architectureNodes: [
      {
        id: "ui",
        label: "Mobile UI",
        layer: "client",
        tech: "React Native • Reanimated",
        description: "Interface acessível com validação rigorosa de horários e doses.",
        descriptionEn: "Accessible interface with strict schedule and dosage validation.",
      },
      {
        id: "domain",
        label: "Clean Domain",
        layer: "service",
        tech: "TypeScript • Use Cases",
        description: "Regras de cálculo de estoque e recorrência desacopladas do framework.",
        descriptionEn: "Inventory deduction and recurrence rules decoupled from UI.",
      },
      {
        id: "native",
        label: "AlarmManager + DB",
        layer: "data",
        tech: "Android Native • Local Storage",
        description: "Disparo exato em background e persistência local sem internet.",
        descriptionEn: "Exact background triggers and offline local persistence.",
      },
    ],
    links: {},
    statusNote: "Em desenvolvimento",
    statusNoteEn: "In development",
  },
  {
    id: "skypass-features",
    slug: "skypass-enterprise",
    featured: false,
    year: "2025—Atual",
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
