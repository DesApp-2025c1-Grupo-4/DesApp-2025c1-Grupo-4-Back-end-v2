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
  cuit_rut: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{2}-\d{8}-\d{1}$/, 'CUIT no válido (formato: XX-XXXXXXXX-X)']
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
  },
  forma_juridica: {
    type: String,
    required: true,
    enum: ['S.R.L', 'S.A', 'S.A.S', 'S.C', 'Unipersonal', 'Otro'],
    default: 'S.R.L'
  },
},
{ versionKey: false });

module.exports = mongoose.model('Empresa', empresaSchema);