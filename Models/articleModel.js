import mongoose from "mongoose";

const ArticleSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        searchArea: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        file: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const ArticleModel = mongoose.model('Article', ArticleSchema)
export default ArticleModel