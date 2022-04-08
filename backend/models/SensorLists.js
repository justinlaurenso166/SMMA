const mongoose = require('mongoose')
var SchemaTypes = mongoose.Schema.Types;

const SensorListSchema = new mongoose.Schema({
    _id: String,
    kode_sensor: String,
    nama_sensor: String,
})

module.exports = mongoose.model('sensor_list', SensorListSchema)