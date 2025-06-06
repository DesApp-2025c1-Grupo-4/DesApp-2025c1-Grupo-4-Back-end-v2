const express = require('express')
const routes = require('./routers/index');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
require('dotenv').config()
const { connectToDatabase } = require('./db/server')
const initialEmpresa = require('./seeders/initialseeders')

const app = express()
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT ?? 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, async () => {
    await connectToDatabase()
    await initialEmpresa()
    console.log('Aplicación corriendo en el puerto: ', PORT)
    const open = (await import('open')).default;
    await open(`http://localhost:${PORT}/api-docs`);
})

