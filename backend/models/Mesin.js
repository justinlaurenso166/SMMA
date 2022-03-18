const mongoose = require('mongoose')
const MesinSchema = new mongoose.Schema({
    _id: String,
    kode_mesin: String,
    nama_mesin: String,
    id_jenis_mesin: String,
    jenis_mesin: String,
    lokasi_mesin: String,
    timestamps: Date,
})

module.exports = mongoose.model('machine', MesinSchema)