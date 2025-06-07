const {Deposito} = require('../models');
const depositoController = {}
const mongoose = require('../db/server').mongoose;

const addDeposito = async (req,res) => {
    const depositoInf = req.body
    try{
        const deposito = new Deposito(depositoInf)
        await deposito.save()
        res.status(201).json({mensaje : 'El depósito fue agregado correctamente'})
    } catch {
        res.status(400).json({mensaje : 'El servidor no puede procesar la solicitud'})
    }
}
depositoController.addDeposito = addDeposito;

const getDepositos = async (req,res) => {
    const deposito = await Deposito.find()
    res.status(200).json(deposito)
}
depositoController.getDepositos = getDepositos;

const getDepositoById = async (req,res) => {
    const id = req.id; // Ya viene del middleware
    res.status(200).json(id);
};
depositoController.getDepositoById = getDepositoById;


module.exports = depositoController;