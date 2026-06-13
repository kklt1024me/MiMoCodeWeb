export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span>Copyright©2025 Xiaomi. All Rights Reserved</span>
        <span className="footer__sep">|</span>
        <a className="footer__link" href="#service-agreement">
          Xiaomi MiMo Open Platform Service Agreement
        </a>
        <span className="footer__sep">|</span>
        <a className="footer__link" href="#privacy-policy">
          Xiaomi MiMo Open Platform Privacy Policy
        </a>
        <span className="footer__sep">|</span>
        <a className="footer__link" href="#cookie-policy">
          Cookie Policy
        </a>
        <span className="footer__sep">|</span>
        <button className="footer__btn" type="button">
          Cookie Preferences
        </button>
      </div>
    </footer>
  );
}
