/**
 * Edite este arquivo para alterar as informações pessoais e links de contato.
 * Estes dados são consumidos na seção "whoami" e na seção "contact".
 */

export interface Profile {
  /** Nome completo / apelido profissional. */
  name: string;
  /** Título / cargo principal. */
  role: string;
  /** Frase de impacto curta. */
  tagline: string;
  /** E-mail para contato. */
  email: string;
  /** URL pública do GitHub. */
  githubUrl: string;
  /** URL pública do LinkedIn. */
  linkedinUrl: string;
  /** Telefone para contato. */
  phone?: string;
  /** Localização. */
  location?: string;
  /** Sobrescritas opcionais em inglês (fallback = campos padrão em PT). */
  roleEn?: string;
  taglineEn?: string;
}

export const profile: Profile = {
  name: "Felipe Srutkoske",
  role: "Desenvolvedor Backend / Fullstack",
  tagline:
    "Desenvolvedor Backend/Fullstack focado em desenvolvimento de arquiteturas escaláveis.",
  email: "srutkoske.felipe@gmail.com",
  githubUrl: "https://github.com/FelipeSrutkoske",
  linkedinUrl: "https://www.linkedin.com/in/felipesrutkoske",
  phone: "(44) 99919-7987",
  location: "Campo Mourão - PR",
  roleEn: "Backend / Fullstack Developer",
  taglineEn:
    "Backend/Fullstack Developer focused on scalable architecture development.",
};
