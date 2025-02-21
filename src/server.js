import express from 'express'
import statusRouter from './router.js';
import mongoose from 'mongoose'
import cors from 'cors'
const app = express();

const PUERTO = 7000

app.get('/' , (req , res) => {
    res.render('holaaa')
})


app.use(cors()) 
app.post('/prueba' , (req , res ) => {
    console.log('funciona dicen')
})

app.use('/api/status' , statusRouter)
app.listen( PUERTO, () => {
    console.log('holaaa')
} )