const mongoose = require('mongoose');

async function connectToDatabase(uri) {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log(`Conectado a MongoDB en ${uri}`);
        mongoose.connection.on('error', err => {
            console.error('Error de conexión a MongoDB:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.warn('Se perdió la conexión a MongoDB');
        });
        return true;
    } catch (err) {
        console.error(`Falló la conexión a ${uri}:`, err.message);
        return false;
    }
}

module.exports = { connectToDatabase, mongoose };


