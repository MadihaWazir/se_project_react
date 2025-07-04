import "./SideBar.css";
import React from "react";
import avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
}

export default SideBar;
