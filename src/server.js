import express from 'express'
import statusRouter from './router.js';
import mongoose from 'mongoose'
import cors from 'cors'
const app = express();

app.use(express.json({limit: '0.2mb'}))
app.use(express.urlencoded({extended:true}))
const PUERTO = 7000

app.get('/' , (req , res) => {
    res.render('holaaa')
})


const corsOptions = {
    origin: 'https://trabajo-wp.vercel.app', 
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  
  app.use(cors(corsOptions));  
  
  app.post('/registrarse', (req, res) => {
   
    res.json(req.body.email , req.body.password);
  });

app.use('/api/status' , statusRouter)
app.listen( PUERTO, () => {
    console.log('holaaa')
} )