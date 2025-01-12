import * as bcrypt from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

import { UserInterface } from '../interfaces/User';

const prisma = new PrismaClient();

export class UserController implements UserInterface{
    id: number;
    email: string;
    password: string;
    
    constructor(id: number, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    signIn = async(email: string, password: string) => {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });
    
            if (!process.env.JWT_SECRET) {
                console.error('Invalide token');
            }
    
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '8000h',
                }
            );
    
            return user;
        } 
        catch(error){
            console.error("Echec d'inscription", error);
            throw new Error;
        }
    };
    
    logIn = async(email: string, password: string ) => {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email,
                },
            });
    
            if (!user) {
                console.error('Utilisateur introuvable');
            }
    
            if (!process.env.JWT_SECRET) {
              console.error('Invalide token');
            }
    
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
               console.error('Mot de passe invalide');
               throw new Error;
            }
    
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '8000h',
                }
            );
    
            return token;
        }
        catch(error){
            console.error("Echec de connexion", error);
            throw new Error;
        }
    };
}