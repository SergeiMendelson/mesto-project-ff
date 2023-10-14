const template = document.querySelector("#card-template");
const placesList = document.querySelector(".places__list");

function createCard(data) {
  const cardElement = template.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });
  return cardElement;
}
function deleteCard(cardElement) {
  cardElement.remove();
}
initialCards.forEach((card) => {
  const cardElement = createCard(card);
  placesList.appendChild(cardElement);
});
