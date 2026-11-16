export interface SkillItem {
  name: string;
  priority?: "primary" | "standard";
  note: string;
  noteEn: string;
  usedIn: string[];
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
    id: "backend-go",
    title: "Backend, APIs & Prioridade Go",
    titleEn: "Backend, APIs & Go Priority",
    subtitle: "Foco principal em Golang + ecossistema sólido em Node.js e PHP",
    subtitleEn: "Primary focus on Golang + battle-tested Node.js and PHP",
    items: [
      {
        name: "Go (Golang)",
        priority: "primary",
        note: "Prioridade de carreira: concorrência, CLIs, microsserviços e APIs de alta performance",
        noteEn: "Career priority: concurrency, CLIs, microservices, and high-throughput APIs",
        usedIn: ["vehigo"],
      },
      {
        name: "Node.js & NestJS",
        note: "APIs REST modulares, microsserviços, testes Jest e automações",
        noteEn: "Modular REST APIs, microservices, Jest testing, and automations",
        usedIn: ["vehigo", "tcc", "skypass-features"],
      },
      {
        name: "TypeScript",
        note: "Tipagem estrita ponta a ponta entre API, web e mobile",
        noteEn: "End-to-end strict typing across API, web, and mobile",
        usedIn: ["vehigo", "tcc", "memedio"],
      },
      {
        name: "PHP",
        note: "Sustentação e criação de módulos corporativos multi-empresa em produção",
        noteEn: "Production maintenance and zero-to-one enterprise modules",
        usedIn: ["skypass-features"],
      },
    ],
  },
  {
    id: "frontend-mobile",
    title: "Frontend & Mobile",
    titleEn: "Frontend & Mobile",
    subtitle: "Interfaces responsivas, extensões e apps offline-first",
    subtitleEn: "Responsive interfaces, browser extensions, and offline-first apps",
    items: [
      {
        name: "Next.js & React",
        note: "Dashboards administrativos, SSR/SSG e interfaces web modernas",
        noteEn: "Admin dashboards, SSR/SSG, and modern web interfaces",
        usedIn: ["tcc"],
      },
      {
        name: "React Native & Expo",
        note: "Apps iOS/Android com mapas, JWT e módulos nativos offline",
        noteEn: "iOS/Android apps with maps, JWT, and native offline modules",
        usedIn: ["vehigo", "tcc", "memedio"],
      },
      {
        name: "Angular",
        note: "Evolução e debugging de sistemas web corporativos",
        noteEn: "Evolution and debugging of enterprise web systems",
        usedIn: ["skypass-features"],
      },
      {
        name: "Manifest V3 / Web APIs",
        note: "Service Workers, extensões Chromium e integrações assíncronas",
        noteEn: "Service Workers, Chromium extensions, and async integrations",
        usedIn: ["vt-shield"],
      },
    ],
  },
  {
    id: "data-infra",
    title: "Dados, Infra Linux & IA",
    titleEn: "Data, Linux Infra & AI",
    subtitle: "Do DER ao deploy via SSH, proxies reversos e fluxos com agentes",
    subtitleEn: "From ERD modeling to SSH deploys, reverse proxies, and AI workflows",
    items: [
      {
        name: "PostgreSQL, MySQL & Oracle",
        note: "Modelagem relacional, queries otimizadas e integridade transacional",
        noteEn: "Relational modeling, query tuning, and transactional integrity",
        usedIn: ["vehigo", "tcc", "skypass-features"],
      },
      {
        name: "Linux / SSH / Nginx / Docker",
        note: "Deploys em produção, API Gateway, automação Python e mitigação de incidentes",
        noteEn: "Production deploys, API Gateway, Python automation, and incident mitigation",
        usedIn: ["vehigo", "skypass-features"],
      },
      {
        name: "AI Agents & CLI Tooling",
        note: "Orquestração de agentes, engenharia de prompt e aceleração de entrega",
        noteEn: "Agent orchestration, prompt engineering, and delivery acceleration",
        usedIn: ["tcc", "memedio"],
      },
    ],
  },
];
