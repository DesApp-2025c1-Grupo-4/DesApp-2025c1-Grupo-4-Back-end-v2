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
    try {
        const { detalles } = req.query; // Capturamos el parámetro query
        let viajesQuery = Viaje.find().select('-asignacion -depositoOrigen -depositoDestino');
        if (detalles === "true") {
            viajesQuery = viajesQuery.populate([
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
                                path: "empresa",
                                select: "razonSocial"
                            }
                        },
                        {
                            path: "vehiculo",
                            select: "patente -_id"
                        }
                    ]
                }
            ]);
        }

        const viajes = await viajesQuery;

        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los viajes", details: error.message });
    }
};

viajeController.getViajes = getViajes;

const getViajeById = async (req, res) => {
    const id = req.id; // Ya viene del middleware
    res.status(200).json(id);
};
viajeController.getViajeById = getViajeById;

module.exports = viajeController;