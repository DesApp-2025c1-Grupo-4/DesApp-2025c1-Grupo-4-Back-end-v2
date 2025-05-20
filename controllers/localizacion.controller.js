const {Localizacion} = require('../models');
const localizacionController = {}
const mongoose = require('../db/server').mongoose;

const getLocalizacion = async (req, res) => {
    const localizaciones = await Localizacion.find()
    res.status(200).json(localizaciones)
}
localizacionController.getLocalizacion = getLocalizacion

const getLocalizacionById = async (req, res) => {
    const id = req.id; // Ya viene del middleware
    res.status(200).json(id);
};
localizacionController.getLocalizacionById = getLocalizacionById;


module.exports = localizacionController;