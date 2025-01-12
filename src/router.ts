import express from 'express'
import { signIn, logIn } from './controllers/UserController.js';
import { getTaches } from './controllers/TacheController.js';

const router = express.Router()

router.use('/signIn', signIn)
router.use('/login', logIn)
router.use('/tache', getTaches)

export default router