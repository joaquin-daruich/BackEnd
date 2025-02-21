import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json({ limit: '0.2mb' }));
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'https://trabajo-wp.vercel.app',  // Permite solicitudes de este dominio
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));  // Usa CORS con la configuración adecuada

const PUERTO = 7000;

app.get('/', (req, res) => {
  res.send('holaaa');
});

app.post('/registrarse', (req, res) => {
  const datosDelUsuario = {
    email: req.body.email,
    contraseña: req.body.contraseña,
  };
  res.json(datosDelUsuario);  // Respuesta en formato JSON
});

app.listen(PUERTO, () => {
  console.log('holaaa');
});