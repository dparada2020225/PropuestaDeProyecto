const express = require('express');
const productosControlador = require('../controllers/productos.controller')
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/AgregarProductos',md_autenticacion.Auth, productosControlador.AgregarProductos);
module.exports = api;