"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bdd = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
exports.bdd = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Project_Typescript',
});
