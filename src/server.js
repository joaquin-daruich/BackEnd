import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { controladorDeRegistro } from './controladores/controladorDeRegistro';

const app = express();

app.use(express.json({ limit: '0.2mb' }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'https://trabajo-wp.vercel.app',  
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 

const PUERTO = 7000;

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', controladorDeRegistro);

app.listen(PUERTO, () => {
  console.log('puertoFuncionando');
});