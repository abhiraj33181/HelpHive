import mongoose from 'mongoose'

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI is not configured')
    }

    const baseUri = process.env.MONGODB_URI.replace(/\/$/, '')
    const databaseUri = /\/HelpHive(\?|$)/.test(baseUri) ? baseUri : `${baseUri}/HelpHive`

    return mongoose.connect(databaseUri)
}

export default connectDB;