import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/musicmood.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Navigation({ handleSignUpModal, handleLoginModal, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Navigation className="navigation">
      <Link to="/">
        <img className="navigation__logo" src={logo} alt="navigation logo" />
      </Link>
      <div className="navigation__right">
        <nav className="navigation__nav">
          <Link to="/" className="navigation__link">
            <p className="navigation__home">home</p>
          </Link>
          <Link to="/about" className="navigation__link">
            <p className="navigation__about">about</p>
          </Link>
        </nav>

        {isLoggedIn ? (
          <div className="navigation__user_info">
            <p className="navigation__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name || "User Avatar"}
                className="navigation__avatar"
              />
            ) : (
              <div className="navigation__avatar-placeholder">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ) : (
          <div className="navigation__auth-buttons">
            <button
              onClick={handleSignUpModal}
              className="navigation__signup"
              type="button"
            >
              sign up
            </button>
            <button
              onClick={handleLoginModal}
              className="navigation__login"
              type="button"
            >
              log in
            </button>
          </div>
        )}
      </div>
    </Navigation>
  );
}

export default Navigation;
