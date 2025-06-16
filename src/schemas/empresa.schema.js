const Joi = require('joi')

const TIPO_EMPRESA = ['S.R.L', 'S.A', 'S.A.S', 'S.C', 'Unipersonal', 'Otro'];

// Domicilio schema
const domicilioFiscalSchema = Joi.object({
  calle: Joi.string().required().messages({
    'string.empty': 'La calle es requerida',
    'any.required': 'La calle es requerida'
  }),
  ciudad: Joi.string().required().messages({
    'string.empty': 'La ciudad es requerida',
    'any.required': 'La ciudad es requerida'
  }),
  provincia: Joi.string().required().messages({
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
  cuit_rut: Joi.string()
    .pattern(/^\d{2}-\d{8}-\d{1}$/)
    .required()
    .messages({
      'string.pattern.base': 'CUIT no válido (formato: XX-XXXXXXXX-X)',
      'any.required': 'El CUIT/RUT es requerido'
    }),
  domicilio_fiscal: domicilioFiscalSchema.required().messages({
    'any.required': 'El domicilio fiscal es requerido'
  }),
  datos_contacto: datosContactoSchema.required().messages({
    'any.required': 'Los datos de contacto son requeridos'
  })
});

// Update schema 
const empresaUpdateSchema = empresaSchema.fork(
  ['nombre_empresa', 'cuit_rut', 'domicilio_fiscal', 'datos_contacto'],
  (schema) => schema.optional()
);

module.exports = empresaSchema
module.exports = empresaUpdateSchema