jest.useFakeTimers();
const request = require("supertest")
const axios = require("axios")
const functions = require("./function")

jest.mock("axios")

describe("Test Jenis Mesin", () => {
    it("Data Jenis Mesin Berhasil diambil", async() => {
        let mock_data = [{
            _id: '6235d5889352aa8702ae0505',
            jenis_mesin: 'Motor Besarr',
            spesifikasi: 'Lorem ipsum lorem ipsum Lorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsumLorem ipsum lorem ipsum',
            kode_jenis_mesin: 'JMSN-001',
            part: [],
            kerusakan: [
                [{
                    _id: "6235d584ed3bb0d06638a227",
                    nama: "a"
                }],
                [{
                    _id: "6235d585ed3bb0d06638a228",
                    nama: "b"
                }],
                [{
                    _id: "6235d586ed3bb0d06638a229",
                    nama: "c"
                }]
            ],
            __v: 0
        }]
        axios.get.mockImplementation(() => Promise.resolve(mock_data));
        expect(await functions.getJenisMesin()).toEqual(mock_data)
    })

    it("Id yang dimasukan belum pernah didaftarkan", async() => {
        let mock_data = "Berhasil menambahkan Jenis Mesin Baru"

        axios.post.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.addJenisMesin("JMSN-002")).toEqual(mock_data)
    })

    it("Id yang dimasukan sudah pernah didaftarkan", async() => {
        let mock_data = "Kode jenis mesin sudah tersedia"

        axios.post.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.addJenisMesin("JMSN-001")).toEqual(mock_data)
    })

    it("Data pengisian jenis mesin lengkap", async() => {
        let mock_data = "Berhasil menambahkan Jenis Mesin Baru"

        axios.post.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.addJenisMesin("JMSN-002")).toEqual(mock_data)
    })


    it("Data Jenis Mesin Berhasil dihapus", async() => {
        let mock_data = "Berhasil menghapus Jenis Mesin";

        axios.delete.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.deleteJenisMesin("6235d5889352aa8702ae0505")).toEqual(mock_data)
    })

    it("Edit Jenis Mesin", async() => {
        let mock_data = "Berhasil mengubah data jenis mesin";

        axios.put.mockImplementation(() => Promise.resolve(mock_data))
        expect(await functions.editJenisMesin("6235d5889352aa8702ae0505")).toEqual(mock_data)
    })
})















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