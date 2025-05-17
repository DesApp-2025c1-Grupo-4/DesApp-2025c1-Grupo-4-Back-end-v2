const Joi = require('joi')

const asignacionSchema = Joi.object().keys(
    {
    fechaAsignacion: Joi.date().required().messages({
        "any.required": "La fecha de asignacion es requerida",
        "date.base": "La fecha de asignacion debe ser una fecha válida"
    })    

}).unknown(false).messages ({
    'object.unknown': 'El atributo {#label} no está permitido.'
})

module.exports = asignacionSchema