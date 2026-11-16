import type { ReactNode } from "react";

interface ProjectMockupProps {
  projectId: string;
  compact?: boolean;
}

export default function ProjectMockup({
  projectId,
  compact = false,
}: ProjectMockupProps) {
  const visuals: Record<string, ReactNode> = {
    vehigo: (
      <div className="flex h-full w-full flex-col justify-between bg-[#141413] p-5 text-[#F4F2ED]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[10px] uppercase tracking-wider text-white/60">
          <span>NGINX INGRESS // :80</span>
          <span className="text-mustard">3 SERVICES UP</span>
        </div>
        <div className="my-auto grid grid-cols-3 gap-2.5 py-3">
          {["usuarios-svc", "veiculos-svc", "reservas-svc"].map((svc, idx) => (
            <div
              key={svc}
              className="rounded border border-white/15 bg-white/[0.04] p-2.5"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-mustard">
                <span>0{idx + 1}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-mustard" />
              </div>
              <div className="mt-2 font-mono text-[10px] font-bold">{svc}</div>
              <div className="mt-1 font-mono text-[9px] text-white/50">
                TypeORM • PG15
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 font-mono text-[10px] text-white/60">
          <span>C4 + DDD + OPENAPI 3.0</span>
          <span>DOCKER COMPOSE</span>
        </div>
      </div>
    ),
    tcc: (
      <div className="flex h-full w-full flex-col justify-between bg-[#EAE7DF] p-5 text-[#0E0E0D]">
        <div className="flex items-center justify-between border-b border-black/15 pb-2.5 font-mono text-[10px] uppercase">
          <span>TRACKIT // AUDIT TRAIL</span>
          <span className="bg-ink px-1.5 py-0.5 text-[9px] font-bold text-mustard">
            LIVE ROUTE
          </span>
        </div>
        <div className="my-auto grid grid-cols-12 gap-3 py-3">
          <div className="col-span-7 rounded border border-black/15 bg-paper p-3">
            <div className="font-mono text-[9px] uppercase text-ink-muted">
              Google Maps Route
            </div>
            <svg
              viewBox="0 0 180 70"
              className="mt-2 h-16 w-full"
              aria-hidden="true"
            >
              <path
                d="M 10 55 Q 55 10, 95 40 T 170 18"
                fill="none"
                stroke="#0E0E0D"
                strokeWidth="2.2"
                strokeDasharray="4 3"
              />
              <circle cx="10" cy="55" r="4.5" fill="#E0A714" stroke="#0E0E0D" strokeWidth="1.5" />
              <circle cx="95" cy="40" r="3.5" fill="#0E0E0D" />
              <circle cx="170" cy="18" r="5" fill="#E0A714" stroke="#0E0E0D" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="col-span-5 flex flex-col justify-between rounded border border-black/15 bg-ink p-3 text-paper">
            <div className="font-mono text-[9px] text-mustard">BRASILAPI</div>
            <div className="font-mono text-[10px] leading-snug">
              CNPJ VERIFIED
              <br />
              <span className="text-white/60">NATIVE FETCH</span>
            </div>
            <div className="font-mono text-[9px] text-mustard">JEST PASS ✓</div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-black/15 pt-2.5 font-mono text-[10px] text-ink-muted">
          <span>NESTJS • NEXT.JS</span>
          <span>REACT NATIVE</span>
        </div>
      </div>
    ),
    "vt-shield": (
      <div className="flex h-full w-full flex-col justify-between bg-[#141413] p-5 text-[#F4F2ED]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[10px]">
          <span>MANIFEST V3 // SERVICE WORKER</span>
          <span className="text-mustard">0 MALICIOUS</span>
        </div>
        <div className="my-auto space-y-2.5 py-3">
          <div className="flex items-center justify-between rounded border border-mustard/40 bg-mustard/10 px-3 py-2">
            <span className="font-mono text-[11px] font-bold text-mustard">
              Right-Click → Scan URL
            </span>
            <span className="font-mono text-[10px] text-white/70">API v3</span>
          </div>
          <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
            <div className="rounded border border-white/10 bg-white/5 p-2 text-center">
              <div className="text-white/50">ENGINES</div>
              <div className="mt-0.5 font-bold">92/92</div>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-2 text-center">
              <div className="text-white/50">CORS</div>
              <div className="mt-0.5 font-bold text-mustard">BYPASSED</div>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-2 text-center">
              <div className="text-white/50">POLLING</div>
              <div className="mt-0.5 font-bold">AUTO</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2.5 font-mono text-[10px] text-white/60">
          CHROMIUM THREAT INTELLIGENCE
        </div>
      </div>
    ),
    memedio: (
      <div className="flex h-full w-full flex-col justify-between bg-[#EAE7DF] p-5 text-[#0E0E0D]">
        <div className="flex items-center justify-between border-b border-black/15 pb-2.5 font-mono text-[10px]">
          <span>MEMEDIO // OFFLINE-FIRST</span>
          <span className="font-bold">100% LOCAL</span>
        </div>
        <div className="my-auto flex items-center justify-between gap-4 py-3">
          <div className="space-y-1.5">
            <div className="font-mono text-[10px] uppercase text-ink-muted">
              Next Dose Alarm
            </div>
            <div className="font-display text-3xl font-extrabold">08:00</div>
            <div className="inline-block bg-mustard px-2 py-0.5 font-mono text-[10px] font-bold">
              LOCK-SCREEN CONFIRM
            </div>
          </div>
          <div className="rounded border border-black/20 bg-paper p-3 font-mono text-[10px]">
            <div>Clean Arch ✓</div>
            <div className="mt-1">AlarmManager ✓</div>
            <div className="mt-1">Stock Sync ✓</div>
          </div>
        </div>
        <div className="border-t border-black/15 pt-2.5 font-mono text-[10px] text-ink-muted">
          ANDROID NATIVE • REANIMATED
        </div>
      </div>
    ),
    "skypass-features": (
      <div className="flex h-full w-full flex-col justify-between bg-[#141413] p-5 text-[#F4F2ED]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[10px]">
          <span>SKYPASS // PRODUCTION OPS</span>
          <span className="text-mustard">MULTI-TENANT</span>
        </div>
        <div className="my-auto space-y-2 py-3 font-mono text-[10px]">
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span>Service Order Module</span>
            <span className="text-mustard">PHP • MySQL/Oracle</span>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-1.5">
            <span>Billing Alerts</span>
            <span className="text-white/70">Node.js • Nodemailer</span>
          </div>
          <div className="flex justify-between">
            <span>SSH Disk &amp; Security</span>
            <span className="text-mustard">Python • Linux</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2.5 font-mono text-[10px] text-white/60">
          DEPLOYED IN LIVE ENTERPRISE ENV
        </div>
      </div>
    ),
  };

  return (
    <div
      className={`overflow-hidden border border-rule-strong ${
        compact ? "h-48" : "h-60 sm:h-72"
      }`}
    >
      {visuals[projectId] ?? visuals.vehigo}
    </div>
  );
}
