Em Jest, você pode usar um "stub" para substituir uma função ou método durante um teste. Aqui está um exemplo básico de como criar um stub usando Jest:

Suponha que você tenha o seguinte módulo `math.js` que contém uma função `add` que você deseja testar:

```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };
```

Aqui está um exemplo de teste usando um stub para substituir a função `add` durante o teste:

```javascript
const math = require('./math');

// Criando um stub para substituir a função add
jest.spyOn(math, 'add').mockImplementation((a, b) => a * b);

test('multiply instead of adding', () => {
  // A função add foi substituída pelo stub
  expect(math.add(2, 3)).toBe(6); // 2 * 3 = 6
  expect(math.add(5, 5)).toBe(25); // 5 * 5 = 25

  // Verifica se o stub foi chamado corretamente
  expect(math.add).toHaveBeenCalledWith(2, 3);
  expect(math.add).toHaveBeenCalledWith(5, 5);

  // Restaura a implementação original da função add
  math.add.mockRestore();
});

test('original add function', () => {
  // A função add foi restaurada para a implementação original
  expect(math.add(2, 3)).toBe(5); // 2 + 3 = 5
  expect(math.add(5, 5)).toBe(10); // 5 + 5 = 10
});
```

Neste exemplo:

- `jest.spyOn(math, 'add')` cria um stub para a função `add` no módulo `math`.
- `.mockImplementation((a, b) => a * b)` define a implementação do stub para multiplicar os argumentos em vez de adicioná-los.
- `math.add.mockRestore()` restaura a implementação original da função `add`.

Lembre-se de que os stubs são úteis para isolar o código durante os testes, especialmente quando você deseja evitar chamadas a funções ou serviços reais. Eles ajudam a garantir que os testes se concentrem apenas na unidade de código que está sendo testada.

-----

Em testes de software, um **driver** é um componente ou um conjunto de scripts usados para simular o comportamento de um componente ou módulo que ainda não foi desenvolvido. Geralmente, um driver é usado para testar um componente que depende de outro componente que ainda não foi implementado.

Vou fornecer um exemplo básico de como criar um driver usando Jest. Neste exemplo, vamos criar um teste para uma função `calculateTotal` que depende de uma função `getPricesFromDatabase`. Como a função `getPricesFromDatabase` ainda não foi implementada, usaremos um driver para simular seu comportamento.

Suponha que você tenha o seguinte módulo `order.js` que deseja testar:

```javascript
// order.js
function getPricesFromDatabase() {
  // Esta função ainda não foi implementada
  // Ela eventualmente buscará preços de produtos de um banco de dados
  return {
    apple: 1.5,
    banana: 0.8,
    orange: 1.2,
  };
}

function calculateTotal(items) {
  const prices = getPricesFromDatabase();
  let total = 0;
  items.forEach(item => {
    total += prices[item.name] * item.quantity;
  });
  return total;
}

module.exports = { calculateTotal };
```

Aqui está um exemplo de um teste usando um driver para a função `getPricesFromDatabase`:

```javascript
// order.test.js
const { calculateTotal } = require('./order');

// Driver para simular a função getPricesFromDatabase
function getPricesFromDatabase() {
  return {
    apple: 1.5,
    banana: 0.8,
    orange: 1.2,
  };
}

jest.mock('./order', () => {
  return {
    ...jest.requireActual('./order'), // Importa todas as funções reais do módulo
    getPricesFromDatabase: jest.fn(getPricesFromDatabase), // Substitui a função original pelo driver
  };
});

test('calculateTotal calculates the correct total', () => {
  const items = [
    { name: 'apple', quantity: 3 },
    { name: 'banana', quantity: 2 },
  ];

  const total = calculateTotal(items);
  expect(total).toBe(7.1); // (1.5 * 3) + (0.8 * 2) = 7.1
});

test('calculateTotal calls getPricesFromDatabase', () => {
  const items = [{ name: 'apple', quantity: 1 }];
  calculateTotal(items);
  expect(require('./order').getPricesFromDatabase).toHaveBeenCalled();
});
```

Neste exemplo:

- Criamos um driver `getPricesFromDatabase` que retorna preços fixos para itens específicos.
- Usamos `jest.mock` para substituir a função `getPricesFromDatabase` no módulo `order.js` pelo driver.
- Nos testes, verificamos se a função `calculateTotal` produz o resultado correto com base nos preços simulados e se chama corretamente o driver `getPricesFromDatabase`.

Este é um exemplo básico de como usar um driver para testar um componente que depende de um componente ainda não implementado. Note que esta é uma abordagem temporária e não deve substituir testes completos assim que o componente real estiver disponível.


---

**Stubs** e **drivers** são conceitos importantes em testes de software, e eles são usados para diferentes finalidades:

1. **Stubs:**
   - **Definição:** Stubs são objetos ou funções usados para substituir partes do sistema que ainda não estão implementadas ou para isolar a unidade de código que está sendo testada.
   - **Finalidade:** Stubs são usados para simular o comportamento de componentes ou serviços que o código que está sendo testado depende. Eles ajudam a isolar a unidade de código em teste, garantindo que o código não dependa de componentes reais externos, como serviços da web ou bancos de dados. Stubs são especialmente úteis quando você deseja evitar chamadas reais a serviços externos durante os testes para tornar os testes rápidos e independentes de ambiente externo.

2. **Drivers:**
   - **Definição:** Drivers são componentes ou conjuntos de scripts usados para simular o comportamento de componentes ou módulos que ainda não foram desenvolvidos.
   - **Finalidade:** Drivers são usados para testar um componente que depende de outro componente que ainda não está disponível ou que está incompleto. Eles são criados para fornecer entradas simuladas para a unidade de código em teste. Em vez de esperar por um componente real, o driver fornece dados simulados ou comportamentos simulados para permitir que o componente em teste seja testado de forma independente.

Em resumo, **stubs** são usados para isolar o código sendo testado, enquanto **drivers** são usados para fornecer entradas simuladas ou comportamentos simulados para testar o código que depende de componentes ou serviços externos que ainda não estão disponíveis ou implementados. Ambos são técnicas importantes para garantir que o código seja testado de forma eficaz e independente.

---

[O SinonJS](http://sinonjs.org/) é uma ótima biblioteca que suporta **spies**, **stubs** e **mocks** para testes. Ela também oferece outros recursos úteis para testes, como manipulação de tempo, área de testes isolada, ampliação de assertivas, além de servidores e requisições falsas.

Em alguns casos, há a necessidade de simular alguma dependência em nosso código. As referências aos serviços que gostaríamos de simular são utilizadas por outras partes do sistema.

---

**Para que devemos usar Mocks?**

1. Para testar se um ou mais métodos de uma dependência externa foi chamado corretamente;
2. Testar quantas vezes esses métodos foram chamados;
3. Testar se esses métodos foram chamados com os parâmetros corretos.

**Para que não devemos usar Mocks?**

1. Para testar valores retornados por uma função;
2. Para testar comportamentos de uma função.

**Para que devemos usar Stubs?**

1. Para testar retornos de uma dependência externa;
2. Testar o comportamento do nosso *SUT* frente aos diferentes retornos da API*.* Por exemplo, retornos de sucesso, falhas ou exceções.

*“Não é aconselhável utilizar Mocks ou Stubs para testes de integração, já que estes devem ser o mais próximo possível do ambiente de produção.”*

[Test Doubles (Mocks, Stubs, Fakes, Spies e Dummies)](https://medium.com/rd-shipit/test-doubles-mocks-stubs-fakes-spies-e-dummies-a5cdafcd0daf)
