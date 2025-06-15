const { Viaje } = require('../models');
const viajeController = {}
const mongoose = require('../db/server').mongoose;

//GET
const getViajes = async (req, res) => {
   const viajes = await Viaje.find()
        .populate('empresa_asignada', 'nombre_empresa -_id')
        .populate('deposito_origen', 'localizacion -_id')
        .populate('deposito_destino', 'localizacion -_id')
        .populate('chofer_asignado', 'nombre apellido -_id')
        .populate('vehiculo_asignado', 'patente -_id')
   res.status(200).json(viajes)
};
viajeController.getViajes = getViajes;

//GET BY id
const getViajeById = async (req, res) => {
    const id = req.id; // Ya viene del middleware
    res.status(200).json(id);
};
viajeController.getViajeById = getViajeById;

//POST
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

//PUT - Modificacion 

//PATCH - Baja Logica


module.exports = viajeController;