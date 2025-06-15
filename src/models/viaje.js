const mongoose = require('mongoose');
const { Schema } = mongoose;

const viajeSchema = new Schema({
  guid_viaje: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  deposito_origen: {
    type: Schema.Types.ObjectId,
    ref: 'Deposito',
    required: true
  },
  deposito_destino: {
    type: Schema.Types.ObjectId,
    ref: 'Deposito',
    required: true
  },
  inicio_viaje: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2}\/\d{2}\/\d{4} ([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Formato de fecha/hora inválido (DD/MM/YYYY HH:MM)'
    }
  },
  fin_viaje: {
    type: String,
    required: true,
    validate: [
      {
        validator: function(v) {
          return /^\d{2}\/\d{2}\/\d{4} ([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
        },
        message: 'Formato de fecha/hora inválido (DD/MM/YYYY HH:MM)'
      },
      {
        validator: function(v) {
          const start = new Date(this.inicio_viaje.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
          const end = new Date(v.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
          return end > start;
        },
        message: 'La fecha/hora de fin debe ser posterior a la de inicio'
      }
    ]
  },
  estado: {
    type: String,
    required: true,
    enum: ['planificado', 'en_progreso', 'completado', 'cancelado'],
    default: 'planificado'
  },
  empresa_asignada: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  chofer_asignado: {
    type: Schema.Types.ObjectId,
    ref: 'Chofer',
    required: true
  },
  vehiculo_asignado: {
    type: Schema.Types.ObjectId,
    ref: 'Vehiculo',
    required: true
  }
},
{ versionKey: false });


module.exports = mongoose.model('Viaje', viajeSchema);