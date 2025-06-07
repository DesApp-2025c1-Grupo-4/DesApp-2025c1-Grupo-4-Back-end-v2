const { Router } = require('express')
const viajeController = require('../controllers/viaje.controller')
const { Viaje } = require('../models')
const viajeSchema = require('../schemas/viaje.schema')
const { validarId } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', viajeController.getViajes)
routes.get('/lista',viajeController.getListaDeViajes)
routes.get('/:_id',validarId(Viaje),viajeController.getViajeById)
routes.post('/',schemasValidador(viajeSchema),viajeController.addViaje)
routes.get('/:_id/asignacion', validarId(Viaje), viajeController.asignacionDelViajeConId)

module.exports = routes