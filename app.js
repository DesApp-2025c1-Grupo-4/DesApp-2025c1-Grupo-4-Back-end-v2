const express = require('express')
//const routes = require('./routes/index');
require('dotenv').config()
const { connectToDatabase } = require('./db/server')

const app = express()
app.use(express.json())
//app.use(routes)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, async () => {
    await connectToDatabase()
    console.log('Aplicación corriendo en el puerto: ', PORT)
})