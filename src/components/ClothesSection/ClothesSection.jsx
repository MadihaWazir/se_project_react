import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userCards = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__container">
        <p className="clothes-section__title">Your items</p>
        <button
          type="button"
          className="clothes-section__button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="clothes-section__list">
        {userCards.length === 0 ? (
          <p>No items found.</p>
        ) : (
          userCards.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default ClothesSection;
