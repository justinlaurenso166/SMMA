const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
    // create our express app
const app = express()

//import route
const MesinRoute = require("./routes/Mesin");
const UserRoute = require("./routes/Login");
const SensorsRoute = require("./routes/Sensors");

// middleware
app.use(bodyParser.json())
    // routes
app.get("/", (req, res) => {
    res.send("my home page dey show sha")
})

app.use('/mesin', MesinRoute)
app.use('/user', UserRoute)
app.use('/sensor', SensorsRoute)
    //start server
app.listen(4000, () => {
    console.log("listeniing at port:4000")
})

// const uri = "mongodb+srv://justin:justin123@cluster0.mow2l.mongodb.net/monitoring";
const uri = "mongodb+srv://justin123:justin123@cluster0.2a3rp.mongodb.net/mydb?retryWrites=true&w=majority";
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('MongoDB Connected')
    })
    .catch(err => console.log(err))