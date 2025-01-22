import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/musicmood.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ handleRegisterModal, handleLoginModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="header logo" />
      </Link>
      <div className="header__right">
        <nav className="header__nav">
          <Link to="/" className="header__link">
            <p className="header__home">Home</p>
          </Link>
          <Link to="/about" className="header__link">
            <p className="header__about">About</p>
          </Link>
        </nav>

        {isLoggedIn ? (
          <div className="header__user_info">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name || "User Avatar"}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <div className="header__auth-buttons">
            <button
              onClick={handleRegisterModal}
              className="header__signup"
              type="button"
            >
              Sign Up
            </button>
            <button
              onClick={handleLoginModal}
              className="header__login"
              type="button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
