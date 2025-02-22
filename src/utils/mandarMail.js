import { transporter } from "../configuraciones/transporte.config.js"


export const mandarMail = async (opciones) => {
    try{
    let respuesta = await transporter.sendMail(opciones)
    console.log(respuesta)
}
catch(error){
    console.error('Error al enviar mail: ', error)
    throw error
}
}