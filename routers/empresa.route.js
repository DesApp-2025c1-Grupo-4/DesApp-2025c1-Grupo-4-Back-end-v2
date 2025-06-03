const { Router } = require('express')
const empresaController = require('../controllers/empresa.controller')
const { Empresa } = require('../models')
const empresaSchema = require('../schemas/empresa.schema')
const { validarCuitEmpresa} = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/',empresaController.getEmpresa)
routes.get('/:cuit',validarCuitEmpresa(Empresa),empresaController.getEmpresaByCuit)
routes.post('/',schemasValidador(empresaSchema),empresaController.addEmpresa)

module.exports = routes