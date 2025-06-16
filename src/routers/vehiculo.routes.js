const { Router } = require('express')
const {VehiculoController} = require('../controllers')
const { Vehiculo } = require('../models')
const vehiculoSchema = require('../schemas/vehiculo.schema')
const { validarPatenteVehiculo } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/',VehiculoController.getVehiculos)
routes.get('/:patente',validarPatenteVehiculo(Vehiculo),VehiculoController.getVehiculoByPatente)
routes.post('/',schemasValidador(vehiculoSchema),VehiculoController.addVehiculo)
routes.patch('/:patente/delete',VehiculoController.softDeleteVehiculo)

module.exports = routes