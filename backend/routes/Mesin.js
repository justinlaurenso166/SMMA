const express = require('express')
const router = express.Router()
const Mesin = require("../models/Mesin")
const mongoose = require("mongoose")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all', async(req, res) => {
    const all = await Mesin.find();
    res.json(all)
})

router.post('/new', async(req, res) => {
    req.body._id = mongoose.Types.ObjectId();
    const newMesin = new Mesin(req.body);
    res.json(await newMesin.save())
})

router.get('/get/:id', async(req, res) => {
    const data = await Mesin.findById({ _id: req.params.id })
    res.json(data)
})


module.exports = router