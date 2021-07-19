const ContaSchema = require('../../models/conta/Conta');

const contaRules = {
    criarConta: async (nome, conta) => {
        let jaExiste = await ContaSchema.findOne({conta: conta});
        if (jaExiste !== null) throw new Error('Conta já existe.')

        return await ContaSchema.create({nome: nome, conta: conta, saldo: 0})
    },

    deletarConta: async (conta) =>  {
        let contaDeletada = await ContaSchema.deleteOne({conta: conta});
        return contaDeletada.deletedCount;
    },


    saldo: async (conta) => {
        return await ContaSchema.findOne({conta: conta});
    },

    sacar: async (conta, valor) => {
        if (valor <= 0.00) {
            throw new Error('Valor invalido.');
        } 
        let contaMongo = await ContaSchema.findOne({conta: conta});

        if (contaMongo.saldo < valor) throw new Error('Saldo insuficiente.');

        let newSaldo = contaMongo.saldo - valor;
        return await ContaSchema.findOneAndUpdate({conta: conta}, {saldo: newSaldo}, {new: true});
    },

    depositar: async (conta, valor) => {
        if (valor < 0.0) throw new Error('Valor invalido');

        let contaMongo = await ContaSchema.findOne({conta: conta});

        let newSaldo = contaMongo.saldo + valor;
        return await ContaSchema.findOneAndUpdate({conta: conta}, {saldo: newSaldo}, {new: true});
    }
}

module.exports = contaRules;