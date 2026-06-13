import { useRef } from "react";
import { useFeatureTitleTyping } from "../hooks/useFeatureTitleTyping.js";
import { features } from "../i18n.js";
import { FeatureCard } from "./FeatureCard.jsx";

export function FeatureSection({ lang, t }) {
  const listRef = useRef(null);
  useFeatureTitleTyping(listRef, lang);

  return (
    <section className="features w-full">
      <h2 className="features__title">{t.featuresTitle}</h2>
      <div className="features__list" ref={listRef}>
        {features.map((feature) => (
          <FeatureCard feature={feature} key={feature.id} t={t} />
        ))}
      </div>
    </section>
  );
}
