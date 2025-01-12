import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;
export class UserController {
    constructor() {
        this.signIn = async (req, res) => {
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
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, jwtSecret, {
                    expiresIn: "8000h",
                });
                return res.status(200).json({ user, token });
            }
            catch (error) {
                console.error("Sign in failed", error);
                return res.status(500).json({ error: "Sign in failed" });
            }
        };
        this.logIn = async (req, res) => {
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
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                }, jwtSecret, {
                    expiresIn: "8000h",
                });
                return res.status(200).json({ user, token });
            }
            catch (error) {
                console.error("Login failed", error);
                return res.status(500).json({ error: "Login failed" });
            }
        };
        this.id = 0;
        this.email = '';
        this.password = '';
        this.router = Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/signIn', this.signIn);
        this.router.post('/login', this.logIn);
    }
}
