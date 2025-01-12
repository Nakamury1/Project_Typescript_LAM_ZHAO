import express from 'express';
import { signIn, logIn } from '../controllers/UserController.js';
import { gettache } from '../routes/TacheRoutes.js';
const router = express.Router();
router.use('/signIn', signIn);
router.use('/login', logIn);
router.use('/tache', gettache);
export default router;
