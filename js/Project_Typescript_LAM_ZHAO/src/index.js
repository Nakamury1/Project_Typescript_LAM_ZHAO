"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_js_1 = __importDefault(require("../../router.js"));
const body_parser_1 = __importDefault(require("body-parser"));
const ip_1 = __importDefault(require("ip"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(router_js_1.default);
app.listen(3000, () => {
    console.log('Server is running http://' + ip_1.default.address() + ":" + 3000);
});
