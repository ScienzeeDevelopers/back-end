import express from 'express'
const router = express.Router()
import multer from "multer"
import path from "path"

const storageArticle = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/articles")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})

const storageNotice = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "files/notices")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    },
})

const uploadArticle = multer({
    storage: storageArticle,
    fileFilter: function (req, file, cb) {
        if (path.extname(file.originalname).toLocaleLowerCase() === '.pdf') {
            return cb(null, true);
        }
        return cb(console.log('Arquivo inválido'), false);
    }
})

const uploadNotice = multer({
    storage: storageNotice,
    fileFilter: function (req, file, cb) {
        if (path.extname(file.originalname).toLocaleLowerCase() === '.pdf') {
            return cb(null, true);
        }
        return cb(console.log('Arquivo inválido'), false);
    }
})

const uploadImageNotice = multer({
    storage: storageNotice,
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.gif' && ext !== '.webp'
            && ext !== '.tiff' && ext !== '.tif' && ext !== '.pjp' & ext !== '.pjpeg' & ext !== '.jfif') {
            return cb(console.log('Arquivo inválido'), false);
        }
        return cb(null, true);
    }
})

router.post('/articles', uploadArticle.single("file", (req, res) => {
    return res.status(200).json()
}))

router.post('/notices', uploadNotice.single("file", (req, res) => {
    const {
        file,
        body: { name }
    } = req
}))

router.post('/noticesimg', uploadImageNotice.single("image", (req, res, error) => {
    const {
        file,
        body: { name }
    } = req

}))

router.post('/articles', (req, res) => {
    return res.status(200)
})

router.post('/notices', (req, res) => {
    return res.status(200)
})

router.post('/noticesimg', (req, res) => {
    return res.status(200)
})

export default router