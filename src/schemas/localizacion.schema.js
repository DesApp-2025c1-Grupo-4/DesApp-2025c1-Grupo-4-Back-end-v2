const Joi = require('joi')

const localizacionSchema = Joi.object().keys(
    {
    calle: Joi.string().min(1).max(50).required().messages({
        "any.required":"La calle es requerida",
        "string.min": "La calle debe tener como mínimo {#limit} caracteres",
        "string.max": "La calle debe tener como máximo {#limit} caracteres",
        "string.empty": "La calle no puede ser vacía"
    })

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = localizacionSchema