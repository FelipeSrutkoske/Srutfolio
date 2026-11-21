export interface Profile {
  name: string;
  role: string;
  roleEn: string;
  focusLine: string;
  focusLineEn: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  repoUrl: string;
  resumePath: string;
  location: string;
  locationEn: string;
  englishLevel: string;
}

export const profile: Profile = {
  name: "Felipe Srutkoske",
  role: "Engenheiro Backend & Fullstack",
  roleEn: "Backend & Fullstack Engineer",
  focusLine: "Node.js, TypeScript, Go & Linux",
  focusLineEn: "Node.js, TypeScript, Go & Linux",
  email: "srutkoske.felipe@gmail.com",
  githubUrl: "https://github.com/FelipeSrutkoske",
  linkedinUrl: "https://www.linkedin.com/in/felipesrutkoske",
  repoUrl: "https://github.com/FelipeSrutkoske/Srutfolio",
  resumePath: "/Curriculo-Felipe_Srutkoske.pdf",
  location: "Campo Mourão, PR",
  locationEn: "Paraná, Brazil",
  englishLevel: "Inglês B2 (CEFR)",
};
