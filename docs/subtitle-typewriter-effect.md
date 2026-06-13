# 字幕打字机效果技术文档

本文档提取自 MiMo Code 首屏字幕的打字机效果，适合迁移到 React 项目，也可以改写到 Vue 或原生前端中。效果目标是：首屏副标题按字符逐个出现，并在输入过程中显示一个闪烁光标；输入完成后光标隐藏或停止闪烁。

## 效果概述

实现分为两层：

1. Hook 层：根据文本、语言、屏幕宽度决定是否启用打字效果，并按时间更新已显示字符数量。
2. 组件层：把文本拆成字符数组，每个字符包在 `<span>` 中，根据 `typedCount` 切换显示状态。

这种写法的优点是 React 状态仍然是唯一数据源，不需要全局 DOM 脚本，也方便在语言切换、文本变化、组件卸载时清理定时器。

## 适用场景

- 首屏副标题。
- 产品口号。
- 命令行或 AI 回复开场。
- 需要强调“正在生成”或“逐步揭示”的短文本。

不建议用于长段正文。字符过多会让用户等待，也会增加定时器和渲染成本。

## React Hook

```js
import { useEffect, useMemo, useState } from "react";

export function useSubtitleTyping(text, options = {}) {
  const {
    enabled = true,
    startDelay = 350,
    charDelay = 55,
    mediaQuery = "(max-width: 700px)",
  } = options;

  const canType = useMemo(
    () =>
      enabled &&
      typeof window !== "undefined" &&
      !window.matchMedia(mediaQuery).matches,
    [enabled, mediaQuery],
  );

  const [typedCount, setTypedCount] = useState(canType ? 0 : text.length);

  useEffect(() => {
    if (!canType) {
      setTypedCount(text.length);
      return undefined;
    }

    setTypedCount(0);
    const timers = [];

    for (let index = 0; index <= text.length; index += 1) {
      timers.push(
        window.setTimeout(
          () => setTypedCount(index),
          startDelay + index * charDelay,
        ),
      );
    }

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [canType, charDelay, startDelay, text]);

  return {
    canType,
    isDone: typedCount >= text.length,
    typedCount,
  };
}
```

当前项目的实现还额外绑定了语言条件：只有中文桌面端启用打字效果，英文和移动端直接显示完整字幕。

```js
const canType = useMemo(
  () =>
    typeof window !== "undefined" &&
    !window.matchMedia("(max-width: 700px)").matches &&
    lang === "zh",
  [lang],
);
```

如果你的项目不需要语言限制，可以删除 `lang === "zh"`。

## React 组件

```jsx
import { useSubtitleTyping } from "./useSubtitleTyping";

export function TypewriterSubtitle({ text, enabled = true }) {
  const { canType, isDone, typedCount } = useSubtitleTyping(text, {
    enabled,
    startDelay: 350,
    charDelay: 55,
    mediaQuery: "(max-width: 700px)",
  });

  if (!canType) {
    return <p className="typewriter-subtitle">{text}</p>;
  }

  return (
    <p className={`typewriter-subtitle ${isDone ? "is-done" : ""}`}>
      {[...text].map((character, index) => (
        <span
          className={`char ${index < typedCount ? "is-typed" : ""}`}
          key={`${character}-${index}`}
        >
          {character}
        </span>
      ))}
      <span className="type-caret" aria-hidden="true" />
    </p>
  );
}
```

使用 `[...text]` 而不是 `text.split("")`，可以更好地处理中文、英文和部分 Unicode 字符。对于复杂 emoji 或组合字符，可以进一步使用 `Intl.Segmenter`。

## CSS 样式

```css
.typewriter-subtitle {
  margin: 0;
  max-width: min(940px, 94vw);
  color: #26251e;
  font-family: "Huiwen Mincho", "Noto Serif SC", "Songti SC", serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.4px;
  white-space: nowrap;
}

.typewriter-subtitle .char {
  display: none;
}

.typewriter-subtitle .char.is-typed {
  display: inline;
}

.typewriter-subtitle .type-caret {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  margin-left: 2px;
  background: currentColor;
  vertical-align: -0.18em;
  animation: subtitle-caret 0.75s step-end infinite;
}

.typewriter-subtitle.is-done .type-caret {
  animation: none;
  opacity: 0;
}

@keyframes subtitle-caret {
  50% {
    opacity: 0;
  }
}

@media (max-width: 700px) {
  .typewriter-subtitle {
    font-size: 14px;
    line-height: 1.6;
    white-space: normal;
  }
}
```

