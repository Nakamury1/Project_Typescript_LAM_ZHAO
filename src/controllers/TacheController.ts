import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

const getTaches = async (req: Request, res: Response) =>{
    try {
        const taches = await prisma.tache.findMany();
        res.json(taches);
    }
    catch (error) {
        res.json(error)
    }
};

const createTache = async (req: Request, res: Response) => {
  const tache = req.body
  try {
    const createtache = await prisma.tache.create({
      data: {
        titre: tache.titre,
        description: tache.description,
        etat_tache: tache.etat_tache,
        deadline: tache.deadline,
      },
    });
    res.json(createtache);
  } catch (error) {
    res.json(error);
  }
};
  
const deleteTache = async (req: Request, res: Response) => {
    const id = Number(req.params.id);   
    try {
      const deletetache = await prisma.tache.delete({
        where: {
          id: id,
        },
      });
      res.json(deletetache);
    } catch (error) {
      res.json(error);
    }
};

export {
  getTaches,
  createTache,
  deleteTache,
}
