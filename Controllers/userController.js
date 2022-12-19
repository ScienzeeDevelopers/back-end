import UserModel from "../Models/userModel.js"
import bcrypt from "bcrypt"
import ArticleModel from "../Models/articleModel.js"

//get User
export const getUser = async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...other } = user._doc
            res.status(200).json(other)
        } else {
            res.status(404).json({ message: "Usuário não encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//update user
export const updateUser = async (req, res) => {
    const id = req.params.id
    const { userId, password } = req.body

    if (id === userId) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    } else {
        res.status(403).json("Acesso não permitido")
    }
}

//delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id
    const { userId } = req.body

    if (userId === id) {
        try {
            await UserModel.findByIdAndRemove(id)
            res.status(200).json({ message: "Usuário excluído com sucesso" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
