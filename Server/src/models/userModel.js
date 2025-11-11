import mongoose from "mongoose";
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: 'https://cutiedp.com/wp-content/uploads/2025/07/cute-cat-dp%E2%80%8B-16.webp'
    },
    address: {
        line1 : {
            type : String,
            default : ''
        },
        line2 : {
            type : String,
            default : ''
        }
    },
    gender: {
        type: String,
        default: 'Not Selected'
    },
    dob: {
        type: String,
        default: 'Not Selected'
    },
    phone: {
        type: String,
        default: '0000000000'
    }
}, { timestamps: true })


userSchema.methods.getJWT = function (){
    const user = this;
    const token = JWT.sign({id :user._id}, process.env.SECRET_KEY, {
        expiresIn : '7d'
    })

    return token;
}

userSchema.methods.isPasswordMatch = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password)
}


const userModel = mongoose.model.user || mongoose.model('user', userSchema)

export default userModel;