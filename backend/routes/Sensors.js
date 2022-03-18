const express = require('express')
const router = express.Router()
const Sensors = require("../models/Sensors")
const mongoose = require("mongoose")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all', async(req, res) => {
    const all = await Sensors.find();
    res.json(all)
})


module.exports = router