import JWT from 'jsonwebtoken';
import providerModel from '../models/providerModel.js';

const authProvider = async (req, res, next) => {
    try {
        const {ptoken} = req.cookies;
        if (!ptoken){
            return res.json({success : false, message : 'Not Authorized'})
        }

        const tokenDecode = JWT.verify(ptoken, process.env.SECRET_KEY)

        const {id} = tokenDecode;
        
        const provider = await providerModel.findById(id)

        if (!provider){
            return res.json({success : false, message : 'Unauthorized Access!!'})
        }

        req.provder = provider

        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export default authProvider;