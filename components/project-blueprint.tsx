import type { Project } from "@/data/projects";

interface ProjectBlueprintProps {
  projectId: Project["id"];
  compact?: boolean;
}

export default function ProjectBlueprint({
  projectId,
  compact = false,
}: ProjectBlueprintProps) {
  return (
    <div
      className={`blueprint-grid relative flex w-full flex-col justify-between overflow-hidden border border-rule-strong bg-paper-alt ${
        compact ? "min-h-[200px]" : "min-h-[250px] sm:min-h-[280px]"
      }`}
    >
      {projectId === "vehigo" && <VehiGoBlueprint />}
      {projectId === "go-vit" && <GoVitBlueprint />}
      {projectId === "trackit" && <TrackItBlueprint />}
      {projectId === "look4" && <Look4Blueprint />}
    </div>
  );
}

function VehiGoBlueprint() {
  return (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-rule pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        <span>ARCHITECTURE // VEHIGO</span>
        <span className="bg-ink px-1.5 py-0.5 font-bold text-mustard">
          C4 · DDD · OPENAPI 3.0
        </span>
      </div>

      <svg
        viewBox="0 0 560 220"
        className="my-2 h-auto w-full"
        role="img"
        aria-label="VehiGo microservices architecture: React Native client to Nginx Gateway to three Node/TypeScript services backed by Redis 7 and PostgreSQL 15"
      >
        <defs>
          <marker
            id="arrow-vehigo"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0E0E0D" />
          </marker>
        </defs>

        {/* Client */}
        <rect x="10" y="74" width="96" height="72" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="58" y="96" textAnchor="middle" fill="#52504A" fontSize="9" fontFamily="monospace">
          CLIENT
        </text>
        <text x="58" y="114" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          React Native
        </text>
        <text x="58" y="130" textAnchor="middle" fill="#52504A" fontSize="9" fontFamily="monospace">
          Expo · JWT
        </text>

        {/* Client -> Nginx */}
        <line
          x1="106"
          y1="110"
          x2="146"
          y2="110"
          stroke="#0E0E0D"
          strokeWidth="1.5"
          markerEnd="url(#arrow-vehigo)"
        />
        <text x="126" y="102" textAnchor="middle" fill="#52504A" fontSize="8" fontFamily="monospace">
          HTTP
        </text>

        {/* Nginx Gateway */}
        <rect x="148" y="64" width="92" height="92" fill="#0E0E0D" stroke="#0E0E0D" strokeWidth="1.5" />
        <rect x="148" y="64" width="92" height="5" fill="#E0A714" />
        <text x="194" y="90" textAnchor="middle" fill="#E0A714" fontSize="9" fontFamily="monospace">
          GATEWAY :80
        </text>
        <text x="194" y="112" textAnchor="middle" fill="#F4F2ED" fontSize="12" fontWeight="700" fontFamily="monospace">
          Nginx
        </text>
        <text x="194" y="130" textAnchor="middle" fill="#D4D1C7" fontSize="9" fontFamily="monospace">
          Reverse Proxy
        </text>

        {/* Nginx -> 3 Services */}
        <path d="M 240 110 L 264 110 L 264 42 L 284 42" fill="none" stroke="#0E0E0D" strokeWidth="1.4" markerEnd="url(#arrow-vehigo)" />
        <line x1="240" y1="110" x2="284" y2="110" stroke="#0E0E0D" strokeWidth="1.4" markerEnd="url(#arrow-vehigo)" />
        <path d="M 240 110 L 264 110 L 264 178 L 284 178" fill="none" stroke="#0E0E0D" strokeWidth="1.4" markerEnd="url(#arrow-vehigo)" />

        {/* 3 Services */}
        {[
          { y: 18, name: "usuarios-svc", sub: "Auth & Perfis" },
          { y: 86, name: "veiculos-svc", sub: "Frota & Catálogo" },
          { y: 154, name: "reservas-svc", sub: "Agenda & Status" },
        ].map((svc) => (
          <g key={svc.name}>
            <rect x="286" y={svc.y} width="126" height="48" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.4" />
            <text x="349" y={svc.y + 21} textAnchor="middle" fill="#0E0E0D" fontSize="10.5" fontWeight="700" fontFamily="monospace">
              {svc.name}
            </text>
            <text x="349" y={svc.y + 37} textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
              {svc.sub}
            </text>
          </g>
        ))}

        {/* Services -> Data */}
        <path d="M 412 42 L 430 42 L 430 68 L 444 68" fill="none" stroke="#0E0E0D" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrow-vehigo)" />
        <path d="M 412 110 L 430 110 L 430 68 L 444 68" fill="none" stroke="#0E0E0D" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arrow-vehigo)" />
        <path d="M 412 110 L 430 110 L 430 154 L 444 154" fill="none" stroke="#0E0E0D" strokeWidth="1.4" markerEnd="url(#arrow-vehigo)" />
        <path d="M 412 178 L 430 178 L 430 154 L 444 154" fill="none" stroke="#0E0E0D" strokeWidth="1.4" markerEnd="url(#arrow-vehigo)" />

        {/* Redis 7 */}
        <rect x="446" y="34" width="104" height="66" fill="#E0A714" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="498" y="56" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontWeight="700" fontFamily="monospace">
          CACHE
        </text>
        <text x="498" y="74" textAnchor="middle" fill="#0E0E0D" fontSize="11.5" fontWeight="700" fontFamily="monospace">
          Redis 7
        </text>
        <text x="498" y="90" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontFamily="monospace">
          In-Memory
        </text>

        {/* PostgreSQL 15 */}
        <rect x="446" y="122" width="104" height="66" fill="#0E0E0D" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="498" y="144" textAnchor="middle" fill="#E0A714" fontSize="8.5" fontFamily="monospace">
          PERSISTENCE
        </text>
        <text x="498" y="162" textAnchor="middle" fill="#F4F2ED" fontSize="11" fontWeight="700" fontFamily="monospace">
          PostgreSQL 15
        </text>
        <text x="498" y="178" textAnchor="middle" fill="#D4D1C7" fontSize="8.5" fontFamily="monospace">
          TypeORM · Docker
        </text>
      </svg>

      <div className="flex items-center justify-between border-t border-rule pt-2 font-mono text-[10px] text-ink-muted">
        <span>3 BOUNDED CONTEXTS · DOCKER COMPOSE</span>
        <span className="font-bold text-ink">REDIS 7 + PG15</span>
      </div>
    </div>
  );
}

