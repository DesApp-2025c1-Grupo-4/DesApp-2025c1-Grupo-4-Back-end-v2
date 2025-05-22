const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const depositoSchema = new mongoose.Schema({
    tipo: {
        type: Schema.Types.String,
        required: true
    },
    horarios: {
        type: Schema.Types.String,
        required: true
    },
    contacto: {
        type: Schema.Types.BigInt,
        required: true
    },
    localizacion:{type: Number, ref: 'Localizacion'}
},{
    collection: 'Deposito', 
})

depositoSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret._v;
        if(ret.contacto !== undefined){
            ret.contacto = ret.contacto.toString();
        }
    }
})

module.exports = mongoose.model('deposito', depositoSchema);