export function initCopyCommand() {
  const btn = document.querySelector(".terminal__copy");
  const terminal = document.querySelector(".terminal");
  if (!btn || !terminal) return;

  const text = terminal.getAttribute("data-copy-text") || "";
  let resetTimer = 0;

  function fallbackCopy() {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      ta.style.left = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (err) {
      return false;
    }
  }

  function copy() {
    // Run execCommand synchronously first — awaiting the Clipboard API
    // consumes the transient user activation token, after which
    // execCommand is also denied.
    const ok = fallbackCopy();

    // Best-effort upgrade to the modern API (fire and forget).
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }

    if (!ok) return;

    btn.classList.add("is-copied");
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      btn.classList.remove("is-copied");
    }, 1500);
  }

  btn.addEventListener("click", copy);
}
