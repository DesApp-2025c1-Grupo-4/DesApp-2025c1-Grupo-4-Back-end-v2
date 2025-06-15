import Joi from 'joi';
import { Types } from 'mongoose';

// Licencias (no se cual es para cada cosa??)
const TIPO_LICENCIAS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C3', 'D1', 'D2', 'E'];

// Custom validation for ObjectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId Validation');

// Joi schema for the license document
const licenciaSchema = Joi.object({
  numero: Joi.string().trim().required().messages({
    'string.empty': 'El número de licencia es requerido',
    'any.required': 'El número de licencia es requerido'
  }),
  tipos: Joi.array()
    .items(Joi.string().valid(...TIPO_LICENCIAS))
    .min(1)
    .required()
    .messages({
      'array.min': 'Debe especificar al menos un tipo de licencia',
      'any.only': `Los tipos de licencia deben ser uno de: ${TIPO_LICENCIAS.join(', ')}`,
      'any.required': 'La licencia es requerida'
    }),
  fecha_expiracion: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'Formato de fecha inválido (DD/MM/YYYY)',
      'any.required': 'La fecha de expiración es requerida'
    }),
  documento: Joi.object({
    data: Joi.binary().required(),
    contentType: Joi.string()
      .valid('image/jpeg', 'image/png', 'image/gif', 'application/pdf')
      .required(),
    fileName: Joi.string().required(),
    size: Joi.number().max(5 * 1024 * 1024) // 5MB limit
  }).required()
});

// Main Joi schema for the driver
export const choferSchema = Joi.object({
  nombre: Joi.string().trim().max(50).required().messages({
    'string.empty': 'El nombre es requerido',
    'string.max': 'El nombre no puede exceder los 50 caracteres',
    'any.required': 'El nombre es requerido'
  }),
  apellido: Joi.string().trim().max(50).required().messages({
    'string.empty': 'El apellido es requerido',
    'string.max': 'El apellido no puede exceder los 50 caracteres',
    'any.required': 'El apellido es requerido'
  }),
  dni_identificacion: Joi.alternatives()
    .try(
      Joi.string().pattern(/^\d{7,8}$/), // DNI Argentino
      Joi.string().pattern(/^[a-zA-Z0-9]{5,20}$/) // ID para extranjeros ??
    )
    .required()
    .messages({
      'alternatives.match': 'El documento debe ser DNI (7-8 dígitos) o ID extranjero válido',
      'any.required': 'El documento de identificación es requerido'
    }),
  fecha_nacimiento: Joi.date().max('now').required().messages({
    'date.base': 'Fecha de nacimiento inválida',
    'date.max': 'La fecha de nacimiento no puede ser futura',
    'any.required': 'La fecha de nacimiento es requerida'
  }),
  vehiculo_defecto: objectId.messages({
    'any.invalid': 'ID de vehículo inválido'
  }),
  empresa: objectId.required().messages({
    'any.invalid': 'ID de empresa inválido',
    'any.required': 'La empresa es requerida'
  }),
  licencia: licenciaSchema.required()
});

// Validacion para update
export const choferUpdateSchema = choferSchema.fork(
  ['nombre', 'apellido', 'dni_identificacion', 'fecha_nacimiento', 'empresa', 'licencia'],
  (schema) => schema.optional()
);