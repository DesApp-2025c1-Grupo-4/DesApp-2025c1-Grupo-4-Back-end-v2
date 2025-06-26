const mongoose = require('mongoose')
const { DateTime } = require('luxon');

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

const validarCuilChofer = (Modelo) => {
    return async (req, res, next) => {
        const { cuil } = req.params;
        try {
            //Buscar el cuil en la base de datos
            const chofer = await Modelo.findOne({ cuil });
            if(!chofer) {
                return res.status(404).json({error: "CUIL no encontrado"});
            }
            req.chofer = chofer //Guarda el chofer encontrado en la request
            next(); //Continúa con el siguiente middleware o controlador
        } catch (error) {
            res.status(500).json({ error: "Error al buscar el CUIL" });
        }
    };
};

//module.exports = {validarId, validarPatenteVehiculo, validarCuilChofer};

const validarCuitEmpresa = (Modelo) => {
    return async (req, res, next) => {
        const { cuit } = req.params;
        try {
            //Buscar el cuit en la base de datos
            const empresa = await Modelo.findOne({ cuit });
            if(!empresa) {
                return res.status(404).json({error: "CUIT no encontrado"});
            }
            req.empresa = empresa; //Guarda la empresa encontrada en la request
            next(); //Continúa con el siguiente middleware o controlador
        } catch (error) {
            res.status(500).json({ error: "Error al buscar el CUIT" });
        }
    };
};


const validarCampoDuplicado = (Modelo, campo, nombreEntidad, articulo) => {
  return async (req, res, next) => {
    try {
      const valor = req.body[campo];
      if (!valor) return next(); // si no está el campo, pasa la validación

      const id = req.params._id;

      const filtro = { [campo]: valor };
      if (id) filtro._id = { $ne: id };

      const existe = await Modelo.findOne(filtro);

      if (existe) {
        return res.status(409).json({ mensaje: `Ya existe ${articulo} ${nombreEntidad} con ese ${campo.toUpperCase()}` });
      }

      next();
    } catch (error) {
      console.error(`Error en validación de ${campo} duplicado:`, error);
      res.status(500).json({ mensaje: `Error interno en validación de ${campo}` });
    }
  };
};


const validarVehiculoDeEmpresa = (VehiculoModelo) => {
  return async (req, res, next) => {
    try {
      const { empresa, vehiculo_defecto } = req.body;

      if (!empresa || !vehiculo_defecto) return next(); // Si falta alguno, saltea validación

      const vehiculo = await VehiculoModelo.findById(vehiculo_defecto);

      if (!vehiculo) {
        return res.status(404).json({ mensaje: 'Vehículo no encontrado' });
      }

      if (vehiculo.empresa.toString() !== empresa.toString()) {
        return res.status(400).json({ mensaje: 'El vehículo no pertenece a la empresa asignada al chofer' });
      }

      next();
    } catch (error) {
      console.error('Error en validarVehiculoDeEmpresa:', error);
      res.status(500).json({ mensaje: 'Error interno al validar empresa del vehículo' });
    }
  };
};

const validarDisponibilidad = (ViajeModelo) => {
  return async (req, res, next) => {
    try {
      const { chofer_asignado, vehiculo_asignado, inicio_viaje, fin_viaje } = req.body;

      const nuevoInicio = DateTime.fromFormat(inicio_viaje, 'dd/MM/yyyy HH:mm');
      const nuevoFin = DateTime.fromFormat(fin_viaje, 'dd/MM/yyyy HH:mm');

      if (!nuevoInicio.isValid || !nuevoFin.isValid) {
        return res.status(400).json({ mensaje: 'Fechas inválidas. Deben tener formato DD/MM/YYYY HH:mm' });
      }

      // Buscar viajes activos que usen ese chofer o vehículo
      const viajesRelacionados = await ViajeModelo.find({
        $or: [
          { chofer_asignado },
          { vehiculo_asignado }
        ],
        estado: { $in: ['planificado', 'en transito'] },
      });

      const haySolapamiento = viajesRelacionados.some((viaje) => {
        const inicioExistente = DateTime.fromFormat(viaje.inicio_viaje, 'dd/MM/yyyy HH:mm');
        const finExistente = DateTime.fromFormat(viaje.fin_viaje, 'dd/MM/yyyy HH:mm');

        if (!inicioExistente.isValid || !finExistente.isValid) return false;

        const seSolapan = (
          inicioExistente < nuevoFin &&
          finExistente > nuevoInicio
        );

        return seSolapan && (
          viaje.chofer_asignado.toString() === chofer_asignado ||
          viaje.vehiculo_asignado.toString() === vehiculo_asignado
        );
      });

      if (haySolapamiento) {
        return res.status(400).json({ mensaje: 'El chofer o el vehículo ya tienen un viaje en ese horario' });
      }

      next();
    } catch (error) {
      console.error('Error en validarDisponibilidad:', error);
      res.status(500).json({ mensaje: 'Error al validar disponibilidad del chofer o vehículo' });
    }
  };
};

const validarDepositos = (ViajeModelo) => {
  return async (req, res, next) => {
    const {deposito_origen, deposito_destino} = req.body
    try {
      if (deposito_origen === deposito_destino){
        return res.status(409).json({ mensaje: `origen y destino debe ser distinto` });
      }
      next();
    } catch (error) {
      console.error('Error en validarDeposito:', error);
      res.status(500).json({ mensaje: 'Error al validar que sean diferentes los depositos' });
    }
  }
}

module.exports = {validarId, validarPatenteVehiculo, validarCuilChofer, validarCuitEmpresa, validarCampoDuplicado, validarVehiculoDeEmpresa, validarDisponibilidad, validarDepositos};