const mongoose = require('mongoose');
const { Schema } = mongoose;

const viajeSchema = new Schema({
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
      }
    ]
  },
  estado: {
    type: String,
    required: true,
    enum: [  'planificado', 'en transito', 'completado', 'demorado', 'incidente', 'cancelado'],
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
  },
  historial_estados: [{
  estado: {
    type: String,
    enum: ['planificado', 'en transito', 'completado', 'demorado', 'incidente', 'cancelado'],
    required: true
  },
  fecha: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2}\/\d{2}\/\d{4} ([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
      },
      message: 'Formato de fecha/hora inválido (DD/MM/YYYY HH:MM)'
    }
  }
}]
},
{ versionKey: false });


module.exports = mongoose.model('Viaje', viajeSchema);