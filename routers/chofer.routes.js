const { Router } = require('express')
const choferController = require('../controllers/chofer.controllers')
const { Chofer } = require('../models')
const choferSchema = require('../schemas/chofer.schema')
const { validarCuilChofer } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/',choferController.getChofer)
routes.get('/:cuil',validarCuilChofer(Chofer),choferController.getChoferByCuil)
routes.post('/',schemasValidador(choferSchema),choferController.addChofer)

module.exports = routes