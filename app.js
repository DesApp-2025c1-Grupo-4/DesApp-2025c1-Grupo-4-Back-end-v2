const express = require('express')
const routes = require('./routers/index');
require('dotenv').config()
const { connectToDatabase } = require('./db/server')
const initialEmpresa = require('./seeders/initialseeders')

const app = express()
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, async () => {
    await connectToDatabase()
    await initialEmpresa()
    console.log('Aplicación corriendo en el puerto: ', PORT)
})