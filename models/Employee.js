const mongoose = require('mongoose')

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    active_start: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Employee', EmployeeSchema)