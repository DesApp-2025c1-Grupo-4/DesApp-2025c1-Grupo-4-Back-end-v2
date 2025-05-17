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
    },
    choferes: [{type: Schema.Types.ObjectId, ref: 'Chofer'}]

},{
  collection: 'Empresa', // Especifica el nombre en singular
});

empresaSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('Empresa', empresaSchema);