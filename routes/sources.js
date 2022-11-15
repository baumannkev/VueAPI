import express from "express"
import { getSources, createSource, deleteSource, getOneSource, updateSource } from "../controllers/source.js"

const router = express.Router()

// router.get('/sources, ')

router.get('/sources', getSources)
router.post('/sources', createSource)
router.get('/sources/:id', getOneSource)
router.delete('/sources/:id', deleteSource)
router.put('/sources/:id', updateSource)

export default router;