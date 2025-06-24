const { Viaje, Deposito } = require('../models');
const viajeController = {}
const mongoose = require('../db/server').mongoose;

//GET
const getViajes = async (req, res) => {
    const viajes = await Viaje.find()
        .populate('empresa_asignada', 'nombre_empresa')
        .populate('deposito_origen', 'localizacion')
        .populate('deposito_destino', 'localizacion')
        .populate('chofer_asignado', 'nombre apellido')
        .populate('vehiculo_asignado', 'patente')
   res.status(200).json(viajes)
};
viajeController.getViajes = getViajes;


//GET BY id
const getViajeById = async (req, res) => {
    const id = req.id._id; // Ya viene del middleware
    const viaje = await Viaje.findById(id)
        .populate('empresa_asignada', 'nombre_empresa')
        .populate('deposito_origen', 'localizacion')
        .populate('deposito_destino', 'localizacion')
        .populate('chofer_asignado', 'nombre apellido')
        .populate('vehiculo_asignado', 'patente')
    res.status(200).json(viaje);
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
const updateViaje = async (req, res) => {
  try {    
    const viajeActualizado = await Viaje.findByIdAndUpdate(
      req.params,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!viajeActualizado) {
      return res.status(404).json({ error: 'Viaje no encontrado' });
    }
    res.status(200).json(viajeActualizado);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
viajeController.updateViaje = updateViaje;


//PATCH - Estado
const updateViajeState = async (req, res) => {
 try {
    const { id } = req.params;
    const viaje = await Viaje.findOneAndUpdate(
      { id },
      {  $set: { estado: req.body.estado } }
    );

    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.status(200).json({message: 'Estado de viaje actualizado exitosamente.'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
viajeController.updateViajeState = updateViajeState;


module.exports = viajeController;