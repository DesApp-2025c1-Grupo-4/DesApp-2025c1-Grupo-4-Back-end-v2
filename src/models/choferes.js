import mongoose, { model } from 'mongoose';
const { Schema } = mongoose;

const LicenciaSchema = new Schema({
  numero: {
    type: String,
    required: true,
    trim: true
  },
  tipos: {
    type: [String],
    required: true,
    enum: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E'], // no se cual es para manejar logistica y camiones?
    validate: {
      validator: function(v) {
        return v.length > 0; // al menos un tipo de licencia tiene que cargar
      },
      message: 'Debe especificar al menos un tipo de licencia'
    }
  },
  fecha_expiracion: {
    type: String,
    required: true,
    match: [/^\d{2}\/\d{2}\/\d{4}$/, 'Formato de fecha inválido (DD/MM/YYYY)']
  },
  documento: {
    data: Buffer,         
    contentType: String,   
    fileName: String, 
    size: Number,        
  }
});

const ChoferSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  dni_identificacion: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{7,8}$/, 'DNI debe contener 7 u 8 dígitos'] //Esto se puede sacar si no es con DNI y tiene otro tipo de Identificacion (extranjero)
  },
  fecha_nacimiento: {
    type: Date,
    required: true
  },
  vehiculo_defecto: {
    type: Schema.Types.ObjectId,
    ref: 'Vehiculo'
  },
  empresa: {
    type: Schema.Types.ObjectId,
    ref: 'Empresa',
    required: true
  },
  licencia: {
    type: LicenciaSchema,
    required: true
  }
}, {
  timestamps: true
});

export default model('Chofer', ChoferSchema);