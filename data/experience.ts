/**
 * Edite este arquivo para adicionar ou remover entradas da timeline de experiência.
 * Cada entrada é renderizada como um item na seção "experience".
 */

export interface Experience {
  /** Cargo / função. */
  role: string;
  /** Nome da empresa (pode ser placeholder). */
  company: string;
  /** Período de atuação (ex: "2023 — presente"). */
  period: string;
  /** Resumo das atividades e impacto. */
  summary: string;
  /** Tecnologias utilizadas no dia a dia. */
  stack: string[];
  /** Sobrescritas opcionais em inglês (fallback = campos padrão em PT). */
  roleEn?: string;
  companyEn?: string;
  periodEn?: string;
  summaryEn?: string;
}

export const experiences: Experience[] = [
  {
    role: "Analista de Sistemas (Sustentação, Infraestrutura & Desenvolvimento)",
    company: "Skypass System",
    period: "08/2025 — presente",
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
    periodEn: "08/2025 — present",
    summaryEn:
      "Development, evolution, and support of multi-tenant enterprise systems. Production debugging in PHP, Node.js, and Angular; MySQL/Oracle data modeling; Linux SSH deployments; zero-to-production development of Service Orders and Invoicing Alerts (Nodemailer), along with Python/JS automation scripts and security incident mitigation.",
  },
  {
    role: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    company: "Centro Universitário Integrado",
    period: "Concluído",
    summary:
      "Formação acadêmica concluída com foco em desenvolvimento de software, arquitetura de sistemas, banco de dados e testes. Projeto de conclusão de curso (TCC) aprovado com nota 9.3.",
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
      "Completed degree focused on software engineering, system architecture, database modeling, and testing. Graduation thesis (TCC) awarded a 9.3/10 grade.",
  },
];
