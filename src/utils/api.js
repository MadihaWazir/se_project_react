const baseUrl = "http://localhost:3001";

function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

function getProtectedData(token) {
  return fetch(`${baseUrl}/protected`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text();
      return Promise.reject(`Error: ${res.status} - ${errorText}`);
    }
  });
}

const handleServerResponse = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const errorText = await res.text();
    return Promise.reject(`Error: ${res.status} - ${errorText}`);
  }
};

function getItems() {
  return fetch(`${baseUrl}/items`).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text();
      return Promise.reject(`Error: ${res.status} - ${errorText}`);
    }
  });
}

function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, imageUrl, weather }),
  });
}

function deleteItem(_id) {
  return request(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

function addCardLike(_id) {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
}

function removeCardLike(_id) {
  return request(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  handleServerResponse,
  getProtectedData,
  addCardLike,
  removeCardLike,
};
