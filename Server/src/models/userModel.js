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
        street: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        state: {
            type: String,
            default: ''
        },
        pincode: {
            type: String,
            default: '',
            match: /^[0-9]{6}$/
        },
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number],
            default: [0, 0]
        }
    },

    gender: {
        type: String,
    },
    dob: {
        type: String,
    },
    phone: {
        type: String,
    }
}, { timestamps: true })

userSchema.index({ location: "2dsphere" });


userSchema.methods.getJWT = function () {
    const user = this;
    const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: '7d'
    })

    return token;
}

userSchema.methods.isPasswordMatch = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password)
}


const userModel = mongoose.models.User || mongoose.model('User', userSchema)

export default userModel;