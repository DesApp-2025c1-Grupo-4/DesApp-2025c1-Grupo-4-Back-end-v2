const { Router } = require('express')
const {ChoferController} = require('../controllers')
const { Chofer } = require('../models')
const choferSchema = require('../schemas/chofer.schema')
const { validarCuilChofer } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/',ChoferController.getChoferes)
routes.get('/:cuil',validarCuilChofer(Chofer),ChoferController.getChoferByCuil)
routes.post('/',schemasValidador(choferSchema),ChoferController.addChofer)

module.exports = routes