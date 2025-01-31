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

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

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
    name: (value) => {
      if (value.length < 2) return "Name must be at least 2 characters long";
      if (value.length > 30) return "Name must be less than 30 characters";
      if (!/^[a-zA-Z\s-]+$/.test(value))
        return "Name can only contain letters, spaces, and hyphens";
      return "";
    },
    avatar: (value) => {
      try {
        new URL(value);
        return "";
      } catch {
        return "Please enter a valid URL";
      }
    },
  };

  const validateField = (name, value) => {
    return validators[name] ? validators[name](value) : "";
  };

  useEffect(() => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (formData[field]) {
        newErrors[field] = validateField(field, formData[field]);
      } else {
        newErrors[field] = "";
      }
    });
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsButtonActive(allFieldsFilled && !hasErrors);
  }, [formData]);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
      setErrors({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
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

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
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
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          id="signup-email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
        />
        {errors.email && (
          <span className="modal__error-message">{errors.email}</span>
        )}
      </label>
      <label htmlFor="signup-password" className="modal__label">
        Password*
        <input
          type="password"
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          id="signup-password"
          name="password"
          placeholder="Password (minimum 8 characters)"
          value={formData.password}
          onChange={handleInputChange}
          required
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="modal__error-message">{errors.password}</span>
        )}
      </label>
      <label htmlFor="signup-name" className="modal__label">
        Name*
        <input
          type="text"
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          id="signup-name"
          name="name"
          placeholder="Name (2-30 characters, letters only)"
          value={formData.name}
          onChange={handleInputChange}
          required
          autoComplete="name"
        />
        {errors.name && (
          <span className="modal__error-message">{errors.name}</span>
        )}
      </label>
      <label htmlFor="signup-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          className={`modal__input modal__input_signup ${
            errors.avatar ? "modal__input_error" : ""
          }`}
          id="signup-avatar"
          name="avatar"
          placeholder="Enter a valid URL for your avatar"
          value={formData.avatar}
          onChange={handleInputChange}
          required
          autoComplete="url"
        />
        {errors.avatar && (
          <span className="modal__error-message">{errors.avatar}</span>
        )}
      </label>
      <div className="modal__buttons-container">
        <button
          type="submit"
          className={`${buttonClass} ${
            isButtonActive ? "modal__submit_filled" : ""
          }`}
          disabled={!isButtonActive}
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
