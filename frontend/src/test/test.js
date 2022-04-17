jest.useFakeTimers();
const request = require("supertest")
const axios = require("axios")
const functions = require("./function")

jest.mock("axios")

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

describe("Testing GetJenisMesin()", () => {
    it("Mengambil Seluruh data jenis mesin dari database", async() => {
        let mock_data = [{
            _id: '6235d5889352aa8702ae0505',
            jenis_mesin: 'Motor Besar',
            spesifikasi: 'Mesin berkapasitas besar untuk kebutuhan yang besar',
            kode_jenis_mesin: 'JMSN-001',
            part: [],
            kerusakan: [
                [{
                    _id: "6235d584ed3bb0d06638a227",
                    nama: "Patah baling - baling"
                }],
            ],
            __v: 0
        }]
        axios.get.mockImplementation(() => Promise.resolve(mock_data));
        expect(await functions.getJenisMesin()).toEqual(mock_data)
    })
})

describe('Test DeleteJenisMesin()', () => {
    it('Hapus Data Jenis Mesin  ', async() => {
        let mock_data = "Berhasil menghapus Jenis Mesin"

        axios.delete.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.deleteJenisMesin("JMSN-001")).toEqual(mock_data)
    });
});

describe('Test getListUser()', () => {
    it('Mengambil Seluruh data user dari database ', async() => {
        let mock_data = {
            hak_akses: 1,
            jabatan: "Manager",
            nama: "Justin ",
            password: "admin",
            username: "justin123",
            _id: "62330845987350e9575e2dc7"
        }

        axios.get.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.getListUser()).toEqual(mock_data)
    });
});

describe('Test search()', () => {
    describe('Jenis Mesin', () => {
        it('Melakukan Test pencaharian untuk data jenis mesin yang sudah terdaftar (Nama)', async() => {
            let mock_data = [{
                _id: '6235d5889352aa8702ae0505',
                jenis_mesin: 'Motor Besar',
                spesifikasi: 'Mesin berkapasitas besar untuk kebutuhan yang besar',
                kode_jenis_mesin: 'JMSN-001',
                part: [],
                kerusakan: [
                    [{
                        _id: "6235d584ed3bb0d06638a227",
                        nama: "Patah baling - baling"
                    }],
                ],
                __v: 0
            }]

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("jenis_mesin", "Motor Besar")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk data jenis mesin yang sudah terdaftar (Kode)', async() => {
            let mock_data = [{
                _id: '6235d5889352aa8702ae0505',
                jenis_mesin: 'Motor Besar',
                spesifikasi: 'Mesin berkapasitas besar untuk kebutuhan yang besar',
                kode_jenis_mesin: 'JMSN-001',
                part: [],
                kerusakan: [
                    [{
                        _id: "6235d584ed3bb0d06638a227",
                        nama: "Patah baling - baling"
                    }],
                ],
                __v: 0
            }]

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("jenis_mesin", "JMSN-001")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Nama)', async() => {
            let mock_data = []

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("jenis_mesin", "Motor Sedang")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Kode)', async() => {
            let mock_data = []

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("jenis_mesin", "JMSN-002")).toEqual(mock_data)
        });
    });

    describe('Mesin Monitoring', () => {
        it('Melakukan Test pencaharian untuk data Monitoring yang sudah terdaftar (Nama)', async() => {
            let mock_data = [{
                _id: "6249b220bbc524f50771b940",
                id_jenis_mesin: "JMSN-001",
                kode_mesin: "MSN-001",
                nama_mesin: "Monitoring Mesin Besar",
                jenis_mesin: "Mesin Besar",
                lokasi: "Lantai 2",
                kode_sensor: "SNSR-001",
            }]

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("monitoring", "Monitoring Mesin Besar")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk data Monitoring yang sudah terdaftar (Kode)', async() => {
            let mock_data = [{
                _id: "6249b220bbc524f50771b940",
                id_jenis_mesin: "JMSN-001",
                kode_mesin: "MSN-001",
                nama_mesin: "Monitoring Mesin Besar",
                jenis_mesin: "Mesin Besar",
                lokasi: "Lantai 2",
                kode_sensor: "SNSR-001",
            }]

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("monitoring", "MSN-001")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Nama)', async() => {
            let mock_data = []

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("monitoring", "Monitoring Motor Sedang")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Kode)', async() => {
            let mock_data = []

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("monitoring", "MSN-002")).toEqual(mock_data)
        });

    });

    describe('User', () => {
        it('Melakukan Test pencaharian untuk user setting yang sudah terdaftar (Nama)', async() => {
            let mock_data = [{
                hak_akses: 2,
                jabatan: "Karyawan",
                nama: "Rico",
                password: "admin",
                username: "TeknisiMesin",
                _id: "62330845987350e9575e2dc7"
            }]

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("user", "Rico")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk user setting yang sudah terdaftar (username)', async() => {
            let mock_data = [{
                hak_akses: 2,
                jabatan: "Karyawan",
                nama: "Rico",
                password: "admin",
                username: "TeknisiMesin",
                _id: "62330845987350e9575e2dc7"
            }]

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("user", "TeknisiMesin")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk user setting dimana user belum terdaftar (Nama)', async() => {
            let mock_data = []

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("user", "Riko Santoso")).toEqual(mock_data)
        });

        it('Melakukan Test pencaharian untuk user setting dimana user belum terdaftar (Username)', async() => {
            let mock_data = []

            axios.post.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.search("user", "Rico666")).toEqual(mock_data)
        });
    });
});














// describe("Login Test", () => {
//     it("Login success must return user data", async() => {
//         let mock_data = [{
//             _id: "62330845987350e9575e2dc7",
//             username: "admin",
//             password: "admin",
//             hak_akses: 1,
//             nama: "Justin Laureso",
//             jabatan: "Manager",
//         }]
//         axios.post.mockImplementation(() => Promise.resolve(mock_data));
//         expect(await functions.login("admin", "admin")).toEqual(mock_data)
//     })

//     it("Login error if username or password is not correct", async() => {
//         let mock_data = "User not found!"

//         axios.post.mockImplementation(() => Promise.resolve(mock_data));
//         expect(await functions.login("adminnnn", "admin")).toEqual(mock_data)
//     })
// })