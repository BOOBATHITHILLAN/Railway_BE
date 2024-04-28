const mongoose = require('mongoose');
const trainscheme = new mongoose.Schema({
    tname: String,
    tnumber: Number,
    seat: {
        type: Number
    },
    fare: Number,
    fromStation: String,
    toStation: String,
    timing: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    status: {
        default: "none",
        type: String
    }
})

const Train = mongoose.model('Train', trainscheme, 'Train');
module.exports = Train;