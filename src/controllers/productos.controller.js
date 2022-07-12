const Usuario = require('../models/usuario.model');
const Producto = require('../models/productos.model');

function AgregarProductos(req, res) {
    var token = req.user.rol
    if (token == "Administrador") {
        var modeloProductos = new Producto();
        var parametros = req.body

        modeloProductos.nombre = parametros.nombre;
        modeloProductos.descripcion = parametros.descripcion;
        modeloProductos.precio = parametros.precio;
        modeloProductos.cantidad = parametros.cantidad;
        modeloProductos.save((err,productoGuardado)=>{
            if(err) return res.status(500).send({ mensaje: 'error en la peticion ' })
            if(!productoGuardado) return res.status(500).send({ mensaje: 'error al guardar el producto'})
            return res.status(200).send({ProductosAgregado:productoGuardado})
        })
    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de agregar productos'})
    }
    
}


module.exports = {
    AgregarProductos
}