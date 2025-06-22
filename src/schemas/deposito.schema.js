const Joi = require('joi')

// Validacion fecha/hora (HH:MM)
const timeFormat = Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
  .messages({
    'string.pattern.base': 'Formato de hora inválido (HH:MM)'
  });

const DIAS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

// Localizacion schema
const localizacionSchema = Joi.object({
  direccion: Joi.string().trim().required().messages({
    'string.empty': 'La dirección es requerida',
    'any.required': 'La dirección es requerida'
  }),
  provincia_estado: Joi.string().required().messages({
    'string.empty': 'La provincia/estado es requerida',
    'any.required': 'La provincia/estado es requerida'
  }),
  ciudad: Joi.string().required().messages({
    'string.empty': 'La ciudad es requerida',
    'any.required': 'La ciudad es requerida'
  }),
  pais: Joi.string().default('Argentina')
});

// Contacto personal schema
const personalContactoSchema = Joi.object({
  nombre: Joi.string().trim().required().messages({
    'string.empty': 'El nombre es requerido',
    'any.required': 'El nombre es requerido'
  }),
  apellido: Joi.string().trim().required().messages({
    'string.empty': 'El apellido es requerido',
    'any.required': 'El apellido es requerido'
  }),
  telefono: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      'string.pattern.base': 'El teléfono debe tener entre 10 y 15 dígitos',
      'any.required': 'El teléfono es requerido'
    })
});

// Horarios Schema
const horariosSchema = Joi.object({
  dias: Joi.array()
    .items(Joi.string().valid(...DIAS))
    .min(1)
    .required()
    .messages({
      'array.min': 'Debe especificar al menos un día',
      'any.only': `Los días deben ser: ${DIAS.join(', ')}`,
      'any.required': 'Los días son requeridos'
    }),
  desde: timeFormat.required().messages({
    'any.required': 'La hora de apertura es requerida'
  }),
  hasta: timeFormat.required()
    .custom((value, helpers) => {
      const { desde } = helpers.state.ancestors[0];
      if (value <= desde) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.required': 'La hora de cierre es requerida',
      'any.invalid': 'La hora de cierre debe ser posterior a la de apertura'
    })
});

// Schema principal
const depositoSchema = Joi.object({
  localizacion: localizacionSchema.required().messages({
    'any.required': 'La localización es requerida'
  }),
  activo: Joi.bool(),
  tipo: Joi.string()
    .valid('Propio', 'Tercerizado')
    .default('Propio')
    .required()
    .messages({
      'any.only': 'El tipo debe ser: Propio o tercerizado',
      'any.required': 'El tipo es requerido'
    }),
  personal_contacto: personalContactoSchema.required().messages({
    'any.required': 'El personal de contacto es requerido'
  }),
  horarios: horariosSchema.required().messages({
    'any.required': 'Los horarios son requeridos'
  })
});

// Update schema 
const depositoUpdateSchema = depositoSchema.fork(
  ['localizacion', 'tipo', 'personal_contacto', 'horarios'],
  (schema) => schema.optional()
);

module.exports = {
  depositoSchema,
  depositoUpdateSchema
};