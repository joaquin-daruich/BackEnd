import bcrypt from 'bcrypt'
import modeloDeUsuario from '../modelos/modeloDeUsuario.js'

export const controladorDeRegistro = async (req, res) => {
    try{
   
       const  {email, contraseña} =  req.body
       const contraseñaHasheada = await bcrypt.hash(contraseña, 10 )
       const nuevoUsuario = new modeloDeUsuario ({
        email,
        contraseña: contraseñaHasheada,
        emailVerify: false
     })
     await nuevoUsuario.save()
       
     res.json(nuevoUsuario);  
    }
     catch(error){
        console.error(error)
     }


   }