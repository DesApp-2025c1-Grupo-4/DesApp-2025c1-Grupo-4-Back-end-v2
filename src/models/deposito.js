import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

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
});

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
});

// Sub-schema for working hours
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
});

// Main schema
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
  personal_contacto: {
    type: PersonalContactoSchema,
    required: true
  },
  horarios: {
    type: HorariosSchema,
    required: true
  }
}, {
  timestamps: true,
});

// Create and export the model
export default model('Deposito', depositoSchema);