const mongoose = require('mongoose')
var SchemaTypes = mongoose.Schema.Types;

const SensorSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    id_sensor: String,
    data_sensor: Array,
    latest_data_sensor: Array,
})

module.exports = mongoose.model('sensors', SensorSchema)