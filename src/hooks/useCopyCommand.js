import { useCallback, useEffect, useRef, useState } from "react";

export function useCopyCommand(text) {
  const timeoutRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const fallbackCopy = useCallback(() => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }, [text]);

  const copy = useCallback(async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        fallbackCopy();
      }
    } else {
      fallbackCopy();
    }

    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1400);
  }, [fallbackCopy, text]);

  return { copied, copy };
}
