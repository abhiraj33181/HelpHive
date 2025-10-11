import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    // todo in future
}, {timestamps : true})

const BookingModel = mongoose.model('Booking', bookingSchema)

export default BookingModel;