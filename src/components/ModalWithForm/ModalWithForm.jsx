import React, { useEffect } from "react";
import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  actions,
  isSubmitDisabled,
  contentClassName,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal__overlay")) {
      onClose();
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__overlay" onClick={handleOverlayClick}></div>
      <div className={contentClassName ? contentClassName : "modal__content"}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="Close" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
            <button
              className="modal__submit"
              type="submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
            {actions}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
