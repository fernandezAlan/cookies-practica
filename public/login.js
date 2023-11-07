const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.querySelector('form')
console.log('hola mundo')

form.addEventListener('submit',(event)=>{
    event.preventDefault()
    fetch('http://localhost:3000/auth/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value
        })
    }).then((data)=>{
        console.log('data',document.cookie)
        //window.location.href= "http://localhost:3000/profile"
    }).catch((error)=>{
        console.error('error-login',error)
    })
})