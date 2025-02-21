import mongoose  from "mongoose";
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    contraseña: {
        type: String,
        required: true
    },
    verificacionDeEmail: {
        type: Boolean,
        default: false
    },
    // tokenVerificacion:{
    //     type: String,
    //     required: true
    // },
})

const modeloDeUsuario = mongoose.model('Usuario' , userSchema)


export default modeloDeUsuario