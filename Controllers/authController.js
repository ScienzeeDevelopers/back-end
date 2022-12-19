import UserModel from "../Models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//Register user 
export const registerUser = async (req, res) => {
    const { name, date, email, state, country, password, confirmPassword, userType, agreement } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = UserModel({
        name,
        date,
        email,
        state,
        country,
        password: hashPassword,
        userType,
        agreement
    })


    try {
        const hasUser = await UserModel.findOne({ email })
        if (hasUser) {
            return res.status(400).json({ message: "Erro: Email já cadastrado" })
        }
        if (!name)
            return res.status(400).send({ message: 'Erro: Necessário que preencha o campo nome!' });
        if (!date)
            return res.status(400).json({ message: 'Erro: Necessário que preencha o campo data!' });
        if (!email)
            return res.status(400).json({ message: 'Erro: Necessário que preencha o campo email!' });
        if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
            return res.status(400).json({ message: 'Erro: Email inválido!' })
        if (!state)
            return res.status(400).json({ message: 'Erro: Necessário que selecione o campo Estado!' });
        if (!password)
            return res.status(400).json({ message: 'Erro: Necessário que preencha o campo senha!' });
        if (password.length < 6)
            return res.status(400).json({ message: 'Erro: A senha precisa ter pelo menos seis caracteres!' });
        if (password.match(/[\s]+/))
            return res.status(400).json({ message: 'Erro: Sua senha não pode conter espaços em branco!' });

        if (!password.match(/[a-z]+/))
            return res.status(400).json({ message: 'Erro: Sua senha deve conter ao menos uma letra minuscula' });

        if (!password.match(/[A-Z]+/))
            return res.status(400).json({ message: 'Erro: Sua senha deve conter ao menos uma letra maiuscula' });

        if (!password.match(/[0-9]+/))
            return res.status(400).json({ message: 'Erro: Sua senha deve conter ao menos um número' });
        if (!confirmPassword)
            return res.status(400).json({ message: 'Erro: Necessário que preencha o campo confirmação de senha!' });
        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Erro: Verifique sua senha e/ou confirmação de senha!' });
        if (agreement === !true)
            return res.status(400).json({ message: 'Erro: Necessário que leia e aceite os termos de uso!' });
        await newUser.save()
        const user = await newUser.save()
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' })
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: "Verifique seu email e senha" })
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                email: user.email,
                id: user._id
            }, process.env.JWT_KEY, { expiresIn: '6h' })
            res.status(200).json({ user, token })
        }
        else {
            res.status(400).json({ message: "Verifique seu email e senha!" })
        }
    } catch (error) {
        res.status(500).send({ message: error.message })
    }

}