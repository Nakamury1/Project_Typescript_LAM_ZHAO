import express from 'express';
import { signIn, logIn } from '../controllers/UserController.js';
const router = express.Router();
router.post('/', signIn);
router.post('/:id', logIn);
export default router;
