const Conta = require('../../../models/conta/Conta');
const contaRules = require('../../../rules/conta/contaRules');

module.exports = {
    Query: {
        contas: () => Conta.find(),
        saldo: (_, { conta })=> contaRules.saldo(conta),
    },
    Mutation: {
        criarConta: (_, { nome, conta }) => contaRules.criarConta(nome, conta),
        deletarConta: (_, {conta}) => contaRules.deletarConta(conta),

        sacar: (_, { conta, valor }) => contaRules.sacar(conta, valor),
        depositar: (_, { conta, valor }) => contaRules.depositar(conta, valor),
    }
};