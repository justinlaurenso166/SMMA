const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
    // create our express app
const app = express()
const cors = require('cors')

//import route
const MesinRoute = require("./routes/Mesin");
const UserRoute = require("./routes/Login");
const SensorsRoute = require("./routes/Sensors");
const JenisMesinRoute = require("./routes/JenisMesin")

app.use(cors())

// middleware
app.use(bodyParser.json())

app.use('/mesin', MesinRoute)
app.use('/user', UserRoute)
app.use('/sensor', SensorsRoute)
app.use('/jenis_mesin', JenisMesinRoute)

//start server
app.listen(4000, () => {
    console.log("listeniing at port:4000")
})

const uri = "mongodb+srv://justin123:justin123@cluster0.2a3rp.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err))