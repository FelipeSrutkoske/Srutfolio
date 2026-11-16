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

export default function ArchitectureDiagram({
  nodes,
  locale,
  hint,
}: ArchitectureDiagramProps) {
  const [selectedId, setSelectedId] = useState<string>(nodes[0]?.id ?? "");
  const activeNode = nodes.find((n) => n.id === selectedId) ?? nodes[0];

  if (!nodes.length) return null;

  return (
    <div className="border border-rule-strong bg-paper-alt p-5 md:p-8">
      <p className="font-mono text-xs text-ink-muted">{hint}</p>

      <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        {nodes.map((node, index) => {
          const isActive = node.id === activeNode?.id;
          return (
            <div key={node.id} className="flex flex-1 flex-col items-center md:flex-row">
              <button
                type="button"
                onClick={() => setSelectedId(node.id)}
                className={`w-full border p-4 text-left transition-all ${
                  isActive
                    ? "border-ink bg-ink text-paper shadow-[4px_4px_0px_#E0A714]"
                    : "border-rule-strong bg-paper text-ink hover:border-ink hover:bg-mustard-soft"
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
                  <span className={isActive ? "text-mustard" : "text-ink-muted"}>
                    0{index + 1} // {node.layer}
                  </span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-mustard" />
                  )}
                </div>
                <div className="mt-2 font-display text-lg font-bold">
                  {node.label}
                </div>
                <div
                  className={`mt-1 font-mono text-[11px] ${
                    isActive ? "text-paper/75" : "text-ink-muted"
                  }`}
                >
                  {node.tech}
                </div>
              </button>

              {index < nodes.length - 1 && (
                <ArrowRight className="my-1 h-4 w-4 shrink-0 rotate-90 text-ink-muted md:mx-2 md:my-0 md:rotate-0" />
              )}
            </div>
          );
        })}
      </div>

      {activeNode && (
        <div className="mt-6 border-t border-rule pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-mustard px-2.5 py-0.5 font-mono text-xs font-bold uppercase text-ink">
              {activeNode.label}
            </span>
            <span className="font-mono text-xs text-ink-muted">
              {activeNode.tech}
            </span>
          </div>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink">
            {pick(locale, activeNode.description, activeNode.descriptionEn)}
          </p>
        </div>
      )}
    </div>
  );
}
