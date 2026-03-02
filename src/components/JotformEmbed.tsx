import { getJotformEmbedUrl } from "@/lib/jotform";
import { AlertCircle } from "lucide-react";

interface JotformEmbedProps {
  /** Jotform URL or form ID. When empty, shows fallback message. */
  formUrlOrId: string | null | undefined;
  /** Minimum height of the iframe (default 500) */
  minHeight?: number;
  className?: string;
  title?: string;
  /** Fallback message when no URL is configured */
  emptyMessage?: string;
}

export function JotformEmbed({
  formUrlOrId,
  minHeight = 500,
  className = "",
  title = "Form",
  emptyMessage = "No form is configured.",
}: JotformEmbedProps) {
  const embedUrl = getJotformEmbedUrl(formUrlOrId ?? undefined);

  if (!embedUrl) {
    return (
      <div
        className={`flex flex-col items-center justify-center py-12 text-center text-muted-foreground rounded-lg border border-border/50 bg-muted/30 ${className}`}
      >
        <AlertCircle className="h-10 w-10 mb-3 opacity-60" />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div
      className={`w-full rounded-lg overflow-hidden border border-border/50 bg-muted/30 ${className}`}
    >
      <iframe
        title={title}
        src={embedUrl}
        className="w-full border-0"
        style={{ minHeight: `${minHeight}px` }}
      />
    </div>
  );
}