function GoVitBlueprint() {
  return (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-rule pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        <span>ARCHITECTURE // GO-VIT</span>
        <span className="bg-mustard px-1.5 py-0.5 font-bold text-ink">
          SINGLE GO BINARY
        </span>
      </div>

      <svg
        viewBox="0 0 560 220"
        className="my-2 h-auto w-full"
        role="img"
        aria-label="go-vit internal flow: TUI event loop with Vim bindings to Go os/exec runner and diff/conflict parser operating on local Git repo and $EDITOR"
      >
        <defs>
          <marker
            id="arrow-govit"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0E0E0D" />
          </marker>
        </defs>

        {/* TUI Layer */}
        <rect x="14" y="42" width="142" height="136" fill="#0E0E0D" stroke="#0E0E0D" strokeWidth="1.5" />
        <rect x="14" y="42" width="142" height="5" fill="#E0A714" />
        <text x="85" y="68" textAnchor="middle" fill="#E0A714" fontSize="9" fontFamily="monospace">
          TUI EVENT LOOP
        </text>
        <text x="85" y="90" textAnchor="middle" fill="#F4F2ED" fontSize="11.5" fontWeight="700" fontFamily="monospace">
          [1] Branches
        </text>
        <text x="85" y="109" textAnchor="middle" fill="#F4F2ED" fontSize="11.5" fontWeight="700" fontFamily="monospace">
          [2] Diff &amp; Merge
        </text>
        <line x1="28" y1="126" x2="142" y2="126" stroke="#F4F2ED" strokeOpacity="0.2" />
        <text x="85" y="146" textAnchor="middle" fill="#D4D1C7" fontSize="9" fontFamily="monospace">
          Vim keys: j / k / g / G
        </text>
        <text x="85" y="162" textAnchor="middle" fill="#E0A714" fontSize="8.5" fontFamily="monospace">
          Stash + Switch safe flow
        </text>

        {/* Arrow 1 */}
        <line x1="156" y1="110" x2="204" y2="110" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-govit)" />
        <text x="180" y="100" textAnchor="middle" fill="#52504A" fontSize="8" fontFamily="monospace">
          actions
        </text>

        {/* Go Runner & Parsers */}
        <rect x="206" y="30" width="154" height="72" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="283" y="54" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          OS/EXEC RUNNER
        </text>
        <text x="283" y="73" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          Git Command Layer
        </text>
        <text x="283" y="90" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          status · diff · fetch · stash
        </text>

        <rect x="206" y="118" width="154" height="72" fill="#E0A714" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="283" y="142" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontWeight="700" fontFamily="monospace">
          STDOUT PARSERS
        </text>
        <text x="283" y="161" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          Hunk &amp; Conflict Parser
        </text>
        <text x="283" y="178" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontFamily="monospace">
          + / - lines · Ours / Theirs
        </text>

        {/* Vertical link between runner and parser */}
        <line x1="283" y1="102" x2="283" y2="116" stroke="#0E0E0D" strokeWidth="1.4" markerEnd="url(#arrow-govit)" />

        {/* Arrows to Local Repo & $EDITOR */}
        <line x1="360" y1="66" x2="408" y2="66" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-govit)" />
        <line x1="360" y1="154" x2="408" y2="154" stroke="#0E0E0D" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arrow-govit)" />

        {/* Local Repo */}
        <rect x="410" y="34" width="136" height="64" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="478" y="57" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          HOST ENVIRONMENT
        </text>
        <text x="478" y="75" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          Local .git Repo
        </text>
        <text x="478" y="90" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          SSH keys · hooks · config
        </text>

        {/* $EDITOR Fallback */}
        <rect x="410" y="122" width="136" height="64" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="478" y="145" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          CONFLICT HANDOFF
        </text>
        <text x="478" y="163" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          $EDITOR Fallback
        </text>
        <text x="478" y="178" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          nvim / vim / code
        </text>
      </svg>

      <div className="flex items-center justify-between border-t border-rule pt-2 font-mono text-[10px] text-ink-muted">
        <span>ZERO CGO · NATIVE GIT COMPATIBILITY</span>
        <span className="font-bold text-ink">GO INSTALL READY</span>
      </div>
    </div>
  );
}

