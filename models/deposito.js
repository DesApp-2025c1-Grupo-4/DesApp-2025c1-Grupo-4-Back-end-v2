const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const depositoSchema = new mongoose.Schema({
    tipo: {
        type: Schema.Types.String,
        required: true
    },
    horarios: {
        type: Schema.Types.String,
        required: true
    },
    contacto: {
        type: Schema.Types.BigInt,
        required: true
    },
    localizacion:{type: Schema.Types.ObjectId, ref: 'Localizacion'}
},{
  collection: 'Deposito', // Especifica el nombre en singular
})

depositoSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('deposito', depositoSchema);