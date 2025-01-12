import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserInterface } from "../interfaces/User";

dotenv.config();
const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET as string;

export class UserController implements UserInterface {
    id: number;
    email: string;
    password: string;

    constructor() {
        this.id = 0;
        this.email = '';
        this.password = '';
        this.router = Router();
        this.initializeRoutes();
    }

    public router: Router;

    private initializeRoutes() {
        this.router.post('/signIn', this.signIn);
        this.router.post('/login', this.logIn);
    }

    public signIn = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });

            if (!jwtSecret) {
                return res.status(500).json({ error: "Invalid token" });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                jwtSecret,
                {
                    expiresIn: "8000h",
                }
            );

            return res.status(200).json({ user, token });
        } catch (error) {
            console.error("Sign in failed", error);
            return res.status(500).json({ error: "Sign in failed" });
        }
    };

    public logIn = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                },
                jwtSecret,
                {
                    expiresIn: "8000h",
                }
            );

            return res.status(200).json({ user, token });
        } catch (error) {
            console.error("Login failed", error);
            return res.status(500).json({ error: "Login failed" });
        }
    };
}