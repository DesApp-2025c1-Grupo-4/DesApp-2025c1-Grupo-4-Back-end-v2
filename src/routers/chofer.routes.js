const { Router } = require('express')
const { Chofer } = require('../models')
const { ChoferController } = require('../controllers')
// Si un archivo tiene varios schemas y se importan juntos, hay que desempaquetar cada schema. o hacer schema.schema
const {choferSchema} = require('../schemas/chofer.schema')
const { validarId, validarCuilChofer, validarCampoDuplicado } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.post('/', schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), ChoferController.addChofer);
routes.get('/', ChoferController.getChoferes)
routes.get('/:_id', validarId(Chofer), ChoferController.getChoferById)
routes.get('/:cuil/cuil', validarCuilChofer(Chofer), ChoferController.getChoferByCuil)
routes.put('/:_id', validarId(Chofer), schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), ChoferController.updateChofer);
routes.patch('/:_id/delete', validarId(Chofer), ChoferController.softDeleteChofer)

module.exports = routes