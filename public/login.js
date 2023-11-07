const email = document.getElementById('email')
const password = document.getElementById('password')
const form = document.querySelector('form')

form.addEventListener('submit',async (event)=>{
    event.preventDefault()
    try{
        const data = await fetch('http://localhost:3000/auth/login',{
            method:'POST',
            body:JSON.stringify({
                email:email.value,
                password:password.value
            }),
            headers:{
                "Content-Type": "application/json",
            },
             credentials: 'include',
        })
        console.log('data',data)
        const user = await data.json()
        console.log('user',user)
        document.cookie = `userId=${user._id}`;
        window.location.href = 'http://localhost:3000/profile'
    }catch(error){

    }
  

})
