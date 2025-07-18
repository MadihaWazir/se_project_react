import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar.svg";

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

      <div className="header__user-container">
        <ToggleSwitch />

        {isLoggedIn && currentUser ? (
          <div className="header__user">
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__profile-link">
              {currentUser?.name || "Profile"}
            </Link>
            {currentUser?.avatar ? (
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
          </div>
        ) : (
          <div className="header__auth-buttons">
            <button
              className="button header__auth-button header__auth-button_signup"
              onClick={handleRegisterModal}
              type="button"
            >
              Sign Up
            </button>
            <button
              className="button header__auth-button header__auth-button_login"
              onClick={handleLoginModal}
              type="button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
