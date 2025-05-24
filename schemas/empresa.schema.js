const Joi = require('joi')

const empresaSchema = Joi.object().keys(
    {
    cuit: Joi.bigint().min(11).max(11).required().messages({
        "any.required":"nombre es requerido",
        "bigint.min": "El CUIT debe tener como mínimo {#limit} caracteres",
        "bigint.max": "El CUIT debe tener como máximo {#limit} caracteres",
        "bigint.empty": "El CUIT no puede ser vacio"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = empresaSchema