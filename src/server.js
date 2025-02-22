import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; 
import { controladorDeLogeo, controladorDeOlvidasteLaContrasena, controladorDeRegistro, nuevaContrasena, verificarElTokenDeEmail } from './controladores/controladorDeRegistro-Logeo.js';
import ENVIROMENT from './configuraciones/enviroment.js';

const app = express();
app.use(express.json());

const conexionDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://lemat:lemat2213@cluster0.xu4py.mongodb.net/trabajo-wp');
      console.log('Conexión a la base de datos exitosa');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
};
conexionDB();

app.use(express.urlencoded({ extended: true }));

app.use(cors());  

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', controladorDeRegistro);
app.post('/logearse', controladorDeLogeo);
app.post('/olvidarContrasena' , controladorDeOlvidasteLaContrasena)
app.post('/nuevaContrasena' , nuevaContrasena)
app.get('verificarEmail/:tokenDeVerificacion' , verificarElTokenDeEmail)

const puerto = process.env.PORT || 7000;  

app.listen(puerto, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
