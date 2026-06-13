export function initHeroSubtitleTyping() {
  const sub = document.querySelector(".hero__subtitle");
  if (!sub) return;
  // Keep it simple on small screens: no typewriter, allow wrapping.
  if (window.matchMedia("(max-width: 700px)").matches) return;
  const original = sub.textContent.trim();

  function type() {
    // Measure the full single-line width and lock it, so characters
    // print left→right inside a box that stays centered in the hero.
    sub.style.whiteSpace = "nowrap";
    sub.textContent = original;
    const fullW = sub.getBoundingClientRect().width;
    if (fullW > 0) sub.style.width = Math.ceil(fullW) + "px";
    sub.textContent = "";
    sub.classList.add("is-typing");

    const chars = [];
    for (const ch of original) {
      const s = document.createElement("span");
      s.className = "char";
      s.textContent = ch;
      sub.appendChild(s);
      chars.push(s);
    }
    const caret = document.createElement("span");
    caret.className = "type-caret";
    caret.setAttribute("aria-hidden", "true");
    sub.appendChild(caret);

    const DELAY = 55; // ms per character — printer-like cadence
    const START = 350;
    chars.forEach((c, i) => {
      setTimeout(() => c.classList.add("is-typed"), START + i * DELAY);
    });
    setTimeout(
      () => sub.classList.add("is-done"),
      START + chars.length * DELAY + 150,
    );
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(type);
  } else {
    type();
  }
}
