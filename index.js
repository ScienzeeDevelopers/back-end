import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import AuthRoute from "./Routes/authRoute.js"
import UserRoute from "./Routes/userRoute.js"
import ArticleRoute from "./Routes/articleRoute.js"
import NoticeRoute from "./Routes/noticeRoute.js"
import StatesRoute from "./Routes/statesRoute.js"
import SearchAreaRoute from "./Routes/searchAreaRoute.js"
import UploadRoute from "./Routes/uploadRoute.js"

const app = express()

app.use(express.json())
app.use(cors())

//Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

dotenv.config()

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.xxcnyto.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
    .then(() => app.listen(`${process.env.PORT}`, () => console.log(`Servidor rodando na porta ${process.env.PORT}`)))
    .catch((error) => console.log(error))

app.use('/auth', AuthRoute)
app.use('/user', UserRoute)
app.use('/article', ArticleRoute)
app.use('/notice', NoticeRoute)
app.use('/states', StatesRoute)
app.use('/searcharea', SearchAreaRoute)
app.use('/upload', UploadRoute)