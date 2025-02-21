import bcrypt from 'bcrypt'
import modeloDeUsuario from '../modelos/modeloDeUsuario.js'
import mongoose from 'mongoose';
import cors from 'cors';

 const conexionDB = async () => {
 
  try {
    await mongoose.connect('mongodb+srv://lemat:lemat2213@cluster0.xu4py.mongodb.net/trabajo-wp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};



export const controladorDeRegistro = async (req, res) => {
    

    try {
        const corsOptions = {
            origin: '*',  
            methods: ['GET', 'POST', 'OPTIONS'], 
            allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],  
          };
          
          app.use(cors(corsOptions)); 
          app.options('*', cors(corsOptions));
        
        console.log('medio trol')
    const { email, password } = req.body;
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
      await conexionDB();
      await nuevoUsuario.save();
      res.status(201).json(nuevoUsuario);  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde. El error es:' + error
       });  
    }
  };


   