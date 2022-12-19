import express from "express"
import { getStates } from "../Controllers/statesController.js"

const router = express.Router()

router.get('/', getStates)

export default router