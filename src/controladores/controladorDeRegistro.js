import bcrypt from 'bcrypt'
import modeloDeUsuario from '../modelos/modeloDeUsuario.js'

export const controladorDeRegistro = async (req, res) => {
    try {
    const { email, contraseña } = req.body;
    if(!email){
        res.render('no reconoce email!')
    }
    if(!contraseña){
        res.render('no reconoce contraseña!')
    }
      const contraseñaHasheada = await bcrypt.hash(contraseña, 10);
      const nuevoUsuario = new modeloDeUsuario({
        email,
        contraseña: contraseñaHasheada,
        emailVerify: false
      });
      await nuevoUsuario.save();
      res.status(201).json(nuevoUsuario);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde. El error es:' + error + ' La contraseña es:' + contraseña + ' El Email es:' + email
       });  
    }
  };


   