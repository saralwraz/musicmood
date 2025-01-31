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
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isButtonActive, setIsButtonActive] = useState(false);

  const validators = {
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? "" : "Please enter a valid email address";
    },
    password: (value) => {
      if (value.length < 8)
        return "Password must be at least 8 characters long";
      return "";
    },
  };

  const validateField = (name, value) => {
    return validators[name] ? validators[name](value) : "";
  };

  useEffect(() => {
    const newErrors = {};
    Object.keys(data).forEach((field) => {
      if (data[field]) {
        newErrors[field] = validateField(field, data[field]);
      } else {
        newErrors[field] = "";
      }
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    const allFieldsFilled = Object.values(data).every(
      (value) => value.trim() !== ""
    );
    setIsButtonActive(allFieldsFilled && !hasErrors);
  }, [data]);

  useEffect(() => {
    if (isOpen) {
      setData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(data).forEach((field) => {
      newErrors[field] = validateField(field, data[field]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
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
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
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
        {errors.email && (
          <span className="modal__error-message">{errors.email}</span>
        )}
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password*
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="login-password"
          placeholder="Password (minimum 8 characters)"
          name="password"
          value={data.password}
          onChange={(e) =>
            setData((prevData) => ({ ...prevData, password: e.target.value }))
          }
          required
          autoComplete="current-password"
        />
        {errors.password && (
          <span className="modal__error-message">{errors.password}</span>
        )}
      </label>
      {error && <div className="modal__error">{error}</div>}
      <div className="modal__buttons-wrapper">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_complete" : ""
          }`}
          disabled={!isButtonActive}
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
