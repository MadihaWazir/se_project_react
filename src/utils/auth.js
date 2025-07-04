const BASE_URL = "http://localhost:3001";

export function signup({ name, avatar, email, password }) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text();
      return Promise.reject(`Error: ${res.status} - ${errorText}`);
    }
  });
}

export function signin({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text();
      return Promise.reject(`Error: ${res.status} - ${errorText}`);
    }
  });
}

export default function checkToken({ token }) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
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

export const updateProfile = ({ name, avatar, token }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(async (res) => {
    if (res.ok) {
      return res.json();
    } else {
      const errorText = await res.text();
      return Promise.reject(`Error: ${res.status} - ${errorText}`);
    }
  });
};
