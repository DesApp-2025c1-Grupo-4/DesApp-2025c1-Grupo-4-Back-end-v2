const { Router } = require('express')
const {VehiculoController} = require('../controllers')
const { Vehiculo, Empresa } = require('../models')
const {vehiculoSchema} = require('../schemas/vehiculo.schema')
const { validarId, validarPatenteVehiculo } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', VehiculoController.getVehiculos)
routes.get('/:_id/', validarId(Vehiculo), VehiculoController.getVehiculoByID)
routes.get('/:patente/patente', validarPatenteVehiculo(Vehiculo), VehiculoController.getVehiculoByPatente)
routes.get('/empresa/:_idEmpresa', validarId(Empresa), VehiculoController.getVehiculoByEmpresa);
routes.post('/', schemasValidador(vehiculoSchema), VehiculoController.addVehiculo)
routes.put('/:_id', validarId(Vehiculo), schemasValidador(vehiculoSchema), VehiculoController.updateVehiculo)
routes.patch('/:_id/delete', validarId(Vehiculo), VehiculoController.softDeleteVehiculo)

module.exports = routes