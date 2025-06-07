const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const choferSchema = new mongoose.Schema({
    cuil: {
        type: Schema.Types.BigInt,
        required: true
    },
    apellido: {
        type: Schema.Types.String,
        required: true
    },
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    fechaNacimiento: {
        type: Schema.Types.Date,
        required: true
    },
    empresa: {type: Schema.Types.ObjectId, ref: 'Empresa'},
    asignaciones: [{type: Number, ref: 'Asignacion'}]
},{
    collection: 'Chofer', // Especifica el nombre en singular
})

choferSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v;
        if(ret.cuil !== undefined){
            ret.cuil = ret.cuil.toString();
        }
    }
})

module.exports = mongoose.model('Chofer', choferSchema);