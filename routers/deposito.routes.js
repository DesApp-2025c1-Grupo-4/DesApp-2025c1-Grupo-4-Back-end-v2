const { Router } = require('express')
const depositoController = require('../controllers/deposito.controllers')
const { Deposito } = require('../models')
const depositoSchema = require('../schemas/deposito.schema')
const { validarId } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', depositoController.getDeposito)
routes.get('/:_id',validarId(Deposito),depositoController.getDepositoById)
routes.post('/',schemasValidador(depositoSchema),depositoController.addDeposito)

module.exports = routes