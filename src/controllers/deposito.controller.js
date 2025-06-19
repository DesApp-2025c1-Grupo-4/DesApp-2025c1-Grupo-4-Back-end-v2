const {Deposito} = require('../models');
const depositoController = {}
const mongoose = require('../db/server').mongoose;

//GET
const getDepositos = async (req,res) => {
    const deposito = await Deposito.find()
    res.status(200).json(deposito)
}
depositoController.getDepositos = getDepositos;

//GET BY id
const getDepositoById = async (req,res) => {
    const id = req.id; // Ya viene del middleware
    const deposito = await Deposito.findById(id);

        if (!deposito) {
            return res.status(404).json({ mensaje: 'Depósito no encontrado' });
        }
    res.status(200).json(deposito);
};
depositoController.getDepositoById = getDepositoById;

//POST
const addDeposito = async (req,res) => {
    try{
        const {
            tipo,
            horarios, 
            contacto,
            //Información de la localización
            calle,
            número,
            localidad,
            coordenadasGeograficas,
            provinciaOestado,
            país
        } = req.body;

        //Primero es necesario que se cree la nueva localización para guardar el ID
        const localizacion = await addLocalizacion({
            calle,
            número,
            localidad,
            coordenadasGeograficas,
            provinciaOestado,
            país
        });

        //Luego se crea el deposito con la referencia a la localizacion

        const newDeposito = new Deposito({
            tipo,
            horarios,
            contacto,
            localizacion: localizacion._id
        });

        await newDeposito.save();

        res.status(201).json({ mensaje: 'El depósito fue agregado correctamente' });

        } catch (error) {

        console.error('Error al crear el depósito:', error);

        res.status(400).json({ mensaje: 'El servidor no puede procesar la solicitud' });
    }
};
depositoController.addDeposito = addDeposito;

//UPDATE - Modificacion 

const updateDeposito = async (req, res) => {
    try {
        const id = req.id;
        const deposito = await Deposito.findById(id);

        if (!deposito) {
            return res.status(404).json({ mensaje: 'Depósito no encontrado' });
        }

        const { tipo, activo, localizacion, personal_contacto, horarios } = req.body;

        // Actualizar campos simples si están definidos
        if (typeof tipo !== 'undefined') deposito.tipo = tipo;
        if (typeof activo !== 'undefined') deposito.activo = activo;

        // Función auxiliar para actualizar subdocumentos
        const actualizarSubdocumento = (destino, datos) => {
            if (typeof datos === 'object' && datos !== null) {
                Object.entries(datos).forEach(([key, value]) => {
                    if (typeof value !== 'undefined') destino[key] = value;
                });
            }
        };

        // Subdocumentos
        actualizarSubdocumento(deposito.localizacion, localizacion);
        actualizarSubdocumento(deposito.personal_contacto, personal_contacto);
        actualizarSubdocumento(deposito.horarios, horarios);

        await deposito.save();

        res.status(200).json({ mensaje: 'Depósito actualizado correctamente' });

    } catch (error) {
        console.error('Error al actualizar el depósito:', error);
        res.status(500).json({ mensaje: 'Error del servidor al actualizar el depósito' });
    }
};

depositoController.updateDeposito = updateDeposito;

//UPDATE - Baja Logica

module.exports = depositoController;