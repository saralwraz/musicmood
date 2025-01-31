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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [emailError, setEmailError] = useState("");
  const [isButtonActive, setIsButtonActive] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const isValidEmail = validateEmail(formData.email);
    setEmailError(
      formData.email && !isValidEmail ? "Please enter a valid email" : ""
    );

    setIsButtonActive(
      isValidEmail &&
        formData.password.trim() !== "" &&
        formData.name.trim() !== "" &&
        formData.avatar.trim() !== ""
    );
  }, [formData]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
      setEmailError("");
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !validateEmail(formData.email) ||
      !formData.password ||
      !formData.name
    ) {
      return;
    }
    onRegister(formData);
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
          className={`modal__input ${emailError ? "modal__input_error" : ""}`}
          id="signup-email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
        {emailError && (
          <span className="modal__error-message">{emailError}</span>
        )}
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="signup-password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
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
          value={formData.name}
          onChange={handleInputChange}
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
          value={formData.avatar}
          onChange={handleInputChange}
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
