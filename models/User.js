const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 1000
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)