const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const empresaSchema = new mongoose.Schema({
    cuit: {
        type: Schema.Types.BigInt,
        required: true
    },
    razonSocial: {
        type: Schema.Types.String,
        required: true
    },
    domicilio: {
        type: Schema.Types.String,
        required: true
    },
    contacto: {
        type: Schema.Types.BigInt,
        required: true
    }
})

empresaSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('Empresa', empresaSchema);