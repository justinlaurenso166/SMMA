const mongoose = require('mongoose')
const TestingSchema = new mongoose.Schema({
    Percepatan: Number,
    Kecepatan: Number,
})

module.exports = mongoose.model('testing', TestingSchema)