const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const asignacionSchema = new mongoose.Schema({
    cuilChofer: {
        type: Schema.Types.BigInt,
        required: true
    },
    patenteVehiculo: {
        type: Schema.Types.String,
        required: true
    },
    fechaAsignacion: {
        type: Schema.Types.Date,
        required: true
    },
    vehiculoPropio: {
        type: Schema.Types.Boolean,
        required: true
    }
})

asignacionSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('asignacion', asignacionSchema);