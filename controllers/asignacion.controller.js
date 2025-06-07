const {Asignacion} = require('../models');
const asignacionController = {}
const mongoose = require('../db/server').mongoose;

const getAsignaciones = async (req, res) => {
    const asignaciones = await Asignacion.find()
    res.status(200).json(asignaciones)
}
asignacionController.getAsignaciones = getAsignaciones;

const getAsignacionById = async(req, res) => {
    const id = req.id;
    res.status(200).json(id);
}
asignacionController.getAsignacionById = getAsignacionById;

module.exports = asignacionController;