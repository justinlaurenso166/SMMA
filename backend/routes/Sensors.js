const express = require('express')
const router = express.Router()
const Sensors = require("../models/Sensors")
const SensorLists = require("../models/SensorLists")
const mongoose = require("mongoose")
const { client } = require("../mqtt")
const Testing = require("../models/Testing")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all_sensor', async(req, res) => {
    const all = await SensorLists.find();
    res.json(all)
})

client.on('message', async function(topic, payload, packet) {
    // console.log(JSON.parse(payload))
    let data = JSON.parse(payload).uplink_message.decoded_payload
    const add_test = new Testing(data)
    const save_add_test = await add_test.save();
    if (save_add_test) {
        console.log(save_add_test)
    }
})

router.get('/all', async(req, res) => {
    const all = await Testing.find();
    res.json(all)
})


module.exports = router