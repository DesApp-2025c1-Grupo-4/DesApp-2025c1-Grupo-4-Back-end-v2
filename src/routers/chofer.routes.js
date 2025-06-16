const { Router } = require('express')
const {ChoferController} = require('../controllers')
const choferSchema = require('../schemas/chofer.schema')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/',ChoferController.getChoferes)
routes.post('/',schemasValidador(choferSchema),ChoferController.addChofer)
routes.patch('/:cuil/delete',ChoferController.softDeleteChofer)

module.exports = routes