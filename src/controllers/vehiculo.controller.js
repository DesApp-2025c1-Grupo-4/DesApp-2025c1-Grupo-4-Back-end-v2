const {Vehiculo} = require('../models');
const vehiculoController = {}
const mongoose = require('../db/server').mongoose;

//GET
const getVehiculos = async (req,res) => {
  const vehiculo = await Vehiculo.find().populate('empresa', 'nombre_empresa -_id');
  res.status(200).json(vehiculo)
}
vehiculoController.getVehiculos = getVehiculos;


//GET BY id
const getVehiculoByID= async (req,res) => {
  const vehiculo = await Vehiculo.findById(req.params._id).populate('empresa', 'nombre_empresa -_id');
  res.status(200).json(vehiculo);
};
vehiculoController.getVehiculoByID = getVehiculoByID; 


//GET BY patente
const getVehiculoByPatente = async (req,res) => {
  const vehiculo = req.vehiculo;
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
const updateVehiculo = async (req, res) => {

  try {    
    const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
      req.params,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!vehiculoActualizado) {
      return res.status(404).json({ error: 'Vehiculo no encontrado' });
    }
    res.status(200).json(vehiculoActualizado);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
vehiculoController.updateVehiculo = updateVehiculo;


//PATCH - Baja Logica
const softDeleteVehiculo = async (req, res) => {
 try {
    const { id } = req.params;
    
    const vehiculo = await Vehiculo.findOneAndUpdate(
      { id },
      {  $set: { activo: false } }
    );

    if (!vehiculo) {
      return res.status(404).json({ message: 'Vehiculo no encontrado' });
    }

    res.status(200).json({message: 'Vehiculo borrado exitosamente.'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
vehiculoController.softDeleteVehiculo = softDeleteVehiculo;


module.exports = vehiculoController;