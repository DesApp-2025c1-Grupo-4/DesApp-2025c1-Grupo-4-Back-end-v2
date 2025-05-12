const Joi = require('joi')

const vehiculoSchema = Joi.object().keys(
    {
    patente: Joi.String.min(6).max(7).required().messages({
        "any.required":"La patente es requerida",
        "string.min": "La patente debe tener como mínimo {#limit} caracteres",
        "string.max": "La patente debe tener como máximo {#limit} caracteres",
        "string.empty": "La patente no puede ser vacía"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = vehiculoSchema