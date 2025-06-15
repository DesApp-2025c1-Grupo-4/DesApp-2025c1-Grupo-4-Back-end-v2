const Joi = require('joi')
const Types = require('mongoose');

const objectId = Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

const ESTADO_VIAJE = [
  'planificado',
  'en_transito',
  'completado',
  'demorado',
  'incidente',
  'cancelado'
];

// Validacion fecha/hora (DD/MM/YYYY HH:MM)
const dateTimeValidation = Joi.string()
  .pattern(/^\d{2}\/\d{2}\/\d{4} ([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
  .messages({
    'string.pattern.base': 'Formato de fecha/hora inválido (DD/MM/YYYY HH:MM)'
  });

// Schema principal
const viajeSchema = Joi.object({
  guid_viaje: Joi.number()
    .required()
    .messages({
      'number.base': 'El GUID del viaje debe ser un número',
      'any.required': 'El GUID del viaje es requerido'
    }),
  deposito_origen: objectId
    .required()
    .messages({
      'any.invalid': 'ID de depósito origen inválido',
      'any.required': 'El depósito origen es requerido'
    }),
  deposito_destino: objectId
    .required()
    .messages({
      'any.invalid': 'ID de depósito destino inválido',
      'any.required': 'El depósito destino es requerido'
    }),
  inicio_viaje: dateTimeValidation
    .required()
    .messages({
      'any.required': 'La fecha/hora de inicio es requerida'
    }),
  fin_viaje: dateTimeValidation
    .required()
    .custom((value, helpers) => {
      const startDate = helpers.state.ancestors[0].inicio_viaje;
      if (!startDate) return value;
      
      const start = new Date(startDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      const end = new Date(value.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1'));
      
      if (end <= start) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.required': 'La fecha/hora de fin es requerida',
      'any.invalid': 'La fecha/hora de fin debe ser posterior a la de inicio'
    }),
  estado: Joi.string()
    .valid(...ESTADO_VIAJE)
    .default('planificado')
    .required()
    .messages({
      'any.only': `El estado debe ser uno de: ${ESTADO_VIAJE.join(', ')}`,
      'any.required': 'El estado es requerido'
    }),
  empresa_asignada: objectId
    .required()
    .messages({
      'any.invalid': 'ID de empresa inválido',
      'any.required': 'La empresa asignada es requerida'
    }),
  chofer_asignado: objectId
    .required()
    .messages({
      'any.invalid': 'ID de chofer inválido',
      'any.required': 'El chofer asignado es requerido'
    }),
  vehiculo_asignado: objectId
    .required()
    .messages({
      'any.invalid': 'ID de vehículo inválido',
      'any.required': 'El vehículo asignado es requerido'
    })
});

// Update schema 
const viajeUpdateSchema = viajeSchema.fork(
  [
    'guid_viaje',
    'deposito_origen',
    'deposito_destino',
    'inicio_viaje',
    'fin_viaje',
    'estado',
    'empresa_asignada',
    'chofer_asignado',
    'vehiculo_asignado'
  ],
  (schema) => schema.optional()
);

module.exports = viajeSchema
module.exports = viajeUpdateSchema