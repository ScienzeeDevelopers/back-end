import mongoose from "mongoose";

const SearchAreaSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: false }
)

const SearchAreaModel = mongoose.model('SearchArea', SearchAreaSchema)
export default SearchAreaModel