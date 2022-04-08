const axios = require("axios")
const URL = "http://localhost:4000"
let data;

async function login() {
    // const headers = {
    //     'Content-Type': 'text/plain'
    // };
    // // let data = {
    // //     username: "admin",
    // //     password: "admin",
    // // }
    try {
        await axios.post(`${URL}/user/login`, data).then((res) => {
            if (res.status === 200) {
                return true;
            }
        })
    } catch (error) {
        if (error.response) {
            return false;
        }
    }
}

console.log(login)

// module.exports = { login }