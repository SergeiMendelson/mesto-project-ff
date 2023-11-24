// index.js

import "./styles/index.css";
import { createCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  setupPopupListeners,
} from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateAvatarOnServer,
} from "./api.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");
const popups = document.querySelectorAll(".popup");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const updateAvatarPopup = document.querySelector(".popup_type_update-avatar");
const imagePopup = document.querySelector(".popup_type_image");
const formEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const formUpdateAvatar = document.querySelector(
  '.popup__form[name="update-avatar"]'
);
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
let avatarUrlInput = document.querySelector(".popup__input_type_avatar-url");
const placesList = document.querySelector(".places__list");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

function openProfileEditModal() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
  clearValidation(formEditProfile, validationConfig);
}

function updateProfile() {
  const saveButton = formEditProfile.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  updateUserInfo(nameInput.value, jobInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModal(editProfilePopup);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateProfile();
});

function createNewCard() {
  const saveButton = formAddCard.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  const cardNameInput = formAddCard.querySelector(
    ".popup__input_type_card-name"
  );
  const linkInput = formAddCard.querySelector(".popup__input_type_url");

  addNewCard(cardNameInput.value, linkInput.value)
    .then((newCard) => {
      const cardElement = createCard(newCard, openModal, imagePopup);
      placesList.prepend(cardElement);
      closeModal(addCardPopup);
      formAddCard.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  createNewCard();
});

profileImage.addEventListener("click", () => {
  openModal(updateAvatarPopup);
  clearValidation(
    updateAvatarPopup.querySelector(".popup__form"),
    validationConfig
  );
});

function updateAvatar() {
  const saveButton = formUpdateAvatar.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  updateAvatarOnServer(avatarUrlInput.value)
    .then((userData) => {
      console.log("Аватар успешно обновлен:", userData);
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(updateAvatarPopup);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    })
    .finally(() => {
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

formUpdateAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  updateAvatar();
});

profileEditButton.addEventListener("click", openProfileEditModal);
profileAddButton.addEventListener("click", function () {
  openModal(addCardPopup);
  clearValidation(formAddCard, validationConfig);
});

popups.forEach((popup) => {
  setupPopupListeners(popup);
});

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    profileImage.style.backgroundImage = `url('${userData.avatar}')`;

    cards.forEach((card) => {
      const cardElement = createCard(card, openModal, imagePopup, userData._id);
      placesList.appendChild(cardElement);
    });
  })
  .catch((err) => console.error(err));
