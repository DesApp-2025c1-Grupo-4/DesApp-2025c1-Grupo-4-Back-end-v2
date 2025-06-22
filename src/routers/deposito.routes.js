const { Router } = require('express')
const {DepositoController} = require('../controllers/')
const { Deposito } = require('../models')
const depositoSchema = require('../schemas/deposito.schema')
const { validarId } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', DepositoController.getDepositos)
routes.get('/:_id', validarId(Deposito), DepositoController.getDepositoById)
routes.post('/', schemasValidador(depositoSchema), DepositoController.addDeposito)
routes.put('/:_id', validarId(Deposito), schemasValidador(depositoSchema), DepositoController.updateDeposito)
routes.patch('/:_id/delete', validarId(Deposito), DepositoController.softDeleteDeposito)

module.exports = routes