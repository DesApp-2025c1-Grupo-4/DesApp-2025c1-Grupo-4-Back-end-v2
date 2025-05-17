const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const asignacionSchema = new mongoose.Schema({
    fechaAsignacion: {
        type: Schema.Types.Date,
        required: true
    },
    vehiculoPropio: {
        type: Schema.Types.Boolean,
        required: true
    },
    chofer: {type: Schema.Types.ObjectId, ref: 'Chofer'},
    vehiculo: {type: Schema.Types.ObjectId, ref: 'Vehiculo'},
    viaje: {type: Schema.Types.ObjectId, ref: 'Viaje'}
},{
  collection: 'Asignacion', // Especifica el nombre en singular
})

asignacionSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v
    }
})

module.exports = mongoose.model('asignacion', asignacionSchema);