const { Router } = require('express')
const vehiculoRoutes = require('./vehiculo.routes')
const choferRoutes = require('./chofer.routes')
const depositosRoutes = require('./deposito.routes')
const empresaRoutes = require('./empresa.routes')
const viajesRoutes = require('./viaje.routes')
const router = Router()

router.use('/vehiculos', vehiculoRoutes)
router.use('/choferes', choferRoutes )
router.use('/depositos', depositosRoutes)
router.use('/viajes', viajesRoutes)
router.use('/empresas', empresaRoutes)

module.exports = router
