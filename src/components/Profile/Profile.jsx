import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onEditProfile,
  handleLogout,
}) {
  return (
    <div className="profile">
      <div className="profile__container">
        <section className="profile__sidebar">
          <SideBar handleLogout={handleLogout} />
        </section>
        <section className="profile__clothing-item">
          <ClothesSection
            clothingItems={clothingItems}
            handleCardClick={handleCardClick}
            handleAddClick={handleAddClick}
          />
        </section>
      </div>
    </div>
  );
}

export default Profile;
