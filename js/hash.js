"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
const bcrypt_ts_1 = require("bcrypt-ts");
async function hashPassword(plainPassword) {
    return (0, bcrypt_ts_1.hash)(plainPassword, 10).then((hashedPassword) => {
        return hashedPassword;
    });
}
