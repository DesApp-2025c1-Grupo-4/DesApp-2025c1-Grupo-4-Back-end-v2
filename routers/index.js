const { Router } = require('express')
const vehiculoRoutes = require('./vehiculo.routes')
const choferRoutes = require('./chofer.routes')
const localizacionesRoutes = require('./localizacion.route')
const depositosRoutes = require('./deposito.routes')
const asignacionRoutes = require('./asignacion.route')
const viajesRoutes = require('./viaje.route')
const router = Router()

router.use('/vehiculos', vehiculoRoutes)
router.use('/localizaciones', localizacionesRoutes)
router.use('/choferes', choferRoutes )
router.use('/depositos', depositosRoutes)
router.use('/asignaciones', asignacionRoutes)
router.use('/viajes', viajesRoutes)

module.exports = router
