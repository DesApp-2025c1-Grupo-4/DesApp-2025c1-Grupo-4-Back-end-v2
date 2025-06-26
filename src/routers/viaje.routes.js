const { Router } = require('express')
const viajeController = require('../controllers/viaje.controller')
const { Viaje } = require('../models')
const {viajeSchema} = require('../schemas/viaje.schema')
const { validarId, validarDepositos, validarDisponibilidad } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', viajeController.getViajes)
routes.post('/', schemasValidador(viajeSchema),validarDepositos(Viaje),validarDisponibilidad(Viaje),viajeController.addViaje)
routes.get('/:_id', validarId(Viaje), viajeController.getViajeById)
routes.put('/:_id', validarId(Viaje), schemasValidador(viajeSchema), viajeController.updateViaje)
routes.patch('/:_id/estado', schemasValidador(viajeSchema), viajeController.updateViajeState)

module.exports = routes