import express from 'express';
import { TacheController } from '../controllers/TacheController.js';
const router = express.Router();
const tacheController = new TacheController(0, '', '', new Date(), 'Non commencée', 0);
router.get('/', tacheController.getTaches);
router.post('/:id', tacheController.createTache);
router.delete('/', tacheController.deleteTache);
export default router;
