"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyCommandProps {
  command: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function CopyCommand({
  command,
  copyLabel,
  copiedLabel,
}: CopyCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 border border-rule-strong bg-ink px-3.5 py-2.5 font-mono text-xs text-paper">
      <code className="overflow-x-auto whitespace-nowrap text-[11px] sm:text-xs">
        <span className="mr-2 select-none text-mustard">$</span>
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex shrink-0 items-center gap-1.5 border border-paper/25 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-paper transition-colors hover:border-mustard hover:text-mustard"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-mustard" />
            {copiedLabel}
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            {copyLabel}
          </>
        )}
      </button>
    </div>
  );
}
