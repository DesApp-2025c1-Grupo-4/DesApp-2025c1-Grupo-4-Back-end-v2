const { Router } = require('express')
const vehiculoRoutes = require('./vehiculo.routes')
const localizacionesRoutes = require('./localizacion.route')
const router = Router()

router.use('/vehiculos', vehiculoRoutes)
router.use('/localizaciones', localizacionesRoutes)

module.exports = router
