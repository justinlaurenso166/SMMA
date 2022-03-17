const express = require('express')
const router = express.Router()
const Login = require("../models/Pengguna")
const mongoose = require("mongoose")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all', async(req, res) => {
    const all = await Login.find();
    res.json(all)
})

router.post('/adduser', async(req, res) => {
    req.body._id = mongoose.Types.ObjectId();
    const newUser = new Login(req.body);
    res.json(await newUser.save())
})

router.post('/login', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userLogin = await Login.find({ username: username, password: password })
    if (userLogin.length > 0) {
        res.status(200)
            // res.sendStatus("Login Success")
        res.json(userLogin)
    } else {
        res.status(404)
            // res.sendStatus("No User Found")
        res.json([])
    }
})

module.exports = router