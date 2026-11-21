export interface SkillLink {
  label: string;
  labelEn: string;
  href: string;
}

export interface SkillItem {
  name: string;
  context: string;
  contextEn: string;
  note: string;
  noteEn: string;
  links: SkillLink[];
}

export interface SkillPillar {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  items: SkillItem[];
}

export const skillPillars: SkillPillar[] = [
  {
    id: "backend",
    title: "Backend & Sistemas",
    titleEn: "Backend & Systems",
    subtitle: "APIs, microsserviços, CLIs e regras de negócio em produção",
    subtitleEn: "APIs, microservices, CLIs, and production business logic",
    items: [
      {
        name: "Node.js, NestJS & TypeScript",
        context: "Produção + Projetos",
        contextEn: "Production + Projects",
        note: "APIs REST, microsserviços, Nodemailer, testes de integração Jest e tipagem ponta a ponta",
        noteEn: "REST APIs, microservices, Nodemailer jobs, Jest integration tests, and end-to-end typing",
        links: [
          { label: "VehiGo", labelEn: "VehiGo", href: "/projects/vehigo" },
          { label: "TrackIt", labelEn: "TrackIt", href: "/projects/trackit" },
          { label: "Skypass", labelEn: "Skypass", href: "/#production" },
        ],
      },
      {
        name: "Go (Golang)",
        context: "Open Source · Foco ativo",
        contextEn: "Open Source · Active focus",
        note: "CLIs/TUIs em binário único, orquestração de processos via os/exec e sistemas concorrentes",
        noteEn: "Single-binary CLIs/TUIs, process orchestration via os/exec, and concurrent backend tooling",
        links: [
          { label: "go-vit", labelEn: "go-vit", href: "/projects/go-vit" },
        ],
      },
      {
        name: "PHP",
        context: "Produção",
        contextEn: "Production",
        note: "Evolução, debugging e módulos construídos do zero em ERP corporativo multi-empresa",
        noteEn: "Debugging, maintenance, and zero-to-production modules in multi-tenant enterprise software",
        links: [
          { label: "Skypass", labelEn: "Skypass", href: "/#production" },
        ],
      },
      {
        name: "Rust",
        context: "Open Source · Sistemas",
        contextEn: "Open Source · Systems",
        note: "Binários nativos Linux com GTK4/Libadwaita e inspeção segura de requisições HTTP",
        noteEn: "Native Linux binaries with GTK4/Libadwaita and safe HTTP redirect inspection",
        links: [
          { label: "Look4", labelEn: "Look4", href: "/projects/look4" },
        ],
      },
    ],
  },
  {
    id: "data-infra",
    title: "Dados & Infraestrutura Linux",
    titleEn: "Data & Linux Infrastructure",
    subtitle: "Modelagem relacional, cache, proxy reverso e operação em servidor",
    subtitleEn: "Relational modeling, caching, reverse proxies, and server operations",
    items: [
      {
        name: "PostgreSQL, MySQL & Oracle",
        context: "Produção + Projetos",
        contextEn: "Production + Projects",
        note: "Modelagem DER, constraints, queries analíticas multi-empresa e integridade transacional",
        noteEn: "ERD modeling, constraints, multi-tenant SQL queries, and transactional integrity",
        links: [
          { label: "Skypass", labelEn: "Skypass", href: "/#production" },
          { label: "VehiGo", labelEn: "VehiGo", href: "/projects/vehigo" },
          { label: "TrackIt", labelEn: "TrackIt", href: "/projects/trackit" },
        ],
      },
      {
        name: "Redis 7",
        context: "Projetos",
        contextEn: "Projects",
        note: "Cache em memória integrado à arquitetura de microsserviços containerizada",
        noteEn: "In-memory caching integrated into containerized microservice architectures",
        links: [
          { label: "VehiGo", labelEn: "VehiGo", href: "/projects/vehigo" },
        ],
      },
      {
        name: "Linux, SSH, Nginx & Docker",
        context: "Produção + Projetos",
        contextEn: "Production + Projects",
        note: "Deploys via SSH, investigação de incidentes, API Gateway com proxy reverso e Docker Compose",
        noteEn: "SSH production deploys, incident response, reverse-proxy API Gateway, and Docker Compose",
        links: [
          { label: "Skypass", labelEn: "Skypass", href: "/#production" },
          { label: "VehiGo", labelEn: "VehiGo", href: "/projects/vehigo" },
          { label: "Look4", labelEn: "Look4", href: "/projects/look4" },
        ],
      },
      {
        name: "Python (Automação)",
        context: "Produção",
        contextEn: "Production",
        note: "Monitoramento automatizado de uso de disco em VMs Linux via SSH",
        noteEn: "Automated Linux VM disk-usage monitoring over SSH",
        links: [
          { label: "Skypass", labelEn: "Skypass", href: "/#production" },
        ],
      },
    ],
  },
  {
    id: "frontend-mobile",
    title: "Frontend & Mobile",
    titleEn: "Frontend & Mobile",
    subtitle: "Entrega completa quando o produto precisa de interface web ou app",
    subtitleEn: "End-to-end delivery when products need web dashboards or mobile apps",
    items: [
      {
        name: "Next.js & React",
        context: "Projetos",
        contextEn: "Projects",
        note: "Dashboards administrativos, SSR/SSG, roteamento i18n e interfaces responsivas",
        noteEn: "Admin dashboards, SSR/SSG, i18n routing, and responsive web interfaces",
        links: [
          { label: "TrackIt", labelEn: "TrackIt", href: "/projects/trackit" },
        ],
      },
      {
        name: "React Native & Expo",
        context: "Projetos",
        contextEn: "Projects",
        note: "Apps Android/iOS com Google Maps, autenticação JWT e integração com APIs REST",
        noteEn: "Android/iOS apps with Google Maps, JWT auth, and REST API integrations",
        links: [
          { label: "VehiGo", labelEn: "VehiGo", href: "/projects/vehigo" },
          { label: "TrackIt", labelEn: "TrackIt", href: "/projects/trackit" },
        ],
      },
      {
        name: "Angular",
        context: "Produção",
        contextEn: "Production",
        note: "Manutenção, evolução de telas e debugging em sistemas corporativos",
        noteEn: "Maintenance, UI evolution, and debugging in enterprise web systems",
        links: [
          { label: "Skypass", labelEn: "Skypass", href: "/#production" },
        ],
      },
      {
        name: "Tailwind CSS",
        context: "Projetos",
        contextEn: "Projects",
        note: "Sistemas de design enxutos com foco em contraste, hierarquia e responsividade",
        noteEn: "Lean design systems focused on contrast, visual hierarchy, and responsiveness",
        links: [
          { label: "TrackIt", labelEn: "TrackIt", href: "/projects/trackit" },
        ],
      },
    ],
  },
];
