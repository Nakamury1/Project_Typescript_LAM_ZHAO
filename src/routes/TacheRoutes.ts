import express from 'express'
import { getTaches, createTache, deleteTache } from '../controllers/TacheController.js'

const router = express.Router()

router.get('/', getTaches)
router.post('/', createTache)
router.delete('/:id', deleteTache)  

export default router