require('dotenv').config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")


const userRoutes = require("./routes/Contact")

//DB Connection
const mongoose = require('mongoose');
mongoose
.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true})
.then(() =>{
    console.log("DB CONNECTED")
})

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
//Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// //My Routes
app.use("/api",userRoutes)

const port = process.env.PORT || 9000;

app.listen(port,() =>{
    console.log(`app is running at port ${port}`)

})
