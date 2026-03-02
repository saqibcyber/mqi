import { useRef, useEffect, useState } from "react";
import { getJotformEmbedUrl } from "@/lib/jotform";
import { AlertCircle } from "lucide-react";

const JOTFORM_ORIGINS = ["https://form.jotform.com", "https://secure.jotform.com"];

interface JotformEmbedProps {
  /** Jotform URL or form ID. When empty, shows fallback message. */
  formUrlOrId: string | null | undefined;
  /** Minimum height of the iframe (default 500) */
  minHeight?: number;
  className?: string;
  title?: string;
  /** Fallback message when no URL is configured */
  emptyMessage?: string;
  /** Full-height mode: no borders, no internal scrollbars, expands to fill viewport */
  fullHeight?: boolean;
}

export function JotformEmbed({
  formUrlOrId,
  minHeight = 500,
  className = "",
  title = "Form",
  emptyMessage = "No form is configured.",
  fullHeight = false,
}: JotformEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [dynamicHeight, setDynamicHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== "string") return;
      if (!JOTFORM_ORIGINS.some((origin) => e.origin === origin)) return;
      if (e.source !== iframeRef.current?.contentWindow) return;
      const parts = e.data.split(":");
      if (parts[0] === "setHeight") {
        const h = parseInt(parts[1], 10);
        if (!Number.isNaN(h) && h > 0) setDynamicHeight(h);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

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

  const wrapperClass = fullHeight
    ? `w-full overflow-hidden ${className}`
    : `w-full rounded-lg overflow-hidden border border-border/50 bg-muted/30 ${className}`;

  const initialMin = fullHeight ? "min(calc(100vh - 320px), 1400px)" : `${minHeight}px`;
  const style: React.CSSProperties = {
    minHeight: dynamicHeight != null ? minHeight : initialMin,
    ...(dynamicHeight != null ? { height: dynamicHeight } : {}),
  };

  return (
    <div className={`${wrapperClass} py-2`}>
      <iframe
        ref={iframeRef}
        title={title}
        src={embedUrl}
        className="w-full border-0 block"
        style={style}
        scrolling="no"
      />
    </div>
  );
}
