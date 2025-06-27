const {Chofer} = require('../models');
const choferController = {}
const mongoose = require('../db/server').mongoose;


//GET
// Query params --> choferes?active=true
const getChoferes = async (req,res) => {

  const { active } = req.query;
  let choferes = await Chofer.find()
    .populate('empresa', 'nombre_empresa')
    .populate('vehiculo_defecto', 'patente')

  if (active){
    choferes = choferes.filter(item => item.activo === true)
  }
  if (!choferes){
    return res.status(404).json({ error: 'No se encontraron choferes activos' });
  }
  res.status(200).json(choferes)
}
choferController.getChoferes = getChoferes;


//GET BY id
const getChoferById = async (req,res) => {
  
  const { active } = req.query;
  const id = req.id;
  let chofer = await Chofer.findById(id)
    .populate('empresa', 'nombre_empresa')
    .populate('vehiculo_defecto', 'patente')

  if (active && !chofer || chofer.activo != true){
    return res.status(404).json({ error: 'Chofer no encontrado' });
  }
  res.status(200).json(chofer);
};
choferController.getChoferById = getChoferById;


//GET BY cuil
const getChoferByCuil = async (req,res) => {
  const chofer = req.chofer; // Ya viene del middleware
  res.status(200).json(chofer);
};
choferController.getChoferByCuil = getChoferByCuil;

const addChofer = async (req, res) => {
  const choferInf = req.body;

  // Convertir buffer serializado a Buffer real
  try {
    const data = choferInf?.licencia?.documento?.data;
    if (data && data.type === 'Buffer' && Array.isArray(data.data)) {
      choferInf.licencia.documento.data = Buffer.from(data.data);
    }

    const chofer = new Chofer(choferInf);
    await chofer.save();

    res.status(201).json({ mensaje: 'El chofer fue agregado correctamente' });
  } catch (error) {
    res.status(400).json({
      mensaje: 'El servidor no puede procesar la solicitud',
      error: error.message
    });
  }
};
choferController.addChofer = addChofer;

//GET BY Empresa

const getChoferByEmpresa = async (req, res) => {
  const { idEmpresa } = req.params;
  const { active } = req.query;

  try {
    const choferes = await Chofer.find({
      empresa: idEmpresa,
      ...(active && { activo: true })
    })
    .populate('empresa', 'nombre_empresa')
    .populate('vehiculo_defecto', 'patente');

    if (!choferes.length) {
      return res.status(404).json({ mensaje: 'No se encontraron choferes para esta empresa' });
    }

    res.status(200).json(choferes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener choferes', error: error.message });
  }
};

choferController.getChoferByEmpresa = getChoferByEmpresa;


//PUT - Modificacion 
const updateChofer = async (req, res) => {
  try {    
    const choferActualizado = await Chofer.findByIdAndUpdate(
      req.params,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!choferActualizado) {
      return res.status(404).json({ error: 'Chofer no encontrado' });
    }
    res.status(200).json(choferActualizado);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
choferController.updateChofer = updateChofer;


//PATCH - Baja Logica
const softDeleteChofer = async (req, res) => {
 try {
    const { id } = req.params; // Ya viene del middleware;
    
    const chofer = await Chofer.findOneAndUpdate(
      { id },
      { $set: { activo: false } }
    );
    res.status(200).json({message: 'Chofer borrado exitosamente.'});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
choferController.softDeleteChofer = softDeleteChofer;


module.exports = choferController;
