export const i18n = {
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
    card2Body: "MiMo 模型与 Agent 协同优化，复杂编码任务一次搞定。",
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

export function getInitialLanguage() {
  return new URLSearchParams(window.location.search).get("lang") === "en"
    ? "en"
    : "zh";
}

export const features = [
  {
    id: 1,
    image: "/coder/assets/feature-model.png",
    titleKey: "card1Title",
    bodyKey: "card1Body",
    imageFirst: true,
  },
  {
    id: 2,
    image: "/coder/assets/feature-agent.png",
    titleKey: "card2Title",
    bodyKey: "card2Body",
    imageFirst: false,
  },
  {
    id: 3,
    image: "/coder/assets/feature-context.png",
    titleKey: "card3Title",
    bodyKey: "card3Body",
    imageFirst: true,
  },
  {
    id: 4,
    image: "/coder/assets/feature-evolution.png",
    titleKey: "card4Title",
    bodyKey: "card4Body",
    imageFirst: false,
  },
  {
    id: 5,
    image: "/coder/assets/feature-compose.png",
    titleKey: "card5Title",
    bodyKey: "card5Body",
    imageFirst: true,
  },
];
