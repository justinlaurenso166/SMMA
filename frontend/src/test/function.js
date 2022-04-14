const axios = require("axios")
const URL = "http://localhost:4000"
const ObjectId = require("bson-objectid")

const functions = {
    getJenisMesin: async function() {
        try {
            let res = await axios.get(URL + '/jenis_mesin/all')
            console.log(res)
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    },
    addJenisMesin: async function(kode_jenis_mesin) {
        let jenis_mesin_baru = {
                kode_jenis_mesin: kode_jenis_mesin,
                jenis_mesin: "Motor Kecil",
                spesifikasi: "Lorem ipsum lorem ipsum Lorem ipsum lorem",
                kerusakan: [{
                    _id: new ObjectId().toString(),
                    nama: "Patah baling"
                }],
            }
            // console.log(jenis_mesin_baru)
        try {
            let res = await axios.post(`/api/jenis_mesin/tambah`, jenis_mesin_baru)
                // console.log(res)
            return res
        } catch (error) {
            if (error.response) {
                // console.log(error.response.data)
                return error.response.data;
            }
        }
    },
    editJenisMesin: async function(kode_jenis_mesin) {
        let update_mesin = {
                kode_jenis_mesin: kode_jenis_mesin,
                jenis_mesin: "Motor Sedang",
                spesifikasi: "Lorem ipsum lorem ipsum Lorem ipsum lorem",
                kerusakan: [{
                    _id: new ObjectId().toString(),
                    nama: "Patah baling"
                }],
            }
            // console.log(jenis_mesin_baru)
        try {
            let res = await axios.put(URL + `/jenis_mesin/edit/${kode_jenis_mesin}`, update_mesin)
            console.log(res)
            return res
        } catch (error) {
            if (error.response) {
                // console.log(error.response.data)
                return error.response.data;
            }
        }
    },
    deleteJenisMesin: async function(id_jenis_mesin) {
        try {
            let res = await axios.delete(URL + `/jenis_mesin/delete/${id_jenis_mesin}`)
            console.log(res)
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    },
    login: async function(username, password) {
        let data = {
            username: username,
            password: password
        }
        try {
            let res = await axios.post(URL + "/user/login", data);
            // console.log(res)
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    },
}
module.exports = functions