import bcrypt from 'bcrypt'
import modeloDeUsuario from '../modelos/modeloDeUsuario.js'
import mongoose from 'mongoose';
import express from 'express'



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
      const nuevoUsuario = new modeloDeUsuario({
        email,
        contraseña: contraseñaHasheada,
        emailVerify: false
      });
     
      await nuevoUsuario.save();
      res.status(201).json(nuevoUsuario);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde. El error es:' + error
       });  
    }
  };


   