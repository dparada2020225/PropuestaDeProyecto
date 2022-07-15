const Recordatorio = require('../models/recordatorios.model')
const Usuario = require('../models/usuario.model');

function asignarRecordatorio(req, res) {

    var token = req.user.rol
    
    if (token == "Administrador"){
    
        var parametros = req.body
        var modeloRecord = new Recordatorio()


        Usuario.findById(parametros.Doctor,(err,doctorEncontrado)=>{

            if (err) return res.status(500).send({ mensaje: 'error en la peticion'})
            if (!doctorEncontrado) return res.status(500).send({ mensaje: 'error al encontrar doctor'})

            Usuario.findById(parametros.Paciente,(err,pacienteEncontrado)=>{

                if (err) return res.status(500).send({ mensaje: 'error en la peticion'})
                if (!pacienteEncontrado) return res.status(500).send({ mensaje: 'error al encontrar Paciente'})

                if (pacienteEncontrado.rol == 'Paciente' ) {
                    if (doctorEncontrado.rol == 'Doctor') {
                        
                        modeloRecord.IdDoc = parametros.Doctor;
                        modeloRecord.IdPac  = parametros.Paciente;
                        modeloRecord.descripcion = parametros.descripcion;
                        modeloRecord.fecha = parametros.fecha;

                        modeloRecord.save((err, recordatorioCreado)=>{

                            if(err) return res.status(500).send({ mensaje: 'error en la peticion'})
                            if (!recordatorioCreado) return res.status(500).send({ mensaje: 'error al crear chat'})
                            return res.status(200).send({ Recordatorio: recordatorioCreado })
                            
                        })

                    }else{
                        return res.status(200).send({ mensaje: 'parametro Doctor no es un doctor'});
                    }

                }else{
                    return res.status(200).send({ mensaje: 'parametro Paciente no es un paciente'});
                }
            })
        })        
    }else{
        return res.status(500).send({ mensaje: 'no tienes permisos para asignar un recordatorio'});
    }
}

function editarRecordatorio(req, res) {

    var idRecord = req.params.idRecord;
    var token = req.user.rol

    if (token == "Administrador") {

        var parametros = req.body;

        Recordatorio.findByIdAndUpdate(idRecord, parametros, {new : true}, (err,recordatorioEditado)=>{
            
            if (err) return res.status(500).send({ mensaje: 'el recordatorio no existe'})
            if (!recordatorioEditado) return res.status(500).send({ mensaje: 'error al editar el recordatorio'})
            
            return res.status(200).send({ Recordatorio: recordatorioEditado})
       
        })

    }else{

        return res.status(500).send({ mensaje: 'no tienes los permisos de editar los recordatorios'})
    
    } 
}

function eliminarRecordatorio(req, res) {
    
    var idRecord = req.params.idRecord;
    var token = req.user.rol;

    if (token == "Administrador") {
        
        Recordatorio.findByIdAndDelete(idRecord, {new : true}, (err, recordatorioEliminado)=>{

            if (err) return res.status(500).send({ mensaje: 'el recordatorio no existe'});
            if (!recordatorioEliminado) return res.status(500).send({ mensaje: 'error al eliminar el recordatorio'});

            return res.status(200).send({ Recordatorio: recordatorioEliminado});
        
        })

    }else{
        return res.status(500).send({ mensaje: 'no tienes los permisos de eliminar un recordatorio'});
    } 
}

function listarRecordatorios(req, res) {

    Recordatorio.find({},(err, recordatorioEncontrado)=>{

        if (err) return res.status(500).send({ mensaje: 'error en la peticion'});
        if (!recordatorioEncontrado) return res.status(500).send({ mensaje: 'error al listar los recordatorios'});

        return res.status(200).send({ Recordatorio: recordatorioEncontrado})
   
    })
}


module.exports = {
    asignarRecordatorio,
    editarRecordatorio,
    eliminarRecordatorio,
    listarRecordatorios
}