Para criar testes de integração sem mockar os endpoints da PokeAPI, você pode usar a biblioteca `supertest` junto com o Jest para realizar chamadas reais à API. Primeiro, você precisará instalar as dependências necessárias:

```bash
npm install supertest jest --save-dev
```

Neste exemplo, `supertest` é usado para fazer chamadas HTTP aos endpoints da API.