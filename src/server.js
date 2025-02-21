import express from 'express'
import statusRouter from './router.js';
const app = express();

const PUERTO = 7000

app.get('/' , (req , res) => {
    res.render('holaaa')
})

app.use('/api/status' , statusRouter)
app.listen( PUERTO, () => {
    console.log('holaaa')
} )