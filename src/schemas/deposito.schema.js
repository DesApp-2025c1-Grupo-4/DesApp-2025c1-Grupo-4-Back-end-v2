const Joi = require('joi')

const depositoSchema = Joi.object().keys(
    {
    tipo: Joi.string().min(1).max(15).required().messages({
        "any.required":"El tipo es requerida",
        "string.min": "El tipo debe tener como mínimo {#limit} caracteres",
        "string.max": "El tipo debe tener como máximo {#limit} caracteres",
        "string.empty": "El tipo no puede ser vacía"
    }),

    horarios: Joi.string().required().messages({
        "any.required": "El horario es requerido",
        "string.empty": "El horario no puede ser vacío"
    }),
    contacto: Joi.number().integer().required().messages({
        "any.required": "El contacto es requerido",
        "number.base": "El contacto debe ser un número entero"
    }),
    
    localizacion: Joi.number().optional()

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = depositoSchema