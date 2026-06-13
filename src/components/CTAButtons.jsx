import { ArrowIcon } from "./icons.jsx";

export function CTAButtons({ links, t }) {
  return (
    <div className="ctas">
      <a
        className="btn"
        href="https://github.com/XiaomiMiMo/MiMo-Code"
        rel="noreferrer noopener"
        target="_blank"
      >
        GitHub
        <ArrowIcon />
      </a>
      <a className="btn" href={links.docs} id="docsBtn" target="_top">
        <span>{t.navDocs}</span>
        <ArrowIcon />
      </a>
      <a
        className="btn btn--primary"
        href={links.article}
        id="blogBtn"
        target="_top"
      >
        Blog
        <ArrowIcon />
      </a>
    </div>
  );
}
