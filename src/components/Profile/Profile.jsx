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
          <SideBar handleLogout={handleLogout} />
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
      <button
        className="profile__edit-button"
        onClick={onEditProfile}
        aria-label="Edit Profile"
      >
        Edit Profile
      </button>
      <button
        className="profile__signout-button"
        onClick={handleLogout}
        aria-label="Sign Out"
      >
        Sign Out
      </button>
    </section>
  );
}

export default Profile;
