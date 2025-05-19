const { DateTime, Zone } = require('luxon');
const {Empresa} = require('../models');
const {Chofer} = require('../models');
const {Vehiculo} = require('../models');
const {Localizacion} = require('../models');
const {Deposito} = require('../models');
const {Asignacion} = require('../models');
const {Viaje} = require('../models');
const mongoose = require('mongoose');


async function seedDatabase() {
    try {
        // ✅ Reiniciamos el contador de mongoose-sequence
        await mongoose.connection.collection('counters').deleteOne({ _id: 'Localizacion' });
        await mongoose.connection.collection('counters').updateOne(
            { _id: 'Localizacion' },
            { $set: { seq: 0 } },
            { upsert: true } // crea si no existe
    );
        
        // Se borra el contenido de las tablas.
        
        await Empresa.deleteMany({});
        await Chofer.deleteMany({});
        await Vehiculo.deleteMany({});
        await Localizacion.deleteMany({});
        await Deposito.deleteMany({});
        await Asignacion.deleteMany({});
        await Viaje.deleteMany({});
        


        // Se cargan los datos de las tablas.

        const empresas = await Empresa.insertMany([
            { cuit: "30456789451", razonSocial: "Arcor", domicilio: "Arena3655",contacto: "123456789", choferes:[]},
            { cuit: "30456789452", razonSocial: "Techin", domicilio: "Arena3654",contacto: "123456790", choferes:[]}
        ]);
        const choferes = await Chofer.insertMany([
            { cuil: "27456789451", apellido: "Torres", nombre: "Marcelo",contacto: "153456789",fechaNacimiento: new Date(1988, 2, 6), empresa: null, asignaciones:[]},
            { cuil: "20456789452", apellido: "Herenu", nombre: "Luis",contacto: "153456790",fechaNacimiento: new Date(1988, 3, 6), empresa: null, asignaciones:[]}
        ]);
        const vehiculos = await Vehiculo.insertMany([
            { patente: "ABC123", marca: "Renault", modelo: "A1",año: "2022",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "JKL8956", marca: "Mercedes", modelo: "Z5",año: "2023",volumen: 5.80, peso: 15000, tipoVehiculo: "Auto"}
        ]);
        /*const localizaciones = await Localizacion.insertMany([
            {calle: "Av. Rivadavia", número: "123", localidad: "Morón",coordenadasGeograficas: "ABC",provinciaOestado: "Buenos Aires", país: "Argentina"},
            {calle: "Av. Cardenal José María Caro", número: "400", localidad: "Conchalí",coordenadasGeograficas: "DEF",provinciaOestado: "Región Metropolitana", país: "Chile"}
        ]);*/
        const datosLocalizacion = [
            {calle: "Av. Rivadavia", número: "123", localidad: "Morón",coordenadasGeograficas: "ABC",provinciaOestado: "Buenos Aires", país: "Argentina"},
            {calle: "Av. Cardenal José María Caro", número: "400", localidad: "Conchalí",coordenadasGeograficas: "DEF",provinciaOestado: "Región Metropolitana", país: "Chile"}
        ];
        // Insertar uno por uno usando .save() para que mongoose-sequence funcione
        const localizaciones = [];
        for (const entrada of datosLocalizacion) {
            const doc = new Localizacion(entrada);
            const savedDoc = await doc.save();
            localizaciones.push(savedDoc);
        }

        const depositos = await Deposito.insertMany([
            { tipo: "Externo", horarios: "Lunes a viernes de 8.30h a 17.00h", contacto: "1552847596", localizacion: null},
            { tipo: "Propio", horarios: "miércoles a domingos de 8.00h a 18.00h", contacto: "1544841296", localizacion: null}
        ]);
        const asignaciones = await Asignacion.insertMany([
            { fechaAsignacion: new Date(2025, 5, 16), vehiculoPropio: true, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 20), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null}
        ]);
        const viajes = await Viaje.insertMany([
            { inicioViaje: new Date(2025, 5, 16, 15, 20), llegadaViaje: new Date(2025, 5, 16, 16, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 5, 16, 14, 30), llegadaViaje: new Date(2025, 5, 16, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null}
        ])

        // Actualizar choferes de empresa

        empresas[0].choferes.push(choferes[0]._id);
        empresas[1].choferes.push(choferes[1]._id);
        await empresas[0].save();
        await empresas[1].save();

        // Actualizar empresas de choferes

        choferes[0].empresa = empresas[0]._id;
        await choferes[0].save();
        choferes[1].empresa = empresas[1]._id;
        await choferes[1].save();

        // Actualizar localizaciones de depositos

        depositos[0].localizacion = localizaciones[0]._id;
        await depositos[0].save();
        depositos[1].localizacion = localizaciones[1]._id;
        await depositos[1].save();

        // Actualizar choferes de asignaciones
        asignaciones[0].chofer = choferes[0]._id;
        await asignaciones[0].save();
        asignaciones[1].chofer = choferes[1]._id;
        await asignaciones[1].save();

        // Actualizar asignaciones de Choferes
        choferes[0].asignaciones.push(asignaciones[0]._id);
        choferes[1].asignaciones.push(asignaciones[1]._id);
        await choferes[0].save();
        await choferes[1].save();

        // Actualizar vehiculos de asignaciones
        asignaciones[0].vehiculo = vehiculos[0]._id;
        await asignaciones[0].save();
        asignaciones[1].vehiculo = vehiculos[1]._id;
        await asignaciones[1].save();

        // Actualizar localizaciones de viajes
        viajes[0].depositoOrigen = depositos[0]._id;
        viajes[0].depositoDestino = depositos[1]._id;
        await viajes[0].save();
        viajes[1].depositoOrigen = depositos[1]._id;
        viajes[1].depositoDestino = depositos[0]._id;
        await viajes[1].save();

        // Actualizar asignaciones de viajes
        viajes[0].asignacion = asignaciones[0]._id;
        await viajes[0].save();
        viajes[1].asignacion = asignaciones[1]._id;
        await viajes[1].save();

        // Actualizar viajes de asignaciones
        asignaciones[0].viaje = viajes[0]._id;
        await asignaciones[0].save();
        asignaciones[1].viaje = viajes[1]._id;
        await asignaciones[1].save();

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;
