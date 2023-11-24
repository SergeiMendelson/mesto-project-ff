//card.js

import { putLike, deleteLike, deleteCard } from "../api.js";

export function createCard(
  data,
  openImagePopupHandler,
  deleteCardHandler,
  handleLikeHandler,
  userId
) {
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
  } else {
    deleteButton.style.display = "block";
  }

 
  const isLikedByCurrentUser = data.likes.some((like) => like._id === userId);
  if (isLikedByCurrentUser) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    handleLikeHandler(data._id, likeButton, likesCounter)
  );

  deleteButton.addEventListener("click", () =>
    deleteCardHandler(data._id, cardElement)
  );

  cardImage.addEventListener("click", () =>
    openImagePopupHandler(data.link, data.name)
  );

  return cardElement;
}
