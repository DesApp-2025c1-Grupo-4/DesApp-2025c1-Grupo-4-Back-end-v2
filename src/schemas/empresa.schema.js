const Joi = require('joi')



// Domicilio schema
const domicilioFiscalSchema = Joi.object({
  direccion: Joi.string().required().messages({
    'string.empty': 'La calle es requerida',
    'any.required': 'La calle es requerida'
  }),
  ciudad: Joi.string().required().messages({
    'string.empty': 'La ciudad es requerida',
    'any.required': 'La ciudad es requerida'
  }),
  provincia_estado: Joi.string().required().messages({
    'string.empty': 'La provincia es requerida',
    'any.required': 'La provincia es requerida'
  }),
  pais: Joi.string().default('Argentina')
});

// datos de contacto schema
const datosContactoSchema = Joi.object({
  telefono: Joi.string().required().messages({
    'string.empty': 'El teléfono es requerido',
    'any.required': 'El teléfono es requerido'
  }),
  mail: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email no válido',
      'any.required': 'El email es requerido'
    })
});

// Schema principal
const empresaSchema = Joi.object({
  nombre_empresa: Joi.string()
    .trim()
    .required()
    .messages({
      'string.empty': 'El nombre de la empresa es requerido',
      'any.required': 'El nombre de la empresa es requerido'
  }),
  cuit: Joi.string().min(11).max(11).required().messages({
    "any.required":"nombre es requerido",
    "string.min": "El CUIT debe tener como mínimo {#limit} caracteres",
    "string.max": "El CUIT debe tener como máximo {#limit} caracteres",
    "string.empty": "El CUIT no puede ser vacio"
  }),
  activo: Joi.bool(),
  domicilio_fiscal: domicilioFiscalSchema.required().messages({
    'any.required': 'El domicilio fiscal es requerido'
  }),
  datos_contacto: datosContactoSchema.required().messages({
    'any.required': 'Los datos de contacto son requeridos'
  })
});

// Update schema 
const empresaUpdateSchema = empresaSchema.fork(
  ['nombre_empresa', 'cuit', 'domicilio_fiscal', 'datos_contacto'],
  (schema) => schema.optional()
);

module.exports = {
  empresaSchema,
  empresaUpdateSchema
};