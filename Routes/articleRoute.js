import express from "express"
import {
    createArticle, deleteArticle, favoriteArticle, getArticle,
    getArticleById, getTimelineArticle, unFavoriteArticle, updateArticle
} from "../Controllers/articleController.js"

const router = express.Router()

router.post('/new', createArticle)
router.get('/:id', getArticle)
router.put('/:id', updateArticle)
router.delete('/:id', deleteArticle)
router.put('/:id/favorite', favoriteArticle)
router.put('/:id/unfavorite', unFavoriteArticle)
router.get('/', getTimelineArticle)
router.get('/:id/profile', getArticleById)

export default router