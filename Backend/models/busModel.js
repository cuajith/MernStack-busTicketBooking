const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    arrival: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "AC SLEEPER"
    },
    price: {
        type: Number,
        required: true
    },
    seatBooked: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: "Yet To Start"
    }
})

const bus = mongoose.model("buses", busSchema);
module.exports = bus;