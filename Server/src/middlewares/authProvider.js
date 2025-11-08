import JWT from 'jsonwebtoken';

const authProvider = async (req, res, next) => {
    try {
        const {ptoken} = req.headers;
        if (!ptoken){
            return res.json({success : false, message : 'Not Authorized'})
        }

        const tokenDecode = JWT.verify(ptoken, process.env.SECRET_KEY)

        req.provId = tokenDecode.id

        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export default authProvider;