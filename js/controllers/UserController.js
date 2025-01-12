"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.signIn = void 0;
const bcrypt = __importStar(require("bcrypt-ts"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
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
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '8000h',
        });
        return res.json({ token });
    }
    catch (error) {
        return res.status(400).json(error);
    }
};
exports.signIn = signIn;
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
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: '8000h',
        });
        return res.json({ token });
    }
    catch (error) {
        return res.json(error);
    }
};
exports.logIn = logIn;
