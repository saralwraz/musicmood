import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import LikedSongs from "../LikedSongs/LikedSongs";

function Profile({ currentUser, handleSignout, openModal }) {
  const handleEditProfile = () => {
    openModal("edit");
  };
  return (
    <div className="profile">
      <Sidebar handleSignout={handleSignout} openModal={openModal} />
      <div className="profile__content">
        <section className="profile__liked-songs">
          <h2 className="profile__liked-songs-header">your liked songs</h2>
          <LikedSongs userId={currentUser.id} />
        </section>
      </div>
    </div>
  );
}

export default Profile;
