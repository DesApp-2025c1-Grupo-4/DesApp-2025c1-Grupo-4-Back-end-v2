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
            { cuit: "30456789452", razonSocial: "Techin", domicilio: "Arena3654",contacto: "123456790", choferes:[]},
            { cuit: "30456789453", razonSocial: "Transporte del Sur", domicilio: "Arena3656",contacto: "123456791", choferes:[]},
            { cuit: "30456789454", razonSocial: "Cargas Norte", domicilio: "Arena3657",contacto: "123456792", choferes:[]},
            { cuit: "30456789455", razonSocial: "Logística Andina", domicilio: "Arena3658",contacto: "123456793", choferes:[]},
            { cuit: "30456789456", razonSocial: "Ruta Federal", domicilio: "Arena3659",contacto: "123456794", choferes:[]},
            { cuit: "30456789457", razonSocial: "Transporte del Este", domicilio: "Arena3660",contacto: "123456795", choferes:[]},
            { cuit: "30456789458", razonSocial: "Express Norte", domicilio: "Arena3661",contacto: "123456796", choferes:[]},
            { cuit: "30456789459", razonSocial: "Transporte del Norte", domicilio: "Arena3662",contacto: "123456797", choferes:[]},
            { cuit: "30456789460", razonSocial: "Transporte del Oeste", domicilio: "Arena3663",contacto: "123456798", choferes:[]}
        ]);
        const choferes = await Chofer.insertMany([
            { cuil: "27456789451", apellido: "Torres", nombre: "Marcelo",contacto: "153456789",fechaNacimiento: new Date(1988, 2, 6), empresa: null, asignaciones:[]},
            { cuil: "20456789452", apellido: "Herenu", nombre: "Luis",contacto: "153456791",fechaNacimiento: new Date(1988, 3, 6), empresa: null, asignaciones:[]},
            { cuil: "20456789462", apellido: "Gomez", nombre: "José",contacto: "153456792",fechaNacimiento: new Date(1989, 4, 6), empresa: null, asignaciones:[]},
            { cuil: "20456789472", apellido: "Martínez", nombre: "Mariano",contacto: "153456793",fechaNacimiento: new Date(1989, 5, 6), empresa: null, asignaciones:[]},
            { cuil: "20456789482", apellido: "Fernández", nombre: "Mario",contacto: "153456794",fechaNacimiento: new Date(1988, 8, 6), empresa: null, asignaciones:[]},
            { cuil: "20456789492", apellido: "López", nombre: "Ana",contacto: "153456795",fechaNacimiento: new Date(1988, 9, 6), empresa: null, asignaciones:[]}            
        ]);
        const vehiculos = await Vehiculo.insertMany([
            { patente: "ABC123", marca: "Renault", modelo: "A1",año: "2022",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "JKL8956", marca: "Mercedes", modelo: "Z5",año: "2023",volumen: 5.80, peso: 15000, tipoVehiculo: "Auto"},
            { patente: "JHK8957", marca: "Ford", modelo: "Z1",año: "2024",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "TKL8046", marca: "Chevrolet", modelo: "J6",año: "2024",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "AKL8156", marca: "Mercedes", modelo: "T7",año: "2022",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "YKL8256", marca: "Mercedes", modelo: "R6",año: "2021",volumen: 75.30, peso: 40000, tipoVehiculo: "Camión"},
            { patente: "RKL8956", marca: "Ford", modelo: "R4",año: "2020",volumen: 5.80, peso: 15000, tipoVehiculo: "Auto"}
        ]);
        const datosLocalizacion = [
            {calle: "Av. Rivadavia", número: "123", localidad: "Morón",coordenadasGeograficas: "ABC",provinciaOestado: "Buenos Aires", país: "Argentina"},
            {calle: "Av. Cardenal José María Caro", número: "400", localidad: "Conchalí",coordenadasGeograficas: "DEF",provinciaOestado: "Región Metropolitana", país: "Chile"},
            {calle: "Av. Riva", número: "800", localidad: "Santiago",coordenadasGeograficas: "AGG",provinciaOestado: "Santiago", país: "Chile"},
            {calle: "Av. Cardenal", número: "500", localidad: "Santiago",coordenadasGeograficas: "DEF",provinciaOestado: "Santiago", país: "Chile"},
            {calle: "Av. San Martin", número: "400", localidad: "CABA",coordenadasGeograficas: "ACC",provinciaOestado: "CABA", país: "Argentina"},
            {calle: "Av. 9 de Julio", número: "700", localidad: "Avellaneda",coordenadasGeograficas: "CCR",provinciaOestado: "Buenos Aires", país: "Argentina"}
        ];
        // Insertar uno por uno usando .save() para que mongoose-sequence funcione
        const localizaciones = [];
        for (const entrada of datosLocalizacion) {
            const doc = new Localizacion(entrada);
            const savedDoc = await doc.save();
            localizaciones.push(savedDoc);
        }

        const datosDeposito = [
            { tipo: "Terceros", horarios: "Lunes a viernes de 8.30h a 17.00h", contacto: "1552847596", localizacion: null},
            { tipo: "Propio", horarios: "miércoles a domingos de 8.00h a 18.00h", contacto: "1544841296", localizacion: null},
            { tipo: "Terceros", horarios: "Lunes a Sábados de 9.00h a 17.00h", contacto: "1544841297", localizacion: null},
            { tipo: "Propio", horarios: "Martes a domingos de 9.00h a 18.00h", contacto: "1544841298", localizacion: null},
            { tipo: "Terceros", horarios: "Martes a Sábados de 8.00h a 17.00h", contacto: "1544841299", localizacion: null},
            { tipo: "Propio", horarios: "Lunes a domingos de 7.00h a 17.00h", contacto: "1544841291", localizacion: null}
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
            { fechaAsignacion: new Date(2025, 4, 20), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 21), vehiculoPropio: true, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 22), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 23), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 24), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 25), vehiculoPropio: true, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 26), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 27), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 28), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 29), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 4, 30), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null},
            { fechaAsignacion: new Date(2025, 5, 1), vehiculoPropio: false, chofer:null, vehiculo:null, viaje:null}
        ];

        const asignaciones = [];
        for (const dato of datosAsignacion){
            const asignacionNueva = new Asignacion(dato);
            const guardarAsignacionNueva = await asignacionNueva.save();
            asignaciones.push(guardarAsignacionNueva)
        }

        const datosViaje = [
            { inicioViaje: new Date(2025, 5, 16, 15, 20), llegadaViaje: new Date(2025, 5, 16, 16, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 20, 14, 30), llegadaViaje: new Date(2025, 4, 21, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 21, 14, 30), llegadaViaje: new Date(2025, 4, 23, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 22, 14, 30), llegadaViaje: new Date(2025, 4, 23, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 23, 14, 30), llegadaViaje: new Date(2025, 4, 24, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 24, 14, 30), llegadaViaje: new Date(2025, 4, 26, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 25, 14, 30), llegadaViaje: new Date(2025, 4, 26, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 26, 14, 30), llegadaViaje: new Date(2025, 4, 27, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 27, 14, 30), llegadaViaje: new Date(2025, 4, 27, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 28, 14, 30), llegadaViaje: new Date(2025, 4, 29, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 29, 14, 30), llegadaViaje: new Date(2025, 4, 29, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 4, 30, 14, 30), llegadaViaje: new Date(2025, 4, 30, 15, 20), estado:"Cancelado", depositoOrigen: null, depositoDestino:null, asignacion: null},
            { inicioViaje: new Date(2025, 5, 1, 14, 30), llegadaViaje: new Date(2025, 5, 2, 15, 20), estado:"Planificado", depositoOrigen: null, depositoDestino:null, asignacion: null}
        ]

        const viajes = [];
        for (const entrada of datosViaje) {
            const doc = new Viaje(entrada);
            const savedDoc = await doc.save();
            viajes.push(savedDoc);
        }

        // Actualizar choferes de empresa

        empresas[0].choferes.push(choferes[0]._id);
        await empresas[0].save();
        empresas[1].choferes.push(choferes[1]._id);
        await empresas[1].save();
        empresas[2].choferes.push(choferes[2]._id);
        await empresas[2].save();
        empresas[3].choferes.push(choferes[3]._id);
        await empresas[3].save();
        empresas[4].choferes.push(choferes[4]._id);
        await empresas[4].save();
        empresas[5].choferes.push(choferes[5]._id);
        await empresas[5].save();
        empresas[6].choferes.push(choferes[1]._id);
        await empresas[6].save();
        empresas[7].choferes.push(choferes[2]._id);
        await empresas[7].save();
        empresas[8].choferes.push(choferes[3]._id);
        await empresas[8].save();
        empresas[9].choferes.push(choferes[4]._id);
        await empresas[9].save();

        // Actualizar empresas de choferes

        choferes[0].empresa = empresas[0]._id;
        await choferes[0].save();
        choferes[1].empresa = empresas[1]._id;
        choferes[1].empresa = empresas[6]._id;
        await choferes[1].save();
        choferes[2].empresa = empresas[2]._id;
        choferes[2].empresa = empresas[7]._id;
        await choferes[2].save();
        choferes[3].empresa = empresas[3]._id;
        choferes[3].empresa = empresas[8]._id;
        await choferes[3].save();
        choferes[4].empresa = empresas[4]._id;
        choferes[4].empresa = empresas[9]._id;
        await choferes[4].save();
        choferes[5].empresa = empresas[5]._id;
        await choferes[5].save();

        // Actualizar localizaciones de depositos

        depositos[0].localizacion = localizaciones[0]._id;
        await depositos[0].save();
        depositos[1].localizacion = localizaciones[1]._id;
        await depositos[1].save();
        depositos[2].localizacion = localizaciones[2]._id;
        await depositos[2].save();
        depositos[3].localizacion = localizaciones[3]._id;
        await depositos[3].save();
        depositos[4].localizacion = localizaciones[4]._id;
        await depositos[4].save();
        depositos[5].localizacion = localizaciones[5]._id;
        await depositos[5].save();

        // Actualizar asignaciones de Choferes
        choferes[0].asignaciones.push(Number(asignaciones[0]._id));
        choferes[0].asignaciones.push(Number(asignaciones[2]._id));
        choferes[0].asignaciones.push(Number(asignaciones[6]._id));
        await choferes[0].save();
        choferes[1].asignaciones.push(Number(asignaciones[1]._id));
        choferes[1].asignaciones.push(Number(asignaciones[12]._id));
        await choferes[1].save();
        choferes[2].asignaciones.push(Number(asignaciones[3]._id));
        choferes[2].asignaciones.push(Number(asignaciones[11]._id));
        await choferes[2].save();
        choferes[3].asignaciones.push(Number(asignaciones[4]._id));
        choferes[3].asignaciones.push(Number(asignaciones[10]._id));
        await choferes[3].save();
        choferes[4].asignaciones.push(Number(asignaciones[5]._id));
        choferes[4].asignaciones.push(Number(asignaciones[8]._id));
        await choferes[4].save();
        choferes[5].asignaciones.push(Number(asignaciones[7]._id));
        choferes[5].asignaciones.push(Number(asignaciones[9]._id));
        await choferes[5].save();

        // Actualizar localizaciones de viajes
        viajes[0].depositoOrigen = Number(depositos[0]._id);
        viajes[0].depositoDestino = Number(depositos[1]._id);
        await viajes[0].save();
        viajes[1].depositoOrigen = Number(depositos[4]._id);
        viajes[1].depositoDestino = Number(depositos[5]._id);
        await viajes[1].save();
        viajes[2].depositoOrigen = Number(depositos[5]._id);
        viajes[2].depositoDestino = Number(depositos[0]._id);
        await viajes[2].save();
        viajes[3].depositoOrigen = Number(depositos[0]._id);
        viajes[3].depositoDestino = Number(depositos[2]._id);
        await viajes[3].save();
        viajes[4].depositoOrigen = Number(depositos[4]._id);
        viajes[4].depositoDestino = Number(depositos[1]._id);
        await viajes[4].save();
        viajes[5].depositoOrigen = Number(depositos[5]._id);
        viajes[5].depositoDestino = Number(depositos[3]._id);
        await viajes[5].save();
        viajes[6].depositoOrigen = Number(depositos[0]._id);
        viajes[6].depositoDestino = Number(depositos[4]._id);
        await viajes[6].save();
        viajes[7].depositoOrigen = Number(depositos[4]._id);
        viajes[7].depositoDestino = Number(depositos[3]._id);
        await viajes[7].save();
        viajes[8].depositoOrigen = Number(depositos[5]._id);
        viajes[8].depositoDestino = Number(depositos[1]._id);
        await viajes[8].save();
        viajes[9].depositoOrigen = Number(depositos[0]._id);
        viajes[9].depositoDestino = Number(depositos[3]._id);
        await viajes[9].save();
        viajes[10].depositoOrigen = Number(depositos[4]._id);
        viajes[10].depositoDestino = Number(depositos[2]._id);
        await viajes[10].save();
        viajes[11].depositoOrigen = Number(depositos[5]._id);
        viajes[11].depositoDestino = Number(depositos[2]._id);
        await viajes[11].save();
        viajes[12].depositoOrigen = Number(depositos[5]._id);
        viajes[12].depositoDestino = Number(depositos[4]._id);
        await viajes[12].save();
    

        // Actualizar asignaciones de viajes
        viajes[0].asignacion = Number(asignaciones[0]._id);
        await viajes[0].save();
        viajes[1].asignacion = Number(asignaciones[1]._id);
        await viajes[1].save();
        viajes[2].asignacion = Number(asignaciones[2]._id);
        await viajes[2].save();
        viajes[3].asignacion = Number(asignaciones[3]._id);
        await viajes[3].save();
        viajes[4].asignacion = Number(asignaciones[4]._id);
        await viajes[4].save();
        viajes[5].asignacion = Number(asignaciones[5]._id);
        await viajes[5].save();
        viajes[6].asignacion = Number(asignaciones[6]._id);
        await viajes[6].save();
        viajes[7].asignacion = Number(asignaciones[7]._id);
        await viajes[7].save();
        viajes[8].asignacion = Number(asignaciones[8]._id);
        await viajes[8].save();
        viajes[9].asignacion = Number(asignaciones[9]._id);
        await viajes[9].save();
        viajes[10].asignacion = Number(asignaciones[10]._id);
        await viajes[10].save();
        viajes[11].asignacion = Number(asignaciones[11]._id);
        await viajes[11].save();
        viajes[12].asignacion = Number(asignaciones[12]._id);
        await viajes[12].save();

        // Actualizar viajes de asignaciones
        asignaciones[0].viaje = viajes[0]._id;
        await asignaciones[0].save();
        asignaciones[1].viaje = viajes[1]._id;
        await asignaciones[1].save();
        asignaciones[2].viaje = viajes[2]._id;
        await asignaciones[2].save();
        asignaciones[3].viaje = viajes[3]._id;
        await asignaciones[3].save();
        asignaciones[4].viaje = viajes[4]._id;
        await asignaciones[4].save();
        asignaciones[5].viaje = viajes[5]._id;
        await asignaciones[5].save();
        asignaciones[6].viaje = viajes[6]._id;
        await asignaciones[6].save();
        asignaciones[7].viaje = viajes[7]._id;
        await asignaciones[7].save();
        asignaciones[8].viaje = viajes[8]._id;
        await asignaciones[8].save();
        asignaciones[9].viaje = viajes[9]._id;
        await asignaciones[9].save();
        asignaciones[10].viaje = viajes[10]._id;
        await asignaciones[10].save();
        asignaciones[11].viaje = viajes[11]._id;
        await asignaciones[11].save();
        asignaciones[12].viaje = viajes[12]._id;
        await asignaciones[12].save();

        // Actualizar vehiculos de asignaciones
        asignaciones[0].vehiculo = vehiculos[1]._id;
        await asignaciones[0].save();
        asignaciones[2].vehiculo = vehiculos[1]._id;
        await asignaciones[2].save();
        asignaciones[6].vehiculo = vehiculos[1]._id;
        await asignaciones[6].save();
        asignaciones[1].vehiculo = vehiculos[0]._id;
        await asignaciones[1].save();
        asignaciones[12].vehiculo = vehiculos[0]._id;
        await asignaciones[12].save();
        asignaciones[3].vehiculo = vehiculos[2]._id;
        await asignaciones[3].save();
        asignaciones[11].vehiculo = vehiculos[2]._id;
        await asignaciones[11].save();
        asignaciones[4].vehiculo = vehiculos[3]._id;
        await asignaciones[4].save();
        asignaciones[10].vehiculo = vehiculos[3]._id;
        await asignaciones[10].save();
        asignaciones[5].vehiculo = vehiculos[4]._id;
        await asignaciones[5].save();
        asignaciones[8].vehiculo = vehiculos[4]._id;
        await asignaciones[8].save();
        asignaciones[7].vehiculo = vehiculos[5]._id;
        await asignaciones[7].save();
        asignaciones[9].vehiculo = vehiculos[5]._id;
        await asignaciones[9].save();
        
        // Actualizar choferes de asignaciones
        asignaciones[0].chofer = choferes[0]._id;
        await asignaciones[0].save();
        asignaciones[1].chofer = choferes[1]._id;
        await asignaciones[1].save();
        asignaciones[2].chofer = choferes[0]._id;
        await asignaciones[2].save();
        asignaciones[3].chofer = choferes[2]._id;
        await asignaciones[3].save();
        asignaciones[4].chofer = choferes[3]._id;
        await asignaciones[4].save();
        asignaciones[5].chofer = choferes[4]._id;
        await asignaciones[5].save();
        asignaciones[6].chofer = choferes[0]._id;
        await asignaciones[6].save();
        asignaciones[7].chofer = choferes[5]._id;
        await asignaciones[7].save();
        asignaciones[8].chofer = choferes[4]._id;
        await asignaciones[8].save();
        asignaciones[9].chofer = choferes[5]._id;
        await asignaciones[9].save();
        asignaciones[10].chofer = choferes[3]._id;
        await asignaciones[10].save();
        asignaciones[11].chofer = choferes[2]._id;
        await asignaciones[11].save();
        asignaciones[12].chofer = choferes[1]._id;
        await asignaciones[12].save();

        console.log("Base de datos poblada con éxito");

    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
}

module.exports = seedDatabase;