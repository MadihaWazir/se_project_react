import { useEffect, useState, useCallback } from "react";
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

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
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

  const handleAddClick = () => {
    if (!isLoggedIn) return;
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleLogin = useCallback(
    ({ email, password }) => {
      return signin({ email, password })
        .then((data) => {
          if (data.token) {
            localStorage.setItem("jwt", data.token);
            setIsLoggedIn(true);
            setActiveModal(" ");
            navigate("/profile");
          } else {
            return Promise.reject();
          }
        })
        .catch((err) => {
          console.error("Login failed:", err);
        });
    },
    [navigate]
  );

  const handleRegisterModal = () => {
    setActiveModal("register");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleSideBarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    console.log("Logging out....");
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({});
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    addItem({ name, imageUrl: imageUrl, weather: weather }, token)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        onClose();
      })
      .catch(console.error);
  };

  const handleDeleteClick = (cardId) => {
    setItemToDelete(cardId);
    setActiveModal("delete-confirmation");
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const token = localStorage.getItem("jwt");
    deleteItem(itemToDelete, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete)
        );
        setItemToDelete(null);
        onClose();
      })
      .catch((err) => {
        console.error(`Failed to delete item with ID ${itemToDelete}:`, err);
      });
  };

  const handleRegistration = (userData) => {
    signup(userData)
      .then(() => {
        setActiveModal(""); // Close modal first
        handleLogin({ email: userData.email, password: userData.password });
        navigate("/profile"); // Login will handle navigation
      })
      .catch(console.error);
  };

  const handleEditProfileModal = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar: avatar || "", token })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfileOpen(false);
      })
      .catch(console.error);
  };

  const handleCardLike =
    (({ id, isLiked }) => {
      const token = localStorage.getItem("jwt");
      (!isLiked ? addCardLike(id, token) : removeCardLike(id, token))
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) =>
              item._id === id
                ? {
                    ...updatedCard,
                    link:
                      updatedCard.link ||
                      updatedCard.imageUrl ||
                      updatedCard.image,
                  }
                : item
            )
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    []);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => {
        console.error(err);
        const fallbackWeather = {
          city: "Unknown",
          temp: { F: 72, C: 22 },
          type: "warm", // ✅ Set a default type
          condition: "clear",
          isDay: true,
        };
        console.log("Using fallback weather data:", fallbackWeather);
        setWeatherData(fallbackWeather);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        const normalized = data.map((item) => ({
          ...item,
          link: item.link || item.imageUrl || item.image,
        }));
        setClothingItems(normalized);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setCurrentUser({});
          setIsLoggedIn(false);
        });
    } else {
      setCurrentUser({});
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

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
              currentUser={currentUser}
            />

            {isSidebarOpen && (
              <SideBar
                handleLogout={handleLogout}
                onEditProfile={handleEditProfileModal}
              />
            )}

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
                        currentUser={currentUser}
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
            onClose={onClose}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            isOpen={activeModal}
            card={selectedCard}
            onClose={onClose}
            onDelete={handleDeleteClick}
          />
          <ConfirmModal
            onClose={onClose}
            onCardDelete={handleConfirmDelete}
            isOpen={activeModal === "delete-confirmation"}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={onClose}
            onRegister={handleRegistration}
            onSwitchToLogin={() => setActiveModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={onClose}
            onLogin={handleLogin}
            onSwitchToRegister={() => setActiveModal("register")}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
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
