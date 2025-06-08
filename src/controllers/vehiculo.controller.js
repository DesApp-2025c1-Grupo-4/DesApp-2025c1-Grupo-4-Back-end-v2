const {Vehiculo} = require('../models');
const vehiculoController = {}
const mongoose = require('../db/server').mongoose;

const addVehiculo = async (req,res) => {
    const vehiculoInf = req.body
    try{
        const vehiculo = new Vehiculo(vehiculoInf)
        await vehiculo.save()
        res.status(201).json({mensaje : 'El vehiculo fue agregado correctamente'})
    } catch {
        res.status(400).json({mensaje : 'El servidor no puede procesar la solicitud para post en vehiculo'})
    }
}
vehiculoController.addVehiculo = addVehiculo;

const getVehiculos = async (req,res) => {
    const vehiculo = await Vehiculo.find()
    res.status(200).json(vehiculo)
}
vehiculoController.getVehiculos = getVehiculos;

const getVehiculoByPatente = async (req,res) => {
    const vehiculo = req.vehiculo; // Ya viene del middleware
    res.status(200).json(vehiculo);
};
vehiculoController.getVehiculoByPatente = getVehiculoByPatente;

module.exports = vehiculoController;