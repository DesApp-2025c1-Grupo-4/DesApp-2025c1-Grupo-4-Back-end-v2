const { DateTime, Zone } = require('luxon');
const mongoose = require('mongoose');
const {Empresa, Chofer, Vehiculo, Localizacion, Deposito, Asignacion, Viaje } = require('../models');


async function seedDatabase() {

    try {
    const indexes = await mongoose.connection.collection('counters').indexes();
    const indexToDelete = indexes.find(idx => idx.name === 'id_1_reference_value_1');
    
        if (indexToDelete) {
            await mongoose.connection.collection('counters').dropIndex('id_1_reference_value_1');
            // console.log('Índice id_1_reference_value_1 eliminado correctamente.');
        } else {
            console.log('Índice id_1_reference_value_1 no encontrado. Continuando...');
        }
    } catch (err) {
    console.error('Error al verificar o eliminar el índice:', err);
    }
    
    try {
        // Aquí se agrega el nombre de las tablas que tienen campo: _id de tipo: number.
        const entidades = ['Localizacion','Deposito','Asignacion','Viaje']
        // ✅ Reiniciamos el contador de mongoose-sequence
        for(entidad of entidades){
            await mongoose.connection.collection('counters').deleteOne({ _id: entidad});
            await mongoose.connection.collection('counters').deleteMany({ reference_value: null});
            await mongoose.connection.collection('counters').updateOne( 
                { _id: entidad },
                { $set: { seq: 0 } },
                { upsert: true } // crea si no existe
            );
        }

        const listaEntidades = [Empresa, Chofer, Vehiculo, Localizacion, Deposito, Asignacion, Viaje];
        for(tabla of listaEntidades){
            await tabla.deleteMany({});
        } 

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

        const datosDeposito = [
            { tipo: "Externo", horarios: "Lunes a viernes de 8.30h a 17.00h", contacto: "1552847596", localizacion: null},
            { tipo: "Propio", horarios: "miércoles a domingos de 8.00h a 18.00h", contacto: "1544841296", localizacion: null}
        ];

        // Insertar uno por uno usando .save() para que mongoose-sequence funcione
        const depositos = [];
        for (const entrada of datosDeposito) {
            const doc = new Deposito(entrada);
            const savedDoc = await doc.save();
            depositos.push(savedDoc);
        }

        const datosAsignacion = [
            { fechaAsignacion: new Date(2025, 5, 16), vehiculoPropio: true, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 20), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null}
        ];

        const asignaciones = [];
        for (const dato of datosAsignacion){
            const asignacionNueva = new Asignacion(dato);
            const guardarAsignacionNueva = await asignacionNueva.save();
            asignaciones.push(guardarAsignacionNueva)
        }

        const datosViaje = [
            { inicioViaje: new Date(2025, 5, 16, 15, 20), llegadaViaje: new Date(2025, 5, 16, 16, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 5, 16, 14, 30), llegadaViaje: new Date(2025, 5, 16, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null}
        ]

        const viajes = [];
        for (const entrada of datosViaje) {
            const doc = new Viaje(entrada);
            const savedDoc = await doc.save();
            viajes.push(savedDoc);
        }

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

        // Actualizar asignaciones de Choferes
        choferes[0].asignaciones.push(Number(asignaciones[0]._id));
        choferes[1].asignaciones.push(Number(asignaciones[1]._id));
        await choferes[0].save();
        await choferes[1].save();

        // Actualizar localizaciones de viajes
        viajes[0].depositoOrigen = Number(depositos[0]._id);
        await viajes[0].save();
        viajes[0].depositoDestino = Number(depositos[1]._id);
        await viajes[0].save();
        viajes[1].depositoOrigen = Number(depositos[1]._id);
        await viajes[1].save();
        viajes[1].depositoDestino = Number(depositos[0]._id);
        await viajes[1].save();

        // Actualizar asignaciones de viajes
        viajes[0].asignacion = Number(asignaciones[0]._id);
        viajes[1].asignacion = Number(asignaciones[1]._id);
        await viajes[0].save();
        await viajes[1].save();

        // Actualizar viajes de asignaciones
        asignaciones[0].viaje = viajes[0]._id;
        await asignaciones[0].save();
        asignaciones[1].viaje = viajes[1]._id;
        await asignaciones[1].save();

        // Actualizar vehiculos de asignaciones
        asignaciones[0].vehiculo = vehiculos[0]._id;
        await asignaciones[0].save();
        asignaciones[1].vehiculo = vehiculos[1]._id;
        await asignaciones[1].save();
        
        // Actualizar choferes de asignaciones
        asignaciones[0].chofer = choferes[0]._id;
        await asignaciones[0].save();
        asignaciones[1].chofer = choferes[1]._id;
        await asignaciones[1].save();

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;