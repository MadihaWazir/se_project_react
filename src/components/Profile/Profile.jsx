import React from "react";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
  handleLogout,
  onCardLike,
}) {
  return (
    <section className="profile">
      <div className="profile__container">
        <div className="profile__sidebar">
          <SideBar handleLogout={handleLogout} onEditProfile={onEditProfile} />
        </div>
        <div className="profile__clothes-section">
          <ClothesSection
            clothingItems={clothingItems}
            handleCardClick={handleCardClick}
            handleAddClick={handleAddClick}
            onCardLike={onCardLike}
          />
        </div>
      </div>
    </section>
  );
}

export default Profile;
