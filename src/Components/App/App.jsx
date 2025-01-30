import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  logIn,
  getUserProfile,
  signup,
  editUserProfile,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { LikedSongsProvider } from "../../contexts/LikedSongsContext";

//Components
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";
import Profile from "../Profile/Profile.jsx";

//Modals
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();

  // Modal Handlers
  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };

  //Auth handlers
  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((data) => {
        if (!data.token) throw new Error("Token not received");
        localStorage.setItem("jwt", data.token);
        return getUserProfile(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeModal();
      })
      .catch((err) => console.error("Login error:", err));
  };

  const handleSignUp = (userData) => {
    signup(userData)
      .then(() =>
        handleLogin({ email: userData.email, password: userData.password })
      )
      .catch(console.error);
  };

  const handleSignout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("likedSongs");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleEditProfile = (profileData) => {
    const token = localStorage.getItem("jwt");
    editUserProfile(profileData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeModal();
      })
      .catch((err) => console.error("Edit profile error:", err));
  };

  const onEditProfileSubmit = (profileData) => {
    console.log("Mock API Response:", profileData);
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 1000);
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <LikedSongsProvider>
        <div className="app">
          <Navigation
            isLoggedIn={isLoggedIn}
            handleLoginModal={() => openModal("login")}
            handleSignUpModal={() => openModal("signup")}
          />
          <main className="app__content">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      currentUser={currentUser}
                      handleSignout={handleSignout}
                      openModal={openModal}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          {/*Modals*/}
          <LoginModal
            isOpen={activeModal === "login"}
            closeActiveModal={closeModal}
            handleSignUpModal={() => openModal("signup")}
            onLogIn={handleLogin}
          />
          <SignUpModal
            isOpen={activeModal === "signup"}
            closeActiveModal={closeModal}
            onRegister={handleSignUp}
            openLoginModal={() => openModal("login")}
          />
          <EditProfileModal
            isOpen={activeModal === "edit"}
            closeActiveModal={closeModal}
            onEditProfileSubmit={handleEditProfile}
          />
        </div>
      </LikedSongsProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
