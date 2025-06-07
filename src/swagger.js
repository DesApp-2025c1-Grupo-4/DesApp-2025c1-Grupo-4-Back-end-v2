const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API Sistema de gestión de viajes',
        description: 'Documentación de la API - DesApp 2025C1 - Grupo 4',
    },
    host: 'localhost:3001',
    schemes: ['http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js']; 

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./app'); 
});