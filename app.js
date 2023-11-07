const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const User = require('./models/user')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.set('view engine', 'ejs');




app.listen(port, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/clase32').then(()=>{
        console.log('database connected')
        console.log(`Example app listening on port ${port}`)
    })
})