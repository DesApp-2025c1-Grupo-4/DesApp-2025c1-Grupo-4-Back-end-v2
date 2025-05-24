const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const depositoSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
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
    _id: false,
    collection: 'Deposito', 
})
depositoSchema.plugin(AutoIncrement, {id: 'Deposito', inc_field: '_id', start_seq: 0})

depositoSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v;
        if(ret.contacto !== undefined){
            ret.contacto = ret.contacto.toString();
        }
    }
})

module.exports = mongoose.model('deposito', depositoSchema);