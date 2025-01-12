import * as bcrypt from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
const signIn = async (req, res) => {
    const { nom, prenom, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                nom,
                prenom,
                email,
                password: hashedPassword,
            },
        });
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'Clé JWT non définie' });
        }
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '8000h',
        });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json(error);
    }
};
const logIn = async (req, res) => {
    const { nom, prenom, email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' });
        }
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'Clé JWT non définie' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Mot de passe invalide' });
        }
        const token = jwt.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '8000h',
        });
        res.json({ token });
    }
    catch (error) {
        res.json(error);
    }
};
export { signIn, logIn };
