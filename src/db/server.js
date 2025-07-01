const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/desapp';

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('Conexión exitosa a MongoDB');
        mongoose.connection.on('error', err => {
            console.error('Error de conexión a MongoDB:', err);
        });
        mongoose.connection.on('disconnected', () => {
            console.warn('Se perdió la conexión a MongoDB');
        });
    } catch (err) {
        console.error('No se pudo conectar a MongoDB:', err);
        process.exit(1);
    }
}

module.exports = { connectToDatabase, mongoose };

