export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  popup.classList.remove("popup_is-animated");
}
export function closeModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.remove("popup_is-opened");
  }, 500);
}
export function handleEscClose(event, popup) {
  if (event.key === "Escape") {
    closeModal(popup);
  }
}
export function handleOverlayClick(event, popup) {
  if (event.target === popup) {
    closeModal(popup);
  }
}
