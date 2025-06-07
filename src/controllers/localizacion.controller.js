const {Localizacion} = require('../models');
const localizacionController = {}
const mongoose = require('../db/server').mongoose;

const addLocalizacion = async(data) => {
    const nuevaLocalizacion = new Localizacion(data);
    return await nuevaLocalizacion.save(); // Devuelve la localización creada
};

localizacionController.addLocalizacion = addLocalizacion

const getLocalizaciones = async (req, res) => {
    const localizaciones = await Localizacion.find()
    res.status(200).json(localizaciones)
}
localizacionController.getLocalizaciones = getLocalizaciones

const getLocalizacionById = async (req, res) => {
    const id = req.id; // Ya viene del middleware
    res.status(200).json(id);
};
localizacionController.getLocalizacionById = getLocalizacionById;


module.exports = localizacionController;