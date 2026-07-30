/**
 * Edite este arquivo para adicionar, remover ou alterar os projetos exibidos.
 * Cada projeto é renderizado como um card na seção "projects".
 */

export interface Project {
  /** Identificador único (usado como key e slug). */
  id: string;
  /** Título do projeto. */
  title: string;
  /** Resumo do que foi feito e do impacto. */
  summary: string;
  /** Lista de tecnologias usadas. */
  stack: string[];
  /** Lista de destaques / aprendizados. */
  highlights: string[];
  /** Links opcionais: repositório, demo, artigo/TCC. */
  links: {
    repo?: string;
    demo?: string;
    paper?: string;
  };
  /** Sobrescritas opcionais em inglês (fallback = campos padrão em PT). */
  titleEn?: string;
  summaryEn?: string;
  highlightsEn?: string[];
}

export const projects: Project[] = [
  {
    id: "tcc",
    title: "TrackIt — Plataforma de Auditoria e Logística (Nota 9.3)",
    summary:
      "Trabalho de conclusão de curso desenvolvido 100% individualmente. Plataforma de auditabilidade e rastreabilidade de entregas constituída por API REST em NestJS, dashboard web em Next.js e aplicativo mobile em React Native.",
    stack: [
      "NestJS",
      "Next.js",
      "React Native",
      "Expo",
      "MySQL",
      "TypeScript",
      "Google Maps API",
      "Jest",
      "BrasilAPI",
    ],
    highlights: [
      "Nota 9.3/10 no TCC com desenvolvimento fullstack individual",
      "Arquitetura fullstack: Backend NestJS, Dashboard Web em Next.js e App Mobile com React Native/Expo",
      "Modelagem completa do banco de dados relacional e Diagrama Entidade-Relacionamento (DER)",
      "Navegação com Google Maps API (rotas, distância e destino) com testes de integração em Jest (mock de fetch)",
      "Integração nativa com BrasilAPI via fetch nativo do Node.js para consulta de CNPJ sem clientes HTTP externos",
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/TCC_TrackIt",
    },
    titleEn: "TrackIt — Auditability & Delivery Tracking (Grade 9.3)",
    summaryEn:
      "Individually developed graduation thesis (Grade 9.3/10). A full-stack delivery tracking and auditability platform with NestJS backend, Next.js web dashboard, and React Native mobile app.",
    highlightsEn: [
      "Grade 9.3/10 on Graduation Thesis (100% individually built)",
      "Fullstack architecture: NestJS Backend, Next.js Web Dashboard, and React Native/Expo Mobile App",
      "Complete relational database design and Entity-Relationship Diagram (ERD)",
      "Driver map routes, distance, and destination powered by Google Maps API with Jest integration tests",
      "Native Node.js fetch integration with BrasilAPI for CNPJ verification without external HTTP clients",
    ],
  },
  {
    id: "memedio",
    title: "Memedio — Gestão de Medicamentos Offline",
    summary:
      "Aplicativo Android 100% offline para gestão de medicamentos, agendamento de doses diárias e controle automático de estoque de remédios.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "SQLite",
      "Clean Architecture",
      "AlarmManager",
      "Reanimated",
    ],
    highlights: [
      "Agendamento de doses diárias e controle automático de estoque 100% offline",
      "Arquitetura Clean Architecture com persistência em banco de dados SQLite local",
      "Módulo nativo AlarmManager para notificações no horário exato com confirmação de dose na tela de bloqueio",
      "Acessibilidade com animações via Reanimated, validação rigorosa de formulários e testes automatizados",
    ],
    links: {},
    titleEn: "Memedio — Offline Medication Manager",
    summaryEn:
      "100% offline Android mobile application for medication management, daily dose scheduling, and automatic pill inventory control.",
    highlightsEn: [
      "Daily dose scheduling and automated medication inventory control working 100% offline",
      "Clean Architecture structure coupled with local SQLite database storage",
      "Native AlarmManager module integration for exact-time alerts with lock-screen dose confirmation",
      "Accessibility enhanced with Reanimated animations, form validation, and automated testing",
    ],
  },
  {
    id: "vt-shield",
    title: "VT Shield — Extensão de Segurança de URLs",
    summary:
      "Extensão para navegadores Chromium (Manifest V3) para análise cibernética de links e textos em tempo real utilizando a API v3 do VirusTotal.",
    stack: [
      "JavaScript",
      "Manifest V3",
      "VirusTotal API v3",
      "Service Workers",
      "HTML/CSS",
    ],
    highlights: [
      "Extensão desenvolvida sob a arquitetura Manifest V3 para navegadores baseados em Chromium",
      "Service Workers para contornar restrições de CORS e gerenciar requisições assíncronas",
      "Integração com API v3 do VirusTotal via menu de contexto no clique direito para análise direta de links e textos",
      "Submissão automática e polling de URLs ainda não catalogadas na base de inteligência",
    ],
    links: {},
    titleEn: "VT Shield — URL Cybersecurity Scanner",
    summaryEn:
      "Chromium extension (Manifest V3) for real-time link and text cyber threat scanning using the VirusTotal API v3.",
    highlightsEn: [
      "Browser extension engineered using modern Manifest V3 architecture",
      "Service Workers to bypass CORS restrictions and manage asynchronous HTTP requests",
      "Right-click context menu integration querying VirusTotal API v3 for selected links and text",
      "Automated URL submission and polling for uncatalogued links",
    ],
  },
  {
    id: "vehigo",
    title: "VehiGo — Sistema de Aluguel de Veículos (Microsserviços)",
    summary:
      "Plataforma distribuída para gestão e agendamento de aluguel de veículos baseada em arquitetura de microsserviços, API Gateway Nginx, cache distribuído Redis e app mobile React Native.",
    stack: [
      "Node.js",
      "TypeScript",
      "Express",
      "TypeORM",
      "PostgreSQL",
      "Redis",
      "Nginx",
      "React Native",
      "Expo",
      "Docker",
    ],
    highlights: [
      "Arquitetura de microsserviços desacoplados (usuarios-service, veiculos-service, reservas-service)",
      "API Gateway centralizado em Nginx com gerenciamento de Ingress e proxies reversos",
      "Persistência relacional em PostgreSQL 15 com TypeORM e camada de cache de alta performance com Redis 7",
      "Aplicativo mobile iOS/Android em React Native com Expo, autenticação JWT, busca com filtros e seleção de veículos",
      "Modelagem arquitetural completa com Diagramas C4, DDD (Domain-Driven Design), ADRs e especificações OpenAPI 3.0",
    ],
    links: {},
    titleEn: "VehiGo — Vehicle Rental Distributed Platform",
    summaryEn:
      "Distributed vehicle rental and reservation platform engineered with a microservices architecture, Nginx API Gateway, Redis distributed caching, and React Native mobile app.",
    highlightsEn: [
      "Decoupled microservices architecture (usuarios-service, veiculos-service, reservas-service)",
      "Centralized Nginx API Gateway handling Ingress routing and reverse proxies",
      "Relational data storage with PostgreSQL 15 & TypeORM combined with Redis 7 high-performance caching layer",
      "React Native Expo mobile app for iOS/Android featuring JWT authentication, vehicle filtering, and booking management",
      "Architectural design documented with C4 Diagrams, Domain-Driven Design (DDD), ADRs, and OpenAPI 3.0 specs",
    ],
  },
  {
    id: "skypass-features",
    title: "Módulos Corporativos & Sustentação (Skypass)",
    summary:
      "Desenvolvimento do zero de módulos corporativos de alto impacto para múltiplos clientes na Skypass System, além de automações internas e segurança de servidores Linux.",
    stack: ["PHP", "Node.js", "MySQL", "Oracle", "Nodemailer", "Python", "Linux"],
    highlights: [
      "Ordem de Serviço criada do zero: modelagem de banco relacional (MySQL/Oracle), backend PHP, telas e deploy",
      "Módulo automatizado de alertas de faturamento: consulta vendas/cancelamentos de passagens e dispara e-mails via Nodemailer",
      "Automações internas: scripts em Python para monitoramento de disco via SSH e JS para conferência de importação entre clientes",
      "Segurança: diagnóstico e mitigação de comprometimento de servidor Linux (shell remoto e mineração de criptomoedas)",
    ],
    links: {},
    titleEn: "Enterprise Modules & Infrastructure (Skypass)",
    summaryEn:
      "Zero-to-production development of high-impact enterprise modules for multi-client systems at Skypass System, along with internal automations and Linux server security.",
    highlightsEn: [
      "Zero-to-production Service Order system: relational DB modeling (MySQL/Oracle), PHP backend, UI, and live deploy",
      "Automated billing alert module: queries ticket sales/cancellations and dispatches automated emails via Nodemailer",
      "Internal automations: Python VM disk space monitoring via SSH and JavaScript customer database import cross-check",
      "Security: investigation and mitigation of Linux server compromise (remote shell & crypto-mining)",
    ],
  },
];
