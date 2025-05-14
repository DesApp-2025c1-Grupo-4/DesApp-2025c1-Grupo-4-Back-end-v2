const Joi = require('joi')

const asignacionSchema = Joi.object().keys(
    {
    cuilChofer: Joi.bigInt().min(11).max(11).required().messages({
            "any.required":"El CUIL es requerido",
            "bigint.min": "El CUIL debe tener como mínimo {#limit} caracteres",
            "bigint.max": "El CUIL debe tener como máximo {#limit} caracteres",
            "bigint.empty": "El CUIL no puede ser vacio"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = asignacionSchema