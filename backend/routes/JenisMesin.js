const express = require('express')
const router = express.Router()
const JenisMesin = require("../models/JenisMesin")
const mongoose = require("mongoose")

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
    const new_data = new JenisMesin(req.body);
    const save_data = await new_data.save();
    if (save_data) {
        res.status(200);
        res.send("Berhasil menambahkan Jenis Mesin Baru")
    }
})

router.delete('/delete/:id', async(req, res) => {
    const result = await JenisMesin.findByIdAndDelete(req.params.id);
    res.status(200);
    res.send("Berhasil menghapus Jenis Mesin")
})

router.put('/edit/:id', async(req, res) => {
    const result = await JenisMesin.updateOne({ _id: req.params.id, }, { $set: req.body });
    res.status(200);
    res.send("Berhasil mengubah Jenis Mesin")
})

module.exports = router