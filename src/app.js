
require('dotenv').config()
const { connectToDatabase } = require('./db/server')
const initialEmpresa = require('./seeders/initialseeders')
const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const PORT = process.env.PORT ?? 3000
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, async () => {
    await connectToDatabase()
    await initialEmpresa()
    console.log('Aplicación corriendo en el puerto: ', PORT)
})
