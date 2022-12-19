import express from "express"
import { getSearchArea } from "../Controllers/searchAreaController.js"

const router = express.Router()

router.get('/', getSearchArea)

export default router