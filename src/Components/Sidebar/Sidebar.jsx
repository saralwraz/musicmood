import { useContext } from "react";
import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ handleSignout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="sidebar">
      <div className="sidebar__userinfo">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name || "User Avatar"}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <div className="sidebar__options">
        <button
          className="sidebar__button"
          type="button"
          onClick={() => {}} // Add edit profile handler when ready
        >
          Edit Profile
        </button>
        <button
          className="sidebar__button"
          type="button"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}

export default Sidebar;
