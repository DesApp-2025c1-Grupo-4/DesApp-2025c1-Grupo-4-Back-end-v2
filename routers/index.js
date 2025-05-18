const { Router } = require('express')
const vehiculoRoutes = require('./vehiculo.routes')
const router = Router()

router.use('/vehiculos', vehiculoRoutes)

module.exports = router
