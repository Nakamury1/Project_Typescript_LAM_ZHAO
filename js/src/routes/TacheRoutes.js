import express from 'express';
import { getTaches, getTache, createTache, updateTache, deleteTache } from '../controllers/TacheController.js';
const router = express.Router();
router.get('/', getTaches);
router.get('/:id', getTache);
router.post('/', createTache);
router.put('/:id', updateTache);
router.delete('/:id', deleteTache);
export default router;
