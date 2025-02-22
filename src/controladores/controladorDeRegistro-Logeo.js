import bcrypt from 'bcrypt'
import modeloDeUsuario from '../modelos/modeloDeUsuario.js'
import mongoose from 'mongoose';
import express from 'express'
import ENVIROMENT from '../configuraciones/enviroment.js';
import { mandarMail } from '../utils/mandarMail.js';
import jwt from 'jsonwebtoken'
import { ResponseBuilder } from '../builders/responseBuilder.js';



const app = express();

export const controladorDeRegistro = async (req, res) => {
    

    try {

        
    const { email, password } = req.body;
    const emailExistente = await modeloDeUsuario.findOne({ email });
    if (emailExistente) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
   console.log(req.body)
    if(!email || !password){
        console.log(email)
        console.log(password)
        res.json('no reconoce email! o contraseña!!!!')
    }
  
      const contraseñaHasheada = await bcrypt.hash(password, 10);
      const verificacionToken = jwt.sign({email: email} ,  ENVIROMENT.JWT_SECRET, {
        expiresIn: '1d'
     })
     const url_verificacion = `https://trabajo-wp-back-end.vercel.app/verificarEmail/${verificacionToken}`
     
      const nuevoUsuario = new modeloDeUsuario({
        email,
        contraseña: contraseñaHasheada,
        emailVerify: false
      });
      await mandarMail({
        to: email,
        subject: 'Valida tu correo electronico!',
        html: `
        <h1>Holaaa , esta es la verificacion de correo electronico
        <a style= 'background-color: 'black' ; color: 'white'; padding: 5px; border-radius: 5px;'
        href ="${url_verificacion}"
        >Hace CLICK para verificar! </a>
        ` 

    })
     
      await nuevoUsuario.save();
      res.status(201).json(nuevoUsuario);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde. El error es:' + error
       });  
    }
  };

  export const verificarElTokenDeEmail = async (req, res ) => {
    
    try{
        const {tokenDeVerificacion} = req.params
        if(!tokenDeVerificacion){
            const response = new ResponseBuilder().setOk(false)
            .setStatus()
            .setPayload({
                detail: 'Falta enviar token!!! :)'
            })
            .build()
            return res.json(response)
        }
        const decoded = jwt.verify(tokenDeVerificacion, ENVIROMENT.JWT_SECRET)
        const usuario = await modeloDeUsuario.findOne({email: decoded.email})
        if(!usuario){

        }
        if(usuario.emailVerify){
            
        }

         usuario.emailVerify = true

        await usuario.save()
        const response = new ResponseBuilder()
        .setOk(true)
        .setMessage('Email verificado con Exito!!!')
        .setStatus(200)
        .setPayload({
            message: "Usuario validadooo"
        })
        res.json(response)
    }
    catch(error){
console.error(error)
    }
}


  export const controladorDeLogeo = async (req, res) => {

    try {        
    const { email, password } = req.body;
    const usuario = await modeloDeUsuario.findOne({ email });
    if(!usuario){
      const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(404)
      .setMessage('Email no encontrado')
      .setPayload({
          detail: 'Disculpa ese email no fue encontrado en nuestra base de datos'
      })
      .build()
    return  res.json(response)}
    if(!usuario.verificacionDeEmail) {
      const response = new ResponseBuilder()
      .setOk(false)
      .setStatus(403)
      .setMessage('Email no verificado')
      .setPayload({
          detail: 'El Email tiene que estar verificado para poder logear'
      })
      .build()
      return res.json(response)
     } 
    const isValidPassword = await bcrypt.compare(password, usuario.contraseña)
    if(!isValidPassword){
     const response = new ResponseBuilder()
     .setOk(false)
     .setStatus(401)
     .setMessage('Contraseña equivocada')
     .setPayload({
         detail: 'Esa no es la contraseña correcta '
     })
     .build()
     return res.json(response)}
     const token = jwt.sign({email: user.email, id: user.id , role: user.role} , ENVIROMENT.JWT_SECRET , {expiresIn: '1d'})
     const response = new ResponseBuilder()
     .setOk(true)
     .setStatus(200)
     .setMessage('Usuario Logeado Con exito :)') 
     .setPayload({
      token: token ,
          email: email,
         }
     )
     .build()
     return res.json(response)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde. El error es:' + error
       });  
    }
  };

export const controladorDeOlvidasteLaContrasena = async (req , res) => {
  try{
      const {email} = req.body
      if(!email){
          const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(404)
          .setMessage('ERROR NO SE ENCONTRO EL EMAIL:' + email ) 
          .setPayload({
               detail: 'No se encontro un email registrado con ese nombre en nuestra base de datos'
          })
          .build()
          return res.json(response)
      }
      const usuario = await modeloDeUsuario.findOne({ email });
      if(!usuario){
          const response = new ResponseBuilder()
          .setOk(false)
          .setStatus(404)
          .setMessage('No se encontro un usuario que corresponda con ese email') 
          .setPayload({
               detail: 'No se encontro un email registrado con ese nombre en nuestra base de datos'
          })
          .build()
          return res.json(response)
      }
      const resetToken = jwt.sign({email: user.email} , ENVIROMENT.JWT_SECRET , {
          expiresIn:'1h'
      })
      const resetURL = `https://trabajo-wp.vercel.app/nuevaContrasena/${resetToken}`
      sendEmail({
          to: user.email,
          subject: 'RESTABLECE TU CONTRSEÑA',
          html: `
          <h1> Has solicitado reestablecer tu contraseña </h1>
          <p> Hace CLICK en el enlace de abajo para reestablecer tu contraseña </p>
          <a href=${resetURL}>Reestablecer</a>
          `

      })
      const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage('El correo se envio con exito') 
      .setPayload({
           detail: 'Se envio un correo con las intrucciones para reestablecer tu contraseña'
          })
      .build()
      return res.json(response)
  }
  catch(error){
      console.error(error)
  }
}


export const nuevaContrasena = async ( req , res) => {
  try{
      const {password} = req.body
      const {token} = req.body
      const email = jwt.decode(token).email 
      const contraseñaHasheada = await bcrypt.hash(password, 10 )
      const usuario = await modeloDeUsuario.findOne( email );
      usuario.contraseña = contraseñaHasheada
      await usuario.save()
      const response = new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setMessage('La contraseña ha sido cambiado con exito') 
      .setPayload({
           detail: 'Nueva Contraseña lista'
          })
      .build()
      return res.json(response)
      
  }
  catch(error) {
      console.error(error)
  }   
}