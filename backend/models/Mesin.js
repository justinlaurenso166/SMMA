const mongoose = require('mongoose')
const MesinSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    id_jenis_mesin: mongoose.Types.ObjectId,
    kode_mesin: String,
    nama_mesin: String,
    jenis_mesin: String,
    lokasi_mesin: String,
    timestamps: Date,
    kode_sensor: String,
})

module.exports = mongoose.model('machine', MesinSchema)