当前项目使用 `display: none` / `display: inline` 控制字符显隐。这样还没打出来的字符不会占位，文本会像真实输入一样逐渐变长。

## 核心参数说明

| 参数 | 当前值 | 作用 |
| --- | --- | --- |
| `startDelay` | `350` | 页面渲染后等待多久开始输入，单位毫秒。 |
| `charDelay` | `55` | 每个字符之间的间隔，单位毫秒。 |
| `mediaQuery` | `"(max-width: 700px)"` | 命中时不启用打字效果，直接显示完整文本。 |
| `typedCount` | state | 当前已经显示的字符数量。 |
| `isDone` | derived state | `typedCount >= text.length` 时为完成状态。 |

调参建议：

- 更克制、更高级：`charDelay` 设为 `45` 到 `65`。
- 更像终端输出：`charDelay` 设为 `20` 到 `35`。
- 更有仪式感：`startDelay` 设为 `500` 到 `800`。
- 文案超过 80 个字符时，建议缩短 `charDelay` 或取消打字效果。

## 工作原理

### 1. 根据环境决定是否启用

桌面端短字幕适合打字机效果。移动端因为宽度窄、换行不可控，建议直接显示完整文本。多语言站点还要考虑英文文本更长，启用后可能造成首屏布局抖动。

### 2. 用定时器推进字符数量

Hook 在 `useEffect` 中创建一组 `setTimeout`，每个定时器负责把 `typedCount` 更新到对应 index。文本变化或组件卸载时清理所有定时器。

### 3. 组件只负责展示状态

组件不直接操作 DOM。它根据 `typedCount` 给字符 span 添加 `is-typed` class。CSS 决定字符是否显示，光标是否闪烁。

### 4. 完成后隐藏光标

当 `typedCount >= text.length` 时，组件加上 `is-done` class。CSS 停止光标动画并将光标透明，避免完成后继续闪烁造成干扰。

## 迁移步骤

1. 把 `useSubtitleTyping` 放入项目 hooks 目录。
2. 创建 `TypewriterSubtitle` 组件。
3. 复制 CSS，并替换字体、颜色和字号。
4. 根据项目需求决定是否加入语言条件。
5. 移动端默认关闭，避免窄屏换行导致视觉跳动。
6. 在语言切换、路由切换、文本变化时确认定时器能正确清理。

## 可访问性与用户体验

- 字幕本身使用普通文本节点和 span，屏幕阅读器仍能读取文字。
- 光标使用 `aria-hidden="true"`，不要让辅助技术读到。
- 如果项目需要尊重减少动态效果偏好，可以加入 `prefers-reduced-motion` 判断。

示例：

```js
const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const canType = enabled && !reduceMotion && !isSmallScreen;
```

## 常见问题

### 首屏布局随着打字抖动

如果副标题下面有按钮或命令框，打字过程中文本宽度变化可能改变布局。解决方式：

- 保持副标题单行并设置稳定的容器宽度。
- 给下面的内容固定 margin 或 gap。
- 移动端直接显示完整文本。

### 英文字幕太长

英文字符更多，打字时间可能明显变长。可以为英文关闭效果，或把 `charDelay` 降低到 `25` 到 `35`。

### 切换语言后旧定时器还在跑

确保 `useEffect` 的依赖包含 `text`、`canType` 和时间参数，并在 cleanup 中 `clearTimeout`。

### 字符拆分不符合预期

`[...text]` 适合大多数中英文。若文本包含复杂 emoji、组合音标或多码点字符，使用 `Intl.Segmenter`：

```js
function splitGraphemes(text) {
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter(undefined, {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(text), (item) => item.segment);
  }

  return [...text];
}
```

### 服务端渲染报错

所有访问 `window` 的逻辑必须放在 effect、memo 或运行时判断里，并先检查 `typeof window !== "undefined"`。

## 当前项目对应文件

- Hook：`src/hooks/useHeroSubtitleTyping.js`
- 组件：`src/components/HeroSubtitle.jsx`
- 样式：`src/styles.css`
