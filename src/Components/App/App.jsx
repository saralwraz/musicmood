import { useState } from "react";
import Header from "../Header/Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleRegisterModal = () => {
    // TODO: Implement register modal
    console.log("Register modal clicked");
  };

  const handleLoginModal = () => {
    // TODO: Implement login modal
    console.log("Login modal clicked");
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        handleRegisterModal={handleRegisterModal}
        handleLoginModal={handleLoginModal}
      />
      <main className="main">{/* Add your main content here */}</main>
    </div>
  );
}

export default App;
