import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import SideBar from "../SideBar/SideBar";
import { addItem, deleteItem, getItems } from "../../utils/api";
import { signin, signup, updateProfile } from "../../utils/auth";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleLogin = ({ email, password }) => {
    signin({ email, password })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleDeleteClick = (card) => {
    setItemToDelete(card);

    setActiveModal("delete-confirmation");
  };

  const handleSideBarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    deleteItem(itemToDelete._id)
      .then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== itemToDelete._id
        );
        setClothingItems(updatedItems);
        setItemToDelete(null);

        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((addedCard) => {
        setClothingItems([addedCard, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    getCurrentUser()
      .then((user) => {
        return updateProfile({ name, avatar, token: user.token });
      })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (cardId) => {
    const isLiked = clothingItems.some((item) => item._id === cardId);
    const apiCall = isLiked ? deleteItem : addItem;
    apiCall(cardId)
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUser(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Error fetching current user:", err);
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleLogin={handleLogin}
              handleRegisterModal={handleRegisterModal}
              handleLogout={handleLogout}
              handleEditProfileModal={handleEditProfileModal}
              handleSideBarToggle={handleSideBarToggle}
            />
            {isSidebarOpen ? (
              <SideBar
                handleLogout={handleLogout}
                onClose={() => setIsSidebarOpen(false)}
              />
            ) : null}

            <div className="page__main">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        handleCardClick={handleCardClick}
                        handleAddClick={handleAddClick}
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onEditProfile={handleEditProfileModal}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={onAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteClick}
          />
          <ConfirmModal
            onClose={closeActiveModal}
            onCardDelete={handleConfirmDelete}
            isOpen={activeModal === "delete-confirmation"}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegistration}
            onSwitchToLogin={() => setActiveModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveModal("register")}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onEditProfileSubmit={handleEditProfileSubmit}
            currentUser={currentUser}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