function TrackItBlueprint() {
  return (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-rule pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        <span>ARCHITECTURE // TRACKIT</span>
        <span className="bg-ink px-1.5 py-0.5 font-bold text-mustard">
          TYPED FULLSTACK · JEST
        </span>
      </div>

      <svg
        viewBox="0 0 560 220"
        className="my-2 h-auto w-full"
        role="img"
        aria-label="TrackIt architecture: Next.js web dashboard and React Native driver app communicating with modular NestJS API, MySQL database, Google Maps API, and BrasilAPI"
      >
        <defs>
          <marker
            id="arrow-trackit"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0E0E0D" />
          </marker>
        </defs>

        {/* Web Client */}
        <rect x="12" y="28" width="132" height="68" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="78" y="50" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          WEB DASHBOARD
        </text>
        <text x="78" y="68" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          Next.js
        </text>
        <text x="78" y="84" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          Auditoria &amp; Despacho
        </text>

        {/* Mobile Client */}
        <rect x="12" y="124" width="132" height="68" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="78" y="146" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          DRIVER APP
        </text>
        <text x="78" y="164" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          React Native
        </text>
        <text x="78" y="180" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          Rotas em Campo
        </text>

        {/* Clients -> NestJS */}
        <path d="M 144 62 L 172 62 L 172 110 L 196 110" fill="none" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-trackit)" />
        <path d="M 144 158 L 172 158 L 172 110 L 196 110" fill="none" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-trackit)" />

        {/* NestJS API */}
        <rect x="198" y="48" width="146" height="124" fill="#0E0E0D" stroke="#0E0E0D" strokeWidth="1.5" />
        <rect x="198" y="48" width="146" height="5" fill="#E0A714" />
        <text x="271" y="74" textAnchor="middle" fill="#E0A714" fontSize="9" fontFamily="monospace">
          MODULAR API
        </text>
        <text x="271" y="96" textAnchor="middle" fill="#F4F2ED" fontSize="13" fontWeight="700" fontFamily="monospace">
          NestJS + TS
        </text>
        <text x="271" y="116" textAnchor="middle" fill="#D4D1C7" fontSize="9" fontFamily="monospace">
          Regras &amp; Auditoria
        </text>
        <rect x="216" y="132" width="110" height="24" fill="#E0A714" />
        <text x="271" y="148" textAnchor="middle" fill="#0E0E0D" fontSize="9" fontWeight="700" fontFamily="monospace">
          Jest Integration
        </text>

        {/* NestJS -> External & DB */}
        <path d="M 344 92 L 372 92 L 372 56 L 398 56" fill="none" stroke="#0E0E0D" strokeWidth="1.4" strokeDasharray="4 3" markerEnd="url(#arrow-trackit)" />
        <path d="M 344 128 L 372 128 L 372 162 L 398 162" fill="none" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-trackit)" />

        {/* External APIs */}
        <rect x="400" y="22" width="146" height="72" fill="#E0A714" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="473" y="43" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontWeight="700" fontFamily="monospace">
          NATIVE FETCH
        </text>
        <text x="473" y="62" textAnchor="middle" fill="#0E0E0D" fontSize="10.5" fontWeight="700" fontFamily="monospace">
          Maps &amp; BrasilAPI
        </text>
        <text x="473" y="79" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontFamily="monospace">
          Rotas · Distância · CNPJ
        </text>

        {/* MySQL */}
        <rect x="400" y="124" width="146" height="72" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="473" y="145" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          RELATIONAL DB
        </text>
        <text x="473" y="164" textAnchor="middle" fill="#0E0E0D" fontSize="11.5" fontWeight="700" fontFamily="monospace">
          MySQL (DER)
        </text>
        <text x="473" y="181" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          Trilha de Entregas
        </text>
      </svg>

      <div className="flex items-center justify-between border-t border-rule pt-2 font-mono text-[10px] text-ink-muted">
        <span>END-TO-END SOLO BUILD</span>
        <span className="font-bold text-ink">ZERO EXTRA HTTP DEPS</span>
      </div>
    </div>
  );
}

