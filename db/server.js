const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/desapp'

async function connectToDatabase() {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(MONGO_URL);
        console.log('Conexión a mongo con éxito');
    } catch (err) {
        console.error('Error al conectarse a mongo', err);
    }
}

module.exports = {connectToDatabase, mongoose}
