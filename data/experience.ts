export interface Experience {
  role: string;
  company: string;
  period: string;
  summary: string;
  stack: string[];
  roleEn?: string;
  companyEn?: string;
  periodEn?: string;
  summaryEn?: string;
}

export const experiences: Experience[] = [
  {
    role: "Analista de Sistemas (Sustentação, Infraestrutura & Desenvolvimento)",
    company: "Skypass System",
    period: "08/2025 — 08/2026",
    summary:
      "Desenvolvimento, evolução e sustentação de sistemas corporativos multi-empresa. Debugging em PHP, Node.js e Angular; modelagem relacional MySQL/Oracle; deploys em Linux via SSH; criação do zero de Ordem de Serviço e Módulo de Alertas de Faturamento (Nodemailer), além de automações Python/JS e mitigação de incidentes de segurança.",
    stack: [
      "PHP",
      "Node.js",
      "Angular",
      "MySQL",
      "Oracle",
      "Linux",
      "Python",
      "Git",
    ],
    roleEn: "Systems Analyst (Support, Infrastructure & Development)",
    companyEn: "Skypass System",
    periodEn: "08/2025 — 08/2026",
    summaryEn:
      "Development, evolution, and support of multi-tenant enterprise systems. Production debugging in PHP, Node.js, and Angular; MySQL/Oracle data modeling; Linux SSH deployments; zero-to-production development of Service Orders and Invoicing Alerts (Nodemailer), along with Python/JS automation scripts and security incident mitigation.",
  },
  {
    role: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    company: "Centro Universitário Integrado",
    period: "Concluído",
    summary:
      "Formação acadêmica em Análise e Desenvolvimento de Sistemas, abrangendo engenharia de software, arquitetura de sistemas, bancos de dados e desenvolvimento de aplicações.",
    stack: [
      "NestJS",
      "Next.js",
      "React Native",
      "TypeScript",
      "MySQL",
      "Jest",
    ],
    roleEn: "Associate Degree in Systems Analysis and Development",
    companyEn: "Centro Universitário Integrado",
    periodEn: "Completed",
    summaryEn:
      "Graduated with a degree in Systems Analysis and Development, covering software engineering, system architecture, database modeling, and application testing.",
  },
];
