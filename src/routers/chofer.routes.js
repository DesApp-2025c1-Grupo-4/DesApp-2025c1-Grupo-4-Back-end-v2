const { Router } = require('express')
const { Chofer, Vehiculo } = require('../models')
const { ChoferController } = require('../controllers')
const {choferSchema} = require('../schemas/chofer.schema')
const { validarId, validarCuilChofer, validarCampoDuplicado, validarVehiculoDeEmpresa } = require('../middleware/idValidador')
const schemasValidador  = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', ChoferController.getChoferes)
routes.get('/:_id', validarId(Chofer), ChoferController.getChoferById)
routes.get('/:cuil/cuil', validarCuilChofer(Chofer), ChoferController.getChoferByCuil)
routes.post('/', schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), validarVehiculoDeEmpresa(Vehiculo), ChoferController.addChofer);
routes.put('/:_id', validarId(Chofer), schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), validarVehiculoDeEmpresa(Vehiculo), ChoferController.updateChofer);
routes.patch('/:_id/delete', validarId(Chofer), ChoferController.softDeleteChofer)

module.exports = routes