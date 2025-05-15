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
    localizaciones: [{type: Schema.Types.ObjectId, ref: 'Localizacion'}],
    asignaciones: [{type: Schema.Types.ObjectId, ref: 'Asignacion'}]
})

viajeSchema.set('toJSON', {
    transform: (_, ret) => {
        if (ret.inicioViaje) {
            ret.inicioViaje = DateTime.fromJSDate(ret.inicioViaje)
                .setZone("America/Argentina/Buenos_Aires")
                .toFormat("yyyy-MM-dd HH:mm:ss")
                .toISO();
        }
        delete ret._v
    }
})

module.exports = mongoose.model('Viaje', viajeSchema);