import dotenv from 'dotenv'

dotenv.config()

 const ENVIROMENT = {
    URL_FRONTEND: process.env.URL_FRONTEND || 'http://localhost:7000',
    JWT_SECRET: process.env.JWT_SECRET
}

export default ENVIROMENT