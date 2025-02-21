import dotenv from 'dotenv'

dotenv.config()

 const ENVIROMENT = {
    URL_FRONTEND: process.env.URL_FRONTEND || 'http://localhost:7000'
}

export default ENVIROMENT