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
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>

      <button className="sidebar__edit-button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
