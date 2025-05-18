const {Router} = require('express')
const vehiculoController = require('../controllers/vehiculo.controllers')
const {Vehiculo} = require('../models')
const vehiculoSchema = require('../schemas/vehiculo.schema')
const {validarPatenteVehiculo} = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/',vehiculoController.getVehiculo)
routes.get('/:patente',validarPatenteVehiculo,vehiculoController.getVehiculoByPatente)
routes.post('/',schemasValidador(vehiculoSchema),vehiculoController.addVehiculo)