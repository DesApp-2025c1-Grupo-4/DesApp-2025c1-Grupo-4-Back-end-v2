const {Empresa} = require('../models');
const empresaController = {}
const mongoose = require('../db/server').mongoose;

//GET
const getEmpresas = async (res) => {
    const empresa = await Empresa.find()
    res.status(200).json(empresa)
}
empresaController.getEmpresas = getEmpresas;

//GET BY cuit
const getEmpresaByCuit = async (req,res) => {
    const empresa = req.empresa; // Ya viene del middleware
    res.status(200).json(empresa);
};
empresaController.getEmpresaByCuit = getEmpresaByCuit;

//POST
const addEmpresa = async (req,res) => {
    const empresaInf = req.body
    try{
        const empresa = new Empresa(empresaInf)
        await empresa.save()
        res.status(201).json({mensaje : 'La empresa fue agregada correctamente'})
    } catch {
        res.status(400).json({mensaje : 'El servidor no puede procesar la solicitud'})
    }
}
empresaController.addEmpresa = addEmpresa;


//PUT - Modificacion 


//PATCH - Baja Logica
const softDeleteEmpresa = async (req, res) => {
 try {
    const { cuit } = req.params;
    
    const empresa = await Empresa.findOneAndUpdate(
      { cuit },
      { 
        $set: { activo: false } 
      }
    );

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    res.status(200).json({message: 'Empresa borrada exitosamente.'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
empresaController.softDeleteEmpresa = softDeleteEmpresa;


module.exports = empresaController;