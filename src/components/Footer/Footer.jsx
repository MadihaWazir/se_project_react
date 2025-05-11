import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__name">Developed by Madiha Wazir</p>
      <p className="footer__date">{new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
