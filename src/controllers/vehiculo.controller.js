const {Vehiculo} = require('../models');
const vehiculoController = {}
const mongoose = require('../db/server').mongoose;


//GET
const getVehiculos = async (req,res) => {
    const vehiculo = await Vehiculo.find().populate('empresa', 'nombre_empresa -_id');
    res.status(200).json(vehiculo)
}
vehiculoController.getVehiculos = getVehiculos;

//GET BY patente
const getVehiculoByPatente = async (req,res) => {
    const vehiculo = req.vehiculo; // Ya viene del middleware
    res.status(200).json(vehiculo);
};
vehiculoController.getVehiculoByPatente = getVehiculoByPatente;

//POST
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


//PUT - Modificacion 

//PATCH - Baja Logica


module.exports = vehiculoController;