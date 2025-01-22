import { useState } from "react";
import Header from "/src/components/Header/Header.jsx";

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

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        handleLoginModal={() => openModal("login")}
        handleSignUpModal={() => openModal("signup")}
      />
      <main className="main">{/* Add your main content here */}</main>
    </div>
  );
}

export default App;
