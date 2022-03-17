const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    _id: String,
    username: String,
    password: String,
    hak_akses: Number,
})

module.exports = mongoose.model('user', UserSchema);