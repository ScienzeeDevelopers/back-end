import mongoose from "mongoose";

const StatesSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        initials: {
            type: String,
            required: true,
            unique: true
        }
    },
    { timestamps: false }
)

const StatesModel = mongoose.model('States', StatesSchema)
export default StatesModel