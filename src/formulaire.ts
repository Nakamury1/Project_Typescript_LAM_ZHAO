import { TacheController } from "./controllers/TacheController.js";

const handleSubmit = (e: SubmitEvent): void => {
    // Bloque le rechargement de la page
    e.preventDefault();
    TacheController.createTache();
   
    // Crée un FormData en partant du formulaire soumis
    // en le convertissant en type 'HTMLFormElement'

    const data = new FormData(e.target as HTMLFormElement);

    const TacheData = {
        titre: data.get('titre') as string,
        description: data.get('description') as string,
        deadline: data.get('deadline') as string,
        etat_tache: false,
        user_Id: 1
    };

    TacheData.createTache();
    
  };
   
  const form = document.querySelector<HTMLFormElement>(".form");
  form?.addEventListener("submit", handleSubmit);