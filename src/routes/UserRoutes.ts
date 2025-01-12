import express from 'express';
import { signIn, logIn } from '../controllers/UserController.js';

const router = express.Router();

router.post('/signIn', signIn);
router.post('/logIn', logIn);

export default router;