import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleLoginModal,
  handleRegisterModal,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}{" "}
        </p>
      </div>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}
      {currentUser && currrentUser.name ? (
        <div classNmae="header__user">
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
