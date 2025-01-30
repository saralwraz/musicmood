import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/musicmood.png";
import mobileMenu from "../../assets/mobile-menu.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState, useEffect } from "react";

function Navigation({ handleSignUpModal, handleLoginModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("navigation__right")) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleSignUpClick = () => {
    setIsMobileMenuOpen(false);
    handleSignUpModal();
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    handleLoginModal();
  };

  return (
    <div className="navigation">
      <Link to="/">
        <img className="navigation__logo" src={logo} alt="navigation logo" />
      </Link>

      <button className="navigation__menu-button" onClick={toggleMobileMenu}>
        <img src={mobileMenu} alt="menu" className="navigation__menu-icon" />
      </button>

      <div
        className={`navigation__right ${
          isMobileMenuOpen ? "navigation__right_active" : ""
        }`}
        onClick={handleOverlayClick}
      >
        <nav className="navigation__nav">
          <Link to="/" className="navigation__link">
            <p className="navigation__home">home</p>
          </Link>
          <Link to="/about" className="navigation__link">
            <p className="navigation__about">about</p>
          </Link>
        </nav>

        {isLoggedIn && currentUser ? (
          <div className="navigation__user_info">
            <Link to="/profile" className="navigation__username-link">
              <p className="navigation__username">
                {currentUser?.name || "User"}
              </p>
            </Link>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name || "User Avatar"}
                className="navigation__avatar"
              />
            ) : (
              <div className="navigation__avatar-placeholder">
                {currentUser?.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>
        ) : (
          <div className="navigation__auth-buttons">
            <button
              onClick={handleSignUpClick}
              className="navigation__signup"
              type="button"
            >
              sign up
            </button>
            <button
              onClick={handleLoginClick}
              className="navigation__login"
              type="button"
            >
              log in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigation;
