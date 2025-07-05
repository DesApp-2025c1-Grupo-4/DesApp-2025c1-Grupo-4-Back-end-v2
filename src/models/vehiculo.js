const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const capacidadCargaSchema = new Schema({
  volumen: { type: Number, required: true },
  peso: { type: Number, required: true }
},
{ versionKey: false });

const vehiculoSchema = new Schema({
  empresa: { 
    type: Schema.Types.ObjectId, 
    ref: 'Empresa', 
    required: true 
  },
  patente: { 
    type: String, 
    required: true,
    unique: true,
    uppercase: true,
  },
  marca: { 
    type: String, 
    required: true 
  },
  modelo: { 
    type: String, 
    required: true 
  },
  anio: { 
    type: Number, 
    required: true,
    min: 1900,
    max: new Date()
  },
  capacidad_carga: {
    type: capacidadCargaSchema,
    required: true
  },
  tipo_vehiculo: { 
    type: String, 
    required: true,
    enum: ['Camión', 'Furgón', 'Camioneta', "Auto", 'Otros']
  },
  activo: {
    type: Boolean,
    required: true
  },
},
{ versionKey: false });


module.exports = mongoose.model('Vehiculo', vehiculoSchema);