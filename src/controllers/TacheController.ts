import { PrismaClient } from "@prisma/client"

import { TachesInterface } from "../interfaces/Taches";
import { Status } from "../type/Status";

const prisma = new PrismaClient()

export class TacheController implements TachesInterface{
  id: number;
  titre: string;
  description: string;
  deadline: Date;
  user_Id: number;
  etat_tache = Status;

  constructor(id: number, titre: string, description: string, deadline: Date, etat_tache: Status, user_Id: number) {
      this.id = id;
      this.titre = titre;
      this.description = description;
      this.deadline = deadline;
      this.etat_tache = etat_tache;
      this.user_Id = user_Id;
  }

  getTaches = async(user_Id: number) => {
    try {
      const taches = await prisma.tache.findMany({
        where: {
          user_Id
        },
      });
      return taches;
    }
    catch (error) {
        console.error("Echec de la récupération de la liste des tâches", error)
        throw new Error;
    }
  };

  createTache = async (titre: string, description: string, deadline: Date, etat_tache: Status, user_Id: number) => {
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
    catch(error){
      console.error("Echec d'une création d'une tâche", error);
      throw new Error;
    }
  }; 

  deleteTache = async(id: number, user_Id: number) => {   
    try {
      const deletetache = await prisma.tache.delete({
        where: {
          id,
          user_Id
        },
      });
      return deletetache;
    } catch (error) {
      console.log("Echec de la suppression de la tâche")
    }
  };
}

