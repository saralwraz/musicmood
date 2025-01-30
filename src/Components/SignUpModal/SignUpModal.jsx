import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./SignUpModal.css";
import { useState, useEffect } from "react";

const SignUpModal = ({
  closeActiveModal,
  openLoginModal,
  isOpen,
  onRegister,
  buttonClass = "modal__submit",
}) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    setIsButtonActive(
      email.trim() !== "" &&
        password.trim() !== "" &&
        name.trim() !== "" &&
        avatar.trim() !== ""
    );
  }, [email, password, name, avatar]);

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setPassword("");
      setEmail("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      return;
    }
    onRegister({
      email,
      password,
      name,
    });
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      name="signup"
    >
      <label htmlFor="signup-email" className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          id="signup-email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="signup-password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </label>
      <label htmlFor="signup-name" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="signup-name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
        />
      </label>
      <label htmlFor="signup-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input modal__input_signup"
          id="signup-avatar"
          name="avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          required
          autoComplete="url"
        />
      </label>
      <div className="modal__buttons-container">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_filled" : ""
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          className="modal__login-button"
          onClick={openLoginModal}
        >
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

export default SignUpModal;
