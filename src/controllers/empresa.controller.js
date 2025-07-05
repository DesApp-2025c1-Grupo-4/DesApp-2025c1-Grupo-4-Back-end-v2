const {Empresa} = require('../models');
const empresaController = {}
const mongoose = require('../db/server').mongoose;

//GET
// Query params --> empresas?active=true
const getEmpresas = async (req, res) => {
  const { active } = req.query;
  
    let empresas = await Empresa.find();
  
    if (active){
      empresas = (await Empresa.find()).filter(item => item.activo === true)
    }
  
     if (!empresas){
      return res.status(404).json({ error: 'No se encontraron empresas activas' });
    }
    
    res.status(200).json(empresas)
}
empresaController.getEmpresas = getEmpresas;


//GET BY id
const getEmpresaById = async (req,res) => {
 const { active } = req.query;
   const id = req.id;
   let empresa = await Empresa.findById(id)
   
   if (active && !empresa || empresa.activo != true){
     return res.status(404).json({ error: 'Empresa no encontrada' });
   }
   res.status(200).json(empresa);
};
empresaController.getEmpresaById = getEmpresaById;


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
const updateEmpresa = async (req, res) => {

  try {    
    const empresaActualizada = await Empresa.findByIdAndUpdate(
      req.params,
      req.body,
      { new: true, runValidators: true } 
    );

    if (!empresaActualizada) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    res.status(200).json(empresaActualizada);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
empresaController.updateEmpresa = updateEmpresa;


//PATCH - Baja Logica
const softDeleteEmpresa = async (req, res) => {
 try {
    const { id } = req.params;
    
    const empresa = await Empresa.findOneAndUpdate(
      { id },
      {  $set: { activo: false } }
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