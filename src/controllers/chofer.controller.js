const {Chofer} = require('../models');
const choferController = {}
const mongoose = require('../db/server').mongoose;


//GET
const getChoferes = async (req,res) => {
    const choferes = await Chofer.find().populate('empresa', 'nombre_empresa -_id');
    res.status(200).json(choferes)
}
choferController.getChoferes = getChoferes;

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


module.exports = choferController;
