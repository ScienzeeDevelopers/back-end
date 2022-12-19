import express from "express"
import { createNotice, deleteNotice, favoriteNotice, getNotice, getTimelineNotice, unFavoriteNotice, updateNotice } from "../Controllers/noticeController.js"

const router = express.Router()

router.post('/new', createNotice)
router.get('/:id', getNotice)
router.put('/:id', updateNotice)
router.delete('/:id', deleteNotice)
router.put('/:id/favorite', favoriteNotice)
router.put('/:id/unfavorite', unFavoriteNotice)
router.get('/', getTimelineNotice)

export default router