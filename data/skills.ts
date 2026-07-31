/**
 * Edite este arquivo para adicionar ou remover skills na matriz por categoria.
 * Cada categoria vira uma coluna/bloco na seção "skills".
 *
 * IMPORTANTE: ajuste o `level` (0-100) de cada skill para o seu nível real.
 * Os valores atuais são placeholders (80). O level alimenta o CPU% e a
 * barra ASCII `[|||||-----]` da tabela htop.
 */

export interface Skill {
  /** Nome da tecnologia/ferramenta. */
  name: string;
  /** Nível de conhecimento, 0-100 (usado para a barra e o CPU% no htop). */
  level: number;
}

export interface SkillCategory {
  /** Nome da categoria (ex: Backend, Frontend, Banco de dados). */
  category: string;
  /** Lista de tecnologias/ferramentas da categoria. */
  items: Skill[];
  /** Sobrescrita opcional em inglês (fallback = campo padrão em PT). */
  categoryEn?: string;
}

export const skills: SkillCategory[] = [
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 83 },
      { name: "NestJS", level: 79 },
      { name: "PHP", level: 81 },
      { name: "TypeScript", level: 77 },
      { name: "JavaScript", level: 88 },
      { name: "C", level: 71 },
    ],
  },
  {
    category: "Banco de dados",
    items: [
      { name: "MySQL", level: 87 },
      { name: "Oracle", level: 73 },
      { name: "PostgreSQL", level: 76 },
    ],
    categoryEn: "Database",
  },
  {
    category: "Frontend & Mobile",
    items: [
      { name: "Next.js", level: 82 },
      { name: "React", level: 83 },
      { name: "React Native", level: 81 },
      { name: "Angular", level: 76 },
      { name: "HTML / CSS", level: 86 },
    ],
    categoryEn: "Frontend & Mobile",
  },
  {
    category: "Agentes & Ferramentas IA",
    items: [
      { name: "Agentes de IA", level: 93 },
      { name: "LLMs & Prompt Eng.", level: 91 },
      { name: "CLI Tools", level: 94 },
    ],
    categoryEn: "AI Agents & Tools",
  },
  {
    category: "DevOps & Infraestrutura",
    items: [
      { name: "Linux / SSH", level: 84 },
      { name: "Git", level: 83 },
      { name: "Docker", level: 71 },
      { name: "Python", level: 73 },
    ],
    categoryEn: "DevOps & Infrastructure",
  },
];
