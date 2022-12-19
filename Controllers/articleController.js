import ArticleModel from "../Models/articleModel.js"
import UserModel from "../Models/userModel.js"

import mongoose from "mongoose"


//Create a new Article
export const createArticle = async (req, res) => {
    const { userId, title, searchArea, summary, file } = req.body
    const newArticle = ArticleModel({
        userId,
        title,
        searchArea,
        summary,
        file
    })
    try {
        if (!userId) {
            return res.status(400).json({ message: "Erro: Erro interno, tente refazer o login" })
        }
        if (!title) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo Título" })
        }
        if (title.length < 3) {
            return res.status(400).json({ message: "Erro: Título muito curto" })
        }
        if (!searchArea) {
            return res.status(400).json({ message: "Erro: Necessário que escolha o campo 'Área de Pesquisa'" })
        }
        if (!summary) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo Resumo" })
        }
        if (summary.length < 10) {
            return res.status(400).json({ message: "Erro: Resumo muito curto" })
        }
        if (!file) {
            return res.status(400).json({ message: "Erro: Escolha o arquivo para upload" })
        }
        await newArticle.save()
        res.status(200).json(newArticle)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get a article 
export const getArticle = async (req, res) => {
    const id = req.params.id
    try {
        const article = await ArticleModel.findById(id)
        res.status(200).json(article)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Get article by userId
export const getArticleById = async (req, res) => {
    const userId = req.params.id

    try {
        const articles = await ArticleModel.find({ userId: userId })
        res.status(200).json(articles)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}
//update a article
export const updateArticle = async (req, res) => {
    const articleId = req.params.id
    const { userId } = req.body

    try {
        const article = await ArticleModel.findById(articleId)
        if (article.userId === userId) {
            await article.updateOne({ $set: req.body })
            res.status(200).json({ message: "Artigo atualizado" })
        } else {
            res.status(403).json({ message: "Usuário não tem permissão" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete a article
export const deleteArticle = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    try {
        const article = await ArticleModel.findById(id)
        if (article.userId === userId) {
            await article.deleteOne()
            res.status(200).json({ message: "Artigo excluído com sucesso" })
        } else {
            res.status(403).json({ message: "Usuário não tem permissão" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//favorite Article
export const favoriteArticle = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    try {
        const user = await UserModel.findById(currentUserId)
        if (!user.favoriteArticles.includes(id)) {
            await user.updateOne({ $push: { favoriteArticles: id } })
            res.status(200).json({ message: "Artigo favoritado" })
        } else {
            res.status(403).json({ message: "Artigo já favoritado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//unFavorite Article
export const unFavoriteArticle = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    try {
        const user = await UserModel.findById(currentUserId)
        if (user.favoriteArticles.includes(id)) {
            await user.updateOne({ $pull: { favoriteArticles: id } })
            res.status(200).json({ message: "Artigo desfavoritado" })
        } else {
            res.status(403).json({ message: "Artigo não favoritado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get article
export const getTimelineArticle = async (req, res) => {
    try {
        const articles = await ArticleModel.find().sort({ createdAt: -1 })
        res.status(200).json(articles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}