const Joi = require('joi')

const empresaSchema = Joi.object().keys(
    {
    cuit: Joi.string().min(11).max(11).required().messages({
        "any.required":"nombre es requerido",
        "string.min": "El CUIT debe tener como mínimo {#limit} caracteres",
        "string.max": "El CUIT debe tener como máximo {#limit} caracteres",
        "string.empty": "El CUIT no puede ser vacio"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = empresaSchema