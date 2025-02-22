
import ENVIROMENT from './enviroment.js';
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'comandanterichyfort@gmail.com' ,
        pass: 'yuja rxlm wndc tvoc'
    }
}) 
