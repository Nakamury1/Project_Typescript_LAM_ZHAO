import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export class TacheController {
    constructor(id, titre, description, deadline, etat_tache, user_Id) {
        this.getTaches = async (req, res) => {
            const { user_Id } = req.params;
            try {
                const taches = await prisma.tache.findMany({
                    where: {
                        user_Id: Number(user_Id),
                    },
                });
                return res.status(200).json(taches);
            }
            catch (error) {
                console.error("Echec de la récupération de la liste des tâches", error);
                return res.status(500).json({ error: "Get taches failed" });
            }
        };
        this.createTache = async (req, res) => {
            const { titre, description, deadline, etat_tache, user_Id } = req.body;
            try {
                const tache = await prisma.tache.create({
                    data: {
                        titre,
                        description,
                        deadline,
                        etat_tache,
                        user_Id,
                    },
                });
                return res.status(201).json(tache);
            }
            catch (error) {
                console.error("Echec d'une création d'une tâche", error);
                return res.status(500).json({ error: "Create tache failed" });
            }
        };
        this.deleteTache = async (req, res) => {
            const { id } = req.body;
            try {
                const tache = await prisma.tache.delete({
                    where: {
                        id,
                    },
                });
                return res.status(200).json(tache);
            }
            catch (error) {
                console.log("Echec de la suppression de la tâche");
                return res.status(500).json({ error: "Delete tache failed" });
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
