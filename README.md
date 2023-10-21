<h1 align="center">
  <img src="assets/reprograma-fundos-claros.png" alt="logo reprograma" width="500">
</h1>

# Testes de integração e E2E

Turma Online 28 - Imersão JavaScript | Semana 6 | 2023 | Professora Isabelle Galvão

### Instruções
Antes de começar, vamos organizar nosso setup.
* Fork esse repositório 
* Clone o fork na sua máquina (Para isso basta abrir o seu terminal e digitar `git clone url-do-seu-repositorio-forkado`)
* Entre na pasta do seu repositório (Para isso basta abrir o seu terminal e digitar `cd nome-do-seu-repositorio-forkado`)
* [Add outras intrucoes caso necessario]

### Instalação

`npm init -y`

`npm install supertest jest --save-dev`

no arquivo package.json alterar a linha 7 para 

```json
"test:jest": "jest --coverage"
```

### Resumo
O que veremos na aula de hoje?
- [Testes de integração](#testes-de-integração)
  - [Conceito](#conceito)
  - [Motivação](#motivação)
  - [Benefícios](#benefícios)
  - [Desafios](#desafios)
  - [Abordagens](#abordagens)
    - [Teste do Big Bang](#teste-do-big-bang)
    - [Teste Incremental](#teste-incremental)
      - [Teste de baixo para cima](#teste-de-integração-de-baixo-para-cima)
      - [Teste de cima para baixo](#teste-de-cima-para-baixo-top-down)
      - [Teste híbrido](#teste-híbrido-ou-sanduíche)
  - [Como Fazer Testes de Integração?](#como-fazer-testes-de-integração)
  - [Melhores práticas](##melhores-práticas)
- [Testes end-to-end](#e2e)
  - [Conceito](#conceito-1)
  - [Motivação](#motivação-1)
  - [Benefícios](#benefícios-1)
  - [Desvantagens](#desvantagens)
  - [Passos para Realizar Testes de Ponta a Ponta](#passos-para-realizar-testes-de-ponta-a-ponta)
  - [Exemplo de Teste de Ponta a Ponta](#exemplo-de-teste-de-ponta-a-ponta)
  - [Três Tipos de Atividades em Testes de Ponta a Ponta](#três-tipos-de-atividades-em-testes-de-ponta-a-ponta)

- [Exercícios](#exercícios)
- [Material da aula](#material-da-aula)
- [Links Úteis](#links-úteis)
  

## Testes de integração

### **Conceito**

Teste de integração tem objetivo de validar módulos/componentes quando integrados para verificar se eles funcionam conforme o esperado, ou seja, testar os módulos que estão funcionando bem individualmente e não apresentam problemas quando integrados. A principal função ou objetivo deste teste é testar as interfaces entre as unidades/módulos.

### Motivação

O objetivo dos testes de integração é encontrar bugs nas conexões e dependências entre diversos componentes, tais como:

- Passagem de argumentos inválidos ou ordenados incorretamente
- Esquema de banco de dados corrompido
- Integração inválida de cache
- Falhas na lógica de negócios ou erros no fluxo de dados (pois os testes são agora realizados a partir de uma visão mais ampla).

Se os componentes que estamos testando não possuem uma lógica complicada, os testes de integração serão muito mais importantes do que os testes unitários. Nesse caso, os testes unitários serão utilizados principalmente para garantir um bom design de código.

Enquanto os testes unitários ajudam a garantir que as funções sejam escritas corretamente, os testes de integração ajudam a garantir que o sistema esteja funcionando corretamente como um todo. Portanto, tanto os testes unitários quanto os testes de integração servem a propósitos complementares, e ambos são essenciais para uma abordagem de teste abrangente.

Por exemplo, os componentes nos testes de integração podem ter dependências que estão fora do projeto, como bancos de dados, sistemas de arquivos, provedores de e-mail, serviços de pagamento externos, entre outros.

Ocasionalmente, os testes de integração precisam usar esses serviços e componentes externos, e às vezes eles podem ser simulados.

### Benefícios

- Garante a adequação dos módulos e dos resultados de suas operações;
- Detecta problemas de comunicação entre módulos;
- Fornece uma cobertura de teste mais ampla em comparação com testes unitários.

### Desafios

- **Execução de teste frágil:** Serviços externos podem estar indisponíveis, retornar uma resposta inválida ou estar em um estado inválido. Em alguns casos, isso pode resultar em um falso positivo, outras vezes pode resultar em um falso negativo.
- **Execução lenta:** Preparar e conectar-se a serviços externos pode ser lento. Normalmente, os testes são executados em um servidor externo como parte da [Integração Contínua](http://martinfowler.com/articles/continuousIntegration.html).
- **Configuração de teste complexa:** Serviços externos precisam estar no estado desejado para os testes. Por exemplo, o banco de dados deve estar pré-carregado com os dados de teste necessários, etc.

[A Node.js Guide to Actually Doing Integration Tests | Toptal®](https://www.toptal.com/nodejs/nodejs-guide-integration-tests)

### Abordagens

- Big Bang
- Incremental
    - Top Down
    - Bottom Up
    - Sandwich

#### Teste do Big Bang

O Teste do Big Bang é uma abordagem de teste de integração na qual todos os componentes ou módulos são integrados de uma só vez e testados como uma unidade. Esse conjunto combinado de componentes é considerado uma entidade durante o teste. Se todos os componentes na unidade não estiverem concluídos, o processo de integração não será executado.

![Big Bang](/assets/01-big-bang-integration.png)


**Vantagens:**

- Conveniente para sistemas pequenos.

**Desvantagens:**

- Localizar falhas é difícil.
- Dada a grande quantidade de interfaces que precisam ser testadas nessa abordagem, é fácil perder algumas interfaces que precisam ser testadas.
- Como os testes de integração só podem começar depois que "todos" os módulos são projetados, a equipe de teste terá menos tempo para a execução na fase de teste.
- Como todos os módulos são testados de uma vez, os módulos críticos de alto risco não são isolados e testados com prioridade. Módulos periféricos que lidam com interfaces de usuário também não são isolados e testados com prioridade.


#### Teste Incremental

Na abordagem de Teste Incremental, os testes são realizados integrando dois ou mais módulos que são logicamente relacionados entre si e, em seguida, testados para garantir o funcionamento adequado da aplicação. Posteriormente, outros módulos relacionados são integrados incrementalmente, e o processo continua até que todos os módulos logicamente relacionados sejam integrados e testados com sucesso.

A abordagem Incremental é realizada por dois Métodos diferentes:

- De Baixo para Cima (Bottom Up)
- De Cima para Baixo (Top Down)

##### Teste de Integração de Baixo para Cima

O Teste de Integração de Baixo para Cima é uma estratégia na qual os módulos de nível inferior são testados primeiro. Esses módulos testados são então usados para facilitar o teste de módulos de nível superior. O processo continua até que todos os módulos no nível superior sejam testados. Uma vez que os módulos de nível inferior são testados e integrados, então o próximo nível de módulos é formado.

![Bottom-Up](/assets/01-bottom-up-integration-testing.jpg)

**Vantagens:**

- Abordagem incremental, localização de fontes de falhas facilitada;
- Não há perda de tempo esperando que todos os módulos sejam desenvolvidos;
- Fácil de criar condições de teste

**Desvantagens:**

- **Drivers** requerem conhecimento de programação e tempo para desenvolvimento;
- Módulos críticos (no nível superior da arquitetura de software) que controlam o fluxo de aplicativos são testados por último e podem estar propensos a defeitos;
- Um protótipo inicial não é possível.

##### Teste de cima para baixo (Top-Down):

![Top-Down](/assets/01-top-down-integration-testing.jpg)

Nessa abordagem, os módulos individuais são combinados a partir do nível superior da hierarquia, o teste começa combinando os módulos em níveis superiores, movendo-se para baixo, para os módulos de nível inferior. Às vezes, os módulos de nível inferior não estão disponíveis, para conseguir realizar o teste são criados *stubs*, um trecho de código ou programa que aceita as entradas do módulo superior e retorna os resultados esperados. A grande vantagem é poder testar logo no início as funções principais do software.

**Vantagens:**

- Abordagem incremental, localização de fontes de falhas facilitada;
- Possibilidade de testar protótipos iniciais;
- Módulos críticos são priorizados, e por isso falhas de design podem ser encontradas e resolvidas.

**Desvantagens:**

- **Stubs** requerem conhecimento de programação e tempo para desenvolvimento;
- Módulos em um nível inferior são testados inadequadamente.

##### Teste Híbrido ou Sanduíche: 

![Sandwich](/assets/01-hybrid-integration.jpg)

A abordagem de teste de integração híbrida ou sanduíche combina as metodologias Top-Down e Bottom-Up. Nesta abordagem o sistema é integrado dividindo-o em camadas: 
- Lógica: camada formada pelos módulos que são mais frequentemente chamados. Aqui, utiliza-se a técnica Bottom-up; 
- Operacional, que é formado pelos módulos principais, do ponto de vista operacional, sendo testado por meio da técnica Top-down.

**Vantagens:**
* Como seus pais, é uma abordagem incremental, e portanto, pode ser iniciada com poucos módulos;
* Combina os benefícios das abordagens de cima para baixo e de baixo para cima
* Adequado para grandes projetos

**Desvantagens:**
* Envolve alto custo de teste, pois são precisa-se de mais recursos, é possível que seja necessário utilizar tanto _stubs_ quanto _drivers_.

**stubs** são usados para isolar o código sendo testado, enquanto **drivers** são usados para fornecer entradas simuladas ou comportamentos simulados para testar o código que depende de componentes ou serviços externos que ainda não estão disponíveis ou implementados. Ambos são técnicas importantes para garantir que o código seja testado de forma eficaz e independente.


> ℹ️ Leia sobre [Stubs e Drives](/material/stubsVsDrivers.md)


### Como Fazer Testes de Integração?

O procedimento de teste de integração, independentemente das estratégias de teste de software (discutidas anteriormente), é o seguinte:

1. Preparar o Plano de Testes de Integração.
2. Projetar os Cenários de Teste, Casos e Roteiros.
3. Executar os Casos de Teste, seguido pelo relato dos defeitos encontrados.
4. Rastrear e retestar os defeitos.
5. Os passos 3 e 4 são repetidos até a conclusão bem-sucedida da integração.

[Integration Testing: What is, Types with Example](https://www.guru99.com/integration-testing.html)

### Melhores práticas:

- Identifique unidades críticas que devem ser priorizadas;
- Utilize logs com abundância;
- Mantenha seus testes unitários separados dos testes de integração;
- Não teste lógica de negócio em testes de integração;
- Se possível utilize CI/CD, para rodar seus testes antes do deploy.

## E2E

### Conceito

**Testes de Aplicativo e Navegador**

Uma técnica de teste de software que verifica o fluxo de trabalho de uma aplicação desde o início até o fim em [cenários de usuário reais](https://www.browserstack.com/real-user-conditions-testing-on-browserstack). Os testes de ponta a ponta são um tipo de teste que verifica toda a aplicação de software do início ao fim, incluindo todos os sistemas, componentes e integrações envolvidos no fluxo de trabalho da aplicação. 

### Motivação

Ele tem como objetivo garantir que a aplicação funcione corretamente e atenda aos requisitos do usuário. Os testes de ponta a ponta podem envolver vários tipos de teste, como teste de interface gráfica, teste de integração, teste de banco de dados, [teste de desempenho](https://www.browserstack.com/guide/performance-testing), teste de segurança e [teste de usabilidade](https://www.browserstack.com/guide/what-is-usability-testing). Ferramentas de teste automatizado como Selenium, Cypress e Appium são comumente usadas para testes de ponta a ponta para melhorar a eficiência e a precisão.

### Beneficios

- **Melhoria na garantia de qualidade:** Os testes de ponta a ponta podem ajudar a garantir que todas as partes de uma aplicação de software estejam funcionando corretamente e que a aplicação esteja atendendo aos requisitos de negócios pretendidos.
- **Aumento da confiança no software:** Os testes de ponta a ponta podem aumentar a confiança de que o software funcionará conforme esperado em cenários do mundo real, proporcionando segurança aos interessados de que a aplicação é confiável e estável.
- **Detecção mais rápida de defeitos:** Os testes de ponta a ponta podem ajudar a detectar defeitos no início do ciclo de desenvolvimento, permitindo que os desenvolvedores corrijam os problemas antes que se tornem mais difíceis e custosos de resolver.
- **Redução de custos:** Os testes de ponta a ponta podem ajudar a reduzir os custos associados a defeitos e bugs detectados tardiamente no ciclo de desenvolvimento ou após a implantação da aplicação.
- **Melhor alinhamento com requisitos de negócios:** Os testes de ponta a ponta podem ajudar a garantir que a aplicação atenda aos requisitos de negócios, tornando mais provável que a aplicação seja aceita pelos usuários pretendidos.
- **Processo de teste mais eficiente:** Os testes de ponta a ponta podem ajudar a otimizar o processo de teste, testando a aplicação do ponto de vista do usuário, em vez de testar componentes individuais isoladamente, facilitando a identificação e solução de problemas que possam surgir.

**outras vantagens:**

- Testes da perspectiva de um usuário: testes de ponta a ponta examinam o aplicativo da perspectiva de um usuário final. Isso pode descobrir defeitos que não são aparentes no teste de unidade;
- Verifica fluxos de trabalho: testes E2E podem validar a lógica de negócios de uma aplicação;
- Expande a cobertura de teste: os testes E2E podem verificar se todas as dependências de um aplicativo funcionam corretamente em conjunto, incluindo código de terceiros;
- Reduz o número de erros encontrados na produção: adicionar testes E2E a um conjunto de testes pode ajudar a reduzir a chance de encontrar defeitos após a implantação na produção.

### Desvantagens:

- Execução lenta: testes que verificam fluxos de trabalho por meio da interface do usuário podem levar muito tempo para serem executados;
- Testes frágeis: os testes E2E podem exigir manutenção e resolução de problemas significativos;
- Falta de ambiente de teste disponível: recriar um ambiente de teste para um cenário do mundo real pode ser difícil;
- Mais difícil de depurar: quando um teste E2E falha, mais pesquisas podem ser necessárias para encontrar e corrigir o problema do que com uma unidade mais granular ou teste de integração.

### **Passos para Realizar Testes de Ponta a Ponta**

Os passos abaixo são necessários para iniciar e concluir qualquer teste de ponta a ponta.

1. Analisar os requisitos. Ter uma ideia clara de como o aplicativo deve funcionar em todos os aspectos.
2. Configurar um ambiente de teste alinhado com todos os requisitos.
3. Analisar os requisitos de software e hardware.
4. Listar como cada sistema precisa responder.
5. Listar os métodos de teste necessários para testar essas respostas. Inclua descrições claras dos padrões (idioma, ferramentas, etc.) a serem seguidos em cada teste.
6. Projetar casos de teste.
7. Executar os testes, estudar e salvar os resultados.

### **Exemplo de Teste de Ponta a Ponta**

Digamos que os testadores precisem verificar o funcionamento de uma conta do Gmail. As seguintes funcionalidades devem ser testadas:

1. Digitar a URL na barra de endereços para abrir a página de login do Gmail.
2. Fazer login na conta com credenciais válidas.
3. Acessar a Caixa de Entrada. Abrir e-mails lidos e não lidos.
4. Compor um novo e-mail.
5. Responder e encaminhar um e-mail existente.
6. Abrir a pasta Itens Enviados. Verificar os e-mails lá.
7. Abrir a pasta de Spam. Verificar os e-mails lá.
8. Sair do Gmail clicando em 'sair'.

### Três Tipos de Atividades em Testes de Ponta a Ponta

#### 1. Funções do Usuário

Para construir funções do usuário, faça o seguinte:

- Listar as funcionalidades do software e seus sub-sistemas interconectados.
- Para cada função, rastrear e registrar todas as ações realizadas. Faça o mesmo para todos os dados de entrada e saída.
- Identificar todas as relações entre funções do usuário.
- Estabelecer se cada função do usuário é independente ou reutilizável.

#### 2. Condições

Para construir condições com base nas funções do usuário, defina um conjunto de condições para cada função do usuário. Isso poderia incluir tempo, condições de dados, etc., fatores que afetam as funções do usuário.

#### 3. Casos de Teste

Para construir casos de teste para Testes de Ponta a Ponta, leve em consideração o seguinte:

- Criar vários casos de teste para testar cada funcionalidade das funções do usuário.
- Atribuir pelo menos um caso de teste separado para cada condição.

https://www.browserstack.com/guide/end-to-end-testing

https://www.browserstack.com/guide/test-case-reduction-and-techniques

| Cenário de teste | Casos de teste |
| --- | --- |
| Cenário de teste é um conceito | Os casos de teste são as soluções para verificar esse conceito |
| O cenário de teste é uma funcionalidade de alto nível | Os casos de teste são procedimentos detalhados para testar a funcionalidade de alto nível |
| Os cenários de teste são derivados de Requisitos de Usuário | Os casos de teste são derivados de cenários de teste |
| O cenário de teste responde a "Qual funcionalidade deve ser testada?" | Os casos de teste respondem a "Como testar a funcionalidade?" |
| Cenários de teste têm vários casos de teste | Um caso de teste pode ou não estar associado a vários cenários de teste |
| Um cenário de teste nunca é repetível | Caso de teste único pode ser usado várias vezes em diferentes cenários |
| Necessária apenas documentação simples | É necessária documentação detalhada |
| Sessões de brainstorming são necessárias para finalizar um cenário de teste | É necessário conhecimento técnico detalhado do aplicativo de software |
| O custo de manutenção é baixo, pois os recursos necessários são baixos | O custo de manutenção é alto, pois os recursos necessários são altos |

> O **cenário de teste**: Define o que deve ser testado. **Caso de teste**: É uma forma específica de como deve ser feito o teste validando ou não se a funcionalidade está correta.

https://www.lambdatest.com/blog/playwright-vs-selenium-vs-cypress/

***
### Exercícios 
* [Exercicio para sala](/exercicios/para-sala/)
* [Exercicio para casa](/exercicios/para-casa/)

### Material da aula 
<!-- * [Material](/material) -->

### Links Úteis
*  https://medium.com/rd-shipit/test-doubles-mocks-stubs-fakes-spies-e-dummies-a5cdafcd0daf
* https://www.luiztools.com.br/post/tdd-como-criar-integration-tests-em-node-js-com-jest/
* https://dev.to/ali_adeku/guide-to-writing-integration-tests-in-express-js-with-jest-and-supertest-1059
* https://jestjs.io/pt-BR/docs/mock-functions
* https://www.toptal.com/nodejs/nodejs-guide-integration-tests
* https://www.guru99.com/integration-testing.html
* https://github.com/public-apis/public-apis
---

<p align="center">
Desenvolvido com :purple_heart: por [Isabelle Galvão](https://github.com/isabellegalvao)
</p>

