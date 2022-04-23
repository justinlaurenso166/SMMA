const express = require('express')
const router = express.Router()
const JenisMesin = require("../models/JenisMesin")
const Mesin = require("../models/Mesin")
const mongoose = require("mongoose")
const { off } = require('../models/JenisMesin')

//all route
router.get('/all', async(req, res) => {
    const all = await JenisMesin.find();
    res.json(all)
})

router.get('/:id', async(req, res) => {
    const data = await JenisMesin.findById(req.params.id)
    res.json(data)
})

router.post('/tambah', async(req, res) => {
    const check_jenis_mesin = await JenisMesin.find({ kode_jenis_mesin: req.body.kode_jenis_mesin });
    if (check_jenis_mesin.length > 0) {
        res.status(500).send("Machine type code is available")
    } else {
        let data = {
            _id: mongoose.Types.ObjectId(),
            kode_jenis_mesin: req.body.kode_jenis_mesin,
            jenis_mesin: req.body.jenis_mesin,
            spesifikasi: req.body.spesifikasi,
            kerusakan: req.body.kerusakan,
        }
        const new_data = new JenisMesin(data);
        const save_data = await new_data.save();
        if (save_data) {
            res.status(200);
            res.send("Successfully added New Machine Type")
        }
    }
})

router.delete('/delete/:id', async(req, res) => {
    const result = await JenisMesin.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send("Successfully delete Machine Type")
})

router.put('/edit/:id', async(req, res) => {
    const result = await JenisMesin.updateOne({ _id: req.params.id, }, { $set: req.body });
    res.status(200);
    res.send("Successfully changed Machine Type")
})

router.get("/daftar_mesin/:id", async(req, res) => {
    const get_data = await Mesin.find({ id_jenis_mesin: req.params.id });
    if (get_data) {
        res.status(200)
        res.json(get_data)
    }
})

router.post('/search', async(req, res) => {
    let search = req.query.search;

    let search_jenis_mesin = await JenisMesin.find().where({
        $or: [{ jenis_mesin: new RegExp(search, "i") }, { kode_jenis_mesin: new RegExp(search, "i") }]
    }).exec();
    if (search_jenis_mesin) {
        res.status(200);
        res.json(search_jenis_mesin)
    }
})

module.exports = router