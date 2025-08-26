import "./SideBar.css";
import React from "react";

import avatar from "../../assets/avatar.svg";

function SideBar({ avatar, name, handleLogout, onEditProfile }) {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img
          className="sidebar__avatar"
          src={avatar}
          alt={`Profile avatar for ${name}`}
        />
        <p className="sidebar__username">{name}</p>
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
