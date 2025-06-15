const {Deposito} = require('../models');
const depositoController = {}
const mongoose = require('../db/server').mongoose;

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

const getDepositos = async (req,res) => {
    const deposito = await Deposito.find()
        .populate('localizacion', 'calle número -_id')
    res.status(200).json(deposito)
}
depositoController.getDepositos = getDepositos;

const getDepositoById = async (req,res) => {
    const id = req.id; // Ya viene del middleware
    const deposito = await Deposito.findById(id).populate('localizacion', 'calle número -_id');

        if (!deposito) {
            return res.status(404).json({ mensaje: 'Depósito no encontrado' });
        }
    res.status(200).json(deposito);
};
depositoController.getDepositoById = getDepositoById;


module.exports = depositoController;