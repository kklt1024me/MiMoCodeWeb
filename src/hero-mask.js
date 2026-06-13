export function initHeroMask() {
  const hero = document.getElementById("hero");
  const canvas = document.getElementById("heroMask");
  if (!hero || !canvas) return;

  const canHover = window.matchMedia("(hover: hover)").matches;
  // Touch devices: the canvas is hidden via CSS and the painting shows through.
  if (!canHover) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const MASK = "252, 250, 248"; // --color-bg (#fcfaf8)
  const R_START = 8; // each ink dot starts small…
  const R_END = 128; // …and expands to a per-dot random max around this
  const R_VARY = 0.45; // per-dot size randomness → lively brush-like variation
  const LIFETIME = 520; // ms — an ink dot expands + fades over this time
  const STAMP_STEP = 12; // distance between ink dots along the cursor path
  const MAX_STAMPS = 160; // cap on simultaneously-living ink dots
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0;
  let h = 0;
  function resize() {
    const rect = hero.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * DPR);
    canvas.height = Math.round(h * DPR);
    // Lock CSS display size to the hero — a <canvas> is a replaced element,
    // so inset:0 alone won't stretch it; without this the cursor and the
    // brush are offset by the device-pixel-ratio factor.
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgb(" + MASK + ")";
    ctx.fillRect(0, 0, w, h);
  }
  resize();
  window.addEventListener("resize", resize);

  // Living ink dots; each expands from R_START→R_END and fades over LIFETIME.
  const stamps = [];
  let lastX = null;
  let lastY = null;

  function addStamp(x, y) {
    if (stamps.length >= MAX_STAMPS) stamps.shift();
    stamps.push({
      x: x,
      y: y,
      born: performance.now(),
      seed: Math.random() * Math.PI * 2,
      rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
    });
  }

  function stampAlong(x, y) {
    if (lastX === null) {
      addStamp(x, y);
    } else {
      const dx = x - lastX;
      const dy = y - lastY;
      const dist = Math.hypot(dx, dy);
      const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
      for (let i = 1; i <= steps; i++) {
        addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps);
      }
    }
    lastX = x;
    lastY = y;
  }

  // One ink dot: an irregular, soft-edged hole revealing the painting.
  // The wobbling radius approximates the old feTurbulence ink edge.
  function carveInk(x, y, r, alpha, seed) {
    const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
    g.addColorStop(0, "rgba(0, 0, 0, " + 0.95 * alpha + ")");
    g.addColorStop(0.55, "rgba(0, 0, 0, " + 0.88 * alpha + ")");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    const segs = 32;
    for (let i = 0; i <= segs; i++) {
      const a = (i / segs) * Math.PI * 2;
      const wob =
        0.78 +
        0.14 * Math.sin(a * 3 + seed) +
        0.08 * Math.sin(a * 7 + seed * 2.1) +
        0.05 * Math.sin(a * 13 + seed * 0.7);
      const rr = r * wob;
      const px = x + Math.cos(a) * rr;
      const py = y + Math.sin(a) * rr;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  let running = false;
  function loop() {
    const now = performance.now();

    // Repaint the solid mask, then carve every living ink dot back out.
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgb(" + MASK + ")";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "destination-out";
    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / LIFETIME;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic expansion
      const r = R_START + (stamps[i].rmax - R_START) * ease;
      const alpha = 1 - t * t; // fade the hole closed as it ages
      carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed);
    }

    if (stamps.length) {
      requestAnimationFrame(loop);
    } else {
      running = false; // nothing left to animate → pause
    }
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(loop);
    }
  }

  hero.addEventListener("mouseenter", function (e) {
    const rect = hero.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    stampAlong(lastX, lastY);
    start();
  });

  hero.addEventListener("mousemove", function (e) {
    const rect = hero.getBoundingClientRect();
    stampAlong(e.clientX - rect.left, e.clientY - rect.top);
    start();
  });

  hero.addEventListener("mouseleave", function () {
    lastX = null;
    lastY = null;
  });
}
