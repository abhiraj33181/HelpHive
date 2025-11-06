import JWT from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    try {
        const {token} = req.headers;
        if (!token){
            return res.json({success : false, message : 'Not Authorized'})
        }

        const tokenDecode = JWT.verify(token, process.env.SECRET_KEY)

        req.userId = tokenDecode.id

        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export default authUser;