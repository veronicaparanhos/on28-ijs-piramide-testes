const request = require("supertest");
const ibge = "https://servicodados.ibge.gov.br/api/v1/localidades";

describe("Testar os endpoints da API de localidades do IBGE", () => {
  test("testar buscar uma cidade por ID", async () => {
    const response = await request(ibge).get("/regioes-imediatas/330001");
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe("Rio de Janeiro");
  });

  test("testar buscar um estado por ID", async () => {
    const response = await request(ibge).get("/estados/33");
    expect(response.status).toBe(200);
    expect(response.body.nome).toEqual("Rio de Janeiro");
  });

  test("testar buscar a sigla de uma região por ID", async () => {
    const response = await request(ibge).get("/regioes/3");
    expect(response.status).toBe(200);
    expect(response.body.sigla).toContain("SE");
  });

  test("testar buscar uma microrregião por ID", async () => {
    const response = await request(ibge).get("/microrregioes/33018");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 33018,
      nome: "Rio de Janeiro",
      mesorregiao: {
        id: 3306,
        nome: "Metropolitana do Rio de Janeiro",
        UF: {
          id: 33,
          sigla: "RJ",
          nome: "Rio de Janeiro",
          regiao: { id: 3, sigla: "SE", nome: "Sudeste" },
        },
      },
    });
  });

  test("testar buscar uma url inválida", async () => {
    const response = await request(ibge).get(
      "/estados/33/regioes-imediatas/330001"
    );
    expect(response.status).toBe(404);
  });

  test("testar buscar o ID de um estado que não existe", async () => {
    const response = await request(ibge).get("/estados/80");
    expect(response.status).toBe(200);
    expect(response.body.nome).toBeUndefined();
  });
});
