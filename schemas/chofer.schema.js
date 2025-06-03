const Joi = require('joi')

const choferSchema = Joi.object().keys(
    {
    cuil: Joi.string().min(11).max(11).required().messages({
        "any.required":"nombre es requerido",
        "string.min": "El CUIL debe tener como mínimo {#limit} caracteres",
        "string.max": "El CUIL debe tener como máximo {#limit} caracteres",
        "string.empty": "El CUIL no puede ser vacio"
    }),

    apellido: Joi.string().min(2).max(30).required().messages({
        "any.required": "El apellido es requerido",
        "string.min": "El apellido debe tener como mínimo {#limit} caracteres",
        "string.max": "El apellido debe tener como máximo {#limit} caracteres",
        "string.empty": "El apellido no puede ser vacío"
    }),
    nombre: Joi.string().min(2).max(30).required().messages({
        "any.required": "El nombre es requerido",
        "string.min": "El nombre debe tener como mínimo {#limit} caracteres",
        "string.max": "El nombre debe tener como máximo {#limit} caracteres",
        "string.empty": "El nombre no puede ser vacío"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = choferSchema