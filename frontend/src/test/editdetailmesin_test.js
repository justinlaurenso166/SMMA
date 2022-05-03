const axios = require("axios")
const functions = require("./function")

function TestEditDetailMesin() {
    describe('Test editDetailMesin()', () => {
        it('Mengubah id mesin', async() => {
            let mock_data = "Gagal, Id mesin tidak dapat diubah !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-002",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-001",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah kode sensor pada mesin', async() => {
            let mock_data = "Gagal, kode sensor tidak dapat diubah !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah kode sensor pada mesin', async() => {
            let mock_data = "Gagal, kode sensor tidak dapat diubah !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah id dengan mengosongkannya', async() => {
            let mock_data = "Gagal, id mesin tidak dapat kosong !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah kode sensor dengan mengosongkannya', async() => {
            let mock_data = "Gagal, kode sensor tidak dapat kosong !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah id mesin dengan mengisi data yang sama', async() => {
            let mock_data = "Gagal, Id mesin tidak dapat diubah karena sudah tersedia !"

            let data = {
                kode_mesin: "MSN-002",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah kode sensor dengan mengisi data yang sama', async() => {
            let mock_data = "Gagal, kode sensor tidak dapat diubah karena sudah tersedia !"

            let data = {
                kode_mesin: "MSN-002",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Hyundai",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-001",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah nama mesin yang sudah terdaftar', async() => {
            let mock_data = "Berhasil mengubah Mesin"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Yamada",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah lokasi mesin yang sudah terdaftar', async() => {
            let mock_data = "Berhasil mengubah Mesin"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Yamada",
                lokasi_mesin: "Lantai 5",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah nama mesin dengan mengosongkan datanya', async() => {
            let mock_data = "Gagal, nama mesin tidak boleh kosong !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "",
                lokasi_mesin: "Lantai 1",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah lokasi mesin dengan mengosongkan datanya', async() => {
            let mock_data = "Gagal, lokasi mesin tidak boleh kosong !"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Yamada",
                lokasi_mesin: "",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah nama dengan data yang sudah terdaftar sebelumnya', async() => {
            let mock_data = "Berhasil mengubah Mesin"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Sedang Hyundai",
                lokasi_mesin: "Lantai 5",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });

        it('Mengubah lokasi dengan data yang sudah terdaftar sebelumnya', async() => {
            let mock_data = "Berhasil mengubah mesin"

            let data = {
                kode_mesin: "MSN-001",
                kode_mesin_baru: "MSN-001",
                nama_mesin: "Motor Besar Yamada",
                lokasi_mesin: "Lantai 5",
                kode_sensor: "SNSR-002",
            }

            axios.put.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.editDetailMesin(data)).toEqual(mock_data)
        });
    });
}

module.exports = TestEditDetailMesin;