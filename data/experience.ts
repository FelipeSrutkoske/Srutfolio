export interface ProductionStory {
  id: string;
  tag: string;
  tagEn: string;
  title: string;
  titleEn: string;
  context: string;
  contextEn: string;
  execution: string;
  executionEn: string;
  outcome: string;
  outcomeEn: string;
  stack: string[];
}

export interface ProductionExperienceData {
  company: string;
  role: string;
  roleEn: string;
  period: string;
  periodEn: string;
  summary: string;
  summaryEn: string;
  stack: string[];
  stories: ProductionStory[];
}

export const productionExperience: ProductionExperienceData = {
  company: "Skypass System",
  role: "Analista de Sistemas (Sustentação, Infraestrutura & Desenvolvimento)",
  roleEn: "Systems Analyst (Support, Infrastructure & Development)",
  period: "08/2025 — 08/2026",
  periodEn: "Aug 2025 — Aug 2026",
  summary:
    "Desenvolvimento, evolução e sustentação de sistemas corporativos multi-empresa em ambiente de produção. Atuação direta em investigação de incidentes envolvendo aplicação, banco de dados (MySQL e Oracle), regras de negócio e servidores Linux via SSH.",
  summaryEn:
    "Development, maintenance, and production support of multi-tenant enterprise systems. Hands-on incident investigation across application code, relational databases (MySQL and Oracle), business rules, and Linux servers over SSH.",
  stack: [
    "PHP",
    "Node.js",
    "Angular",
    "MySQL",
    "Oracle",
    "Linux / SSH",
    "Python",
    "Git",
  ],
  stories: [
    {
      id: "service-order",
      tag: "Entrega ponta a ponta",
      tagEn: "End-to-end delivery",
      title: "Módulo de Ordem de Serviço do zero",
      titleEn: "Service Order module from scratch",
      context:
        "Funcionalidade contratada por cliente para controle operacional dentro do sistema corporativo existente.",
      contextEn:
        "Client-commissioned module required to track operational service orders inside the existing ERP.",
      execution:
        "Modelagem relacional do banco, criação de tabelas e constraints em MySQL/Oracle, desenvolvimento backend em PHP, telas, integrações, testes e versionamento em Git.",
      executionEn:
        "Designed the relational schema, created tables and constraints in MySQL/Oracle, implemented PHP backend endpoints, UI screens, integrations, and tests under Git.",
      outcome:
        "Módulo implantado em produção via SSH com rastreabilidade completa da operação do cliente.",
      outcomeEn:
        "Deployed to production over SSH as a complete workflow adopted in daily client operations.",
      stack: ["PHP", "MySQL", "Oracle", "Linux SSH"],
    },
    {
      id: "billing-alerts",
      tag: "Multi-empresa · Backend",
      tagEn: "Multi-tenant · Backend",
      title: "Alertas automatizados de faturamento",
      titleEn: "Automated multi-tenant billing alerts",
      context:
        "Empresas clientes precisavam acompanhar variações de vendas de passagens, cancelamentos e percentuais sem depender de conferência manual.",
      contextEn:
        "Client companies needed timely visibility into ticket sales, cancellations, and percentage swings without manual reporting.",
      execution:
        "Desenvolvimento integral da API em Node.js, queries SQL por empresa cliente, estrutura de banco e disparos automáticos de e-mail via Nodemailer para cada usuário cadastrado.",
      executionEn:
        "Built the Node.js API, per-tenant SQL queries, database structures, and automated email dispatching via Nodemailer for every registered recipient.",
      outcome:
        "Módulo entregue em produção atendendo todas as empresas clientes da base multi-tenant.",
      outcomeEn:
        "Shipped to production serving all client companies across the multi-tenant environment.",
      stack: ["Node.js", "Nodemailer", "SQL", "Deploy Linux"],
    },
    {
      id: "ops-automation",
      tag: "Automação & Confiabilidade",
      tagEn: "Automation & Reliability",
      title: "Monitoramento de disco em VMs e validação de importações",
      titleEn: "VM disk monitoring & cross-database import validation",
      context:
        "Rotinas críticas de infraestrutura e migração de dados exigiam checagens repetitivas em múltiplos servidores e bases de clientes.",
      contextEn:
        "Critical infrastructure checks and client data imports required repetitive manual verification across multiple servers and databases.",
      execution:
        "Escrita de scripts Python para monitorar ocupação de disco em VMs Linux via SSH e automação em JavaScript para conferência de importações entre bases de clientes.",
      executionEn:
        "Wrote Python scripts to monitor disk usage across Linux VMs over SSH and JavaScript tooling to automatically verify data imports between client databases.",
      outcome:
        "Detecção antecipada de risco de disco cheio e redução de falhas silenciosas em cargas de dados.",
      outcomeEn:
        "Earlier detection of disk-pressure risks and fewer silent discrepancies during client data imports.",
      stack: ["Python", "SSH", "JavaScript", "Linux"],
    },
    {
      id: "linux-security",
      tag: "Incidente em Produção · Segurança",
      tagEn: "Production Incident · Security",
      title: "Diagnóstico e mitigação de comprometimento Linux",
      titleEn: "Linux server compromise investigation & mitigation",
      context:
        "Comportamento anômalo identificado em servidor Linux de produção exigindo investigação imediata de processos e acessos.",
      contextEn:
        "Anomalous behavior surfaced on a production Linux host, requiring immediate process and access inspection.",
      execution:
        "Inspeção direta no ambiente Linux identificando acesso por shell remoto não autorizado associado à execução de mineração de criptomoedas.",
      executionEn:
        "Investigated the Linux host directly, identifying an unauthorized remote shell paired with cryptocurrency mining activity.",
      outcome:
        "Achados técnicos documentados e aplicados junto à equipe para contenção e mitigação do incidente.",
      outcomeEn:
        "Delivered actionable findings to contain the unauthorized access and support full incident mitigation.",
      stack: ["Linux", "SSH", "Segurança", "Troubleshooting"],
    },
  ],
};

export const education = {
  degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
  degreeEn: "Associate Degree in Systems Analysis and Development",
  institution: "Centro Universitário Integrado",
  status: "Concluído",
  statusEn: "Completed",
};

export const languages = [
  {
    name: "Português",
    nameEn: "Portuguese",
    level: "Nativo",
    levelEn: "Native",
  },
  {
    name: "Inglês",
    nameEn: "English",
    level: "B2 (CEFR) — leitura técnica, escrita e comunicação para times remotos",
    levelEn: "B2 (CEFR) — technical writing, documentation, and remote collaboration",
  },
];
