//card.js

import { putLike, deleteLike, deleteCard } from "../api.js";

export function createCard(data, openModalFunction, imagePopupElement, userId) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.cloneNode(true).querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  const likesCounter = cardElement.querySelector(".card__likes-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  likesCounter.textContent = data.likes.length;

  if (data.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  likeButton.addEventListener("click", () => {
    const isActive = likeButton.classList.contains(
      "card__like-button_is-active"
    );
    (isActive ? deleteLike : putLike)(data._id)
      .then((updatedCard) => {
        likeButton.classList.toggle("card__like-button_is-active", !isActive);
        likesCounter.textContent = updatedCard.likes.length;
      })
      .catch((error) => console.error("Ошибка при обработке лайка:", error));
  });

  deleteButton.addEventListener("click", () => {
    if (window.confirm("Вы уверены, что хотите удалить эту карточку?")) {
      deleteCard(data._id)
        .then(() => {
          cardElement.remove();
        })
        .catch((error) =>
          console.error("Ошибка при удалении карточки:", error)
        );
    }
  });

  cardImage.addEventListener("click", () => {
    openModalFunction(imagePopupElement);
    imagePopupElement.querySelector(".popup__image").src = data.link;
    imagePopupElement.querySelector(".popup__caption").textContent = data.name;
  });

  return cardElement;
}
