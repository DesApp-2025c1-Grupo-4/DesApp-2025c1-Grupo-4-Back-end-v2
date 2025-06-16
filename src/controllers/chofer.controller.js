const {Chofer} = require('../models');
const choferController = {}
const mongoose = require('../db/server').mongoose;


//GET
const getChoferes = async (req,res) => {
    const choferes = await Chofer.find()
    .populate('empresa', 'nombre_empresa -_id')
    .populate('vehiculo_defecto', 'patente -_id');
    res.status(200).json(choferes)
}
choferController.getChoferes = getChoferes;

//GET BY cuil
const getChoferByCuil = async (req,res) => {
    const chofer = req.chofer; // Ya viene del middleware
    res.status(200).json(chofer);
};
choferController.getChoferByCuil = getChoferByCuil;

//POST
const addChofer = async (req,res) => {
    const choferInf = req.body
    try{
        const chofer = new Chofer(choferInf)
        await chofer.save()
        res.status(201).json({mensaje : 'El chofer fue agregado correctamente'})
    } catch {
        res.status(400).json({mensaje : 'El servidor no puede procesar la solicitud'})
    }
}
choferController.addChofer = addChofer;

//PUT - Modificacion 

//PATCH - Baja Logica
const softDeleteChofer = async (req, res) => {
 try {
    const { cuil } = req.params;
    
    const chofer = await Chofer.findOneAndUpdate(
      { cuil },
      { 
        $set: { activo: false } 
      }
    );

    if (!chofer) {
      return res.status(404).json({ message: 'Chofer no encontrado' });
    }

    res.status(200).json({message: 'Chofer borrado exitosamente.'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
choferController.softDeleteChofer = softDeleteChofer;


module.exports = choferController;
