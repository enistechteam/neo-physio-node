const mongoose = require('mongoose')
const Petrol = require('../../model/masterModels/PetrolAllowance')


// Get all Petrol
exports.getAllPetrol = async (req, res) => {
    try {
        const petrol = await Petrol.find().populate("physioId" , "physioName")
        if (!petrol) {
            res.status(400).json({ message: "petrol is not found" })
        }

        res.status(200).json(petrol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

exports.ApprovePetrol = async (req, res) => {
    try {
        const petrol = await Petrol.updateMany({}, { status: "Approved" });
        if (petrol.nModified === 0) {
            res.status(400).json({ message: "No petrol records were updated" })
        }
        res.status(200).json({ message: "Petrol allowance approved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};