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
  const id = req.params._id;
  const viaje = await Viaje.findById(id)
    .populate('empresa_asignada', 'nombre_empresa')
    .populate('deposito_origen', 'localizacion')
    .populate('deposito_destino', 'localizacion')
    .populate('chofer_asignado', 'nombre apellido')
    .populate('vehiculo_asignado', 'patente');

  if (!viaje) {
    return res.status(404).json({ 
      mensaje: 'Viaje no encontrado',
      idBuscado: id 
    });
  }
  res.status(200).json(viaje);
};
viajeController.getViajeById = getViajeById;

const getHistorialEstados = async (req, res) => {
  try {
    const viaje = await Viaje.findById(req.params.id).select('historial_estados');
    if (!viaje) {
      return res.status(404).json({ mensaje: 'Viaje no encontrado' });
    }
    res.json(viaje.historial_estados);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};
viajeController.getHistorialEstados = getHistorialEstados;

//POST
const addViaje = async (req, res) => {
  try {
    // Validación manual para campos requeridos
    if (!req.body.empresa_asignada) {
      return res.status(400).json({
        mensaje: 'Falta la empresa transportista',
        campo_faltante: 'empresa_asignada'
      });
    }

    const viaje = new Viaje(req.body);
    await viaje.save();
    res.status(201).json({ mensaje: 'Viaje creado exitosamente' });
  } catch (error) {
    // Manejo detallado de errores
    if (error.name === 'ValidationError') {
      const errores = {};
      Object.keys(error.errors).forEach(key => {
        errores[key] = error.errors[key].message;
      });
      return res.status(400).json({
        mensaje: 'Error de validación',
        errores_detallados: errores
      });
    }
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
  }
};
viajeController.addViaje = addViaje;


//PUT - Modificacion 
const updateViaje = async (req, res) => {
  try {
    const viajeActualizado = await Viaje.findByIdAndUpdate(
      req.params._id, // Asegúrate que esto coincida con tu ruta
      req.body,
      { new: true, runValidators: true }
    );

    if (!viajeActualizado) {
      return res.status(404).json({ 
        error: 'Viaje no encontrado',
        idRecibido: req.params._id
      });
    }
    res.status(200).json(viajeActualizado);
  } catch (error) {
    res.status(500).json({ 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
viajeController.updateViaje = updateViaje;


//PATCH - Estado
const updateViajeState = async (req, res) => {
  try {
    const { _id } = req.params; // Cambiado de id a _id
    const { estado, fecha } = req.body;
    
    // Validar que el estado sea válido
    const estadosValidos = ["planificado", "en transito", "completado", "demorado", "incidente", "cancelado"];
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({ 
        message: 'Estado no válido',
        estadosPermitidos: estadosValidos
      });
    }
    const nuevoHistorial = {
      estado,
      fecha: fecha || new Date().toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).replace(',', '')
    };

    const viaje = await Viaje.findByIdAndUpdate(
      _id,
      { 
        $set: { estado },
        $push: { historial_estados: nuevoHistorial }
      },
      { new: true, runValidators: true }
    );

    if (!viaje) {
      return res.status(404).json({ message: 'Viaje no encontrado' });
    }

    res.status(200).json({ 
      message: 'Estado de viaje actualizado exitosamente',
      data: viaje
    });
  } catch (error) {
    console.error('Error en updateViajeState:', error);
    res.status(500).json({ 
      message: 'Error del servidor',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
viajeController.updateViajeState = updateViajeState

module.exports = viajeController;