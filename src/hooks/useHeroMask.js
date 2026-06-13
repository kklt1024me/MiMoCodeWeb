import { useEffect } from "react";

export function useHeroMask(heroRef, canvasRef) {
  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    if (!window.matchMedia("(hover: hover)").matches) {
      canvas.style.display = "none";
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const MASK = "252, 250, 248";
    const R_START = 8;
    const R_END = 128;
    const R_VARY = 0.45;
    const LIFETIME = 520;
    const STAMP_STEP = 12;
    const MAX_STAMPS = 160;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    let raf = 0;
    let running = false;
    let lastX = null;
    let lastY = null;
    const stamps = [];

    function resize() {
      const rect = hero.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      canvas.width = Math.round(width * DPR);
      canvas.height = Math.round(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${MASK})`;
      ctx.fillRect(0, 0, width, height);
    }

    function addStamp(x, y) {
      stamps.push({
        born: performance.now(),
        rmax: R_END * (1 - R_VARY / 2 + Math.random() * R_VARY),
        seed: Math.random() * 1000,
        x,
        y,
      });
      if (stamps.length > MAX_STAMPS) stamps.shift();
    }

    function stampAlong(x, y) {
      if (lastX == null || lastY == null) {
        addStamp(x, y);
      } else {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
        for (let i = 1; i <= steps; i += 1) {
          addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
        }
      }
      lastX = x;
      lastY = y;
    }

    function carveInk(x, y, r, alpha, seed) {
      const gradient = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
      gradient.addColorStop(0, `rgba(0,0,0,${alpha})`);
      gradient.addColorStop(0.58, `rgba(0,0,0,${alpha * 0.9})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      const segments = 32;
      for (let i = 0; i <= segments; i += 1) {
        const angle = (i / segments) * Math.PI * 2;
        const wobble =
          1 +
          Math.sin(angle * 3.1 + seed) * 0.08 +
          Math.sin(angle * 7.3 + seed * 0.37) * 0.045;
        const radius = r * wobble;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }

    function loop() {
      const now = performance.now();
      const width = canvas.width / DPR;
      const height = canvas.height / DPR;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${MASK})`;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "destination-out";

      for (let i = stamps.length - 1; i >= 0; i -= 1) {
        const t = (now - stamps[i].born) / LIFETIME;
        if (t >= 1) {
          stamps.splice(i, 1);
          continue;
        }
        const ease = 1 - Math.pow(1 - t, 3);
        const radius = R_START + (stamps[i].rmax - R_START) * ease;
        const alpha = 1 - t * t;
        carveInk(stamps[i].x, stamps[i].y, radius, alpha, stamps[i].seed);
      }

      if (running || stamps.length) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    }

    function start() {
      if (!raf) raf = requestAnimationFrame(loop);
    }

    function onMouseEnter(event) {
      running = true;
      const rect = hero.getBoundingClientRect();
      lastX = event.clientX - rect.left;
      lastY = event.clientY - rect.top;
      stampAlong(lastX, lastY);
      start();
    }

    function onMouseMove(event) {
      const rect = hero.getBoundingClientRect();
      stampAlong(event.clientX - rect.left, event.clientY - rect.top);
      start();
    }

    function onMouseLeave() {
      running = false;
      lastX = null;
      lastY = null;
      start();
    }

    resize();
    window.addEventListener("resize", resize);
    hero.addEventListener("mouseenter", onMouseEnter);
    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("mouseenter", onMouseEnter);
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [canvasRef, heroRef]);
}
