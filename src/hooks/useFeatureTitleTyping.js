import { useEffect } from "react";

export function useFeatureTitleTyping(containerRef, lang) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const titles = Array.from(container.querySelectorAll(".card__text h3"));
    if (!titles.length || !("IntersectionObserver" in window)) return;

    const CHAR_DELAY = 130;

    titles.forEach((title) => {
      const text = title.textContent;
      title.dataset.typed = "";
      title.classList.remove("is-active", "is-done");
      title.textContent = "";

      for (const character of text) {
        const span = document.createElement("span");
        span.className = "char";
        span.textContent = character;
        title.appendChild(span);
      }

      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.setAttribute("aria-hidden", "true");
      title.appendChild(cursor);
    });

    function animateType(title) {
      if (title.dataset.typed === "1") return;
      title.dataset.typed = "1";
      title.classList.add("is-active");
      title.querySelectorAll(".char").forEach((character, index) => {
        window.setTimeout(
          () => character.classList.add("is-typed"),
          index * CHAR_DELAY,
        );
      });
      window.setTimeout(
        () => title.classList.add("is-done"),
        title.querySelectorAll(".char").length * CHAR_DELAY + 120,
      );
    }

    function snapShow(title) {
      if (title.dataset.typed === "1") return;
      title.dataset.typed = "1";
      title.classList.add("is-active", "is-done");
      title
        .querySelectorAll(".char")
        .forEach((character) => character.classList.add("is-typed"));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) animateType(entry.target);
        });
      },
      { threshold: 0.25 },
    );

    titles.forEach((title) => observer.observe(title));

    function onScroll() {
      const cut = window.innerHeight * 0.5;
      titles.forEach((title) => {
        if (title.dataset.typed === "1") return;
        if (title.getBoundingClientRect().bottom < cut) snapShow(title);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, lang]);
}
