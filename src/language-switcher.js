export function initLanguageSwitcher() {
  const langSwitch = document.querySelector(".hero__lang");
  if (!langSwitch) return;
  const options = Array.from(
    langSwitch.querySelectorAll(".hero__lang-option")
  );

  const i18n = {
    zh: {
      navDocs: "文档",
      navProduct: "产品",
      navBlog: "博客",
      navJoinUs: "加入我们",
      heroSubtitle:
        "面向开发者的新一代 AI 编程助手，支持无限上下文，帮助你更高效地理解、构建与协作。",
      featuresTitle: "为什么选择 MiMo Code",
      card1Title: "开箱即用顶尖模型",
      card1Body:
        "无需登录，开箱即用，免费体验比肩 Claude Sonnet 4.6 级别多模态模型。",
      card2Title: "模型 Agent 协同",
      card2Body:
        "MiMo 模型与 Agent 协同优化，复杂编码任务一次搞定。",
      card3Title: "无限上下文",
      card3Body:
        "知识自动沉淀，配合记忆整理。上百轮对话，也不丢失关键信息，智商始终在线。",
      card4Title: "自进化系统",
      card4Body:
        "基于使用反馈持续学习与优化，模型能力、工具链、工作流随你的项目共同成长。越用越懂你，越用越顺手，打造专属智能开发伙伴。",
      card5Title: "Compose模式",
      card5Body: "一个人的专业开发团队，从想法到产品的工业级交付",
    },
    en: {
      navDocs: "Docs",
      navProduct: "Product",
      navBlog: "Blog",
      navJoinUs: "Join Us",
      heroSubtitle:
        "A next-generation AI coding assistant for developers. Unlimited context lets you understand, build, and collaborate more efficiently.",
      featuresTitle: "Why Choose MiMo Code",
      card1Title: "Top-Tier Models Out of the Box",
      card1Body:
        "No login, ready out of the box. Experience multimodal models on par with Claude Sonnet 4.6 — free.",
      card2Title: "Model-Agent Collaboration",
      card2Body:
        "MiMo models and agents are optimized together to complete complex coding tasks in one pass.",
      card3Title: "Unlimited Context",
      card3Body:
        "Knowledge accumulates automatically with lossless compression, preserving every critical detail even across million-line projects.",
      card4Title: "Self-Evolving System",
      card4Body:
        "Learns continuously from your feedback. Models, toolchain, and workflows grow with the project — the more you use it, the better it fits, like a dedicated AI dev partner.",
      card5Title: "Compose Mode",
      card5Body:
        "A professional dev team in a single person — industrial-grade delivery from idea to product.",
    },
  };

  let lang = "zh";

  function applyLang(newLang) {
    lang = newLang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    options.forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.lang === lang);
    });
    const docsBtn = document.getElementById("docsBtn");
    if (docsBtn) {
      docsBtn.setAttribute(
        "href",
        lang === "zh" ? "/zh/mimocode/start" : "/mimocode/start"
      );
    }
    const blogBtn = document.getElementById("blogBtn");
    if (blogBtn) {
      blogBtn.setAttribute(
        "href",
        lang === "zh"
          ? "/zh/blog/mimo-code-long-horizon"
          : "/blog/mimo-code-long-horizon"
      );
    }
    // 顶栏导航链接跟随当前语言：中文加 /zh 前缀，英文不加，
    // 与主页（HomeNavLinks）保持一致。
    const prefix = lang === "zh" ? "/zh" : "";
    const navLinks = {
      navHome: prefix + "/",
      navMiMoCode: prefix + "/mimocode",
      navBlog: prefix + "/#blog",
      navJoinUs: prefix + "/#joinUs",
    };
    Object.entries(navLinks).forEach(([id, href]) => {
      const el = document.getElementById(id);
      if (el) el.setAttribute("href", href);
    });
    const dict = i18n[lang];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const text = dict[key];
      if (text === undefined) return;
      if (el.classList.contains("hero__subtitle")) {
        // Drop any typewriter state, then show the translation directly.
        el.classList.remove("is-typing", "is-done");
        el.style.width = "";
        el.style.whiteSpace = newLang === "zh" ? "nowrap" : "normal";
        el.textContent = text;
        return;
      }
      const isTitle =
        el.tagName === "H3" && el.closest(".card__text");
      if (!isTitle) {
        el.textContent = text;
        return;
      }
      // Card title: rebuild char spans + cursor, preserve typed state
      const wasTyped = el.dataset.typed === "1";
      el.textContent = "";
      for (const c of text) {
        const span = document.createElement("span");
        span.className = "char";
        if (wasTyped) span.classList.add("is-typed");
        span.textContent = c;
        el.appendChild(span);
      }
      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.setAttribute("aria-hidden", "true");
      el.appendChild(cursor);
    });
  }

  options.forEach((opt) => {
    opt.addEventListener("click", () => {
      applyLang(opt.dataset.lang);
      opt.blur();
    });
  });

  // Initial language from the ?lang= query (the page is embedded as an iframe).
  const initialLang =
    new URLSearchParams(window.location.search).get("lang") === "en"
      ? "en"
      : "zh";
  applyLang(initialLang);
}
