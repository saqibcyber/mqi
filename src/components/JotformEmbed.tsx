import { useCallback, useEffect, useRef, useState } from "react";
import { getJotformEmbedUrl } from "@/lib/jotform";
import { AlertCircle } from "lucide-react";

interface JotformEmbedProps {
  /** Jotform URL or form ID. When empty, shows fallback message. */
  formUrlOrId: string | null | undefined;
  /** Minimum height of the iframe (default 500); used until Jotform sends actual height */
  minHeight?: number;
  className?: string;
  title?: string;
  /** Fallback message when no URL is configured */
  emptyMessage?: string;
  /** When true (default), seamlessly embed without card/border wrapper */
  borderless?: boolean;
  /** When true (default), defer loading until near the viewport */
  lazy?: boolean;
}

export function JotformEmbed({
  formUrlOrId,
  minHeight = 500,
  className = "",
  title = "Form",
  emptyMessage = "No form is configured.",
  borderless = true,
  lazy = true,
}: JotformEmbedProps) {
  const embedUrl = getJotformEmbedUrl(formUrlOrId ?? undefined);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const [iframeHeight, setIframeHeight] = useState(minHeight);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMessage = useCallback((e: MessageEvent) => {
    if (typeof e.data !== "string") return;
    if (e.origin && !e.origin.includes("jotform.com")) return;
    const parts = e.data.split(":");
    if (parts[0] === "setHeight" && parts[1]) {
      const h = parseInt(parts[1], 10);
      if (!Number.isNaN(h) && h > 0) setIframeHeight(Math.max(h, minHeight));
    }
  }, [minHeight]);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    if (!shouldLoad) return;
    const t = setTimeout(() => {
      setIframeHeight((prev) => (prev <= minHeight ? 1800 : prev));
    }, 2000);
    return () => clearTimeout(t);
  }, [minHeight, shouldLoad]);

  if (!embedUrl) {
    const containerClasses = borderless
      ? `flex flex-col items-center justify-center py-12 text-center text-muted-foreground ${className}`
      : `flex flex-col items-center justify-center py-12 text-center text-muted-foreground rounded-2xl border border-border/50 bg-muted/30 ${className}`;

    return (
      <div className={containerClasses}>
        <AlertCircle className="h-10 w-10 mb-3 opacity-60" />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  useEffect(() => {
    if (!lazy || shouldLoad) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, shouldLoad]);

  const containerClasses = borderless
    ? `rounded-2xl overflow-hidden w-full ${className}`.trim()
    : `w-full rounded-2xl overflow-hidden border border-border/50 bg-muted/30 ${className}`;

  return (
    <div ref={containerRef} className={containerClasses}>
      {shouldLoad ? (
        <iframe
          ref={iframeRef}
          title={title}
          src={embedUrl}
          className="w-full border-0 block"
          style={{ height: `${iframeHeight}px`, minHeight: `${minHeight}px` }}
          loading="lazy"
          scrolling="no"
        />
      ) : (
        <div
          className="w-full bg-muted/40 animate-pulse"
          style={{ minHeight: `${minHeight}px` }}
        />
      )}
    </div>
  );
}
