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
        default: 'https://img.freepik.com/free-photo/3d-cartoon-portrait-person-practicing-law-related-profession_23-2151419548.jpg?semt=ais_hybrid&w=740&q=80'
    },
    service: {
        type: String,
    },
    experience: {
        type: String,
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
    },
    averageRating: {
        type: Number,
        default: 0
    },
    ratingsCount: {
        type: Number,
        default: 0
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
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],   // [lng, lat]
            default: [0, 0]
        }
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

providerSchema.index({ location: "2dsphere" });

providerSchema.methods.getJWT = function () {
    const user = this;
    const token = JWT.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: '7d'
    })

    return token;
}

providerSchema.methods.isPasswordMatch = function (password) {
    const user = this;
    return bcrypt.compare(password, user.password)
}

const providerModel = mongoose.models.provider || mongoose.model('Provider', providerSchema)

export default providerModel;