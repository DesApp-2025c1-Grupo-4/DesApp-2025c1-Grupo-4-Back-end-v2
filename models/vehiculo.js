const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const vehiculoSchema = new mongoose.Schema({
    patente: {
        type: Schema.Types.String,
        required: true
    },
    marca: {
        type: Schema.Types.String,
        required: true
    },
    modelo: {
        type: Schema.Types.String,
        required: true
    },
    año: {
        type: Schema.Types.BigInt,
        required: true
    },
    volumen: {
        type: Schema.Types.Double,
        required: true
    },
    peso: {
        type: Schema.Types.Double,
        required: true
    },
    tipoVehiculo: {
        type: Schema.Types.String,
        required: true
    },
    asignaciones: [{type: Schema.Types.ObjectId, ref: 'Asignacion'}]
})

vehiculoSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('Vehiculo', vehiculoSchema);