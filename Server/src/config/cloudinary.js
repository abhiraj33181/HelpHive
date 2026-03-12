import { v2 as cloudinary} from "cloudinary"

const connectCloudinary = async () => {
    if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.warn('Cloudinary env vars are missing. Upload features will be unavailable until configured.')
        return
    }

    cloudinary.config({
        cloud_name : process.env.CLOUDINARY_NAME,
        api_key : process.env.CLOUDINARY_API_KEY,
        api_secret : process.env.CLOUDINARY_API_SECRET,
    })
}


export default connectCloudinary;