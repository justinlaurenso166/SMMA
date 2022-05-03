const axios = require("axios")
const functions = require("./function")

function TestEditJenisMesin() {
    describe('Test editJenisMesin()', () => {

        it('Mengubah id jenis mesin', async() => {
            let mock_data = "Gagal, Id mesin tidak dapat diubah !"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-002",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah id dengan mengosongkan data id', async() => {
            let mock_data = "Gagal, Id mesin harus diisi"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah id jenis mesin dengan id yang sebelumnya sudah terdaftar', async() => {
            let mock_data = "Gagal, Id mesin tidak dapat diubah karena sudah tersedia !"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-002",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah deskripsi dengan mengosongkan data Deskripsi', async() => {
            let mock_data = "Berhasil mengubah Jenis Mesin"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: "",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah data deskripsi jenis mesin', async() => {
            let mock_data = "Berhasil mengubah Jenis Mesin"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas sedang untuk kegiatan yang lebih efisien",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah deskripsi mesin dengan data yang sebelumnya terdaftar', async() => {
            let mock_data = "Berhasil mengubah Jenis Mesin"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-001",
                jenis_mesin: "Motor Besar",
                spesifikasi: "Mesin berkapasitas sedang untuk kegiatan yang lebih efisien",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah data nama jenis mesin', async() => {
            let mock_data = "Berhasil mengubah Jenis Mesin"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-001",
                jenis_mesin: "Motor Sangat Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah nama dengan mengosongkan data Nama', async() => {
            let mock_data = "Nama jenis mesin harus diisi !"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-001",
                jenis_mesin: "",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });

        it('Mengubah nama mesin dengan nama yang sudah terdaftar sebelumnya', async() => {
            let mock_data = "Berhasil mengubah Jenis Mesin"

            let data = {
                kode_jenis_mesin: "JMSN-001",
                kode_jenis_mesin_baru: "JMSN-001",
                jenis_mesin: "Motor Sedikit Besar",
                spesifikasi: "Mesin berkapasitas besar untuk kebutuhan yang besar",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editJenisMesin(data)).toEqual(mock_data)
        });
    });

}

module.exports = TestEditJenisMesin;