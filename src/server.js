import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { controladorDeRegistro } from './controladores/controladorDeRegistro.js';

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: '*',  
    methods: ['GET', 'POST', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],  
  };
  
  app.use(cors(corsOptions)); 
  app.options('*', cors(corsOptions));


const PUERTO = process.env.PORT || 7000;

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', controladorDeRegistro);

app.listen(PUERTO, () => {
  console.log('puertoFuncionando');
});