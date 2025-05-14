const {Empresa} = require('../models');
const {Chofer} = require('../models');
const {Vehiculo} = require('../models');
const {Localizacion} = require('../models');
const {Deposito} = require('../models');
const {Asignacion} = require('../models');
const {Viaje} = require('../models');

async function seedDatabase() {
    try {
        await Empresa.deleteMany({});
        await Chofer.deleteMany({});
        await Vehiculo.deleteMany({});
        await Localizacion.deleteMany({});
        await Deposito.deleteMany({});
        await Asignacion.deleteMany({});
        await Viaje.deleteMany({});
        
        const empresas = await Empresa.insertMany([
            { cuit: "30456789451", razonSocial: "Arcor", domicilio: "Arena3655",contacto: "123456789", choferes:[]},
            { cuit: "30456789452", razonSocial: "Techin", domicilio: "Arena3654",contacto: "123456790", choferes:[]}
        ]);
        const choferes = await Chofer.insertMany([
            { cuil: "27456789451", apellido: "Torres", nombre: "Marcelo",contacto: "153456789",fechaNacimiento: new Date(1988, 2, 6), empresas:[]},
            { cuil: "20456789452", apellido: "Herenu", nombre: "Luis",contacto: "153456790",fechaNacimiento: new Date(1988, 3, 6), empresas:[]}
        ]);
        const vehiculos = await Vehiculo.insertMany([
            { patente: "ABC123", marca: "Renault", modelo: "A1",año: "2022",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "JKL8956", marca: "Mercedes", modelo: "Z5",año: "2023",volumen: 5.80, peso: 15000, tipoVehiculo: "Auto"}
        ]);
        const localizaciones = await Localizacion.insertMany([
            { calle: "Av. Rivadavia", número: "123", localidad: "Morón",coordenadasGeograficas: "ABC",provinciaOestado: "Buenos Aires", país: "Argentina", depositos: []},
            { calle: "Av. Cardenal José María Caro", número: "400", localidad: "Conchalí",coordenadasGeograficas: "DEF",provinciaOestado: "Región Metropolitana", país: "Chile", depositos: []}
        ]);
        const depositos = await Deposito.insertMany([
            { tipo: "Externo", horarios: "Lunes a viernes de 8.30h a 17.00h", contacto: "1552847596", localizaciones: []},
            { tipo: "Propio", horarios: "miércoles a domingos de 8.00h a 18.00h", contacto: "1544841296", localizaciones: []}
        ]);
        const asignaciones = await Asignacion.insertMany([
            { cuilChofer: "27456789451", patenteVehiculo: "ABC123", fechaAsignacion:  new Date(2025, 5, 16), vehiculoPropio: true},
            { cuilChofer: "20456789452", patenteVehiculo: "JKL8956", fechaAsignacion: new Date(2025, 4, 20),vehiculoPropio: false}
        ]);
        const viajes = await Viaje.insertMany([
            { inicioViaje: new Date(2025, 5, 16, 15, 20), llegadaViaje: new Date(2025, 5, 16, 16, 20), estado:"Planificado"},
            { inicioViaje: new Date(2025, 5, 16, 14, 30), llegadaViaje: new Date(2025, 5, 16, 15, 20), estado:"Cancelado"}
        ])

        // Actualizar choferes de empresa

        empresas[0].choferes.push(choferes[0]._id);
        empresas[1].choferes.push(choferes[1]._id);
        await empresas[0].save();
        await empresas[1].save();

        // Actualizar empresas de choferes

        choferes[0].empresas.push(empresas[0]._id);
        choferes[1].empresas.push(empresas[1]._id);
        await choferes[0].save();
        await choferes[1].save();

        // Actualizar localizaciones de depositos

        depositos[0].localizaciones.push(localizaciones[0]._id);
        depositos[1].localizaciones.push(localizaciones[1]._id);
        await depositos[0].save();
        await depositos[1].save();

        // Actualizar  depositos de localizaciones 

        localizaciones[0].depositos.push(depositos[0]._id);
        localizaciones[1].depositos.push(depositos[1]._id);
        await localizaciones[0].save();
        await localizaciones[1].save();

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;
