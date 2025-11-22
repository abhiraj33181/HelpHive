import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const providerSchema = new mongoose.Schema({
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
        required: true,
    },
    service: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    fees: {
        type: Number,
        required: true
    },
    address: {
        street : {
            type : String,
            default : ''
        },
        city : {
            type : String,
            default : ''
        },
        state : {
            type : String,
            default : ''
        },
        pincode : {
            type : String,
            default : '',
            match: /^[0-9]{6}$/
        },
    },
    dob: {
        type: String,
        default: 'Not Selected'
    },
    slots_booked: {
        type: Object,
        default: {}
    }
}, { timestamps: true }, { minimize: false })

providerSchema.methods.getJWT = function (){
    const user = this;
    const token = JWT.sign({id :user._id}, process.env.SECRET_KEY, {
        expiresIn : '7d'
    })

    return token;
}

providerSchema.methods.isPasswordMatch = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password)
}

const providerModel = mongoose.models.provider || mongoose.model('provider', providerSchema)

export default providerModel;