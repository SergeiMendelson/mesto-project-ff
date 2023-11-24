// cardHandlers.js

import { openModal } from "./modal.js";
import { deleteCard, putLike, deleteLike } from "../api.js";

export function openImagePopupHandler(imageLink, imageName) {
  const imagePopup = document.querySelector(".popup_type_image");
  const popupImage = imagePopup.querySelector(".popup__image");
  const popupCaption = imagePopup.querySelector(".popup__caption");

  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;

  openModal(imagePopup);
}

export function deleteCardHandler(cardId, cardElement) {
  if (window.confirm("Вы уверены, что хотите удалить эту карточку?")) {
    deleteCard(cardId)
      .then(() => {
        cardElement.remove();
      })
      .catch((error) => console.error("Ошибка при удалении карточки:", error));
  }
}

export function handleLikeHandler(cardId, likeButton, likesCounter) {
  const isActive = likeButton.classList.contains("card__like-button_is-active");
  (isActive ? deleteLike : putLike)(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active", !isActive);
      likesCounter.textContent = updatedCard.likes.length;
    })
    .catch((error) => console.error("Ошибка при обработке лайка:", error));
}
