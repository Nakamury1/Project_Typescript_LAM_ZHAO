import hash from '';
import { PrismaClient } from '@prisma/client';
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
const signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    prisma.user
        .create({
        data: {
            nom: nom,
            prenom: prenom,
            email: email,
            password: hashedPassword,
        },
    })
        .then((user) => {
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '8000h',
        });
        //res.status(200).json({user})
        res.json(token);
    })
        .catch((error) => {
        res.status(400).json(error);
    });
};
const logIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(404).json({ error: 'Password not valid' });
    }
    const token = jwt.sign({
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
    }, process.env.JWT_SECRET, {
        expiresIn: '8000h',
    });
    res.json(token);
};
export { signUp, logIn };
