import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.svg";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginModal,
  handleRegisterModal,
  handleLogout,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/" className="header__container">
        <img src={logo} alt="WTWR Logo" className="header__logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__container">
        <ToggleSwitch />
      </div>
      {currentUser?.name ? (
        <div className="header__user">
          {currentUser.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span>{currentUser.name}</span>
          <Link to="/profile" className="header__profile-link">
            {currentUser?.name || "Profile"}
          </Link>
          <button
            className="button header__auth-button header__auth-button_logout"
            onClick={handleLogout}
            aria-label="Sign out"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div>
          <button
            className="button header__auth-button header__auth-button_signup"
            onClick={handleRegisterModal}
          >
            Sign Up
          </button>
          <button
            className="button header__auth-button header__auth-button_login"
            onClick={handleLoginModal}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
