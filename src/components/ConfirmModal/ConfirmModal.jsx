import "./ConfirmModal.css";
import close from "../../assets/close-2.svg";

function ConfirmModal({ isOpen, onClose, onCardDelete }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_confirm">
        <button
          className="modal__close modal__close-preview"
          onClick={onClose}
          type="button"
        >
          <img src={close} alt="close" />
        </button>
        <p className="modal__confirm-title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <div className="modal__confirm-actions">
          <button
            className="modal__delete-button-confirm"
            onClick={onCardDelete}
          >
            Yes, delete item
          </button>
          <button className="modal__cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
