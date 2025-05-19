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
vehiculoController.addVehiculo = addVehiculo;

const getVehiculo = async (req,res) => {
    const vehiculo = await Vehiculo.find()
    res.status(200).json(vehiculo)
}
vehiculoController.getVehiculo = getVehiculo;

const getVehiculoByPatente = async (req,res) => {
    const vehiculo = req.vehiculo; // Ya viene del middleware
    res.status(200).json(vehiculo);
};
vehiculoController.getVehiculoByPatente = getVehiculoByPatente;

// no se usa porque el middleware ya realiza la búsqueda de la patente y te entrega el vehiculo de existir. 

/*const getVehiculoByPatente = async (req,res) => {
    const { patente } = req.params;
    console.log('patente recibida:', patente);
    try{
        //const vehiculo = await Vehiculo.find(v => v.patente === patente)
        const vehiculo = await Vehiculo.findOne({ patente })
        if (!vehiculo) {
            return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
        }

        res.status(200).json(vehiculo);
    } catch(error) {
        res.status(500).json({mensaje: `Error al obtener el vehiculo ${error.mensaje}` });
    }
}*/


module.exports = vehiculoController;