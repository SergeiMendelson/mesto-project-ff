const template = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");
export function createCard(data, openModalFunction, imagePopupElement) {
  const cardElement = template.content.cloneNode(true).querySelector(".card");
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImage.addEventListener("click", () => {
    openModalFunction(imagePopupElement);
    imagePopupElement.querySelector(".popup__image").src = data.link;
    imagePopupElement.querySelector(".popup__caption").textContent = data.name;
  });
  return cardElement;
}
