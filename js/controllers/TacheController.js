import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class TacheController {
    constructor(id, titre, description, deadline, etat_tache, user_Id) {
        this.etat_tache = Status;
        this.getTaches = async (user_Id) => {
            try {
                const taches = await prisma.tache.findMany({
                    where: {
                        user_Id
                    },
                });
                return taches;
            }
            catch (error) {
                console.error("Echec de la récupération de la liste des tâches", error);
                throw new Error;
            }
        };
        this.createTache = async (titre, description, deadline, etat_tache, user_Id) => {
            try {
                const createtache = await prisma.tache.create({
                    data: {
                        titre,
                        description,
                        deadline,
                        etat_tache,
                        user_Id
                    },
                });
                return createtache;
            }
            catch (error) {
                console.error("Echec d'une création d'une tâche", error);
                throw new Error;
            }
        };
        this.deleteTache = async (id, user_Id) => {
            try {
                const deletetache = await prisma.tache.delete({
                    where: {
                        id,
                        user_Id
                    },
                });
                return deletetache;
            }
            catch (error) {
                console.log("Echec de la suppression de la tâche");
            }
        };
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.deadline = deadline;
        this.etat_tache = etat_tache;
        this.user_Id = user_Id;
    }
}
