const { Router } = require('express')
const asignacionController = require('../controllers/asignacion.controller')
const { Asignacion } = require('../models')
const asignacionSchema = require('../schemas/asignacion.schema')
const { validarId } = require('../middleware/idValidador')

const routes = Router()

routes.get('/',asignacionController.getAsignaciones)
routes.get('/:_id',validarId(Asignacion),asignacionController.getAsignacionById)
//routes.post('/',schemasValidador(vehiculoSchema),vehiculoController.addVehiculo)

module.exports = routes