import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

import { TachesInterface } from "../interfaces/Taches";
import { Status } from "../type/Status";

const prisma = new PrismaClient();

export class TacheController implements TachesInterface {
    id: number;
    titre: string;
    description: string;
    deadline: Date;
    user_Id: number;
    etat_tache: Status;

    constructor(
        id: number,
        titre: string,
        description: string,
        deadline: Date,
        etat_tache: Status,
        user_Id: number
    ) {
        this.id = id;
        this.titre = titre;
        this.description = description;
        this.deadline = deadline;
        this.etat_tache = etat_tache;
        this.user_Id = user_Id;
    }

    public getTaches = async (req: Request, res: Response) => {
        const { user_Id } = req.params;
        try {
            const taches = await prisma.tache.findMany({
                where: {
                    user_Id: Number(user_Id),
                },
            });
            return res.status(200).json(taches);
        } catch (error) {
            console.error("Echec de la récupération de la liste des tâches", error);
            return res.status(500).json({ error: "Get taches failed" });
        }
    };

    public createTache = async (req: Request, res: Response) => {
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
        } catch (error) {
            console.error("Echec d'une création d'une tâche", error);
            return res.status(500).json({ error: "Create tache failed" });
        }
    };

    public validateTache = async (req: Request, res: Response) => {
        const { id, etat_tache } = req.body;
        try {
            const tache = await prisma.tache.update({
                where: {
                    id,
                },
                data: {
                    etat_tache: Status.TERMINEE,
                },
            });
            return res.status(200).json(tache);
        } catch (error) {
            console.log("Echec de la validation de la tâche");
            return res.status(500).json({ error: "Validate tache failed" });
        }
    };

    public deleteTache = async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const tache = await prisma.tache.delete({
                where: {
                    id,
                },
            });
            return res.status(200).json(tache);
        } catch (error) {
            console.log("Echec de la suppression de la tâche");
            return res.status(500).json({ error: "Delete tache failed" });
        }
    };
}
