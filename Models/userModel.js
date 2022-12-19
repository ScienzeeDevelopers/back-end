import mongoose from "mongoose"

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        state: {
            type: Number,
        },
        country: {
            type: Number,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        userType: {
            type: String,
            required: true
        },
        agreement: {
            type: Boolean,
            required: true
        },
        profilePicture: {
            type: String
        },
        myArticles: {
            type: []
        },
        myNotices: {
            type: []
        },
        favoriteArticles: {
            type: []
        },
        favoriteNotices: {
            type: []
        },
    },
    { timestamps: true }
)

const UserModel = mongoose.model("Users", UserSchema)
export default UserModel