import { useNavigate } from "react-router-dom";
import "./about.css";
import SaraImage from "../../assets/Sara_Raz.png";

function About() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/");
  };

  return (
    <div className="about">
      <p className="about__body_text">
        At music<span className="about__body_logo">mood</span>, we believe music
        should match your every mood. Simply type how you're feeling—happy, sad,
        or anywhere in between—or explore by genre to discover songs that
        resonate with you. Save your favorites to revisit later. Whether you're
        seeking comfort, energy, or inspiration, we've got the perfect track for
        every moment.
      </p>
      <button
        type="button"
        className="about__search"
        onClick={handleExploreClick}
      >
        start exploring
      </button>
      <div className="about__wrapper">
        <div className="about__content">
          <img src={SaraImage} alt="Sara Raz" className="about__Sara" />
          <div className="about__text-container">
            <h1 className="about__headline">About the Creator</h1>
            <p className="about__body_text_bottom">
              Sara Raz is a digital marketer, graphic designer, and full stack
              developer originally from Philadelphia, now living in Ramat Gan,
              IL. When she's not running after toddler, she enjoys the beach,
              baroque art, and all things Halloween. See more of her work{" "}
              <a
                href="https://elegant-peach-245.notion.site/Sara-Raz-Portfolio-146e2356136f80e798ebd7b3b05097ff?pvs=74"
                className="about__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
