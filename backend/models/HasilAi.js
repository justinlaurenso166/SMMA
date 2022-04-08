const mongoose = require('mongoose')
const HasilAiSchema = new mongoose.Schema({
    kode_mesin: String,
    kode_sensor: String,
    data_ai: Array,
    latest_data_ai: Array,
})

module.exports = mongoose.model('ai_result', HasilAiSchema)