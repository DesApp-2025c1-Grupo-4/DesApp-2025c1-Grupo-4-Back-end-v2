const { Viaje } = require('../models');
const viajeController = {}
const mongoose = require('../db/server').mongoose;

const addViaje = async (req, res) => {
    const viajeInf = req.body
    try {
        const viaje = new Viaje(viajeInf)
        await viaje.save()
        res.status(201).json({ mensaje: 'El viaje fue agregado correctamente' })
    } catch {
        res.status(400).json({ mensaje: 'El servidor no puede procesar la solicitud' })
    }
}
viajeController.addViaje = addViaje;

const getViajes = async (req, res) => {
    const viaje = await Viaje.find()
    res.status(200).json(viaje)
}
viajeController.getViajes = getViajes;

const getViajeById = async (req, res) => {
    const id = req.id; // Ya viene del middleware
    res.status(200).json(id);
};
viajeController.getViajeById = getViajeById;

const asignacionDelViajeConId = async (req, res) => {
    const id = req.id;
    const asignacionDelViaje = await Viaje.findOne(id).populate([
        {
            path: "asignacion",
            model: "Asignacion",
            select: "-viaje",
            populate: {
                path: "chofer",
                select: "-empresa"
            }
        },
        {
            path: "asignacion",
            model: "Asignacion",
            select: "-viaje",
            populate: {
                path: "vehiculo",
                select: "patente -_id" //se debe seleccionar dentro del select el atributo de la tabla, espacios para agregar otros atributos
            }
        }
    ]);
    res.status(200).json(asignacionDelViaje)
};

viajeController.asignacionDelViajeConId = asignacionDelViajeConId;

const getListaDeViajes = async (req, res) => {
    try {
        const viajes = await Viaje.find().populate([
            {
                path: "depositoOrigen",
                model: "Deposito",
                select: "localizacion",
                populate: {
                    path: "localizacion",
                    select: "provinciaOestado país -_id"
                }
            },
            {
                path: "depositoDestino",
                model: "Deposito",
                select: "localizacion",
                populate: {
                    path: "localizacion",
                    select: "provinciaOestado país -_id"
                }
            },
            {
                path: "asignacion",
                model: "Asignacion",
                select: "-viaje",
                populate: [
                    {
                        path: "chofer",
                        select: "nombre apellido empresa",
                        populate: {
                            path: "empresa", // Aquí poblas empresa dentro de chofer
                            select: "razonSocial" // Solo traemos la razón social
                        }
                    },
                    {
                        path: "vehiculo",
                        select: "patente -_id"
                    }
                ]
            }

        ]);

        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de viajes", details: error.message });
    }
};
viajeController.getListaDeViajes = getListaDeViajes;


module.exports = viajeController;