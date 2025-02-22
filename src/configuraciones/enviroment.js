import dotenv from 'dotenv'

dotenv.config()

 const ENVIROMENT = {
    URL_FRONTEND: process.env.URL_FRONTEND || 'http://localhost:7000',
    JWT_SECRET: process.env.JWT_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    GMAIL_USER: process.env.GMAIL_USER,
}

export default ENVIROMENT