const mongoose = require('mongoose')
const {Empresa, Chofer, Vehiculo, Deposito, Viaje } = require('../models');

async function SeedDatabase() {

    //Borramos las tablas si ya existen
    const limpiarBDD = async () => {
    try {
        await Empresa.deleteMany({});
        await Chofer.deleteMany({});
        await Vehiculo.deleteMany({});
        await Deposito.deleteMany({});
        await Viaje.deleteMany({});
        console.log('Base de datos vaciada');
    } catch (err) {
        console.error('Error al limpiar base de datos:', err);
    }
    };

    //Popular empresas
    const SeedEmpresas = async () => {
        const empresas = [
        {
            nombre_empresa: 'Transportes Argentinos S.A.',
            cuit_rut: '30-12345678-9',
            domicilio_fiscal: {
                calle: 'Av. Corrientes 1234',
                ciudad: 'Buenos Aires',
                provincia: 'CABA',
                pais: 'Argentina'
            },
            datos_contacto: {
                telefono: '1122334455',
                mail: 'contacto@transportesarg.com.ar'
            },
            activo: true
            },
            {
                nombre_empresa: 'Prots S.R.L.',
                cuit_rut: '30-71167184-2',
                domicilio_fiscal: {
                    calle: 'Pedro Reta 36',
                    ciudad: 'Monte Grande',
                    provincia: 'Provincia de Buenos Aires',
                    pais: 'Argentina'
            },
            datos_contacto: {
                telefono: '1166531402',
                mail: 'comercial@prots.com.ar'
            },
            activo: true
            }
        ];

        const empresasCreadas = await Empresa.insertMany(empresas);
        console.log(`${empresasCreadas.length} empresas creadas`);
        return empresasCreadas;
    };

    // Popular vehiculos
    const SeedVehiculos = async (empresas) => {
    const vehiculos = [
        {
        empresa: empresas[0]._id,
        patente: 'AA123BC',
        marca: 'Scania',
        modelo: 'R450',
        anio: 2020,
        capacidad_carga: {
            volumen: 80,
            peso: 40000
        },
        tipo_vehiculo: 'Camión',
        activo: true
        },
        {
        empresa: empresas[1]._id,
        patente: 'AB456CD',
        marca: 'Mercedes-Benz',
        modelo: 'Actros',
        anio: 2021,
        capacidad_carga: {
            volumen: 70,
            peso: 38000
        },
        tipo_vehiculo: 'Camión',
        activo: true
        },
        {
        empresa: empresas[1]._id,
        patente: 'AF600AA',
        marca: 'Scania',
        modelo: 'V8',
        anio: 2025,
        capacidad_carga: {
            volumen: 90,
            peso: 48000
        },
        tipo_vehiculo: 'Camión',
        activo: true
        },];

        const vehiculosCreados = await Vehiculo.insertMany(vehiculos);
        console.log(`${vehiculosCreados.length} vehiculos creados`);
        return vehiculosCreados;
    };
    
    // Popular depositos
    const SeedDepositos = async (empresas) => {
        const depositos = [
            {
                localizacion: {
                    direccion: 'Av. Industrial 1234',
                    provincia_estado: 'Buenos Aires',
                    ciudad: 'La Matanza',
                    pais: 'Argentina'
                },
                tipo: 'Propio',
                activo: true,
                personal_contacto: {
                    nombre: 'Roberto',
                    apellido: 'García',
                    telefono: '1144556677'
                },
                horarios: {
                    dias: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'],
                    desde: '08:00',
                    hasta: '18:00'
                },
            },
            {
                localizacion: {
                    direccion: 'Ruta 9 Km 25',
                    provincia_estado: 'Pilar',
                    ciudad: 'Pilar',
                    pais: 'Argentina'
                },
                tipo: 'Propio',
                activo: true,
                personal_contacto: {
                    nombre: 'María',
                    apellido: 'López',
                    telefono: '3515556677'
                },
                horarios: {
                    dias: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
                    desde: '07:00',
                    hasta: '20:00'
                },
            },
            {
                localizacion: {
                    direccion: 'Italia 168',
                    provincia_estado: 'CABA',
                    ciudad: 'Caballito',
                    pais: 'Argentina'
                },
                tipo: 'Tercerizado',
                activo: true,
                personal_contacto: {
                    nombre: 'Eduardo',
                    apellido: 'Rossetti',
                    telefono: '1122334455'
                },
                horarios: {
                    dias: ['lunes', 'martes'],
                    desde: '07:00',
                    hasta: '20:00'
                },
            },
            {
                localizacion: {
                    direccion: 'Don Bosco 4500',
                    provincia_estado: 'Provincia de Buenos Aires',
                    ciudad: 'Bahía Blanca',
                    pais: 'Argentina'
                },
                tipo: 'Tercerizado',
                activo: true,
                personal_contacto: {
                    nombre: 'Oscar',
                    apellido: 'Prete',
                    telefono: '1122334455'
                },
                horarios: {
                    dias: ['lunes', 'martes'],
                    desde: '08:00',
                    hasta: '23:00'
                },
            },
        ];

        const depositosCreados = await Deposito.insertMany(depositos);
        console.log(`${depositosCreados.length} depósitos creados`);
        return depositosCreados;
    };

     // Popular choferes
    const SeedChoferes = async (empresas, vehiculos) => {

        const choferes = [
        {
            nombre: 'Juan',
            apellido: 'Pérez',
            dni_identificacion: '30123456',
            fecha_nacimiento: new Date('1980-05-15'),
            empresa: empresas[0]._id,
            activo: true,
            vehiculo_defecto: vehiculos[0]._id,
            licencia: {
                numero: 'AB123456',
                tipos: ['C2', 'C3'],
                fecha_expiracion: '30/12/2025',
                documento: {
                    data: Buffer.from('sample-image-data'),
                    contentType: 'image/jpeg',
                    fileName: 'licencia_juan.jpg',
                    size: 1024
                }
            }
        },
        {
            nombre: 'Carlos',
            apellido: 'Gómez',
            dni_identificacion: '32987654',
            fecha_nacimiento: new Date('1975-10-22'),
            empresa: empresas[1]._id,
            activo: true,
            vehiculo_defecto: vehiculos[1]._id,
            licencia: {
                numero: 'CD789012',
                tipos: ['C1', 'C2'],
                fecha_expiracion: '15/06/2024',
                documento: {
                    data: Buffer.from('sample-image-data'),
                    contentType: 'image/png',
                    fileName: 'licencia_carlos.png',
                    size: 2048
                }
            }
        },
        {
            nombre: 'Juan',
            apellido: 'Herrera',
            dni_identificacion: '36797988',
            fecha_nacimiento: new Date('1992-10-14'),
            empresa: empresas[1]._id,
            activo: true,
            vehiculo_defecto: vehiculos[2]._id,
            licencia: {
                numero: 'CD789015',
                tipos: ['C1', 'C2'],
                fecha_expiracion: '15/06/2027',
                documento: {
                    data: Buffer.from('sample-image-data'),
                    contentType: 'image/png',
                    fileName: 'licencia_Juan.png',
                    size: 2048
                }
            }
        },];

        const choferesCreados = await Chofer.insertMany(choferes);
        console.log(`${choferesCreados.length} choferes creados`);
        return choferesCreados;
    };

    // Popular viajes
    const SeedViajes = async (empresas, depositos, vehiculos, choferes) => {
        const viajes = [
            {
            guid_viaje: 1001,
            deposito_origen: depositos[0]._id,
            deposito_destino: depositos[1]._id,
            inicio_viaje: '15/06/2023 08:00',
            fin_viaje: '15/06/2023 18:00',
            estado: 'planificado',
            empresa_asignada: empresas[0]._id,
            chofer_asignado: choferes[0]._id,
            vehiculo_asignado: vehiculos[0]._id
            },
            {
            guid_viaje: 1002,
            deposito_origen: depositos[1]._id,
            deposito_destino: depositos[0]._id,
            inicio_viaje: '16/06/2023 10:00',
            fin_viaje: '17/06/2023 02:00',
            estado: 'planificado',
            empresa_asignada: empresas[1]._id,
            chofer_asignado: choferes[1]._id,
            vehiculo_asignado: vehiculos[1]._id
            }
        ];

        const viajesCreados = await Viaje.insertMany(viajes);
        console.log(`${viajesCreados.length} viajes creados`);
        return viajesCreados;
    };

    // Orquestadora de seeding
    const seed = async () => {
        await limpiarBDD();
        
        const empresas = await SeedEmpresas();
        const depositos = await SeedDepositos(empresas);
        const vehiculos = await SeedVehiculos(empresas);
        const choferes = await SeedChoferes(empresas, vehiculos);
        const viajes = await SeedViajes(empresas, depositos, vehiculos, choferes);
        
        console.log('Base de datos poblada con éxito');
        };

        seed().catch(error => {
        console.error('Error al poblar la base de datos:', error);
    });
}

module.exports = SeedDatabase;