
import ENVIROMENT from './enviroment.js';
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: ENVIROMENT.GMAIL_USER ,
        pass: ENVIROMENT.GMAIL_PASS
    }
}) 
