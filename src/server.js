import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';  // Usamos import aquí en vez de require
import { controladorDeRegistro } from './controladores/controladorDeRegistro.js';
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

const corsOptions = {
  origin: 'https://trabajo-wp.vercel.app',  // Cambia al puerto correcto de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', controladorDeRegistro);

const puerto = process.env.PORT || 7000;  

app.listen(puerto, () => {
  console.log(`Servidor funcionando en http://localhost:${puerto}`);
});
