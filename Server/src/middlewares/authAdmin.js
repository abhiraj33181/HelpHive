import JWT from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
    try {
        const {aToken} = req.cookies;
        if (!aToken){
            return res.json({success : false, message : 'Not Authorized'})
        }

        const tokenDecode = JWT.verify(aToken, process.env.SECRET_KEY)

        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success : false, message : 'Not Authorized!'})
        }

        next()
    } catch (error) {
        console.log(error)
        res.json({success: false, message : error.message})
    }
}

export default authAdmin;