import "./ItemModal.css";
import close from "../../assets/close-icon.svg";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <img src={card.imageUrl} alt="clothing item" className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            className="modal__delete"
            type="button"
            onClick={() => onDelete(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
