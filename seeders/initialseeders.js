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
            { cuit: "30456789451", razonSocial: "Arcor", domicilio: "Arena3655",contacto: "123456789"},
            { cuit: "30456789452", razonSocial: "Techin", domicilio: "Arena3654",contacto: "123456790"}
        ]);
        const choferes = await Chofer.insertMany([
            { cuil: "27456789451", apellido: "Torres", nombre: "Marcelo",contacto: "153456789",fechaNacimiento: new Date(1988, 2, 6)},
            { cuil: "20456789452", apellido: "Herenu", nombre: "Luis",contacto: "153456790",fechaNacimiento: new Date(1988, 3, 6)}
        ]);
        const vehiculos = await Vehiculo.insertMany([
            { patente: "ABC123", marca: "Renault", modelo: "A1",año: "2022",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "JKL8956", marca: "Mercedes", modelo: "Z5",año: "2023",volumen: 5.80, peso: 15000, tipoVehiculo: "Auto"}
        ]);
        const localizaciones = await Localizacion.insertMany([
            { calle: "Av. Rivadavia", número: "123", localidad: "Morón",coordenadasGeograficas: "ABC",provinciaOestado: "Buenos Aires", país: "Argentina"},
            { calle: "Av. Cardenal José María Caro", número: "400", localidad: "Conchalí",coordenadasGeograficas: "DEF",provinciaOestado: "Región Metropolitana", país: "Chile"}
        ]);
        const depositos = await Deposito.insertMany([
            { tipo: "Externo", horarios: "Lunes a viernes de 8.30h a 17.00h", contacto: "1552847596"},
            { tipo: "Propio", horarios: "miércoles a domingos de 8.00h a 18.00h", contacto: "1544841296"}
        ]);
        const asignaciones = await Asignacion.insertMany([
            { cuilChofer: "27456789451", patenteVehiculo: "ABC123", fechaAsignacion:  new Date(2025, 5, 16), vehiculoPropio: true},
            { cuilChofer: "20456789452", patenteVehiculo: "JKL8956", fechaAsignacion: new Date(2025, 4, 20),vehiculoPropio: false}
        ]);
        const viajes = await Viaje.insertMany([
            { inicioViaje: new Date(2025, 5, 16, 15, 20), llegadaViaje: new Date(2025, 5, 16, 16, 20), estado:"Planificado"},
            { inicioViaje: new Date(2025, 5, 16, 14, 30), llegadaViaje: new Date(2025, 5, 16, 15, 20), estado:"Cancelado"}
        ])

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;
