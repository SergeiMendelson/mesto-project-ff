//api.js


const BASE_URL = "https://mesto.nomoreparties.co/v1/wff-cohort-1";
const TOKEN = "8698a526-3f23-447a-a28f-f0078326bfcb";

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: {
      authorization: TOKEN,
    },
  }).then(checkResponse);
};

export const getInitialCards = () => {
  return fetch(`${BASE_URL}/cards`, {
    headers: {
      authorization: TOKEN,
    },
  }).then(checkResponse);
};

export const updateUserInfo = (name, about) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, about }),
  }).then(checkResponse);
};

export const addNewCard = (name, link) => {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, link }),
  }).then(checkResponse);
};

export const putLike = (cardId) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: TOKEN,
    },
  }).then(checkResponse);
};

export const deleteLike = (cardId) => {
  return fetch(`${BASE_URL}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  }).then(checkResponse);
};

export const deleteCard = (cardId) => {
  return fetch(`${BASE_URL}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: TOKEN,
    },
  }).then(checkResponse);
};

export const updateAvatarOnServer = (avatarUrl) => {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then(checkResponse);
};
