const mongoose = require('mongoose')
var SchemaTypes = mongoose.Schema.Types;

const SensorSchema = new mongoose.Schema({
    _id: String,
    percepatan: SchemaTypes.Number,
    kecepatan: SchemaTypes.Number,
    suhu: SchemaTypes.Number,
})

module.exports = mongoose.model('sensors', SensorSchema)