const Joi = require('joi')

const vehiculoSchema = Joi.object().keys({
    patente: Joi.string()
        .pattern(/^(?:[A-Z]{3}[0-9]{3}|[A-Z]{2}[0-9]{3}[A-Z]{2})$/)
        .required()
        .messages({
            "any.required": "La patente es requerida",
            "string.pattern.base": "La patente debe ser LLLNNN o LLNNNLL (L letra, N número)",
            "string.empty": "La patente no puede ser vacía"
        }),
    marca: Joi.string().required(),
    modelo: Joi.string().required(),
    año: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
    volumen: Joi.number().required(),
    peso: Joi.number().required(),
    tipoVehiculo: Joi.string().required()
}).unknown(false).messages({
    'object.unknown': 'El atributo {#label} no está permitido.'
});

module.exports = vehiculoSchema