import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authUser = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token){
            return res.json({success : false, message : 'Not Authorized'})
        }

        const tokenDecode = JWT.verify(token, process.env.SECRET_KEY)

        const {id} = tokenDecode

        const user = await userModel.findById(id)

        if (!user) {
            return res.json({sucess : true, message : 'Unauthorized Access!'})
        }
        req.user = user;

        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export default authUser;