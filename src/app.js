require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const { connectToDatabase } = require('./db/server.js');
const routes = require('./routers');
const initialEmpresa = require('./seeders/initialseeders');

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;//sin .env corre en 3000
const REMOTE_URI = process.env.MONGO_URL;//Atlas
const LOCAL_URI = 'mongodb://localhost:27017/desapp';//Si falla el puerto o la conexión.

const startServer = async () => {
  let connected = await connectToDatabase(REMOTE_URI);
  if (!connected) {
    console.warn('Falló la conexión remota. Intentando conexión local...');
    connected = await connectToDatabase(LOCAL_URI);
    if (!connected) {
      console.error('No se pudo conectar a ninguna base de datos. Abortando...');
      process.exit(1);
    }
    await initialEmpresa();//Se ejecuta la semilla solo en local.
  }
  try {
    app.use(routes);
    // Cargar documentación Swagger si existe
    const swaggerPath = path.join(__dirname, 'docs', 'swagger_output.json');
    if (fs.existsSync(swaggerPath)) {
      const swaggerFile = require(swaggerPath);
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
      console.log(`📚 Swagger disponible en http://localhost:${PORT}/api-docs`);
    } else {
      console.warn('No se encontró swagger_output.json. Skipping docs...');
    }
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
    process.exit(1);
  }
};

startServer();