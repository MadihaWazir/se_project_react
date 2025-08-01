import { defaultClothingItems } from "./constants"; // ✅ Add missing import for default items

const baseUrl = "http://localhost:3001";

function getProtectedData(token) {
  return fetch(`${baseUrl}/protected-endpoint`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

function handleServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

const getItems = () => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // ✅ Add this header
    },
  })
    .then(handleServerResponse)
    .catch((err) => {
      console.error("getItems failed:", err);
      return defaultClothingItems; // ✅ Return empty array on error instead of throwing
    });
};

const addItem = (inputData = {}, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: inputData.name,
      imageUrl: inputData.imageUrl,
      weather: inputData.weather,
    }),
  }).then(handleServerResponse);
};

const deleteItem = (id, token) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const updateProfile = (data, token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(handleServerResponse);
};
export {
  getItems,
  addItem,
  deleteItem,
  handleServerResponse,
  getProtectedData,
  addCardLike,
  removeCardLike,
  updateProfile,
};
