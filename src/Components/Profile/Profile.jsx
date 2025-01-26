import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import LikedSongs from "../LikedSongs/LikedSongs";

function Profile({ currentUser, handleSignout }) {
  return (
    <div className="profile">
      <Sidebar handleSignout={handleSignout} />
      <div className="profile__content">
        <section className="profile__liked-songs">
          <h2>your liked songs</h2>
          <LikedSongs userId={currentUser.id} />
        </section>
      </div>
    </div>
  );
}

export default Profile;
