const {Chofer} = require('../models');
const choferController = {}
const mongoose = require('../db/server').mongoose;

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

const getChofer = async (req,res) => {
    const chofer = await Chofer.find()
    res.status(200).json(chofer)
}
choferController.getChofer = getChofer;

const getChoferByCuil = async (req,res) => {
    const chofer = req.chofer; // Ya viene del middleware
    res.status(200).json(chofer);
};
choferController.getChoferByCuil = getChoferByCuil;


module.exports = choferController;
