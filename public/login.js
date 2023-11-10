const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.querySelector('form')
console.log('hola mundo')

form.addEventListener('submit',async (event)=>{
    event.preventDefault()
    const data = await fetch('http://localhost:3000/auth/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:email.value,
            password:password.value
        })
    })
    const user = await data.json()
    document.cookie = 'userId='+user._id
    window.location.href = 'http://localhost:3000/profile'
    console.log('user',user)
})
