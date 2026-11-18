export interface Profile {
  name: string;
  role: string;
  roleEn: string;
  focusBadge: string;
  focusBadgeEn: string;
  tagline: string;
  taglineEn: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  phone: string;
  location: string;
}

export const profile: Profile = {
  name: "Felipe Srutkoske",
  role: "Desenvolvedor Fullstack — Foco em Golang",
  roleEn: "Fullstack Developer — Golang Focus",
  focusBadge: "Prioridade: Go (Golang) • Fullstack & Infra Linux",
  focusBadgeEn: "Priority: Go (Golang) • Fullstack & Linux Infra",
  tagline:
    "Construo aplicações de ponta a ponta — de APIs concorrentes e microsserviços a interfaces web/mobile e deploy em Linux.",
  taglineEn:
    "I build end-to-end applications — from concurrent APIs and microservices to web/mobile interfaces and Linux production deployments.",
  email: "srutkoske.felipe@gmail.com",
  githubUrl: "https://github.com/FelipeSrutkoske",
  linkedinUrl: "https://www.linkedin.com/in/felipesrutkoske",
  phone: "(44) 99919-7987",
  location: "Campo Mourão — PR, Brasil",
};
