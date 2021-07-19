const requestPost = require('./requestPost');

describe('Criar Conta 99999', () => {
    test('Nova conta', async () => {
        data = await requestPost(`
            mutation {
                criarConta(nome: "Test", conta: 99999){nome, conta, saldo}
            }
        `);
        expect(data).toMatchObject({
            "data": {
                "criarConta": {
                  "nome": "Test",
                  "conta": 99999,
                  "saldo": 0
                }
            }
        })
    });

    test('Cria conta mesmo numero', async () => {
        data = await requestPost(`
            mutation {
                criarConta(nome: "Test Test", conta: 99999){nome, conta, saldo}
            }
        `);

        expect(data.errors[0].message).toBe("Conta já existe.");
    });
});


describe('Depositar', () => {
    test('Depositar valor e conta validos', async () => {
        data = await requestPost(`
            mutation {
                depositar(conta: 99999, valor: 100) {nome, conta, saldo}
            }
        `);
        expect(data).toMatchObject({
            "data": {
                "depositar": {
                    "nome": "Test",
                    "conta": 99999,
                    "saldo": 100
                }
            }
        })
    });


    test('Depositar valor menor que zero e conta valida', async () => {
        data = await requestPost(`
            mutation {
                depositar(conta: 99999, valor: -1) {nome, conta, saldo}
            }
        `);
        expect(data.errors[0].message).toBe("Valor invalido");
    });
});


describe('Sacar', () => {
    test('Sacar valor e conta validos com saldo suficiente', async () => {
        data = await requestPost(`
            mutation {
                sacar(conta:99999, valor: 5){nome, saldo}
            }
        `);
        expect(data).toMatchObject({
            "data": {
                "sacar": {
                    "nome": "Test",
                    "saldo": 95
                }
            }
        })
    });

    test('Sacar valor e conta validos com saldo insuficiente', async () => {
        data = await requestPost(`
            mutation {
                sacar(conta:99999, valor: 100){nome, saldo}
            }
        `);
        expect(data.errors[0].message).toBe("Saldo insuficiente.");
    });

    test('Sacar valor menor que zero e conta valida', async () => {
        data = await requestPost(`
            mutation {
                sacar(conta:99999, valor: -21){nome, saldo}
            }
        `);
        expect(data.errors[0].message).toBe("Valor invalido.");
    });
});


describe('Saldo', () => {
    test('Saldo conta 99999', async () => {
        data = await requestPost(`
            query {
                saldo(conta: 99999)
            }
        `);
        expect(data).toMatchObject({
            "data": {
                "saldo": 95
            }
        })
    });
});


describe('Deletar conta', () => {
    test('Deletar conta 99999', async () => {
        data = await requestPost(`
            mutation {
                deletarConta(conta: 99999)
            }
        `);
        expect(data).toMatchObject({
            "data": {
                "deletarConta": 1
            }
        })
    });
});