import NoticeModel from "../Models/noticeModel.js"
import mongoose from "mongoose"
import UserModel from "../Models/userModel.js"

//Create a new Notice
export const createNotice = async (req, res) => {
    const { userId, theme, searchArea, institution, locality, duration, openIn, closeIn, description, file, img } = req.body
    const newNotice = NoticeModel({
        userId,
        theme,
        searchArea,
        institution,
        locality,
        duration,
        openIn,
        closeIn,
        description,
        file,
        img
    })

    try {
        if (!userId) {
            return res.status(400).json({ message: "Erro: Erro interno, tente refazer o login" })
        }
        if (!theme) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo Tema" })
        }
        if (!searchArea) {
            return res.status(400).json({ message: "Erro: Necessário que escolha o campo 'Área de Pesquisa'" })
        }
        if (!institution) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo Instituição" })
        }
        if (!locality) {
            return res.status(400).json({ message: "Erro: Necessário que escolha o campo 'Localidade'" })
        }
        if (!openIn) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo 'Abre em: dd/mm/aaaa'" })
        }
        if (!closeIn) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo 'Encerra em: dd/mm/aaaa'" })
        }
        if (!description) {
            return res.status(400).json({ message: "Erro: Necessário que preencha o campo Descrição" })
        }
        if (!file) {
            return res.status(400).json({ message: "Erro: Escolha o arquivo para upload" })
        }
        await newNotice.save()
        res.status(201).json(newNotice)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get a notice
export const getNotice = async (req, res) => {
    const id = req.params.id

    try {
        const notice = await NoticeModel.findById(id)
        res.status(200).json(notice)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update a notice
export const updateNotice = async (req, res) => {
    const noticeId = req.params.id
    const { userId } = req.body

    try {
        const notice = await NoticeModel.findById(noticeId)
        if (notice.userId === userId) {
            await notice.updateOne({ $set: req.body })
            res.status(200).json({ message: "Edital atualizado" })
        } else {
            res.status(403).json({ message: "Usuário não tem permissão" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//delete a notice
export const deleteNotice = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    try {
        const notice = await NoticeModel.findById(id)
        if (notice.userId === userId) {
            await notice.deleteOne()
            res.status(200).json({ message: "Edital excluído com sucesso" })
        } else {
            res.status(403).json({ message: "Usuário não tem permissão" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//favorite Notice
export const favoriteNotice = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    try {
        const user = await UserModel.findById(currentUserId)
        if (!user.favoriteNotices.includes(id)) {
            await user.updateOne({ $push: { favoriteNotices: id } })
            res.status(200).json({ message: "Edital favoritado" })
        } else {
            res.status(403).json({ message: "Edital já favoritado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//unFavorite Notice
export const unFavoriteNotice = async (req, res) => {
    const id = req.params.id
    const { currentUserId } = req.body

    try {
        const user = await UserModel.findById(currentUserId)
        if (user.favoriteNotices.includes(id)) {
            await user.updateOne({ $pull: { favoriteNotices: id } })
            res.status(200).json({ message: "Edital desfavoritado" })
        } else {
            res.status(403).json({ message: "Edital não está favoritado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//get notice timeline
export const getTimelineNotice = async (req, res) => {
    try {
        const notices = await NoticeModel.find().sort({ createdAt: -1 })
        res.status(200).json(notices)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}