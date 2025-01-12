import express from 'express';
import { UserController } from '../controllers/UserController.js';

const router = express.Router();
const userController = new UserController(0, '', '');

router.post('/signIn', userController.signIn);
router.post('/login', userController.logIn);

export default router;