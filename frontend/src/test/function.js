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
    addJenisMesin: async function(data) {
        let jenis_mesin_baru = {
            kode_jenis_mesin: data.kode_jenis_mesin,
            jenis_mesin: data.jenis_mesin,
            spesifikasi: data.spesifikasi,
            kerusakan: data.kerusakan,
        }
        try {
            let res = await axios.post(URL + `/jenis_mesin/tambah`, jenis_mesin_baru)
            console.log(res)
            return res
        } catch (error) {
            if (error.response) {
                // console.log(error.response.data)
                return error.response.data;
            }
        }
    },
    editJenisMesin: async function(data) {
        let update_mesin = {
                kode_jenis_mesin: data.kode_jenis_mesin_baru,
                jenis_mesin: data.jenis_mesin,
                spesifikasi: data.spesifikasi,
                kerusakan: [{
                    _id: new ObjectId().toString(),
                    nama: "Patah baling"
                }],
            }
            // console.log(jenis_mesin_baru)
        try {
            let res = await axios.put(URL + `/jenis_mesin/edit/${data.kode_jenis_mesin}`, update_mesin)
            console.log(res)
            return res
        } catch (error) {
            if (error.response) {
                // console.log(error.response.data)
                return error.response.data;
            }
        }
    },
    editDetailMesin: async function(data) {
        let update_detail_mesin = {
            kode_mesin: data.kode_mesin_baru,
            nama_mesin: data.nama_mesin,
            kode_sensor: data.kode_sensor,
            lokasi_mesin: data.lokasi_mesin,
        }
        try {
            let res = await axios.put(URL + `/mesin/edit/${data.kode_mesin}`, update_detail_mesin)
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
    getListUser: async function() {
        try {
            let res = await axios.get(URL + '/user/all')
            console.log(res)
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    },
    search: async function(type, search_input) {
        try {
            let res = axios.post(URL + `/${type}/search?search=${search_input}`);
            console.log(res)
            return res;
        } catch (error) {
            console.log(error)
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
    addKerusakan: async function(new_kerusakan) {
        let daftar_kerusakan = [];
        if (new_kerusakan !== '') {
            let new_data = {
                _id: "KJMSN-001",
                nama: new_kerusakan,
            }
            daftar_kerusakan.push(new_data);
        } else {
            daftar_kerusakan = [];
        }

        return daftar_kerusakan;
    },
    removeKerusakan: async function(id) {
        let daftar_kerusakan = [{
            _id: "KJMSN-001",
            nama: "Baling baling patah"
        }];

        daftar_kerusakan = daftar_kerusakan.filter((item) => item._id !== id)

        return daftar_kerusakan;
    },
    checkStatus: async function(kondisi) {
        let status;
        if (kondisi === 100) {
            status = "Healthy"
        } else if (kondisi === 50) {
            status = "Anomaly"
        } else if (kondisi === 0) {
            status = "Failed"
        } else {
            status = "Unknown"
        }
        console.log(status)
        return status
    },
    deleteMonitoring: async function(id) {
        try {
            let res = await axios.delete(URL + `/mesin/delete/${id}`)
            console.log(res)
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    },
    getAllMonitoring: async function() {
        try {
            let res = await axios.get(URL + '/mesin/all')
            console.log(res)
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    },
    addMonitoring: async function(data) {
        let mesin_baru = {
            kode_mesin: data.kode_mesin,
            nama_mesin: data.nama_mesin,
            jenis_mesin: data.jenis_mesin,
            kode_sensor: data.kode_sensor,
            lokasi: data.lokasi,
        }
        try {
            let res = await axios.post(URL + `/mesin/add`, mesin_baru)
            console.log(res)
            return res
        } catch (error) {
            if (error.response) {
                // console.log(error.response.data)
                return error.response.data;
            }
        }
    },
    checkMesinAnomali: async function() {
        try {
            let res = [];
            let data = await axios.get(URL + '/mesin/all')
            res = data.filter(
                (item) => item.kondisi_kesehatan <= 50
            );
            return res;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
        }
    }
}
module.exports = functions