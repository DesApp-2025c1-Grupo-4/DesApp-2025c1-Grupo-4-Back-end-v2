const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const { DateTime } = require("luxon");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const viajeSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
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
    depositoOrigen: {type: Number, ref: 'Deposito'},
    depositoDestino: {type: Number, ref: 'Deposito'},
    asignacion: {type: Number, ref: 'Asignacion'}
},{
    _id: false,
    collection: 'Viaje', // Especifica el nombre en singular
})

viajeSchema.plugin(AutoIncrement, {id: 'Viaje', inc_field: '_id', start_seq: 0})

viajeSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
    }
})

module.exports = mongoose.model('Viaje', viajeSchema);