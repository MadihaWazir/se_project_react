const baseUrl = "http://localhost:3001";

function getProtectedData(token) {
  return fetch(`${baseUrl}/protected-endpoint`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}

const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(new Error(`Error: ${res.status}`));
};

const getItems = (id, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "GET",
  }).then(handleServerResponse);
};

const addItem = (inputData = {}, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
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
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
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
};
