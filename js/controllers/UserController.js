import * as bcrypt from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
export class UserController {
    constructor(id, email, password) {
        this.signIn = async (email, password) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await prisma.user.create({
                    data: {
                        email,
                        password: hashedPassword,
                    },
                });
                if (!process.env.JWT_SECRET) {
                    throw new Error('JWT_SECRET non configuré');
                }
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, process.env.JWT_SECRET, {
                    expiresIn: '8000h',
                });
                return token;
            }
            catch (error) {
                console.error("Echec d'inscription", error);
                throw new Error;
            }
        };
        this.logIn = async (email, password) => {
            try {
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (!user) {
                    return { success: false, error: 'Utilisateur introuvable' };
                }
                if (!process.env.JWT_SECRET) {
                    throw new Error('JWT_SECRET non configuré');
                }
                const validPassword = await bcrypt.compare(password, user.password);
                if (!validPassword) {
                    console.error('Mot de passe invalide');
                    throw new Error;
                }
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, process.env.JWT_SECRET, {
                    expiresIn: '8000h',
                });
                return token;
            }
            catch (error) {
                console.error("Echec de connexion", error);
                throw new Error;
            }
        };
        this.id = id;
        this.email = email;
        this.password = password;
    }
}
