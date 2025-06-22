const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const domicilioFiscalSchema = new Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  provincia: { type: String, required: true },
  pais: { type: String, required: true, default: 'Argentina' }
},
{ versionKey: false });

const datosContactoSchema = new Schema({
  telefono: { type: String, required: true },
  mail: { 
    type: String, 
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email no válido']
  }
},
{ versionKey: false });

const empresaSchema = new Schema({
  nombre_empresa: { 
    type: String, 
    required: true,
    trim: true
  },
  cuit: {
    type: String,
    required: true,
    unique: true
  },
  domicilio_fiscal: {
    type: domicilioFiscalSchema,
    required: true
  },
  datos_contacto: {
    type: datosContactoSchema,
    required: true
  },
  activo: {
    type: Boolean,
    required: true
  }
},
{ versionKey: false });

module.exports = mongoose.model('Empresa', empresaSchema);