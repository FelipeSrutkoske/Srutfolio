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
      { name: "Node.js", level: 85 },
      { name: "NestJS", level: 80 },
      { name: "PHP", level: 85 },
      { name: "TypeScript", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "Go", level: 60 },
      { name: "C#", level: 65 },
      { name: "C", level: 70 },
    ],
  },
  {
    category: "Banco de dados",
    items: [
      { name: "MySQL", level: 85 },
      { name: "Oracle", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "Redis", level: 75 },
      { name: "SQLite", level: 75 },
    ],
    categoryEn: "Database",
  },
  {
    category: "Frontend & Mobile",
    items: [
      { name: "Next.js", level: 80 },
      { name: "React", level: 80 },
      { name: "React Native", level: 80 },
      { name: "Angular", level: 75 },
      { name: "HTML", level: 85 },
      { name: "CSS / Tailwind", level: 75 },
    ],
    categoryEn: "Frontend & Mobile",
  },
  {
    category: "DevOps, Infra & IA",
    items: [
      { name: "Linux / SSH", level: 85 },
      { name: "Git", level: 85 },
      { name: "Docker", level: 70 },
      { name: "Python", level: 75 },
      { name: "Agentes de IA", level: 85 },
    ],
    categoryEn: "DevOps, Infra & AI",
  },
];
