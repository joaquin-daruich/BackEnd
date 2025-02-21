import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { controladorDeRegistro } from './controladores/controladorDeRegistro.js';
import { ENVIROMENT } from '../enviroment.js';

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
app.use(  cors({
    origin: ENVIROMENT.URL_FRONTEND
})
)


const PUERTO = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', controladorDeRegistro);

app.listen(PUERTO, () => {
  console.log('puertoFuncionando');
});