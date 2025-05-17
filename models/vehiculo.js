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
    }
},{
  collection: 'Vehiculo', // Especifica el nombre en singular
})

vehiculoSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
    }
})

module.exports = mongoose.model('Vehiculo', vehiculoSchema);