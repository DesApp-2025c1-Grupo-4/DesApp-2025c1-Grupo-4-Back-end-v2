const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const choferSchema = new mongoose.Schema({
    cuil: {
        type: Schema.Types.BigInt,
        required: true
    },
    apellido: {
        type: Schema.Types.String,
        required: true
    },
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    fechaNacimiento: {
        type: Schema.Types.Date,
        required: true
    },
    empresas: [{type: Schema.Types.ObjectId, ref: 'Empresa'}],
    asignaciones: [{type: Schema.Types.ObjectId, ref: 'Asignacion'}]
})

choferSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v,
        delete ret_id
    }
})

module.exports = mongoose.model('Chofer', choferSchema);