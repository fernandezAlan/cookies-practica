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


//rutas
app.get('/', (req, res) => {
    const userId = req.cookies?.userId;
  if(userId){
    res.redirect('http://localhost:3000/profile')
  }else{
    res.redirect('http://localhost:3000/login')
  }
})

app.get('/login',(req,res)=>{
    res.render('pages/login')
})

app.post('/auth/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email:email})
    console.log('user:',user)
    if(user && user.password === password){
        // Crear una cookie persistente que expira en 30 días
        //res.cookie('userId', '123', { expires: new Date(Date.now() + 30 * 24 * 3600 * 1000) });

        // Crear una cookie de sesión
        res.cookie('userId', user._id);
        res.status(200).json(user)
    }
    else{
        res.status(400).end()
    }
})

app.get('/auth/logout', (req, res) => {
    // Elimina la cookie de sesión
    res.clearCookie('userId'); 
    res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión 
  });

app.get('/profile',async (req,res)=>{
    const userId = req.cookies.userId
    const user = await User.findById(userId)
    res.render('pages/profile',{user:user})
})

app.post('/auth/register',async (req,res)=>{
    const user = await User.create(req.body)
    res.json(user)
})

app.listen(port, () => {
    mongoose.connect('mongodb://127.0.0.1:27017/clase32').then(()=>{
        console.log('database connected')
        console.log(`Example app listening on port ${port}`)
    })
})