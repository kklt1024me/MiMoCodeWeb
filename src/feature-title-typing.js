export function initFeatureTitleTyping() {
  const titles = document.querySelectorAll(".card__text h3");
  if (!titles.length || !("IntersectionObserver" in window)) return;

  const CHAR_DELAY = 130; // ms between characters

  titles.forEach((h3) => {
    const text = h3.textContent;
    h3.textContent = "";
    for (const c of text) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = c;
      h3.appendChild(span);
    }
    const cursor = document.createElement("span");
    cursor.className = "cursor";
    cursor.setAttribute("aria-hidden", "true");
    h3.appendChild(cursor);
  });

  function animateType(h3) {
    if (h3.dataset.typed === "1") return;
    h3.dataset.typed = "1";
    h3.classList.add("is-active");
    const chars = h3.querySelectorAll(".char");
    chars.forEach((char, i) => {
      setTimeout(() => char.classList.add("is-typed"), i * CHAR_DELAY);
    });
    setTimeout(
      () => h3.classList.add("is-done"),
      chars.length * CHAR_DELAY + 120,
    );
  }

  function snapShow(h3) {
    if (h3.dataset.typed === "1") return;
    h3.dataset.typed = "1";
    h3.classList.add("is-active", "is-done");
    h3
      .querySelectorAll(".char")
      .forEach((c) => c.classList.add("is-typed"));
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) animateType(entry.target);
      });
    },
    { threshold: 0.25 },
  );
  titles.forEach((h3) => obs.observe(h3));

  // Safety net: title scrolled past the trigger zone without animation
  // (e.g. user jumped via anchor or scrolled very fast) → snap visible.
  window.addEventListener(
    "scroll",
    () => {
      const cut = window.innerHeight * 0.5;
      titles.forEach((h3) => {
        if (h3.dataset.typed === "1") return;
        if (h3.getBoundingClientRect().bottom < cut) snapShow(h3);
      });
    },
    { passive: true },
  );
}
