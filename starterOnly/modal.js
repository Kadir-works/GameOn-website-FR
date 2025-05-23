// Ouvre/ferme le menu de navigation en version mobile
function editNav() {
  const nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}

// Sélection des éléments du DOM
const modalbg = document.querySelector(".bground"); // Arrière-plan du modal
const modalBtn = document.querySelectorAll(".modal-btn"); // Boutons qui ouvrent le modal
const closeBtn = document.querySelector(".close"); // Bouton de fermeture
const formData = document.querySelectorAll(".formData"); // Conteneurs des champs
const form = document.querySelector("form"); // Le formulaire principal
// DOM Elements supplémentaires
const confirmationMessage = document.querySelector(".confirmation-message");
const closeConfirmationBtn = document.getElementById("close-confirmation");

// Ouvrir le modal au clic sur un bouton
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
function launchModal() {
  modalbg.style.display = "block";
}

// Fermer le modal quand on clique sur le bouton "X"
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
  resetModal();
});

// Fonction de validation du formulaire
function validate() {
  let isValid = true;

  // Récupération des champs
  const firstName = document.getElementById("first");
  const lastName = document.getElementById("last");
  const email = document.getElementById("email");
  const birthdate = document.getElementById("birthdate");
  const quantity = document.getElementById("quantity");
  const location = document.querySelector("input[name='location']:checked");
  const checkbox1 = document.getElementById("checkbox1");

  // Réinitialiser les messages d’erreur
  formData.forEach((field) => {
    field.setAttribute("data-error-visible", "false");
  });

  // Validation du prénom (au moins 2 caractères)
  if (firstName.value.trim().length < 2) {
    showError(firstName, "Veuillez entrer 2 caractères ou plus.");
    isValid = false;
  }

  // Validation du nom
  if (lastName.value.trim().length < 2) {
    showError(lastName, "Veuillez entrer 2 caractères ou plus.");
    isValid = false;
  }

  // Validation de l’email avec expression régulière
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, "Veuillez entrer une adresse email valide.");
    isValid = false;
  }

  // Validation de la date de naissance
  if (!birthdate.value) {
    showError(birthdate, "Veuillez entrer votre date de naissance.");
    isValid = false;
  }

  // Validation du nombre de participations (champ numérique)
  if (quantity.value === "" || isNaN(quantity.value)) {
    showError(quantity, "Veuillez entrer une valeur numérique.");
    isValid = false;
  }

  // Validation de la ville (une case doit être cochée)
  if (!location) {
    const locationField = document
      .getElementById("location1")
      .closest(".formData");
    locationField.setAttribute("data-error-visible", "true");
    locationField.setAttribute(
      "data-error",
      "Veuillez sélectionner une ville."
    );
    isValid = false;
  }

  // Validation de la case des conditions générales
  if (!checkbox1.checked) {
    showError(checkbox1, "Vous devez accepter les conditions.");
    isValid = false;
  }

  // Si tout est bon, on affiche un message
  if (isValid) {
    // Cacher le formulaire et afficher le message
    form.style.display = "none";
    confirmationMessage.style.display = "block";
  }

  return false; // Empêche la soumission normale du formulaire
}

// Affiche un message d’erreur sur un champ donné
function showError(inputElement, message) {
  const field = inputElement.closest(".formData");
  field.setAttribute("data-error-visible", "true");
  field.setAttribute("data-error", message);
}
// Fermer la modal avec le bouton "Fermer"
closeConfirmationBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
  resetModal();
});

// Fonction pour réinitialiser la modal
function resetModal() {
  form.reset(); // Vide les champs
  form.style.display = "block"; // Réaffiche le formulaire
  confirmationMessage.style.display = "none"; // Cache le message
  formData.forEach((field) => {
    field.setAttribute("data-error-visible", "false"); // Cache erreurs
  });
}

// Quand on ouvre la modal, on reset tout pour afficher un nouveau formulaire propre
modalBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    resetModal(); // Vide le formulaire, cache les erreurs et le message
    launchModal(); // Affiche la modal
  })
);
