const {Empresa} = require('../models')
const {Chofer} = require('../models')
async function seedDatabase() {
    try {
        await Empresa.deleteMany({});
        await Chofer.deleteMany({});
        
        const empresas = await Empresa.insertMany([
            { cuit: "30456789451", razonSocial: "Arcor", domicilio: "Arena3655",contacto: "123456789"},
            { cuit: "30456789452", razonSocial: "Techin", domicilio: "Arena3654",contacto: "123456790"}
        ]);
        const choferes = await Chofer.insertMany([
            { cuil: "27456789451", apellido: "Torres", nombre: "Marcelo",contacto: "153456789",fechaNacimiento: new Date(1988, 2, 6)},
            { cuil: "20456789452", apellido: "Herenu", nombre: "Luis",contacto: "153456790",fechaNacimiento: new Date(1988, 3, 6)}
        ]);

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;
