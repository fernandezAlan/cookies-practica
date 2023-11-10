//const bcrypt = require('bcryptjs') 
/*
const encryptPassword = async (password)=>{
    try{
        const salt = await bcrypt.genSaltSync(12)
        const hash = await bcrypt.hashSync(salt,password)
        return hash
    }
    catch(error){
        console.log('error:',error)
    }
}
*/

const crypto = require('crypto')

const encryptPassword = (password)=>{
    const salt = crypto.randomBytes(16).toString('hex'); // aleatorio
    const hash = crypto.pbkdf2Sync(password, salt,
        1000, 64, `sha512`).toString(`hex`);
        return {
            salt: salt,
            hash: hash
        }
}
/*
password: contraseña en bruto enviada para loguearse
hash: contraseña encriptada de la base de datos
salt: salt que se utilizo para encriptar la contraseña
*/
const comparePasswords = (password,hash,salt)=>{
    const newHash = crypto.pbkdf2Sync(password,salt,1000, 64, `sha512`).toString(`hex`)
    return newHash === hash
}

module.exports = {
    encryptPassword:encryptPassword,
    comparePasswords: comparePasswords
}