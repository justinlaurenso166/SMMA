const express = require('express')
const router = express.Router()
const Mesin = require("../models/Mesin")
const mongoose = require("mongoose")
const Sensors = require("../models/Sensors")
const HasilAi = require("../models/HasilAi")
const JenisMesin = require("../models/JenisMesin")

//all route
router.get('/', (req, res) => {
    res.send("Semua Mesin")
})

router.get('/all', async(req, res) => {
    // const all = await Mesin.find();
    const all = await Mesin.aggregate([{
            $lookup: {
                from: Sensors.collection.name,
                localField: "kode_sensor",
                foreignField: "id_sensor",
                as: "sensor_result",
            },
        },
        { $unwind: { "path": "$sensor_result", "preserveNullAndEmptyArrays": true } },
        {
            $lookup: {
                from: HasilAi.collection.name,
                localField: "kode_mesin",
                foreignField: "kode_mesin",
                as: "sensor_ai",
            },
        },
        { $unwind: { "path": "$sensor_ai", "preserveNullAndEmptyArrays": true } },
    ]).exec();
    res.json(all)
})

router.get('/get/:id', async(req, res) => {
    const getById = await Mesin.aggregate([{
            $match: {
                "_id": mongoose.Types.ObjectId(req.params.id),
            },
        },
        {
            $lookup: {
                from: Sensors.collection.name,
                localField: "kode_sensor",
                foreignField: "id_sensor",
                as: "sensor_result",
            },
        },
        { $unwind: { "path": "$sensor_result", "preserveNullAndEmptyArrays": true } },
        {
            $lookup: {
                from: HasilAi.collection.name,
                localField: "kode_mesin",
                foreignField: "kode_mesin",
                as: "sensor_ai",
            },
        },
        { $unwind: { "path": "$sensor_ai", "preserveNullAndEmptyArrays": true } },
        {
            $lookup: {
                from: JenisMesin.collection.name,
                localField: "id_jenis_mesin",
                foreignField: "_id",
                as: "jenis_mesin_detail",
            },
        },
        { $unwind: { "path": "$jenis_mesin_detail", "preserveNullAndEmptyArrays": true } },
    ]).exec();
    res.json(getById)
})

router.put('/edit/:id', async(req, res) => {
    const find_jenis_mesin = await JenisMesin.findById(req.body.id_jenis_mesin)
    let data = {
        id_jenis_mesin: req.body.id_jenis_mesin,
        jenis_mesin: find_jenis_mesin.jenis_mesin,
        kode_mesin: req.body.kode_mesin,
        kode_sensor: req.body.kode_sensor,
        lokasi_mesin: req.body.lokasi_mesin,
        timestamps: req.body.timestamps,
        nama_mesin: req.body.nama_mesin,
    }
    const update = await Mesin.updateOne({ _id: req.params.id }, { $set: data });
    res.status(200)
    res.send("Berhasil mengubah data mesin")
})

router.put('/remove/:id', async(req, res) => {
    let data = {
        id_jenis_mesin: req.body.id_jenis_mesin,
        jenis_mesin: req.body.jenis_mesin,
        kode_mesin: req.body.kode_mesin,
        kode_sensor: req.body.kode_sensor,
        lokasi_mesin: req.body.lokasi_mesin,
        timestamps: req.body.timestamps,
        nama_mesin: req.body.nama_mesin,
    }
    const update = await Mesin.updateOne({ _id: req.params.id }, { $set: data });
    res.status(200)
    res.send("Berhasil menghapus jenis mesin dari data mesin")
})

router.delete("/delete/:id/:kode_mesin/:kode_sensor", async(req, res) => {
    const delete_mesin = await Mesin.findByIdAndDelete(req.params.id);
    const delete_ai = await HasilAi.findOneAndDelete({ kode_mesin: req.params.kode_mesin });
    const delete_sensor = await Sensors.findOneAndDelete({ id_sensor: req.params.kode_sensor });
    if (delete_mesin && delete_ai && delete_sensor) {
        res.status(200)
        res.send("Mesin Monitoring berhasil dihapus")
    }
})

router.post('/add', async(req, res) => {
    const find_jenis_mesin = await JenisMesin.findById(req.body.id_jenis_mesin)
    let data = {
        _id: mongoose.Types.ObjectId(),
        id_jenis_mesin: req.body.id_jenis_mesin,
        jenis_mesin: find_jenis_mesin.jenis_mesin,
        kode_mesin: req.body.kode_mesin,
        kode_sensor: req.body.kode_sensor,
        lokasi_mesin: req.body.lokasi_mesin,
        timestamps: req.body.timestamps,
        nama_mesin: req.body.nama_mesin,
    }
    const add_data = new Mesin(data);
    const save_data = await add_data.save();
    if (save_data) {
        let data_sensors = {
            _id: mongoose.Types.ObjectId(),
            id_sensor: data.kode_sensor,
            data_sensor: [{
                _id: mongoose.Types.ObjectId(),
                percepatan: 0,
                kecepatan: 0,
                suhu: 0,
                timestamps: new Date(),
            }],
            latest_data_sensor: [{
                _id: mongoose.Types.ObjectId(),
                percepatan: 0,
                kecepatan: 0,
                suhu: 0,
                timestamps: new Date(),
            }]
        }
        const add_sensor = new Sensors(data_sensors);
        const save_sensor = await add_sensor.save();
        if (save_sensor) {
            let data_ai_results = {
                _id: mongoose.Types.ObjectId(),
                kode_sensor: data.kode_sensor,
                kode_mesin: data.kode_mesin,
                data_ai: [{
                    _id: mongoose.Types.ObjectId(),
                    kondisi_kesehatan: 100,
                    estimasi_kerusakan: "",
                    indikasi_kerusakan: "-",
                    created_at: new Date(),
                }],
                latest_data_ai: [{
                    _id: mongoose.Types.ObjectId(),
                    kondisi_kesehatan: 100,
                    estimasi_kerusakan: "",
                    indikasi_kerusakan: "-",
                    created_at: new Date(),
                }]
            }
            const add_ai = new HasilAi(data_ai_results);
            const save_ai = await add_ai.save();
            if (save_ai) {
                res.status(200)
                res.send("Data Mesin berhasil ditambah")
            }
        }
    }
})

router.post('/search', async(req, res) => {
    let search = req.query.search;

    let search_mesin = await Mesin.find().where({
        $or: [{ kode_mesin: new RegExp(search, "i") }, { nama_mesin: new RegExp(search, "i") }]
    }).exec();
    if (search_mesin) {
        res.status(200);
        res.json(search_mesin)
    }
})


module.exports = router