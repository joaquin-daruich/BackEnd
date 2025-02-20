import express from 'express'
const app = express();

const PUERTO = 3000

app.listen( PUERTO, () => {
    console.log('holaaa')
} )