import mongoose from "mongoose";

const NoticeSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            required: true,
        },
        searchArea: {
            type: Number,
            required: true
        },
        institution: {
            type: String,
            required: true
        },
        locality: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        openIn: {
            type: Date,
            required: true
        },
        closeIn: {
            type: Date,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        file: {
            type: String,
            required: true
        },
        img: {
            type: String
        }
    },
    { timestamps: true }
)

const NoticeModel = mongoose.model('Notice', NoticeSchema)
export default NoticeModel