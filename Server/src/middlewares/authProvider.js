import JWT from 'jsonwebtoken';
import providerModel from '../models/providerModel.js';

const authProvider = async (req, res, next) => {
    try {
        const {pToken} = req.cookies;
        if (!pToken){
            return res.json({success : false, message : 'Not Authorized'})
        }

        const tokenDecode = JWT.verify(pToken, process.env.SECRET_KEY)

        const {id} = tokenDecode;
        
        const provider = await providerModel.findById(id)

        if (!provider){
            return res.json({success : false, message : 'Unauthorized Access!!'})
        }

        req.provider = provider

        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export default authProvider;