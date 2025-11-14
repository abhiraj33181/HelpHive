import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'Not Authorized' });
        }

        const decoded = JWT.verify(token, process.env.SECRET_KEY);

        if (!decoded.id) {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }

        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized Access!' });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ success: false, message: 'Token Expired or Invalid' });
    }
};

export default authUser;
