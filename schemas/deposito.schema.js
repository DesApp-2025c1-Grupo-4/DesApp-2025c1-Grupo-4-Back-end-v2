const Joi = require('joi')

const depositoSchema = Joi.object().keys(
    {
    tipo: Joi.String.min(1).max(15).required().messages({
        "any.required":"El tipo es requerida",
        "string.min": "El tipo debe tener como mínimo {#limit} caracteres",
        "string.max": "El tipo debe tener como máximo {#limit} caracteres",
        "string.empty": "El tipo no puede ser vacía"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = depositoSchema