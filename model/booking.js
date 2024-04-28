const mongoose = require('mongoose');
const bookingscheme = new mongoose.Schema({
    tname: String,
    tnumber: Number,
    seat: Number,
    price: Number,
    fromStation: String,
    toStation: String,
    timing: Number,
    date: Date,
    paymentStatus: {
        type: String,
        default: "not booked"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Booking = mongoose.model('Booking ', bookingscheme, 'Booking ');
module.exports = Booking;