import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface CodeWidgetProps {
  title: string;
  data: {
    language: string;
    code: string;
  };
}

export const CodeWidget = ({ title, data }: CodeWidgetProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div className="rounded-lg bg-[hsl(222,47%,8%)] border border-border overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-border/50">
          <span className="w-2 h-2 rounded-full bg-destructive/60" />
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--atlas-warning))]/60" />
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--atlas-success))]/60" />
          <span className="text-[10px] text-muted-foreground ml-2">{data.language}</span>
        </div>
        <pre className="p-4 text-xs leading-relaxed overflow-x-auto scrollbar-thin">
          <code className="text-[hsl(210,40%,80%)] font-mono">{data.code}</code>
        </pre>
      </div>
    </div>
  );
};
