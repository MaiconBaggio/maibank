const mongoose = require('mongoose');

const ContaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    conta: {
        type: Number,
        required: true,
    },
    saldo: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Conta', ContaSchema);