export interface SkillItem {
  name: string;
  tag?: string;
  tagEn?: string;
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
    id: "backend",
    title: "Backend & Sistemas",
    titleEn: "Backend & Systems",
    subtitle: "Foco atual em Golang, além de base sólida em Node.js e PHP",
    subtitleEn: "Current focus on Golang, alongside solid Node.js and PHP experience",
    items: [
      {
        name: "Go (Golang)",
        tag: "Foco atual",
        tagEn: "Current focus",
        note: "CLIs/TUIs, concorrência, microsserviços e ferramentas de terminal",
        noteEn: "CLIs/TUIs, concurrency, microservices, and terminal tooling",
        usedIn: ["go-vit"],
      },
      {
        name: "Node.js & NestJS",
        note: "APIs REST modulares, microsserviços, testes Jest e automações",
        noteEn: "Modular REST APIs, microservices, Jest testing, and automations",
        usedIn: ["tcc", "vehigo", "skypass-features"],
      },
      {
        name: "TypeScript",
        note: "Tipagem estrita ponta a ponta entre API, web e mobile",
        noteEn: "End-to-end strict typing across API, web, and mobile",
        usedIn: ["tcc", "vehigo"],
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
    subtitle: "Interfaces web modernas, estilização e aplicativos mobile",
    subtitleEn: "Modern web interfaces, styling systems, and mobile apps",
    items: [
      {
        name: "Next.js & React",
        note: "Dashboards administrativos, SSR/SSG e interfaces web modernas",
        noteEn: "Admin dashboards, SSR/SSG, and modern web interfaces",
        usedIn: ["tcc"],
      },
      {
        name: "Tailwind CSS",
        note: "Design systems responsivos, prototipação rápida e interfaces consistentes",
        noteEn: "Responsive design systems, rapid prototyping, and consistent UI",
        usedIn: ["tcc"],
      },
      {
        name: "React Native & Expo",
        note: "Apps iOS/Android com Google Maps, JWT e integração de APIs",
        noteEn: "iOS/Android apps with Google Maps, JWT, and API integrations",
        usedIn: ["tcc", "vehigo"],
      },
      {
        name: "Angular",
        note: "Evolução e debugging de sistemas web corporativos",
        noteEn: "Evolution and debugging of enterprise web systems",
        usedIn: ["skypass-features"],
      },
    ],
  },
  {
    id: "data-infra",
    title: "Dados, Infra Linux & Rust",
    titleEn: "Data, Linux Infra & Rust",
    subtitle: "Do DER ao deploy via SSH, proxies reversos e binários nativos",
    subtitleEn: "From ERD modeling to SSH deploys, reverse proxies, and native binaries",
    items: [
      {
        name: "PostgreSQL, MySQL & Oracle",
        note: "Modelagem relacional, queries otimizadas e integridade transacional",
        noteEn: "Relational modeling, query tuning, and transactional integrity",
        usedIn: ["tcc", "vehigo", "skypass-features"],
      },
      {
        name: "Linux / SSH / Nginx / Docker",
        note: "Deploys em produção, API Gateway, automação Python e mitigação de incidentes",
        noteEn: "Production deploys, API Gateway, Python automation, and incident mitigation",
        usedIn: ["vehigo", "skypass-features", "look4"],
      },
      {
        name: "Rust (GTK4 / Desktop)",
        note: "Utilitários nativos para GNOME/Linux com foco em velocidade e segurança",
        noteEn: "Native GNOME/Linux utilities focused on speed and safety",
        usedIn: ["look4"],
      },
    ],
  },
];
