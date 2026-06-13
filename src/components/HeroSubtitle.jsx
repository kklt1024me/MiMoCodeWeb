import { useHeroSubtitleTyping } from "../hooks/useHeroSubtitleTyping.js";

export function HeroSubtitle({ lang, text }) {
  const { canType, isDone, typedCount } = useHeroSubtitleTyping(text, lang);

  if (!canType) {
    return <p className="hero__subtitle">{text}</p>;
  }

  return (
    <p
      className={`hero__subtitle is-typing ${isDone ? "is-done" : ""}`}
      style={{ whiteSpace: "nowrap" }}
    >
      {[...text].map((character, index) => (
        <span
          className={`char ${index < typedCount ? "is-typed" : ""}`}
          key={`${character}-${index}`}
        >
          {character}
        </span>
      ))}
      <span aria-hidden="true" className="type-caret" />
    </p>
  );
}
