import bcrypt from 'bcrypt'
import modeloDeUsuario from '../modelos/modeloDeUsuario.js'

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
        conexionDB();
    const { email, contraseña } = req.body;
    if(!email || !contraseña){
        console.log(email)
        console.log(contraseña)
        res.json('no reconoce email! o contraseña!!!!')
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
      res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde. El error es:' + error
       });  
    }
  };


   