import providerModel from "../models/providerModel.js";

export const changeAvailablity = async (req,res) => {
    try {
        
        const {provId} = req.body;

        const provData = await providerModel.findById(provId)

        await providerModel.findByIdAndUpdate(provId, {available : !provData.available})

        res.json({success: true, message : `${provData.name}'s Availablity Changed!`})
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}


export const providerList = async (req,res) => {
    try {
        const providers = await providerModel.find({}).select(['-password', '-email'])

        res.json({success : true, providers})
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}