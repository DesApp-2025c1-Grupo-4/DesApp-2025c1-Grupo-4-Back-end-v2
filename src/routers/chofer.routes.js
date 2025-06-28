const { Router } = require('express')
const { Chofer, Vehiculo, Empresa } = require('../models')
const { ChoferController } = require('../controllers')
const {choferSchema} = require('../schemas/chofer.schema')
const { validarId, validarCuilChofer, validarCampoDuplicado, validarVehiculoDeEmpresa } = require('../middleware/idValidador')
const schemasValidador  = require('../middleware/schemasValidador')

const routes = Router()

//routes.post('/', schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), ChoferController.addChofer); Ya existe un POST más completo
routes.get('/', ChoferController.getChoferes)
routes.get('/:_id', validarId(Chofer), ChoferController.getChoferById)
routes.get('/:cuil/cuil', validarCuilChofer(Chofer), ChoferController.getChoferByCuil)
routes.get('/empresa/:_idEmpresa', validarId(Empresa), ChoferController.getChoferByEmpresa);
routes.post('/', schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), validarVehiculoDeEmpresa(Vehiculo), ChoferController.addChofer);
routes.put('/:_id', validarId(Chofer), schemasValidador(choferSchema), validarCampoDuplicado(Chofer, 'cuil', 'chofer', 'un'), validarVehiculoDeEmpresa(Vehiculo), ChoferController.updateChofer);
routes.patch('/:_id/delete', validarId(Chofer), ChoferController.softDeleteChofer)

module.exports = routes