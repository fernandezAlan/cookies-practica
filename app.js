const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const User = require('./models/user')
const mongoose = require('mongoose')
const path = require('path')
const cookieParser = require('cookie-parser')
const encrypt = require('./utils/auth')

//midlewares
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    const userId = req.cookies.userId
    if(userId){
        res.redirect('/profile')
    }else{
        res.redirect('/login')
    }
})

app.get('/profile',async (req,res)=>{
    const userId = req.cookies.userId
    const user = await User.findById(userId)
    res.render('pages/profile',{user:user})
})

app.get('/login',(req,res)=>{
    res.render('pages/login')
})
app.post('/auth/register',async (req,res)=>{
    const password = req.body.password
    const hashedPassword = encrypt.encryptPassword(password)
    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword.hash,
        salt: hashedPassword.salt
    })
    res.status(201).json(user)

})
app.post('/auth/login',async (req,res)=>{
    try{
      
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({email:email})
       
        const passwordsMatch = encrypt.comparePasswords(password,user.password,user.salt)
        if(user && passwordsMatch){
            //const userId = JSON.stringify(user._id)
            //console.log('userId',userId)
            //res.cookie('userId',userId)
            res.status(200).json(user)
        }
    }catch(error){
        res.status(400).end()
    }


})




app.listen(port, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/clase32').then(()=>{
        console.log('database connected')
        console.log(`Example app listening on port ${port}`)
    })
})