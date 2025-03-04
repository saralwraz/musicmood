import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  isOpen,
  onSubmit,
  closeActiveModal,
  name = "modal",
}) {
  React.useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, closeActiveModal]);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      closeActiveModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const addPrefixToChildIds = (children) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = { ...child.props };

      if (childProps.id) {
        childProps.id = `${name}-${childProps.id}`;
      }

      if (childProps.htmlFor) {
        childProps.htmlFor = `${name}-${childProps.htmlFor}`;
      }

      if (child.props.children) {
        childProps.children = addPrefixToChildIds(child.props.children);
      }

      return React.cloneElement(child, childProps);
    });
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleModalClick}
    >
      <form className="modal__form" onSubmit={handleSubmit} noValidate>
        <button
          onClick={closeActiveModal}
          className="modal__close"
          type="button"
        />
        <h2 className="modal__heading">{title}</h2>
        {addPrefixToChildIds(children)}
      </form>
    </div>
  );
}

export default ModalWithForm;
