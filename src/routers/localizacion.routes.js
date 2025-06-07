const { Router } = require('express')
const localizacionController = require('../controllers/localizacion.controller')
const { Localizacion } = require('../models')
const localizacionSchema = require('../schemas/localizacion.schema')
const { validarId } = require('../middleware/idValidador')

const routes = Router()

routes.get('/',localizacionController.getLocalizaciones)
routes.get('/:_id',validarId(Localizacion),localizacionController.getLocalizacionById)
//routes.post('/',schemasValidador(vehiculoSchema),vehiculoController.addVehiculo)

module.exports = routes