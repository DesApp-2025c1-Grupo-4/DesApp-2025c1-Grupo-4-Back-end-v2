const {Empresa} = require('../models');
const empresaController = {}
const mongoose = require('../db/server').mongoose;

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

const getEmpresas = async (req,res) => {
    const empresa = await Empresa.find()
    res.status(200).json(empresa)
}
empresaController.getEmpresas = getEmpresas;

const getEmpresaByCuit = async (req,res) => {
    const empresa = req.empresa; // Ya viene del middleware
    res.status(200).json(empresa);
};
empresaController.getEmpresaByCuit = getEmpresaByCuit;


module.exports = empresaController;