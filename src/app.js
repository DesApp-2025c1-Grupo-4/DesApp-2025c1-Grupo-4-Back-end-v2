const express = require('express');
const routes = require('./routers/index');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
require('dotenv').config();
const { connectToDatabase } = require('./db/server');
const initialEmpresa = require('./seeders/initialseeders');

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

if (process.env.USE_SWAGGER === 'true') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
    console.log('✅ Swagger habilitado en /api-docs');
} else {
    console.log('ℹ️ Swagger deshabilitado');
}

app.use(routes);

const startServer = async () => {
    await connectToDatabase();
    await initialEmpresa();
    console.log('Aplicación corriendo en el puerto:', PORT);

    if (process.env.USE_SWAGGER === 'true') {
        const open = (await import('open')).default;
        await open(`http://localhost:${PORT}/api-docs`);
    }
};

app.listen(PORT, startServer);

