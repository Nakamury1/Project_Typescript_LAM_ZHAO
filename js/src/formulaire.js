"use strict";
const handleSubmit = (e) => {
    // Bloque le rechargement de la page
    e.preventDefault();
    console.log(e.target);
    // Crée un FormData en partant du formulaire soumis
    // en le convertissant en type 'HTMLFormElement'
    const data = new FormData(e.target);
    console.log(data.get("nom"), data.get("prenom"), data.get("email"));
};
const form = document.querySelector(".form");
form?.addEventListener("submit", handleSubmit);
