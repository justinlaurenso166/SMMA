const express = require('express')
const router = express.Router()
const Sensors = require("../models/Sensors")
const SensorLists = require("../models/SensorLists")
const mongoose = require("mongoose")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all_sensor', async(req, res) => {
    const all = await SensorLists.find();
    res.json(all)
})


module.exports = router