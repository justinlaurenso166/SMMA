const mongoose = require('mongoose')
const JenisMesinSchema = new mongoose.Schema({
    jenis_mesin: String,
    spesifikasi: String,
    kode_jenis_mesin: String,
    part: Array,
    kerusakan: Array
})

module.exports = mongoose.model('machine_type', JenisMesinSchema)