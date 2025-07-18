import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import avatar from "../../assets/avatar.svg";

function SideBar({ handleLogout, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || avatar}
          alt={`Profile avatar for ${currentUser?.name || "User"}`}
        />
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      <div className="" sidebar__buttons>
        <button
          className="sidebar__edit-button"
          onClick={onEditProfile}
          type="button"
        >
          Change profile data
        </button>
        <button
          className="sidebar__logout-button"
          onClick={handleLogout}
          type="button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
