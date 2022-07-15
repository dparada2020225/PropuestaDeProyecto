const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordatoriosSchema = Schema({
    IdDoc:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
    IdPac:{ type: Schema.Types.ObjectId, ref: 'Usuarios'},
    descripcion: String,
    fecha: String
});

module.exports = mongoose.model('Recordatorios', RecordatoriosSchema);