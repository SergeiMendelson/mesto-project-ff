//validation.js

function isNameValid(name) {
  return /^[A-Za-zА-Яа-яЁё\s-]*$/.test(name);
}

function isDescriptionValid(description) {
  return /^[A-Za-zА-Яа-яЁё\s-]*$/.test(description);
}

function setCustomValidity(inputElement) {
  if (inputElement.validity.valueMissing) {
    inputElement.setCustomValidity("Вы пропустили это поле");
  } else if (
    (inputElement.name === "name" || inputElement.name === "place-name") &&
    !isNameValid(inputElement.value)
  ) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else if (
    (inputElement.name === "description" ||
      inputElement.name === "place-name") &&
    !isDescriptionValid(inputElement.value)
  ) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else if (
    inputElement.name === "place-name" &&
    inputElement.validity.tooShort
  ) {
    inputElement.setCustomValidity("Минимальная длина - 2 символа");
  } else if (
    inputElement.name === "link" &&
    inputElement.validity.patternMismatch
  ) {
    inputElement.setCustomValidity("Введите правильный URL");
  } else {
    inputElement.setCustomValidity("");
  }
}

function checkInputValidity(inputElement, settings) {
  setCustomValidity(inputElement);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(inputElement, settings);
  }
}

function showInputError(inputElement, errorMessage, settings) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

function hideInputError(inputElement, settings) {
  const errorElement = inputElement.nextElementSibling;
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
}

function toggleButtonState(inputs, buttonElement, settings) {
  const isFormValid = inputs.every((input) => input.validity.valid);
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(settings.inactiveButtonClass, !isFormValid);
}

export function clearValidation(formElement, settings) {
  const inputs = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  inputs.forEach((inputElement) => {
    hideInputError(inputElement, settings);
  });

  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputs, submitButton, settings);
}

export function enableValidation(settings) {
  const forms = document.querySelectorAll(settings.formSelector);
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        checkInputValidity(inputElement, settings);
        toggleButtonState(
          inputs,
          form.querySelector(settings.submitButtonSelector),
          settings
        );
      });

      inputElement.addEventListener("focus", () => {
        hideInputError(inputElement, settings);
      });

      inputElement.addEventListener("blur", () => {
        checkInputValidity(inputElement, settings);
      });
    });

    toggleButtonState(
      inputs,
      form.querySelector(settings.submitButtonSelector),
      settings
    );
  });
}
