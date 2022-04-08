const request = require("supertest")
const axios = require("axios")
const { login } = require("./function")
const mockAxios = require("axios")

// jest.mock('./function')
jest.mock("axios")
mockAxios.get.mockImplementation(() => Promise.resolve({ status: 200 }))

describe("login test", () => {
    test("test api /login", async() => {
        // const response = await axios.post("http://localhost:4000/user/login", { username: "admin", password: "admin" })
        // expect(response.status).toBe(200);
        // expect.assertions(1)
        const data = await login({ username: "admin", password: "admin" });
        expect(data).toBe(true)
    })

})

// describe("jenis mesin test", () => {
//     it("test api /jenis_mesin/all", async() => {
//         const response = await axios.get("http://localhost:4000/jenis_mesin/all")
//         expect(response.status).toBe(200);
//     })
// })