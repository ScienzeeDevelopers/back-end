import SearchAreaModel from "../Models/searchAreaModel.js"

export const getSearchArea = async (req, res) => {
    try {
        const seachArea = await SearchAreaModel.find({
            attributes: ['id', 'name']
        });
        res.status(200).json(seachArea);
    } catch (error) {
        console.log(error);
        res.json({ message: error.message })
    }
}