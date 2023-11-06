import "./styles/index.css";
import { initialCards } from "./components/cards.js";
import { createCard } from "./components/card.js";
import {
  openModal,
  closeModal,
  setupPopupListeners,
} from "./components/modal.js";
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popups = document.querySelectorAll(".popup");
const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const formEditProfile = document.querySelector(
  '.popup__form[name="edit-profile"]'
);
const formAddCard = document.querySelector('.popup__form[name="new-place"]');
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const placeNameInput = formAddCard.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = formAddCard.querySelector(".popup__input_type_url");
const placesList = document.querySelector(".places__list");
formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
});
formAddCard.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newCard = createCard(
    {
      name: placeNameInput.value,
      link: placeLinkInput.value,
    },
    openModal,
    imagePopup
  );
  placesList.prepend(newCard);
  formAddCard.reset();
  closeModal(addCardPopup);
});
profileEditButton.addEventListener("click", function () {
  openModal(editProfilePopup);
});
profileAddButton.addEventListener("click", function () {
  openModal(addCardPopup);
});
popups.forEach((popup) => {
  setupPopupListeners(popup);
});
initialCards.forEach((card) => {
  const cardElement = createCard(card, openModal, imagePopup);
  placesList.appendChild(cardElement);
});
