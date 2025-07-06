import "./SideBar.css";
import React, { useContext } from "react";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__avatar"
          src={currentUser?.avatar || avatar}
          alt={currentUser?.name || "Default avatar"}
        />
        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>
      {handleLogout && (
        <button onClick={handleLogout} className="sidebar__logout">
          Log Out
        </button>
      )}
    </div>
  );
}

export default SideBar;
