const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const asignacionSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
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
    _id: false,
    collection: 'Asignacion',
})
asignacionSchema.plugin(AutoIncrement, { id: 'Asignacion', inc_field: '_id', start_seq: 0 });

asignacionSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v;
    }
})

module.exports = mongoose.model('Asignacion', asignacionSchema);