function Look4Blueprint() {
  return (
    <div className="flex h-full flex-col justify-between p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-rule pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-muted">
        <span>ARCHITECTURE // LOOK4</span>
        <span className="bg-ink px-1.5 py-0.5 font-bold text-mustard">
          NATIVE RUST · GTK4
        </span>
      </div>

      <svg
        viewBox="0 0 560 190"
        className="my-2 h-auto w-full"
        role="img"
        aria-label="Look4 architecture: GNOME global shortcuts and clipboard into Rust GTK4 core tracer connected to HTTP redirect targets and VirusTotal API v3"
      >
        <defs>
          <marker
            id="arrow-look4"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0E0E0D" />
          </marker>
        </defs>

        <rect x="16" y="48" width="146" height="94" fill="#F4F2ED" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="89" y="72" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          GNOME DESKTOP
        </text>
        <text x="89" y="92" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          Global Shortcuts
        </text>
        <text x="89" y="110" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          Ctrl+Alt+V / Ctrl+Alt+R
        </text>
        <text x="89" y="126" textAnchor="middle" fill="#52504A" fontSize="8.5" fontFamily="monospace">
          DBus · Clipboard
        </text>

        <line x1="162" y1="95" x2="206" y2="95" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-look4)" />

        <rect x="208" y="40" width="144" height="110" fill="#0E0E0D" stroke="#0E0E0D" strokeWidth="1.5" />
        <rect x="208" y="40" width="144" height="5" fill="#E0A714" />
        <text x="280" y="68" textAnchor="middle" fill="#E0A714" fontSize="9" fontFamily="monospace">
          RUST CORE
        </text>
        <text x="280" y="90" textAnchor="middle" fill="#F4F2ED" fontSize="12" fontWeight="700" fontFamily="monospace">
          GTK4 / Libadwaita
        </text>
        <text x="280" y="112" textAnchor="middle" fill="#D4D1C7" fontSize="8.5" fontFamily="monospace">
          Redirect Hop Tracer
        </text>
        <text x="280" y="130" textAnchor="middle" fill="#D4D1C7" fontSize="8.5" fontFamily="monospace">
          No Browser Execution
        </text>

        <line x1="352" y1="95" x2="396" y2="95" stroke="#0E0E0D" strokeWidth="1.5" markerEnd="url(#arrow-look4)" />

        <rect x="398" y="48" width="146" height="94" fill="#E0A714" stroke="#0E0E0D" strokeWidth="1.5" />
        <text x="471" y="72" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontWeight="700" fontFamily="monospace">
          THREAT &amp; URL INTEL
        </text>
        <text x="471" y="94" textAnchor="middle" fill="#0E0E0D" fontSize="11" fontWeight="700" fontFamily="monospace">
          VirusTotal v3
        </text>
        <text x="471" y="114" textAnchor="middle" fill="#0E0E0D" fontSize="8.5" fontFamily="monospace">
          + HTTP Redirect Chain
        </text>
      </svg>

      <div className="flex items-center justify-between border-t border-rule pt-2 font-mono text-[10px] text-ink-muted">
        <span>USER-SPACE INSTALLER · AUTOSTART</span>
        <span className="font-bold text-ink">LINUX / GNOME</span>
      </div>
    </div>
  );
}
