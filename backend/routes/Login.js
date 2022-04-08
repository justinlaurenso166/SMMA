const express = require('express')
const router = express.Router()
const Login = require("../models/Pengguna")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all', async(req, res) => {
    const all = await Login.find();
    res.json(all)
})

router.post('/adduser', async(req, res) => {
    let data = {
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        nama: req.body.nama,
        password: req.body.password,
        hak_akses: 2,
        jabatan: "Karyawan",
    }
    const add_user = new Login(data);
    const save_add_user = await add_user.save();
    if (save_add_user) {
        res.status(200)
        res.send("Pengguna baru berhasil ditambahkan")
    }
})

router.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userLogin = await Login.find({ username: username, password: password })
    if (userLogin.length > 0) {
        res.status(200)
        res.json(userLogin)
    } else {
        res.status(500).send("User not found!");
    }
})

router.get('/get/:id', async(req, res) => {
    const find_user = await Login.findById(req.params.id);
    if (find_user) {
        res.status(200)
        res.json(find_user)
    }
})

router.put('/edit/:id', async(req, res) => {
    if (req.body.type === "username") {
        let data = {
            nama: req.body.nama,
            username: req.body.username
        }
        const edit_user = await Login.updateOne({ _id: req.params.id }, { $set: data })
        if (edit_user) {
            res.status(200)
            res.send("Data Pengguna berhasil diedit")
        }
    } else {
        let data = {
            password: req.body.new_password
        }
        const edit_user = await Login.updateOne({ _id: req.params.id }, { $set: data })
        if (edit_user) {
            res.status(200)
            res.send("Password berhasil diganti")
        }
    }
})

router.delete("/delete/:id", async(req, res) => {
    const delete_user = await Login.findByIdAndDelete(req.params.id)
    if (delete_user) {
        res.status(200)
        res.send("Data penguna berhasil dihapus")
    }
})

router.post('/search', async(req, res) => {
    let search = req.query.search;

    let search_user = await Login.find().where({
        $or: [{ nama: new RegExp(search, "i") }, { username: new RegExp(search, "i") }]
    }).exec();
    if (search_user) {
        res.status(200);
        res.json(search_user)
    }
})


module.exports = router