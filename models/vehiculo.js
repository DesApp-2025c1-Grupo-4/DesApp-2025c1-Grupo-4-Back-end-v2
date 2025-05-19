const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const vehiculoSchema = new mongoose.Schema({
    patente: {
        type: Schema.Types.String,
        required: true,
        unique: true
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
        delete ret.__v;
        if(ret.año !== undefined){
            // necesario para evitar error de serialización, solución sin modificar esquema.
            ret.año = ret.año.toString();
        }
    }
})

module.exports = mongoose.model('Vehiculo', vehiculoSchema);