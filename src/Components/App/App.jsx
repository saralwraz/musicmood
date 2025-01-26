import { useState } from "react";
import { Routes, Route } from "react-router-dom";

//Components
import Navigation from "../Navigation/Navigation.jsx";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import About from "../About/About";

//Modals
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  return (
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
    </div>
  );
}

export default App;
