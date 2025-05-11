const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const empresaSchema = new mongoose.Schema({
    cuit: {
        type: Schema.Types.Int32,
        require: true
    },
    razonSocial: {
        type: Schema.Types.String,
        require: true
    },
    domicilio: {
        type: Schema.Types.String,
        require: true
    },
    contacto: {
        type: Schema.type.Int32,
        require: true
    }
})

empresaSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('Empresa', empresaSchema);