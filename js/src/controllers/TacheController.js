import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getTaches = async (req, res) => {
    try {
        const taches = await prisma.tache.findMany();
        res.json(taches);
    }
    catch (error) {
        res.json(error);
    }
};
const createTache = async (req, res) => {
    const tache = req.body;
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
    }
    catch (error) {
        res.json(error);
    }
};
const deleteTache = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletetache = await prisma.tache.delete({
            where: {
                id: id,
            },
        });
        res.json(deletetache);
    }
    catch (error) {
        res.json(error);
    }
};
export { getTaches, createTache, deleteTache, };
