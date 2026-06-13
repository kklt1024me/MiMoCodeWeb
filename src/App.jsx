import { useEffect, useMemo, useState } from "react";
import { FeatureSection } from "./components/FeatureSection.jsx";
import { Footer } from "./components/Footer.jsx";
import { Hero } from "./components/Hero.jsx";
import { getInitialLanguage, i18n } from "./i18n.js";

export default function App() {
  const [lang, setLang] = useState(getInitialLanguage);
  const copyText = "curl -fsSL https://mimo.xiaomi.com/install | bash";
  const t = i18n[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const links = useMemo(() => {
    const prefix = lang === "zh" ? "/zh" : "";
    return {
      home: `${prefix}/`,
      mimocode: `${prefix}/mimocode`,
      blog: `${prefix}/#blog`,
      joinUs: `${prefix}/#joinUs`,
      docs: lang === "zh" ? "/zh/mimocode/start" : "/mimocode/start",
      article:
        lang === "zh"
          ? "/zh/blog/mimo-code-long-horizon"
          : "/blog/mimo-code-long-horizon",
    };
  }, [lang]);

  return (
    <>
      <Hero
        copyText={copyText}
        lang={lang}
        links={links}
        setLang={setLang}
        t={t}
      />
      <FeatureSection lang={lang} t={t} />
      <Footer />
    </>
  );
}
