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

const PORT = process.env.PORT ?? 3000;
const mongoUrl = process.env.MONGO_URL;

const startServer = async () => {
  try {
    await connectToDatabase();
    await initialEmpresa();

    app.use(routes);

    // Intenta cargar el archivo de Swagger solo si existe
    const swaggerPath = path.join(__dirname, 'docs', 'swagger_output.json');
    if (fs.existsSync(swaggerPath)) {
      const swaggerFile = require(swaggerPath);
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
      console.log(`Swagger UI disponible en /api-docs`);
    } else {
      console.warn(`No se encontró swagger_output.json`);
    }
    app.listen(PORT, () => {
      console.log(`Servidor levantado en puerto ${PORT}`);
    });
  } catch (err) {
    console.error('Error al iniciar la aplicación:', err);
    process.exit(1);
  }
};

startServer();
