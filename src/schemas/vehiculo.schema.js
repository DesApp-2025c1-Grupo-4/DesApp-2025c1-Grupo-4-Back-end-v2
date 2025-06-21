const Joi = require('joi')
const mongoose = require('mongoose');

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

const TIPO_VEHICULO = ['Camión', 'Furgón', 'Camioneta', 'Auto', 'Otros'];

// capacidad de carga schema
const capacidadCargaSchema = Joi.object({
  volumen: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'El volumen debe ser un número',
      'number.positive': 'El volumen debe ser positivo',
      'any.required': 'El volumen es requerido'
    }),
  peso: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'El peso debe ser un número',
      'number.positive': 'El peso debe ser positivo',
      'any.required': 'El peso es requerido'
    })
});

// Schema principal
const vehiculoSchema = Joi.object({
  empresa: objectId
    .required()
    .messages({
      'any.invalid': 'ID de empresa inválido',
      'any.required': 'La empresa es requerida'
    }),
  patente: Joi.string()
    .uppercase()
    .required()
    .messages({
      'string.empty': 'La patente es requerida',
      'any.required': 'La patente es requerida'
    }),
  marca: Joi.string()
    .required()
    .messages({
      'string.empty': 'La marca es requerida',
      'any.required': 'La marca es requerida'
    }),
  modelo: Joi.string()
    .required()
    .messages({
      'string.empty': 'El modelo es requerido',
      'any.required': 'El modelo es requerido'
    }),
  anio: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'number.base': 'El año debe ser un número',
      'number.integer': 'El año debe ser un número entero',
      'number.min': 'El año no puede ser menor a 1900',
      'number.max': `El año no puede ser mayor a ${new Date().getFullYear()}`,
      'any.required': 'El año es requerido'
    }),
  activo: Joi.bool(),
  capacidad_carga: capacidadCargaSchema
    .required()
    .messages({
      'any.required': 'La capacidad de carga es requerida'
    }),
  tipo_vehiculo: Joi.string()
    .valid(...TIPO_VEHICULO)
    .required()
    .messages({
      'any.only': `El tipo de vehículo debe ser uno de: ${TIPO_VEHICULO.join(', ')}`,
      'any.required': 'El tipo de vehículo es requerido'
    })
});

// Update schema
const vehiculoUpdateSchema = vehiculoSchema.fork(
  ['empresa', 'patente', 'marca', 'modelo', 'anio', 'capacidad_carga', 'tipo_vehiculo'],
  (schema) => schema.optional()
);

module.exports = vehiculoSchema
module.exports = vehiculoUpdateSchema