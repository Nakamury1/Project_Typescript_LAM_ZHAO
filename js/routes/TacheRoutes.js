import express from 'express';
import { getTaches, createTache, deleteTache } from '../controllers/TacheController.js';
const router = express.Router();
router.get('/', getTaches);
router.post('/:id', createTache);
router.delete('/', deleteTache);
export default router;
