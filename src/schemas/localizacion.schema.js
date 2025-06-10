const Joi = require('joi')

const localizacionSchema = Joi.object().keys(
    {
    calle: Joi.string().min(1).max(50).required().messages({
        "any.required":"La calle es requerida",
        "string.min": "La calle debe tener como mínimo {#limit} caracteres",
        "string.max": "La calle debe tener como máximo {#limit} caracteres",
        "string.empty": "La calle no puede ser vacía"
    }),

    número: Joi.number().integer().min(1).required().messages({
        "any.required":"El número es requerid0",
        "number.base": "El número debe ser un valor númerico",
        "number.min": "El número debe tener como mínimo {#limit} caracteres",
        "number.max": "El número debe tener como máximo {#limit} caracteres",
        "number.empty": "El número no puede ser vacío"
    }),

    localidad: Joi.string().min(1).max(50).required().messages({
        "any.required":"La localidad es requerida",
        "string.min": "La localidad debe tener como mínimo {#limit} caracteres",
        "string.max": "La localidad debe tener como máximo {#limit} caracteres",
        "string.empty": "La localidad no puede ser vacía"
    }),

    coordenadasGeograficas: Joi.string().min(1).max(50).required().messages({
        "any.required":"Las coordenadas geográficas son requeridas",
        "string.min": "Las coordenadas geográficas deben tener como mínimo {#limit} caracteres",
        "string.max": "Las coordenadas geográficas deben tener como máximo {#limit} caracteres",
        "string.empty": "Las coordenadas geográficas no pueden ser vacías"
    }),

    provinciaOestado: Joi.string().min(1).max(50).required().messages({
        "any.required":"La provincia o estado es requerido",
        "string.min": "La provincia o estado debe tener como mínimo {#limit} caracteres",
        "string.max": "La provincia o estado debe tener como máximo {#limit} caracteres",
        "string.empty": "La provincia o estado no puede ser vacío"
    }),

    país: Joi.string().min(1).max(50).required().messages({
        "any.required":"El país es requerido",
        "string.min": "El país debe tener como mínimo {#limit} caracteres",
        "string.max": "El país debe tener como máximo {#limit} caracteres",
        "string.empty": "El país no puede ser vacío"
    }),
    

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = localizacionSchema