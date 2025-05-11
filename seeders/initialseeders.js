const {empresa} = require('../models')
async function seedDatabase() {
    try {
        await empresa.deleteMany({});
        
        const fabricantes = await Fabricante.insertMany([
            { cuit: "30456789451", razonSocial: "Arcor", domicilio: "Arena3655",contacto: "+123456789"},
            { cuit: "30456789452", razonSocial: "Techin", domicilio: "Arena3654",contacto: "+123456790"}
        ]);

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;