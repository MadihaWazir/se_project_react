import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userCards = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );
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
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              src={item.imageUrl}
              alt={item.name}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
