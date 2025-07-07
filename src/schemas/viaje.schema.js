const Joi = require('joi')
const mongoose = require('mongoose');

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

const ESTADO_VIAJE = [
  'planificado',
  'en transito',
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
    .messages({
      'any.required': 'La fecha/hora de fin es requerida'
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
    }),
  historial_estados: Joi.array().items(
    Joi.object({
      estado: Joi.string()
        .valid(...ESTADO_VIAJE)
        .required()
        .messages({
          'any.only': `El estado del historial debe ser uno de: ${ESTADO_VIAJE.join(', ')}`,
          'any.required': 'El estado del historial es requerido'
        }),
      fecha: dateTimeValidation.required().messages({
        'any.required': 'La fecha del historial es requerida'
      })
    })
  )
});

const viajeUpdateSchema = viajeSchema.fork(
  [
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

module.exports = {
  viajeSchema,
  viajeUpdateSchema
};