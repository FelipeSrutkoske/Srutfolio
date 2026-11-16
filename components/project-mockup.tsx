import type { ReactNode } from "react";

interface ProjectMockupProps {
  projectId: string;
  compact?: boolean;
  interactiveMap?: boolean;
}

export default function ProjectMockup({
  projectId,
  compact = false,
  interactiveMap = false,
}: ProjectMockupProps) {
  const visuals: Record<string, ReactNode> = {
    tcc: (
      <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#EAE7DF] text-[#0E0E0D]">
        {/* Real Google Maps embed */}
        <iframe
          title="TrackIt Google Maps Preview"
          src="https://maps.google.com/maps?q=Campo+Mourao,+PR,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={`absolute inset-0 h-full w-full border-0 grayscale-[25%] contrast-[1.08] ${
            interactiveMap ? "pointer-events-auto" : "pointer-events-none"
          }`}
        />

        {/* Top & Bottom Editorial HUD overlays */}
        <div className="pointer-events-none relative z-10 flex items-center justify-between border-b border-black/20 bg-paper/90 px-4 py-2 font-mono text-[10px] uppercase backdrop-blur-sm">
          <span className="font-bold">TRACKIT // AUDIT &amp; ROUTES</span>
          <span className="bg-mustard px-1.5 py-0.5 font-bold text-ink">
            GOOGLE MAPS API
          </span>
        </div>

        <div className="pointer-events-none relative z-10 flex items-center justify-between border-t border-black/20 bg-ink/90 px-4 py-2 font-mono text-[10px] text-paper backdrop-blur-sm">
          <span>NESTJS • NEXT.JS • REACT NATIVE</span>
          <span className="text-mustard">BRASILAPI + JEST ✓</span>
        </div>
      </div>
    ),
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
    "go-vit": (
      <div className="flex h-full w-full flex-col justify-between bg-[#111214] p-5 font-mono text-[#F4F2ED]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px]">
          <div className="flex items-center gap-2">
            <span className="bg-mustard px-1.5 py-0.5 font-bold text-ink">
              [1] Branches
            </span>
            <span className="text-white/50">[2] Changes &amp; Conflicts</span>
          </div>
          <span className="text-mustard">go-vit v1.x</span>
        </div>

        <div className="my-auto grid grid-cols-12 gap-3 py-3 text-[10px]">
          <div className="col-span-5 space-y-1.5 border-r border-white/10 pr-2">
            <div className="text-mustard font-bold">● main</div>
            <div className="text-white/75">  feat/api-v2</div>
            <div className="text-white/50">  fix/stash-switch</div>
          </div>
          <div className="col-span-7 space-y-1 text-[10px] leading-tight">
            <div className="text-white/50">@@ internal/git/diff.go @@</div>
            <div className="text-red-400">- err := exec.Command(&quot;git&quot;)</div>
            <div className="text-emerald-400">+ return parseDiff(out)</div>
            <div className="text-amber-300">! Ours / Theirs / $EDITOR</div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-white/55">
          <span>j/k: nav • f: fetch • p: pull</span>
          <span className="text-mustard">GO INSTALL READY</span>
        </div>
      </div>
    ),
    look4: (
      <div className="flex h-full w-full flex-col justify-between bg-[#1E1E20] p-5 text-[#F4F2ED]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[10px]">
          <span>LOOK4 // GNOME GTK4</span>
          <span className="text-mustard">RUST BINARY</span>
        </div>
        <div className="my-auto space-y-2 py-3 font-mono text-[10px]">
          <div className="flex items-center justify-between rounded border border-white/15 bg-white/5 px-3 py-2">
            <span>Ctrl+Alt+V → VirusTotal Scan</span>
            <span className="text-mustard">CLEAN</span>
          </div>
          <div className="flex items-center justify-between rounded border border-white/15 bg-white/5 px-3 py-2">
            <span>Ctrl+Alt+R → Redirect Tracer</span>
            <span className="text-white/70">FINAL URL</span>
          </div>
        </div>
        <div className="border-t border-white/10 pt-2.5 font-mono text-[10px] text-white/60">
          LIBADWAITA • DBUS • OPENSSL
        </div>
      </div>
    ),
    "skypass-features": (
      <div className="flex h-full w-full flex-col justify-between bg-[#141413] p-5 text-[#F4F2ED]">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[10px]">
          <span>SKYPASS // 08/2025 — 08/2026</span>
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
      {visuals[projectId] ?? visuals.tcc}
    </div>
  );
}
