const { Router } = require('express')
const empresaController = require('../controllers/empresa.controller')
const { Empresa } = require('../models')
const empresaSchema = require('../schemas/empresa.schema')
const { validarId, validarCuitEmpresa } = require('../middleware/idValidador')
const schemasValidador = require('../middleware/schemasValidador')

const routes = Router()

routes.get('/', empresaController.getEmpresas)
routes.get('/:_id', validarId(Empresa), empresaController.getEmpresaById)
routes.get('/:cuit/cuit', validarCuitEmpresa(Empresa), empresaController.getEmpresaByCuit)
//routes.post('/', schemasValidador(empresaSchema), empresaController.addEmpresa)
routes.put('/:_id', validarId(Empresa), schemasValidador(empresaSchema), empresaController.updateEmpresa)
routes.patch('/:_id/delete', empresaController.softDeleteEmpresa)

module.exports = routes