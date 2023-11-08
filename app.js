const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const User = require('./models/user')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')

//middlewares


//rutas
app.get('/', (req, res) => {
})

app.get('/login',(req,res)=>{
 
})

app.post('/auth/login',async (req,res)=>{})

app.get('/auth/logout', (req, res) => {});

app.get('/profile',async (req,res)=>{})

app.post('/auth/register',async (req,res)=>{
})

app.listen(port, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/clase32').then(()=>{
        console.log('database connected')
        console.log(`Example app listening on port ${port}`)
    })
})