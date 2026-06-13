import { CaretIcon } from "./icons.jsx";

export function NavBar({ lang, links, setLang, t }) {
  return (
    <>
      <a
        aria-label="MiMo"
        className="hero__logo-link"
        href={links.home}
        id="navHome"
        target="_top"
      >
        <img
          alt="Xiaomi MiMo"
          className="hero__logo"
          src="/coder/assets/logo.png"
          width="120"
        />
      </a>

      <div aria-hidden="true" className="hero__divider" />

      <div className="hero__bar">
        <nav aria-label="Main navigation" className="hero__nav">
          <div className="hero__nav-dropdown">
            <button
              className="hero__nav-link hero__nav-dropdown-trigger"
              type="button"
            >
              <span>{t.navProduct}</span>
              <CaretIcon />
            </button>
            <div className="hero__nav-menu" role="menu">
              <a
                className="hero__nav-menu-item"
                href={links.mimocode}
                id="navMiMoCode"
                role="menuitem"
                target="_top"
              >
                MiMo Code
              </a>
            </div>
          </div>
          <a
            className="hero__nav-link"
            href={links.blog}
            id="navBlog"
            target="_top"
          >
            {t.navBlog}
          </a>
          <a
            className="hero__nav-link"
            href={links.joinUs}
            id="navJoinUs"
            target="_top"
          >
            {t.navJoinUs}
          </a>
        </nav>

        <div className="hero__lang hero__nav-dropdown">
          <button
            aria-label="Language"
            className="hero__lang-trigger hero__nav-dropdown-trigger"
            type="button"
          >
            <img
              alt=""
              className="hero__lang-icon"
              src="/coder/assets/icon-translate.svg"
            />
            <CaretIcon />
          </button>
          <div className="hero__nav-menu hero__lang-menu" role="menu">
            <button
              className={`hero__nav-menu-item hero__lang-option ${
                lang === "zh" ? "is-active" : ""
              }`}
              onClick={() => setLang("zh")}
              role="menuitem"
              type="button"
            >
              简体中文
            </button>
            <button
              className={`hero__nav-menu-item hero__lang-option ${
                lang === "en" ? "is-active" : ""
              }`}
              onClick={() => setLang("en")}
              role="menuitem"
              type="button"
            >
              English
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
