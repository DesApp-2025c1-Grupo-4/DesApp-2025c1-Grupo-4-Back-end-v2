const { Router } = require('express')
const { Chofer } = require('../models')
const { ChoferController } = require('../controllers')
const choferSchema = require('../schemas/chofer.schema')
const { validarId, validarCuilChofer } = require('../middleware/idValidador')
const schemasValidador  = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', ChoferController.getChoferes)
routes.get('/:_id', validarId(Chofer), ChoferController.getChoferById)
routes.get('/:cuil/cuil', validarCuilChofer(Chofer), ChoferController.getChoferByCuil)
routes.post('/', schemasValidador(choferSchema), ChoferController.addChofer)
routes.put('/:_id',validarId(Chofer), schemasValidador(choferSchema), ChoferController.updateChofer)
routes.patch('/:_id/delete', validarId(Chofer), ChoferController.softDeleteChofer)

module.exports = routes