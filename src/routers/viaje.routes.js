const { Router } = require('express')
const viajeController = require('../controllers/viaje.controller')
const { Viaje } = require('../models')
const viajeSchema = require('../schemas/viaje.schema')
const { validarId } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', viajeController.getViajes)
routes.get('/:_id',validarId(Viaje),viajeController.getViajeById)
routes.post('/',schemasValidador(viajeSchema),viajeController.addViaje)

module.exports = routes