const mongoose = require('mongoose')
const MesinSchema = new mongoose.Schema({
    _id: String,
    name: String,
    jam: Array,
})

module.exports = mongoose.model('datamesin', MesinSchema)