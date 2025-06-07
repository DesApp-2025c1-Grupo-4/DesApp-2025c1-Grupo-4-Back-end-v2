const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);


const {Schema} = mongoose

const localizacionSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    calle: {
        type: Schema.Types.String,
        required: true
    },
    número: {
        type: Schema.Types.BigInt,
        required: true
    },
    localidad: {
        type: Schema.Types.String,
        required: true
    },
    coordenadasGeograficas: {
        type: Schema.Types.String,
        required: true
    },
    provinciaOestado: {
        type: Schema.Types.String,
        required: true
    },
    país: {
        type: Schema.Types.String,
        required: true
    }
},{
  _id: false, // importante: desactivamos la generación automática de _id tipo ObjectId  
  collection: 'Localizacion', // Especifica el nombre en singular
});
localizacionSchema.plugin(AutoIncrement, { id: 'Localizacion', inc_field: '_id', start_seq: 0 });

localizacionSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v;
        if(ret.número !== undefined){
            // necesario para evitar error de serialización, solución sin modificar esquema.
            ret.número = ret.número.toString();
        }
        return ret; 
    }
})

module.exports = mongoose.model('Localizacion', localizacionSchema);