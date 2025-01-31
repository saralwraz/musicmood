import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";
import "./LoginModal.css";

const LoginModal = ({
  closeActiveModal,
  isOpen,
  onLogIn,
  handleSignUpModal,
  buttonClass = "modal__submit",
  error = null,
}) => {
  const [data, setData] = useState({ email: "", password: "" });
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const isValidEmail = validateEmail(data.email);
    setEmailError(
      data.email && !isValidEmail ? "Please enter a valid email" : ""
    );
    setIsButtonActive(isValidEmail && data.password.trim() !== "");
  }, [data.email, data.password]);

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "" });
      setEmailError("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(data.email) || !data.password) {
      return;
    }
    onLogIn({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      buttonClass={`modal__submit ${
        isButtonActive ? "modal__submit_complete" : ""
      }`}
      error={error}
      name="login"
    >
      <label htmlFor="login-email" className="modal__label">
        Email*
        <input
          type="email"
          className={`modal__input ${emailError ? "modal__input_error" : ""}`}
          id="login-email"
          placeholder="Email"
          name="email"
          value={data.email}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, email: e.target.value }))
          }
          required
          autoComplete="email"
        />
        {emailError && (
          <span className="modal__error-message">{emailError}</span>
        )}
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
          autoComplete="current-password"
        />
      </label>
      {error && <div className="modal__error">{error}</div>}
      <div className="modal__buttons-wrapper">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_complete" : ""
          }`}
        >
          Log In
        </button>
        <button
          type="button"
          className="modal__signup-button"
          onClick={handleSignUpModal}
        >
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
