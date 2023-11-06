export function openModal(popup) {
  popup.style.display = "flex";
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
  document.addEventListener("keydown", handleEscClose);
}
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.classList.add("popup_is-animated");
  document.removeEventListener("keydown", handleEscClose);
  popup.addEventListener("transitionend", function transitionEnd(event) {
    if (
      event.propertyName === "opacity" &&
      !popup.classList.contains("popup_is-opened")
    ) {
      popup.style.display = "none";
    }
    popup.removeEventListener("transitionend", transitionEnd);
  });
}
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
export function setupPopupListeners(popup) {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("click", (event) => {
    if (event.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}
