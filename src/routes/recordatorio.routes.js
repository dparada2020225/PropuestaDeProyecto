const express = require('express');
const md_autenticacion = require('../middlewares/autenticacion');
const recordatorioController = require('../controllers/recordatorio.controller');

const api = express.Router();

api.post('/asignarRecordatorio', md_autenticacion.Auth, recordatorioController.asignarRecordatorio);
api.put('/editarRecordatorio/:idRecord', md_autenticacion.Auth, recordatorioController.editarRecordatorio);
api.delete('/eliminarRecordatorio/:idRecord', md_autenticacion.Auth, recordatorioController.eliminarRecordatorio);
api.get('/listarRecordatorios', md_autenticacion.Auth, recordatorioController.listarRecordatorios);

module.exports = api;