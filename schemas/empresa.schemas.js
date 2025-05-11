const Joi = require('joi')

const empresaSchema = Joi.object().keys(
    {
    cuit: Joi.int32().min(11).max(11).required().messages({
        "any.required":"nombre es requerido",
        "int32.min": "El CUIT debe tener como mínimo {#limit} caracteres",
        "int32.max": "El CUIT debe tener como máximo {#limit} caracteres",
        "int32.empty": "El CUIT no puede ser vacio"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = empresaSchema