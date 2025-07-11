import "./ItemModal.css";
import close from "../../assets/close-icon.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${isOpen === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__overlay"></div>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close" />
        </button>
        <img src={card?.imageUrl} alt={card?.name} className="modal__image" />
        <div className="modal__footer_container">
          <div className="modal__footer">
            <h2 className="modal__caption">{card?.name}</h2>
            <p className="modal__weather">Weather: {card?.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete"
              type="button"
              onClick={() => onDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
