const mongoose = require('mongoose')

const validarId = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID no válido" });
        }
        req.modelo = Modelo;
        next();
    };
};

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

module.exports = { validarId,validarPatenteVehiculo };