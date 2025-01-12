"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TacheController_js_1 = require("../controllers/TacheController.js");
const router = express_1.default.Router();
router.get('/', TacheController_js_1.getTaches);
router.post('/:id', TacheController_js_1.createTache);
router.delete('/', TacheController_js_1.deleteTache);
exports.default = router;
