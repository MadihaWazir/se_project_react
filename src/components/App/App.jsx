import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import { useCallback } from "react";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { checkToken } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { addCardLike, removeCardLike } from "../../utils/api";
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
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleLogin = useCallback(({ email, password }) => {
    signin({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setCurrentUser(data.user);
          navigate("/profile");
          closeActiveModal();
        }
      })
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    setActiveModal("");
  };

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
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
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("token");
    addItem({ name, imageUrl, weather }, token)
      .then((addedCard) => {
        setClothingItems([addedCard, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    const token = localStorage.getItem("token");
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch((err) => {
        console.error(
          `Failed to delete item with ID ${itemToDelete._id}:`,
          err
        );
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        setActiveModal("");
        handleLogin({ email, password });
        navigate("/profile");
      })
      .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setIsEditProfileOpen(true);
    setActiveModal("edit-profile");
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("token");
    updateProfile({ name, avatar, token })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("token");
    (!isLiked ? addCardLike(id, token) : removeCardLike(id, token))
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const normalizedData = data.map((item) => ({
          ...item,
          link: item.imageUrl || item.link || item.image,
        }));
        setClothingItems(normalizedData);
      })
      .catch((err) => {
        console.error("Failed to fetch clothing items:", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken({ token })
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => setIsLoggedIn(false));
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
              isLoggedIn={isLoggedIn}
              handleLoginModal={() => setActiveModal("login")}
              handleRegisterModal={() => setActiveModal("register")}
            />

            {isSidebarOpen ? <SideBar handleLogout={handleLogout} /> : null}

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
                        handleLogout={handleLogout}
                        onCardLike={handleCardLike}
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
            onAddItemModalSubmit={handleAddItemModalSubmit}
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
            onEditProfile={handleEditProfileSubmit}
            currentUser={currentUser}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
