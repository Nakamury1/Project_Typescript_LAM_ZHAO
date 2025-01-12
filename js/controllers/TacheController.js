"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTache = exports.createTache = exports.getTaches = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTaches = async (req, res) => {
    try {
        const taches = await prisma.tache.findMany();
        res.json(taches);
    }
    catch (error) {
        res.json(error);
    }
};
exports.getTaches = getTaches;
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
exports.createTache = createTache;
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
exports.deleteTache = deleteTache;
