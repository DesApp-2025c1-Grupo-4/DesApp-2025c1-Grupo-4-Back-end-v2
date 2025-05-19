const { Router } = require('express')
const vehiculoRoutes = require('./vehiculo.routes')
const choferRoutes = require('./chofer.routes')
const router = Router()

router.use('/vehiculos', vehiculoRoutes)
router.use('/choferes', choferRoutes )


module.exports = router
