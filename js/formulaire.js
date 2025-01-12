import { TacheController } from "./controllers/TacheController.js";
const handleSubmit = (e) => {
    // Bloque le rechargement de la page
    e.preventDefault();
    TacheController.createTache();
    // Crée un FormData en partant du formulaire soumis
    // en le convertissant en type 'HTMLFormElement'
    const data = new FormData(e.target);
    const TacheData = {
        titre: data.get('titre'),
        description: data.get('description'),
        deadline: data.get('deadline'),
        etat_tache: false,
        user_Id: 1
    };
    TacheData.createTache();
};
const form = document.querySelector(".form");
form?.addEventListener("submit", handleSubmit);
