# 跟随鼠标擦除显影效果技术文档

本文档提取自 MiMo Code 首屏的 canvas 擦除显影效果，适合迁移到 React、Vue 或原生前端项目中。效果目标是：页面上方先覆盖一层与背景同色的遮罩，用户移动鼠标时，鼠标轨迹像“擦除”一样临时挖开遮罩，露出下方图片。

## 效果概述

核心视觉结构是三层：

1. 底层：背景图片或插画。
2. 中层：覆盖整块区域的 `<canvas>` 遮罩，填充为页面背景色。
3. 上层：标题、导航、按钮等真实内容。

鼠标进入区域后，代码不断记录鼠标轨迹点，并在每一帧重新绘制遮罩。绘制流程是先铺满遮罩色，再用 `globalCompositeOperation = "destination-out"` 在鼠标轨迹处“挖洞”。每个洞会随时间扩大并淡出，因此最终遮罩会自动恢复。

## 适用场景

- Landing page hero 背景显影。
- 图片、海报或插画的局部探索效果。
- 需要营造纸面、水墨、擦除、聚焦感的首屏互动。
- 不适合按钮、表单、列表等高频操作区域。

## DOM 结构

```jsx
import { useRef } from "react";
import { useMouseEraseReveal } from "./useMouseEraseReveal";

export function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useMouseEraseReveal(containerRef, canvasRef);

  return (
    <section className="hero" ref={containerRef}>
      <div className="hero__bg" aria-hidden="true" />
      <canvas className="hero__mask" ref={canvasRef} aria-hidden="true" />

      <div className="hero__content">
        <h1>Product Name</h1>
        <p>Subtitle content</p>
      </div>
    </section>
  );
}
```

关键点：

- `section` 必须是 `position: relative`，并且建议开启 `overflow: hidden`。
- 背景图、canvas、内容使用不同 `z-index` 分层。
- canvas 只负责视觉效果，设置 `aria-hidden="true"`。
- canvas 必须 `pointer-events: none`，不要挡住真实按钮或链接。

## CSS 基础样式

```css
.hero {
  position: relative;
  height: 592px;
  overflow: hidden;
  isolation: isolate;
  background: #fcfaf8;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: url("/path/to/hero-image.png");
  background-size: 1440px 592px;
  background-position: bottom center;
  background-repeat: no-repeat;
}

.hero__mask {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  pointer-events: none;
}

.hero__content {
  position: relative;
  z-index: 2;
}

@media (hover: none) {
  .hero__mask {
    display: none;
  }
}
```

移动端和触摸设备建议关闭该效果。触摸设备没有稳定 hover 状态，强行模拟会增加性能负担，也容易遮挡主要内容。

## React Hook 最小实现

```js
import { useEffect } from "react";

export function useMouseEraseReveal(containerRef, canvasRef) {
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

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
      const rect = container.getBoundingClientRect();
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
      gradient.addColorStop(0, `rgba(0, 0, 0, ${alpha})`);
      gradient.addColorStop(0.58, `rgba(0, 0, 0, ${alpha * 0.9})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

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
      const rect = container.getBoundingClientRect();
      lastX = event.clientX - rect.left;
      lastY = event.clientY - rect.top;
      stampAlong(lastX, lastY);
      start();
    }

    function onMouseMove(event) {
      const rect = container.getBoundingClientRect();
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
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [canvasRef, containerRef]);
}
```

## 核心参数说明

| 参数 | 当前值 | 作用 |
| --- | --- | --- |
| `MASK` | `"252, 250, 248"` | 遮罩颜色，需要与页面背景一致。 |
| `R_START` | `8` | 擦除印章的起始半径。 |
| `R_END` | `128` | 擦除印章的最大半径。值越大，显影范围越大。 |
| `R_VARY` | `0.45` | 每个印章最大半径的随机波动，让边缘更自然。 |
| `LIFETIME` | `520` | 每个印章存活时间，单位毫秒。值越大，显影停留越久。 |
| `STAMP_STEP` | `12` | 鼠标移动时补点间距。值越小，轨迹越连续，性能成本越高。 |
| `MAX_STAMPS` | `160` | 同时存在的最大印章数，控制内存和绘制成本。 |
| `DPR` | `min(devicePixelRatio, 2)` | 适配高清屏，同时限制高 DPR 带来的绘制压力。 |

## 工作原理

### 1. 适配高清屏

canvas 的真实像素尺寸需要乘以 DPR，CSS 尺寸保持容器尺寸。随后使用 `ctx.setTransform(DPR, 0, 0, DPR, 0, 0)`，让后续绘制仍然使用 CSS 像素坐标。

### 2. 用 `destination-out` 挖掉遮罩

每一帧先用 `source-over` 重新铺满遮罩色，再切换到 `destination-out`。此时绘制的黑色渐变不会显示为黑色，而是从已有画布中扣除透明区域，下方背景图就会露出来。

### 3. 用轨迹补点避免断裂

鼠标移动事件的触发频率不稳定。如果只在事件点绘制，快速移动时轨迹会断。`stampAlong()` 会根据上一个点和当前点的距离，在两点之间按 `STAMP_STEP` 插入多个印章。

### 4. 用不规则圆模拟自然边缘

`carveInk()` 不是绘制标准圆，而是用 32 段路径和两组 `Math.sin()` 波动生成轻微不规则边缘。这样显影边界更像纸面擦除或水墨扩散。

### 5. 自动恢复遮罩

每个印章都有 `born` 时间。动画帧中根据 `(now - born) / LIFETIME` 计算生命周期：

- 半径使用 ease-out 增长。
- alpha 使用 `1 - t * t` 衰减。
- 超过生命周期后从数组删除。

因为每帧都会重画完整遮罩，所以印章消失后遮罩自然恢复。

## 迁移步骤

1. 准备一个固定或稳定高度的容器。
2. 将背景图片放在底层，canvas 遮罩放在中层，内容放在上层。
3. 将 `MASK` 改成目标页面背景色的 RGB 值。
4. 按视觉需求调整 `R_END` 和 `LIFETIME`。
5. 在触摸设备上关闭效果。
6. 确认 canvas 不接管鼠标事件。
7. 用浏览器检查 resize、DPR、滚动后坐标是否正常。

## 常见问题

### 背景图没有露出来

检查 canvas 是否在背景图上方、内容下方；检查 `globalCompositeOperation` 是否切换为 `destination-out`；检查背景图是否真的加载成功。

### 擦除区域颜色不一致

`MASK` 必须与容器背景色一致。例如页面背景是 `#fcfaf8`，则 `MASK` 应为 `"252, 250, 248"`。

### 快速移动时轨迹断开

降低 `STAMP_STEP`，例如从 `12` 调到 `8`。如果性能下降，再降低 `MAX_STAMPS` 或 `R_END`。

### 高分屏发虚

确认 canvas 的 `width` / `height` 使用了 DPR，且 CSS `width` / `height` 使用的是容器实际尺寸。

### 页面卡顿

优先降低：

- `MAX_STAMPS`
- `R_END`
- `segments`
- DPR 上限

同时确保只在 `running || stamps.length` 时继续 requestAnimationFrame，不要让动画循环常驻运行。

## 当前项目对应文件

- 实现 hook：`src/hooks/useHeroMask.js`
- DOM 接入：`src/components/Hero.jsx`
- 分层样式：`src/styles.css`
