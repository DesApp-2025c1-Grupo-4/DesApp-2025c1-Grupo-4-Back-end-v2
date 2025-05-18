const Joi = require('joi')

const viajeSchema = Joi.object().keys(
    {
    estado: Joi.String.min(1).max(15).required().messages({
        "any.required":"El Estado es requerida",
        "string.min": "El Estado debe tener como mínimo {#limit} caracteres",
        "string.max": "El Estado debe tener como máximo {#limit} caracteres",
        "string.empty": "El Estado no puede ser vacía"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = viajeSchema