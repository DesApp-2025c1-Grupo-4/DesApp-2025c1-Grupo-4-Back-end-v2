const Joi = require('joi')

const choferSchema = Joi.object().keys(
    {
    cuil: Joi.bigInt().min(11).max(11).required().messages({
        "any.required":"nombre es requerido",
        "bigint.min": "El CUIL debe tener como mínimo {#limit} caracteres",
        "bigint.max": "El CUIL debe tener como máximo {#limit} caracteres",
        "bigint.empty": "El CUIL no puede ser vacio"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = choferSchema