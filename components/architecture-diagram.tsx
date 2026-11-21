"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import type { ArchitectureNode } from "@/data/projects";
import { pick } from "@/lib/localize";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  locale: string;
  hint: string;
}

const layerLabels: Record<ArchitectureNode["layer"], { pt: string; en: string }> = {
  client: { pt: "Cliente", en: "Client" },
  gateway: { pt: "Borda / Integração", en: "Edge / Integration" },
  service: { pt: "Serviço / Core", en: "Service / Core" },
  data: { pt: "Dados / Host", en: "Data / Host" },
};

export default function ArchitectureDiagram({
  nodes,
  locale,
  hint,
}: ArchitectureDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>(nodes[0]?.id ?? "");
  const activeNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  if (!nodes.length) return null;

  return (
    <div className="blueprint-grid border border-rule-strong bg-paper-alt p-5 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-4">
        <p className="font-mono text-xs text-ink-muted">{hint}</p>
        <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted">
          {nodes.length} {locale === "en" ? "layers" : "camadas"}
        </span>
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-3 lg:flex-row lg:items-stretch">
        {nodes.map((node, index) => {
          const isActive = node.id === activeNode?.id;
          const layerLabel =
            locale === "en"
              ? layerLabels[node.layer].en
              : layerLabels[node.layer].pt;

          return (
            <div
              key={node.id}
              className="flex flex-1 flex-col items-center lg:flex-row"
            >
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedId(node.id)}
                className={`flex h-full w-full flex-col justify-between border p-4 text-left transition-all ${
                  isActive
                    ? "border-ink bg-ink text-paper shadow-[4px_4px_0px_#E0A714]"
                    : "border-rule-strong bg-paper text-ink hover:border-ink hover:bg-mustard-soft"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-wider">
                    <span className={isActive ? "text-mustard" : "text-ink-muted"}>
                      {layerLabel}
                    </span>
                    {node.protocol && (
                      <span
                        className={`px-1.5 py-0.5 text-[9px] font-bold ${
                          isActive
                            ? "bg-mustard text-ink"
                            : "border border-rule-strong bg-paper-alt text-ink"
                        }`}
                      >
                        {node.protocol}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 font-display text-lg font-bold leading-snug">
                    {node.label}
                  </div>
                </div>

                <div
                  className={`mt-3 border-t pt-2 font-mono text-[11px] ${
                    isActive
                      ? "border-paper/20 text-paper/80"
                      : "border-rule text-ink-muted"
                  }`}
                >
                  {node.tech}
                </div>
              </button>

              {index < nodes.length - 1 && (
                <ArrowRight className="my-1.5 h-4 w-4 shrink-0 rotate-90 text-ink-muted lg:mx-2 lg:my-0 lg:rotate-0" />
              )}
            </div>
          );
        })}
      </div>

      {activeNode && (
        <div
          aria-live="polite"
          className="mt-6 border border-rule-strong bg-paper p-5"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-mustard px-2.5 py-0.5 font-mono text-xs font-bold uppercase text-ink">
              {activeNode.label}
            </span>
            {activeNode.protocol && (
              <span className="border border-rule-strong px-2 py-0.5 font-mono text-[11px] text-ink">
                {activeNode.protocol}
              </span>
            )}
            <span className="font-mono text-xs text-ink-muted">
              {activeNode.tech}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink md:text-base">
            {pick(locale, activeNode.description, activeNode.descriptionEn)}
          </p>
        </div>
      )}
    </div>
  );
}
