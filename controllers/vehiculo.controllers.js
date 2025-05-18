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
        res.status(400).json({mensaje : 'El servidor no puede procesar la solicitud'})
    }
}
vehiculoController.addVehiculo = addVehiculo

const getVehiculo = async (req,res) => {
    const vehiculo = await vehiculo.find()
    res.status(200).json(vehiculo)
}
vehiculoController.getVehiculo = getVehiculo

const getVehiculoByPatente = async (req,res) => {
    const patente = req.params;
    try{
        const vehiculo = await vehiculo.find(v => v.patente === patente)
        res.status(200).json(vehiculo)
    } catch {
        res.status(404).json({mensaje: `Error al obtener el vehiculo ${error.mensaje}` })
    }
}
vehiculoController.getVehiculoByPatente = getVehiculoByPatente

module.exports = vehiculoController