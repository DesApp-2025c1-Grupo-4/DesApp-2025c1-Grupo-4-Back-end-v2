const mongoose = require('mongoose')

const validarPatenteVehiculo = (Modelo) => {
    return async (req, res, next) => {
        const { patente } = req.params;

        try {
            // Buscar la patente en la base de datos
            const vehiculo = await Modelo.findOne({ patente });

            if (!vehiculo) {
                return res.status(404).json({ error: "Patente no encontrada" });
            }

            req.vehiculo = vehiculo; // Guarda el vehículo encontrado en la request
            next(); // Continúa con el siguiente middleware o controlador
        } catch (error) {
            res.status(500).json({ error: "Error al buscar la patente" });
        }
    };
};

const validarId = (Modelo) => {
    return async (req, res, next) => {
        const { _id } = req.params;

        try {
            // Buscar el id en la base de datos
            const id = await Modelo.findOne({ _id });

            if (!id) {
                return res.status(404).json({ error: "id no encontrada" });
            }

            req.id = id; // Guarda el id encontrado en la request
            next(); // Continúa con el siguiente middleware o controlador
        } catch (error) {
            res.status(500).json({ error: "Error al buscar id" });
        }
    };
};

module.exports = { validarId,validarPatenteVehiculo };