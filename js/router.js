import express from 'express';
import { UserController } from './controllers/UserController';
import { TacheController } from './controllers/TacheController.js';
const router = express.Router();
const userController = new UserController();
const tacheController = new TacheController(0, '', '', new Date(), 'Non commencée', 0);
router.post('/signIn', userController.signIn);
router.post('/login', userController.logIn);
router.get('/tache', tacheController.getTaches);
export default router;
