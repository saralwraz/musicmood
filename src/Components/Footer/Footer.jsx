import "./footer.css";
import fblogo from "../../assets/facebook-icon.png";
import ghlogo from "../../assets/github-icon.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Developed by Sara Raz. Powered by SpotifyAPI
      </p>
      <div className="footer__links">
        <a
          href="https://www.facebook.com/ContentAndCreativity"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__facebook" src={fblogo} alt="Facebook logo" />
        </a>
        <a
          href="https://github.com/saralwraz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="footer__github" src={ghlogo} alt="Github logo" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
