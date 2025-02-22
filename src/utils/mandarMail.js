import transporter from "../../config/transporter.config.js"
export const mandarMail = async (opciones) => {
    try{
    let respuesta = await transporter.mandarMail(opciones)
    console.log(respuesta)
}
catch(error){
    console.error('Error al enviar mail: ', error)
    throw error
}
}