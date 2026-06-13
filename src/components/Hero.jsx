import { useRef } from "react";
import { useHeroMask } from "../hooks/useHeroMask.js";
import { CTAButtons } from "./CTAButtons.jsx";
import { HeroSubtitle } from "./HeroSubtitle.jsx";
import { NavBar } from "./NavBar.jsx";
import { TerminalCommand } from "./TerminalCommand.jsx";

export function Hero({ copyText, lang, links, setLang, t }) {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);

  useHeroMask(heroRef, canvasRef);

  return (
    <section
      className="hero relative isolate overflow-hidden"
      id="hero"
      ref={heroRef}
    >
      <div aria-hidden="true" className="hero__bg" />
      <canvas
        aria-hidden="true"
        className="hero__mask"
        id="heroMask"
        ref={canvasRef}
      />

      <NavBar lang={lang} links={links} setLang={setLang} t={t} />

      <div className="hero__content">
        <div className="hero__heading">
          <h1 className="hero__title">MiMo Code</h1>
          <HeroSubtitle lang={lang} text={t.heroSubtitle} />
        </div>

        <TerminalCommand copyText={copyText} />
        <CTAButtons links={links} t={t} />
      </div>
    </section>
  );
}
