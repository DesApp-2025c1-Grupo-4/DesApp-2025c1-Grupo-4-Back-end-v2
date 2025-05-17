const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const { DateTime } = require("luxon");

const viajeSchema = new mongoose.Schema({
    inicioViaje: {
        type: Schema.Types.Date,
        required: true
    },
    llegadaViaje: {
        type: Schema.Types.Date,
        required: true
    },
    estado: {
        type: Schema.Types.String,
        required: true
    },
    depositoOrigen: {type: Schema.Types.ObjectId, ref: 'Deposito'},
    depositoDestino: {type: Schema.Types.ObjectId, ref: 'Deposito'},
    asignacion: {type: Schema.Types.ObjectId, ref: 'Asignacion'}
},{
  collection: 'Viaje', // Especifica el nombre en singular
})

viajeSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
    }
})

module.exports = mongoose.model('Viaje', viajeSchema);