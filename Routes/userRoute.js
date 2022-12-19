import express from "express"
import { getUser, updateUser, deleteUser } from "../Controllers/userController.js"

const router = express.Router()

router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router