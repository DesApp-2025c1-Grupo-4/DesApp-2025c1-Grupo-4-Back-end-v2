const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const LocalizacionSchema = new Schema({
  direccion: { 
    type: String, 
    required: true,
    trim: true
  },
  provincia_estado: { 
    type: String, 
    required: true 
  },
  ciudad: { 
    type: String, 
    required: true 
  },
  pais: { 
    type: String, 
    required: true,
    default: 'Argentina' 
  }
},
{ versionKey: false });

const PersonalContactoSchema = new Schema({
  nombre: { 
    type: String, 
    required: true,
    trim: true
  },
  apellido: { 
    type: String, 
    required: true,
    trim: true
  },
  telefono: { 
    type: String, // Para preservar ceros y guiones
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10,15}$/.test(v); // Valida cantidad digitos (10-15)
      },
      message: props => `${props.value} no es un número de teléfono válido!`
    }
  }
},
{ versionKey: false });

const HorariosSchema = new Schema({
  dias: {
    type: [String],
    required: true,
    enum: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'],
    validate: {
      validator: function(v) {
        return v.length > 0; // At least one day required
      },
      message: 'Debe especificar al menos un día'
    }
  },
  desde: {
    type: String,
    required: true,
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
  },
  hasta: {
    type: String,
    required: true,
    match: [/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de hora inválido (HH:MM)']
  }
},
{ versionKey: false });

// Schema principal
const depositoSchema = new Schema({
  localizacion: {
    type: LocalizacionSchema,
    required: true
  },
  tipo: {
    type: String,
    required: true,
    enum: ['propio', 'tercerizado', 'temporal', 'otro'],
    default: 'propio'
  },
  activo: {
    type: Boolean,
    required: true
  },
  personal_contacto: {
    type: PersonalContactoSchema,
    required: true
  },
  horarios: {
    type: HorariosSchema,
    required: true
  }
},
{ versionKey: false });

module.exports = mongoose.model('Deposito', depositoSchema);