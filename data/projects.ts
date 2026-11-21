export interface ArchitectureNode {
  id: string;
  label: string;
  layer: "client" | "gateway" | "service" | "data";
  protocol?: string;
  tech: string;
  description: string;
  descriptionEn: string;
}

export interface TechnicalDecision {
  decision: string;
  decisionEn: string;
  rationale: string;
  rationaleEn: string;
  tradeoff: string;
  tradeoffEn: string;
}

export interface Project {
  id: "vehigo" | "go-vit" | "trackit" | "look4";
  slug: string;
  featured: boolean;
  year: string;
  category: string;
  categoryEn: string;
  role: string;
  roleEn: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  summary: string;
  summaryEn: string;
  problem: string;
  problemEn: string;
  stack: string[];
  installCommand?: string;
  highlights: string[];
  highlightsEn: string[];
  decisions: TechnicalDecision[];
  architectureNodes: ArchitectureNode[];
  links: {
    repo: string;
    demo?: string;
  };
}

export const projects: Project[] = [
  {
    id: "vehigo",
    slug: "vehigo",
    featured: true,
    year: "2025",
    category: "Arquitetura Distribuída",
    categoryEn: "Distributed Architecture",
    role: "Arquitetura, backend, infra Docker/Nginx e app mobile",
    roleEn: "Architecture, backend services, Docker/Nginx infra, and mobile app",
    title: "VehiGo",
    titleEn: "VehiGo",
    subtitle: "Plataforma de aluguel de veículos em microsserviços com Nginx e Redis",
    subtitleEn: "Microservices vehicle rental platform with Nginx Gateway and Redis cache",
    summary:
      "Sistema distribuído com API Gateway Nginx, três serviços desacoplados em Node.js/TypeScript, cache em memória com Redis 7, PostgreSQL 15 e app React Native.",
    summaryEn:
      "Distributed platform built with an Nginx API Gateway, three decoupled Node.js/TypeScript services, Redis 7 caching, PostgreSQL 15, and a React Native app.",
    problem:
      "Fluxos de reserva em monólitos costumam acoplar autenticação, catálogo de frota e regras de agendamento no mesmo ciclo de deploy. O VehiGo separa esses domínios em contextos isolados com contratos OpenAPI 3.0, diagramas C4 e ADRs registrados no repositório.",
    problemEn:
      "Booking workflows in tightly coupled monoliths bind authentication, fleet catalog, and reservation rules into one deployment unit. VehiGo separates these domains into bounded contexts backed by OpenAPI 3.0 specs, C4 diagrams, and Architecture Decision Records.",
    stack: [
      "Node.js",
      "TypeScript",
      "Nginx",
      "PostgreSQL 15",
      "Redis 7",
      "TypeORM",
      "Docker",
      "React Native",
    ],
    highlights: [
      "Três microsserviços independentes (autenticação/usuários, frota/veículos e reservas) em Node.js, TypeScript e TypeORM",
      "Nginx atuando como API Gateway e proxy reverso, centralizando rotas sem expor portas dos serviços internos",
      "Redis 7 para cache em memória combinado a PostgreSQL 15 containerizado com Docker Compose",
      "App mobile Android/iOS em React Native (Expo) com fluxo de autenticação JWT e busca filtrada",
      "Documentação técnica estruturada com DDD, Diagramas C4, ADRs e especificações OpenAPI 3.0",
    ],
    highlightsEn: [
      "Three independent microservices (users/auth, fleet/vehicles, and reservations) in Node.js, TypeScript, and TypeORM",
      "Nginx serving as API Gateway and reverse proxy, centralizing ingress without exposing internal service ports",
      "Redis 7 in-memory cache paired with containerized PostgreSQL 15 via Docker Compose",
      "Android/iOS mobile client in React Native (Expo) with JWT authentication and filtered fleet browsing",
      "Architectural documentation covering DDD bounded contexts, C4 diagrams, ADRs, and OpenAPI 3.0 contracts",
    ],
    decisions: [
      {
        decision: "Nginx como API Gateway único na borda",
        decisionEn: "Single Nginx API Gateway at the edge",
        rationale:
          "Centraliza o roteamento HTTP para os três serviços e mantém portas internas isoladas dentro da rede Docker.",
        rationaleEn:
          "Centralizes HTTP routing across all three services while keeping internal service ports isolated inside the Docker network.",
        tradeoff:
          "Adiciona um ponto de configuração de proxy a manter; mitigado com configuração versionada em Docker Compose e rotas explícitas por contexto.",
        tradeoffEn:
          "Adds a proxy configuration layer to maintain; mitigated through versioned Docker Compose config and explicit per-context routes.",
      },
      {
        decision: "Separação em 3 serviços por contexto (DDD) + OpenAPI 3.0",
        decisionEn: "Three domain-scoped services (DDD) with OpenAPI 3.0 contracts",
        rationale:
          "Isola responsabilidades entre usuários, catálogo de veículos e reservas, evitando dependências cruzadas no código.",
        rationaleEn:
          "Isolates users, vehicle catalog, and reservations so each domain evolves without leaking internal models.",
        tradeoff:
          "Aumenta a complexidade de subir o ambiente local e manter contratos sincronizados; mitigado com OpenAPI 3.0, diagramas C4 e ADRs.",
        tradeoffEn:
          "Increases local orchestration and contract overhead; mitigated via OpenAPI 3.0 specs, C4 diagrams, and ADRs.",
      },
      {
        decision: "Redis 7 em memória ao lado de PostgreSQL 15",
        decisionEn: "Redis 7 in-memory cache alongside PostgreSQL 15",
        rationale:
          "Reduz consultas repetitivas de leitura no catálogo e dá suporte a dados de acesso rápido enquanto o PostgreSQL garante integridade transacional nas reservas.",
        rationaleEn:
          "Offloads repetitive read lookups while letting PostgreSQL enforce relational and transactional integrity for reservations.",
        tradeoff:
          "Exige cuidado com invalidação de cache em atualizações de frota; tratado mantendo o banco relacional como fonte de verdade.",
        tradeoffEn:
          "Requires cache invalidation discipline on fleet updates; handled by treating PostgreSQL as the single source of truth.",
      },
    ],
    architectureNodes: [
      {
        id: "mobile",
        label: "Mobile App",
        layer: "client",
        protocol: "HTTPS / JWT",
        tech: "React Native • Expo",
        description:
          "Cliente Android/iOS responsável por autenticação JWT, listagem filtrada de veículos e criação de reservas.",
        descriptionEn:
          "Android/iOS client handling JWT auth, filtered fleet browsing, and reservation creation.",
      },
      {
        id: "nginx",
        label: "Nginx Gateway",
        layer: "gateway",
        protocol: "Reverse Proxy :80",
        tech: "Nginx • Docker",
        description:
          "Entrada única da plataforma: encaminha requisições HTTP para os serviços internos sem expor portas diretamente.",
        descriptionEn:
          "Single platform ingress routing HTTP requests to internal services without exposing raw container ports.",
      },
      {
        id: "services",
        label: "Core Services (x3)",
        layer: "service",
        protocol: "REST / OpenAPI 3.0",
        tech: "Node.js • TypeScript • TypeORM",
        description:
          "Serviços independentes de usuários, veículos e reservas estruturados por Bounded Contexts (DDD).",
        descriptionEn:
          "Independent users, vehicles, and reservations services organized around DDD Bounded Contexts.",
      },
      {
        id: "data",
        label: "Redis 7 + PostgreSQL 15",
        layer: "data",
        protocol: "TCP / SQL + Cache",
        tech: "Redis 7 • PostgreSQL 15",
        description:
          "Cache em memória para leituras rápidas combinado à persistência relacional transacional em containers Docker.",
        descriptionEn:
          "In-memory cache for fast reads paired with transactional relational persistence inside Docker containers.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/VehiGo",
    },
  },
  {
    id: "go-vit",
    slug: "go-vit",
    featured: true,
    year: "2026",
    category: "Open Source · Go CLI / TUI",
    categoryEn: "Open Source · Go CLI / TUI",
    role: "Autor e mantenedor (Golang)",
    roleEn: "Author & maintainer (Golang)",
    title: "go-vit",
    titleEn: "go-vit",
    subtitle: "Gerenciador visual de Git para terminal compilado em binário único Go",
    subtitleEn: "Visual terminal Git manager compiled as a single Go binary",
    summary:
      "Ferramenta TUI open-source em Go para navegar branches, inspecionar diffs coloridos linha a linha, fazer stage/commit, stash e resolver conflitos de merge sem sair do terminal.",
    summaryEn:
      "Open-source Go terminal UI for managing branches, inspecting line-by-line semantic diffs, staging/committing, stashing, and resolving merge conflicts without leaving the terminal.",
    problem:
      "Alternar entre comandos Git longos no shell e IDEs pesadas interrompe o ritmo durante revisões e merges. O go-vit entrega uma interface de terminal rápida, operável inteiramente pelo teclado e distribuída como binário único via `go install`.",
    problemEn:
      "Context-switching between verbose Git commands and heavy GUI clients breaks flow during reviews and merges. go-vit provides a keyboard-driven terminal workflow distributed as a single binary via `go install`.",
    stack: ["Go", "TUI", "Git CLI", "os/exec", "Open Source"],
    installCommand: "go install github.com/FelipeSrutkoske/go-vit@latest",
    highlights: [
      "Distribuído como binário único instalável via `go install github.com/FelipeSrutkoske/go-vit@latest`",
      "Troca segura de branches locais e remotas com fluxo automático de Stash + Switch",
      "Visualização de diff linha a linha com destaque semântico (+ / -) e navegação estilo Vim (j/k/g/G)",
      "Detecção visual de conflitos de merge com resolução rápida (Ours / Theirs) ou abertura direta no `$EDITOR`",
    ],
    highlightsEn: [
      "Distributed as a single binary installable via `go install github.com/FelipeSrutkoske/go-vit@latest`",
      "Safe local/remote branch switching with automatic Stash + Switch support",
      "Line-by-line semantic diff viewer (+ / -) with Vim-style keyboard navigation (j/k/g/G)",
      "Visual merge conflict detector offering Ours / Theirs quick actions or direct handoff to `$EDITOR`",
    ],
    decisions: [
      {
        decision: "Orquestrar o Git nativo via `os/exec` em vez de bindings C (`libgit2`)",
        decisionEn: "Shell out to native `git` via `os/exec` instead of C bindings (`libgit2`)",
        rationale:
          "Elimina dependências CGO, mantém compilação cruzada simples (`go install` puro) e herda automaticamente chaves SSH, hooks e `.gitconfig` do usuário.",
        rationaleEn:
          "Avoids CGO build friction, keeps `go install` self-contained across platforms, and automatically respects user SSH keys, hooks, and `.gitconfig`.",
        tradeoff:
          "Exige parsing cuidadoso da saída de comandos Git em vez de structs C; resolvido isolando os parsers em uma camada dedicada de execução.",
        tradeoffEn:
          "Requires careful parsing of Git stdout instead of typed C structs; handled by isolating command runners and parsers in a dedicated layer.",
      },
      {
        decision: "Fluxo de Stash + Switch integrado na troca de branches",
        decisionEn: "Built-in Stash + Switch safety flow on branch checkout",
        rationale:
          "Evita erros comuns ao trocar de branch com alterações pendentes na árvore de trabalho.",
        rationaleEn:
          "Prevents broken checkouts when switching branches with uncommitted working-tree changes.",
        tradeoff:
          "Adiciona estado intermediário na pilha de stash; tratado deixando explícita a ação no painel antes da execução.",
        tradeoffEn:
          "Adds an explicit stash entry to track; kept transparent by surfacing the action clearly in the UI before executing.",
      },
      {
        decision: "Resolução rápida (Ours / Theirs) com fallback direto para `$EDITOR`",
        decisionEn: "Quick Ours / Theirs conflict resolution with `$EDITOR` fallback",
        rationale:
          "Resolve conflitos simples em um atalho sem tentar reimplementar um editor de texto completo dentro da TUI.",
        rationaleEn:
          "Handles straightforward conflicts in one keypress without reimplementing a full text editor inside the TUI.",
        tradeoff:
          "Conflitos parciais dependem do editor configurado no ambiente; decisão intencional para manter a ferramenta leve e previsível.",
        tradeoffEn:
          "Complex partial merges hand off to the user's configured editor; an intentional boundary to keep the tool focused and lightweight.",
      },
    ],
    architectureNodes: [
      {
        id: "tui",
        label: "TUI Event Loop",
        layer: "client",
        protocol: "TTY / Keybindings",
        tech: "Go • Vim Navigation",
        description:
          "Interface em abas (Branches / Alterações e Conflitos) controlada integralmente pelo teclado.",
        descriptionEn:
          "Tabbed terminal UI (Branches / Changes & Conflicts) driven entirely by keyboard shortcuts.",
      },
      {
        id: "runner",
        label: "Git Command Runner",
        layer: "service",
        protocol: "os/exec · stdout",
        tech: "Go Standard Library",
        description:
          "Executa status, diff, checkout, stash, fetch/pull e isola o parsing de hunks e marcadores de conflito.",
        descriptionEn:
          "Runs status, diff, checkout, stash, fetch/pull and isolates diff hunk and conflict-marker parsing.",
      },
      {
        id: "repo",
        label: "Repositório Local & $EDITOR",
        layer: "data",
        protocol: "Git Plumbing / Filesystem",
        tech: "Git • $EDITOR",
        description:
          "Opera diretamente sobre o repositório local preservando hooks/SSH e abre conflitos complexos no editor padrão.",
        descriptionEn:
          "Operates directly against the local repo while preserving hooks/SSH, handing off complex edits to `$EDITOR`.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/go-vit",
    },
  },
  {
    id: "trackit",
    slug: "trackit",
    featured: true,
    year: "2025",
    category: "Fullstack Multi-App · TCC",
    categoryEn: "Fullstack Multi-App · Capstone",
    role: "Engenharia individual (API, Web, Mobile e banco relacional)",
    roleEn: "Solo engineering (API, Web dashboard, Mobile app, and relational schema)",
    title: "TrackIt",
    titleEn: "TrackIt",
    subtitle: "Plataforma de auditoria e rastreabilidade logística ponta a ponta",
    subtitleEn: "End-to-end logistics auditability and delivery tracking platform",
    summary:
      "Ecossistema fullstack tipado em TypeScript (API NestJS, Dashboard Next.js e App React Native) com modelagem relacional MySQL, Google Maps API, BrasilAPI via fetch nativo e testes em Jest.",
    summaryEn:
      "Strongly typed TypeScript ecosystem (NestJS API, Next.js Dashboard, and React Native App) with MySQL relational modeling, Google Maps API routing, native-fetch BrasilAPI integration, and Jest tests.",
    problem:
      "Operações de entrega frequentemente perdem a trilha auditável entre o despacho no painel, o trajeto do motorista em campo e a conferência cadastral do destinatário. O TrackIt unifica a operação web e mobile sobre a mesma API tipada e um banco relacional normalizado.",
    problemEn:
      "Delivery operations often lose auditability between back-office dispatch, field driver routes, and recipient verification. TrackIt unifies web dispatch and mobile execution over one typed API and normalized relational database.",
    stack: [
      "NestJS",
      "Next.js",
      "React Native",
      "TypeScript",
      "MySQL",
      "Google Maps API",
      "Jest",
    ],
    highlights: [
      "Desenvolvimento individual completo da arquitetura: backend NestJS, painel web Next.js e app mobile React Native",
      "Modelagem relacional em MySQL documentada em Diagrama Entidade-Relacionamento (DER)",
      "Rotas, distância e destino para motoristas via Google Maps API com testes de integração em Jest",
      "Consulta cadastral de CNPJ via BrasilAPI utilizando `fetch` nativo do Node.js sem HTTP client externo",
    ],
    highlightsEn: [
      "Solo end-to-end engineering across NestJS backend, Next.js web dashboard, and React Native mobile app",
      "Normalized MySQL relational schema documented via Entity-Relationship Diagram (ERD)",
      "Driver routing, distance, and destination flows powered by Google Maps API with Jest integration tests",
      "CNPJ recipient verification via BrasilAPI using native Node.js `fetch` with zero external HTTP dependencies",
    ],
    decisions: [
      {
        decision: "`fetch` nativo do Node.js para BrasilAPI em vez de `axios`",
        decisionEn: "Native Node.js `fetch` for BrasilAPI instead of `axios`",
        rationale:
          "Reduz dependências externas para integrações HTTP simples e simplifica o mock direto de fronteira nos testes em Jest.",
        rationaleEn:
          "Cuts external dependencies for straightforward HTTP integrations and makes boundary mocking in Jest cleaner.",
        tradeoff:
          "Sem interceptors ou tratamento automático de status HTTP fora da faixa 2xx; mitigado com validação explícita de resposta e tratamento de erro dedicado.",
        tradeoffEn:
          "No built-in interceptors or automatic non-2xx throwing; handled with explicit response checks and a small wrapper.",
      },
      {
        decision: "Backend modular em NestJS servindo Web e Mobile",
        decisionEn: "Modular NestJS backend serving both Web and Mobile clients",
        rationale:
          "Mantém regras de auditoria, validação e contratos TypeScript em um único backend coeso, adequado a um time enxuto e entrega ponta a ponta.",
        rationaleEn:
          "Keeps audit rules, validation, and TypeScript contracts cohesive in one backend suited for solo end-to-end delivery.",
        tradeoff:
          "Escala como unidade única de deploy; compensado pela separação por módulos de domínio e menor custo operacional frente a microsserviços prematuros.",
        tradeoffEn:
          "Scales as a single deployment unit; offset by strict domain module boundaries and avoiding premature microservice overhead.",
      },
      {
        decision: "Testes de integração em Jest com mock de APIs externas",
        decisionEn: "Jest integration tests with mocked external API boundaries",
        rationale:
          "Garante validação confiável dos fluxos de rota e consulta cadastral sem depender de rede ou consumir cota da Google Maps API no CI/local.",
        rationaleEn:
          "Validates routing and lookup flows deterministically without network flakiness or burning Google Maps quota.",
        tradeoff:
          "Mudanças inesperadas no contrato da API externa só aparecem em validação manual/staging; mitigado tipando estritamente os DTOs esperados.",
        tradeoffEn:
          "Upstream contract changes are only caught in live checks; mitigated by strict DTO validation at the integration boundary.",
      },
    ],
    architectureNodes: [
      {
        id: "clients",
        label: "Web & Mobile",
        layer: "client",
        protocol: "REST / JSON",
        tech: "Next.js • React Native",
        description:
          "Painel web em Next.js para acompanhamento e auditoria e app mobile React Native para motoristas em rota.",
        descriptionEn:
          "Next.js admin dashboard for audit tracking and React Native mobile app for drivers on the road.",
      },
      {
        id: "nestjs",
        label: "API Modular NestJS",
        layer: "service",
        protocol: "HTTP / TypeScript",
        tech: "NestJS • Jest",
        description:
          "Camada de negócio responsável por entregas, validação cadastral, logs de auditoria e suíte de testes de integração.",
        descriptionEn:
          "Business layer owning delivery workflows, recipient validation, audit trails, and Jest integration suites.",
      },
      {
        id: "external",
        label: "Maps & BrasilAPI",
        layer: "gateway",
        protocol: "HTTPS / Native Fetch",
        tech: "Google Maps • BrasilAPI",
        description:
          "Cálculo de rotas/distâncias e verificação de CNPJ usando fetch nativo sem bibliotecas HTTP extras.",
        descriptionEn:
          "Route/distance computation and CNPJ verification powered by native Node.js fetch.",
      },
      {
        id: "mysql",
        label: "MySQL Relacional",
        layer: "data",
        protocol: "SQL / DER",
        tech: "MySQL",
        description:
          "Modelo relacional normalizado garantindo integridade e histórico completo entre motoristas, cargas e entregas.",
        descriptionEn:
          "Normalized relational database preserving historical integrity across drivers, shipments, and deliveries.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/TCC_TrackIt",
    },
  },
  {
    id: "look4",
    slug: "look4",
    featured: false,
    year: "2026",
    category: "Desktop Linux · Rust & GTK4",
    categoryEn: "Linux Desktop · Rust & GTK4",
    role: "Autor (Rust / GNOME)",
    roleEn: "Author (Rust / GNOME)",
    title: "Look4",
    titleEn: "Look4",
    subtitle: "Inspeção de links suspeitos e rastreamento de redirecionamentos no GNOME",
    subtitleEn: "Suspicious URL scanner and redirect chain tracer for GNOME / Linux",
    summary:
      "Utilitário nativo Linux escrito em Rust com GTK4/Libadwaita e atalhos globais para escanear URLs da área de transferência via VirusTotal e revelar o destino final de links encurtados.",
    summaryEn:
      "Native Linux utility written in Rust with GTK4/Libadwaita and global shortcuts to scan clipboard URLs via VirusTotal and trace shortened redirect chains without opening a browser.",
    problem:
      "Verificar links encurtados ou suspeitos abrindo abas no navegador expõe o ambiente desnecessariamente. O Look4 roda em segundo plano no GNOME e responde via atalhos globais direto da área de transferência.",
    problemEn:
      "Inspecting shortened or suspicious links inside a browser creates unnecessary exposure. Look4 stays lightweight in the GNOME background and inspects clipboard URLs instantly through global shortcuts.",
    stack: ["Rust", "GTK4", "Libadwaita", "Linux / GNOME", "VirusTotal API v3"],
    highlights: [
      "Binário nativo em Rust com interface GTK4 / Libadwaita integrada visualmente ao GNOME",
      "Atalhos globais dedicados: Ctrl+Alt+V (análise no VirusTotal) e Ctrl+Alt+R (rastreamento de URL final)",
      "Instalador automatizado em user-space com entrada de aplicativo e inicialização automática",
    ],
    highlightsEn: [
      "Native Rust binary with GTK4 / Libadwaita UI following GNOME HIG conventions",
      "Dedicated global shortcuts: Ctrl+Alt+V (VirusTotal threat scan) and Ctrl+Alt+R (final redirect trace)",
      "Automated user-space installer registering desktop launcher and user autostart",
    ],
    decisions: [
      {
        decision: "Rust + GTK4/Libadwaita em vez de Electron ou web wrapper",
        decisionEn: "Rust + GTK4/Libadwaita instead of Electron",
        rationale:
          "Inicialização imediata, baixo uso de RAM em background e integração nativa com o ambiente desktop GNOME.",
        rationaleEn:
          "Instant startup, minimal background memory footprint, and native GNOME desktop integration.",
        tradeoff:
          "Acoplamento intencional ao ecossistema Linux/GTK4 (sem build Windows/macOS); aceito por resolver um fluxo diário em Linux.",
        tradeoffEn:
          "Tied to Linux/GTK4 rather than cross-platform; accepted because the tool is purpose-built for Linux desktops.",
      },
      {
        decision: "Inspeção HTTP direta da área de transferência via atalhos globais",
        decisionEn: "Clipboard-driven HTTP inspection via global shortcuts",
        rationale:
          "Permite seguir cadeias de redirecionamento e consultar a API v3 do VirusTotal sem executar JavaScript da página de destino.",
        rationaleEn:
          "Resolves HTTP redirect hops and queries VirusTotal v3 without executing untrusted target-page JavaScript.",
        tradeoff:
          "Depende de integração com o gerenciador de atalhos do GNOME e chave da API do VirusTotal; simplificado via script de instalação automatizado.",
        tradeoffEn:
          "Requires GNOME shortcut registration and a VirusTotal API key; streamlined via an automated installer script.",
      },
    ],
    architectureNodes: [
      {
        id: "gnome",
        label: "GNOME & Atalhos Globais",
        layer: "client",
        protocol: "DBus / Clipboard",
        tech: "GTK4 • Libadwaita",
        description:
          "Captura a URL da área de transferência a partir dos atalhos globais e exibe o resultado em janela nativa.",
        descriptionEn:
          "Reads the clipboard URL triggered by global shortcuts and renders results in a native window.",
      },
      {
        id: "rust-core",
        label: "Rust Core Tracer",
        layer: "service",
        protocol: "HTTPS / Redirects",
        tech: "Rust • OpenSSL",
        description:
          "Segue saltos HTTP para expor o destino final de encurtadores sem renderizar conteúdo da página.",
        descriptionEn:
          "Follows HTTP redirect hops to uncover final destinations without loading page scripts.",
      },
      {
        id: "vt-api",
        label: "VirusTotal API v3",
        layer: "data",
        protocol: "REST v3",
        tech: "VirusTotal",
        description:
          "Consulta reputação e detecções de segurança da URL inspecionada.",
        descriptionEn:
          "Queries threat reputation and engine detections for the inspected URL.",
      },
    ],
    links: {
      repo: "https://github.com/FelipeSrutkoske/look4",
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
