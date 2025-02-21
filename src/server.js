import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { controladorDeRegistro } from './controladores/controladorDeRegistro.js';

const app = express();
app.use(express.json());
export const conexionDB = async () => {
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

conexionDB();
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',  
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],  
  };
  
  app.use(cors(corsOptions)); 
  app.options('*', cors(corsOptions));


const PUERTO = 7000;

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', controladorDeRegistro);

app.listen(PUERTO, () => {
  console.log('puertoFuncionando');
});