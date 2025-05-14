const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const localizacionSchema = new mongoose.Schema({
    calle: {
        type: Schema.Types.String,
        required: true
    },
    número: {
        type: Schema.Types.BigInt,
        required: true
    },
    localidad: {
        type: Schema.Types.String,
        required: true
    },
    coordenadasGeograficas: {
        type: Schema.Types.String,
        required: true
    },
    provinciaOestado: {
        type: Schema.Types.String,
        required: true
    },
    país: {
        type: Schema.Types.String,
        required: true
    },
    depositos: [{type: Schema.Types.ObjectId, ref: 'Deposito'}],
    viajes: [{type: Schema.Types.ObjectId, ref: 'Viaje'}]
})

localizacionSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('Localizacion', localizacionSchema);