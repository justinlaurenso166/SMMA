const axios = require("axios")
const functions = require("./function")

function Dump() {
    // describe("Testing GetJenisMesin()", () => {
    //     it("Mengambil Seluruh data jenis mesin dari database", async() => {
    //         let mock_data = [{
    //             _id: '6235d5889352aa8702ae0505',
    //             jenis_mesin: 'Motor Besar',
    //             spesifikasi: 'Mesin berkapasitas besar untuk kebutuhan yang besar',
    //             kode_jenis_mesin: 'JMSN-001',
    //             part: [],
    //             kerusakan: [
    //                 [{
    //                     _id: "6235d584ed3bb0d06638a227",
    //                     nama: "Patah baling - baling"
    //                 }],
    //             ],
    //             __v: 0
    //         }]
    //         axios.get.mockImplementation(() => Promise.resolve(mock_data));
    //         expect(await functions.getJenisMesin()).toEqual(mock_data)
    //     })
    // })

    // describe('Test   enisMesin()', () => {
    //     it('Hapus Data Jenis Mesin  ', async() => {
    //         let mock_data = "Berhasil menghapus Jenis Mesin"

    //         axios.delete.mockImplementation(() => Promise.resolve(mock_data))
    //         expect(await functions.deleteJenisMesin("JMSN-001")).toEqual(mock_data)
    //     });
    // });


    // describe('Test getListUser()', () => {
    //     it('Mengambil Seluruh data user dari database ', async() => {
    //         let mock_data = {
    //             hak_akses: 1,
    //             jabatan: "Manager",
    //             nama: "Justin ",
    //             password: "admin",
    //             username: "justin123",
    //             _id: "62330845987350e9575e2dc7"
    //         }

    //         axios.get.mockImplementation(() => Promise.resolve(mock_data))
    //         expect(await functions.getListUser()).toEqual(mock_data)
    //     });
    // });

    // describe('Test search()', () => {
    //     describe('Jenis Mesin', () => {
    //         it('Melakukan Test pencaharian untuk data jenis mesin yang sudah terdaftar (Nama)', async() => {
    //             let mock_data = [{
    //                 _id: '6235d5889352aa8702ae0505',
    //                 jenis_mesin: 'Motor Besar',
    //                 spesifikasi: 'Mesin berkapasitas besar untuk kebutuhan yang besar',
    //                 kode_jenis_mesin: 'JMSN-001',
    //                 part: [],
    //                 kerusakan: [
    //                     [{
    //                         _id: "6235d584ed3bb0d06638a227",
    //                         nama: "Patah baling - baling"
    //                     }],
    //                 ],
    //                 __v: 0
    //             }]

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("jenis_mesin", "Motor Besar")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk data jenis mesin yang sudah terdaftar (Kode)', async() => {
    //             let mock_data = [{
    //                 _id: '6235d5889352aa8702ae0505',
    //                 jenis_mesin: 'Motor Besar',
    //                 spesifikasi: 'Mesin berkapasitas besar untuk kebutuhan yang besar',
    //                 kode_jenis_mesin: 'JMSN-001',
    //                 part: [],
    //                 kerusakan: [
    //                     [{
    //                         _id: "6235d584ed3bb0d06638a227",
    //                         nama: "Patah baling - baling"
    //                     }],
    //                 ],
    //                 __v: 0
    //             }]

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("jenis_mesin", "JMSN-001")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Nama)', async() => {
    //             let mock_data = []

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("jenis_mesin", "Motor Sedang")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Kode)', async() => {
    //             let mock_data = []

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("jenis_mesin", "JMSN-002")).toEqual(mock_data)
    //         });
    //     });

    //     describe('Mesin Monitoring', () => {
    //         it('Melakukan Test pencaharian untuk data Monitoring yang sudah terdaftar (Nama)', async() => {
    //             let mock_data = [{
    //                 _id: "6249b220bbc524f50771b940",
    //                 id_jenis_mesin: "JMSN-001",
    //                 kode_mesin: "MSN-001",
    //                 nama_mesin: "Monitoring Mesin Besar",
    //                 jenis_mesin: "Mesin Besar",
    //                 lokasi: "Lantai 2",
    //                 kode_sensor: "SNSR-001",
    //             }]

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("monitoring", "Monitoring Mesin Besar")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk data Monitoring yang sudah terdaftar (Kode)', async() => {
    //             let mock_data = [{
    //                 _id: "6249b220bbc524f50771b940",
    //                 id_jenis_mesin: "JMSN-001",
    //                 kode_mesin: "MSN-001",
    //                 nama_mesin: "Monitoring Mesin Besar",
    //                 jenis_mesin: "Mesin Besar",
    //                 lokasi: "Lantai 2",
    //                 kode_sensor: "SNSR-001",
    //             }]

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("monitoring", "MSN-001")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Nama)', async() => {
    //             let mock_data = []

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("monitoring", "Monitoring Motor Sedang")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk data jenis mesin dengan jenis mesin tidak terdaftar (Kode)', async() => {
    //             let mock_data = []

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("monitoring", "MSN-002")).toEqual(mock_data)
    //         });

    //     });

    //     describe('User', () => {
    //         it('Melakukan Test pencaharian untuk user setting yang sudah terdaftar (Nama)', async() => {
    //             let mock_data = [{
    //                 hak_akses: 2,
    //                 jabatan: "Karyawan",
    //                 nama: "Rico",
    //                 password: "admin",
    //                 username: "TeknisiMesin",
    //                 _id: "62330845987350e9575e2dc7"
    //             }]

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("user", "Rico")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk user setting yang sudah terdaftar (username)', async() => {
    //             let mock_data = [{
    //                 hak_akses: 2,
    //                 jabatan: "Karyawan",
    //                 nama: "Rico",
    //                 password: "admin",
    //                 username: "TeknisiMesin",
    //                 _id: "62330845987350e9575e2dc7"
    //             }]

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("user", "TeknisiMesin")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk user setting dimana user belum terdaftar (Nama)', async() => {
    //             let mock_data = []

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("user", "Riko Santoso")).toEqual(mock_data)
    //         });

    //         it('Melakukan Test pencaharian untuk user setting dimana user belum terdaftar (Username)', async() => {
    //             let mock_data = []

    //             axios.post.mockImplementation(() => Promise.resolve(mock_data))
    //             expect(await functions.search("user", "Rico666")).toEqual(mock_data)
    //         });
    //     });
    // });

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

    describe('Test addKerusakan()', () => {
        it('Menambah data kerusakan pada jenis mesin', () => {
            let mock_data = [{
                _id: "KJMSN-001",
                nama: "Baling baling patah"
            }]

            let new_kerusakan = "Baling baling patah"
            let test_add_kerusakan = functions.addKerusakan(new_kerusakan);

            let expected = Promise.resolve(test_add_kerusakan)
            expected.then(function(e) {
                expect(e).toEqual(mock_data)
            })
        });

        it('Menambah kerusakan pada jenis mesin dengan mengosongkan data', () => {
            let mock_data = []

            let new_kerusakan = ""
            let test_add_kerusakan = functions.addKerusakan(new_kerusakan);

            let expected = Promise.resolve(test_add_kerusakan)
            expected.then(function(e) {
                expect(e).toEqual(mock_data)
            })
        });
    });

    describe('Test removeKerusakan()', () => {
        it('Menghapus kerusakan pada jenis mesin', () => {
            let mock_data = []

            let id_kerusakan = "KJMSN-001"
            let test_remove_kerusakan = functions.removeKerusakan(id_kerusakan);

            let expected = Promise.resolve(test_remove_kerusakan)
            expected.then(function(e) {
                expect(e).toEqual(mock_data)
            })
        });
    });

    describe('Test checkStatus()', () => {
        describe('Mengecek status kesehatan mesin berdasarkan angka yang diberikan', () => {
            it('Input data kondisi mesin 0', () => {
                let mock_data = "Failed"

                let test_check_status = functions.checkStatus(0);

                let expected = Promise.resolve(test_check_status)
                expected.then(function(e) {
                    expect(e).toEqual(mock_data)
                })
            });

            it('Input data kondisi mesin 50', () => {
                let mock_data = "Anomaly"

                let test_check_status = functions.checkStatus(50);

                let expected = Promise.resolve(test_check_status)
                expected.then(function(e) {
                    expect(e).toEqual(mock_data)
                })
            });

            it('Input data kondisi mesin 100', () => {
                let mock_data = "Healthy"

                let test_check_status = functions.checkStatus(100);

                let expected = Promise.resolve(test_check_status)
                expected.then(function(e) {
                    expect(e).toEqual(mock_data)
                })
            });

            it('Input data kondisi mesin selain 0, 50, 100', () => {
                let mock_data = "Unknown"

                let test_check_status = functions.checkStatus(67);

                let expected = Promise.resolve(test_check_status)
                expected.then(function(e) {
                    expect(e).toEqual(mock_data)
                })
            });
        });
    });

    describe('Test deleteMonitoring()', () => {
        it('Hapus Data Jenis Mesin  ', async() => {
            let mock_data = "Berhasil menghapus Monitoring Mesin"

            axios.delete.mockImplementation(() => Promise.resolve(mock_data))
            expect(await functions.deleteMonitoring("MSN-001")).toEqual(mock_data)
        });
    });

    describe("Testing GetJenisMesin()", () => {
        it("Mengambil Seluruh data Monitoring mesin dari database", async() => {
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

    describe('Test addMonitoring()', () => {
        describe('Tambah Data Monitoring Mesin dengan data yang lengkap', () => {
            it('Input semua data jenis mesin secara lengkap', async() => {
                let mock_data = "Berhasil menambahkan Monitoring Mesin Baru";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });
        });

        describe('Tambah Data Monitoring Mesin dengan data yang tidak lengkap untuk data yang di mandatory', () => {
            it('Input data Monitoring mesin dan mengosongkan Kode Mesin ', async() => {
                let mock_data = "Gagal, kode mesin tidak boleh kosong !";

                let mesin_baru = {
                    kode_mesin: "",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });

            it('Input data Monitoring mesin dan mengosongkan Nama mesin ', async() => {
                let mock_data = "Gagal, nama mesin tidak boleh kosong !";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });

            it('Input data Monitoring mesin dan mengosongkan Tipe Mesin ', async() => {
                let mock_data = "Gagal, jenis mesin tidak boleh kosong !";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });

            it('Input data Monitoring mesin dan mengosongkan kode sensor ', async() => {
                let mock_data = "Gagal, kode sensor tidak boleh kosong !";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });
        });

        describe('Tambah Data Monitoring Mesin dengan data yang tidak lengkap untuk data yang tidak di mandatory', () => {
            it('Input data Monitoring mesin dan mengosongkan Lokasi ', async() => {
                let mock_data = "Berhasil menambahkan Monitoring Mesin Baru";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: ""
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });
        });

        describe('Tambah Data Monitoring Mesin dengan Data yang harus unique', () => {
            it('Input Data Monitoring mesin dengan id mesin yang sudah ada (Tidak unique)', async() => {
                let mock_data = "Gagal, Kode jenis mesin sudah tersedia";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });

            it('Input Data Monitoring  mesin dengan Kode mesin yang sudah ada (Tidak unique)', async() => {
                let mock_data = "Gagal, kode sensor tersebut sudah digunakan oleh mesin lain !";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });
        });

        describe('Tambah Data Monitoring Mesin dengan data mesin yang tidak harus unique', () => {
            it('Input Data Monitoring  mesin dengan Kode mesin yang sudah ada (Tidak unique)', async() => {
                let mock_data = "Berhasil menambahkan Monitoring Mesin Baru";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Bubut",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });

            it('Input Data monitoring mesin dengan Mechine Type Monitoring yang sudah ada (Tidak Unique)', async() => {
                let mock_data = "Berhasil menambahkan Monitoring Mesin Baru";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Besar",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });

            it('Input Data monitoring mesin dengan Location Monitoring yang sudah ada (Tidak Unique)', async() => {
                let mock_data = "Berhasil menambahkan Monitoring Mesin Baru";

                let mesin_baru = {
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Besar",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    lokasi: "Lantai 1"
                }

                axios.post.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.addMonitoring(mesin_baru)).toEqual(mock_data)
            });
        });
    });

    describe('Test checkMesinAnomali()', () => {
        describe('Mengecek kondisi status mesin yang berada dibawah 100', () => {
            it('Mengambil seluruh data Monitoring mesin', async() => {
                let mock_data = [{
                    kode_mesin: "MSN-001",
                    nama_mesin: "Mesin Besar",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-001",
                    kondisi_kesehatan: 50,
                    lokasi: "Lantai 1"
                }, {
                    kode_mesin: "MSN-002",
                    nama_mesin: "Mesin Kecil",
                    jenis_mesin: "Mesin Kincir",
                    kode_sensor: "SNSR-002",
                    kondisi_kesehatan: 0,
                    lokasi: "Lantai 2"
                }]

                axios.get.mockImplementation(() => Promise.resolve(mock_data));
                expect(await functions.checkMesinAnomali()).toEqual(mock_data)
            });
        });
    });
}

module.exports = Dump;