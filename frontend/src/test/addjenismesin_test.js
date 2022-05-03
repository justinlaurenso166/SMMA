const axios = require("axios")
const functions = require("./function")

function TestAddJenisMesin() {
    describe("Testing AddJenisMesin()", () => {
        it("Tambah Data Jenis Mesin dengan data yang lengkap", async() => {
            let mock_data = "Berhasil menambahkan Jenis Mesin Baru"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
                kerusakan: []
            }

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.addJenisMesin(data)).toEqual(mock_data)
        })

        it("Tambah Data Jenis Mesin dengan data yang tidak lengkap untuk data yang di mandatory (Id)", async() => {
            let mock_data = "Kode jenis mesin tidak boleh kosong"

            let data = {
                kode_jenis_mesin: null,
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
                kerusakan: []
            }

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.addJenisMesin(data)).toEqual(mock_data)
        })

        it("Tambah Data Jenis Mesin dengan data yang tidak lengkap untuk data yang di mandatory (Nama)", async() => {
            let mock_data = "Nama jenis mesin tidak boleh kosong"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                jenis_mesin: null,
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
                kerusakan: []
            }

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.addJenisMesin(data)).toEqual(mock_data)
        })


        it("Tambah Data Jenis Mesin dengan data yang tidak lengkap untuk data yang tidak di mandatory", async() => {
            let mock_data = "Berhasil menambahkan Jenis Mesin Baru"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: null,
                kerusakan: []
            }

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.addJenisMesin(data)).toEqual(mock_data)
        })

        it("Tambah Data Jenis Mesin dengan id mesin yang sudah tersimpan ", async() => {
            let mock_data = "Kode jenis mesin sudah tersedia"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
                kerusakan: []
            }

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.addJenisMesin(data)).toEqual(mock_data)
        })

        it("Tambah Data Jenis Mesin dengan data mesin (Nama dan Deskripsi) yang sudah tersimpan  ", async() => {
            let mock_data = "Berhasil menambahkan Jenis Mesin Baru"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
                kerusakan: []
            }

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.addJenisMesin(data)).toEqual(mock_data)
        })
    })
}

module.exports = TestAddJenisMesin;