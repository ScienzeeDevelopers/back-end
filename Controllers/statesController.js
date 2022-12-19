import StatesModel from "../Models/statesModel.js"

export const getStates = async (req, res) => {
    try {
        const states = await StatesModel.find({
            attributes: ['id', 'name', 'initials']
        });
        res.status(200).json(states);
    } catch (error) {
        console.log(error);
    }
}