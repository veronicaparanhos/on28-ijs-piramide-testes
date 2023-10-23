const request = require("supertest");
const api = "https://pokeapi.co/api/v2";

describe("Testar endpoint da PokeAPI", () => {
  test("deve retornar um personagem ao passar um NOME do pokemom sem problemas", async () => {
    const response = await request(api).get("/pokemon/ditto");
    expect(response.body.id).toBe(132);
    expect(response.status).toBe(200);
  });

  test("deve retornar um personagem ao passar o ID do pokemom sem problemas", async () => {
    const response = await request(api).get("/pokemon/23");
    expect(response.body.name).toBe("ekans");
    expect(response.status).toBe(200);
  });

  test("deve retornar o PESO de um personagem ao passar o ID do pokemom sem problemas", async () => {
    const response = await request(api).get("/pokemon/25");
    expect(response.body.weight).toBe(60);
    expect(response.status).toBe(200);
  });

  test("deve retornar um array com as abilidades de um personagem ao passar o ID do pokemom sem problemas", async () => {
    const response = await request(api).get("/pokemon/180");
    expect(response.body.abilities).toEqual([
      {
        ability: {
          name: "static",
          url: "https://pokeapi.co/api/v2/ability/9/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: { name: "plus", url: "https://pokeapi.co/api/v2/ability/57/" },
        is_hidden: true,
        slot: 3,
      },
    ]);
    expect(response.status).toBe(200);
  });

  test("deve retornar se é um personagem padrão ao passar o ID do pokemom sem problemas", async () => {
    const response = await request(api).get("/pokemon/25");
    expect(response.body.is_default).toBeTruthy();
    expect(response.status).toBe(200);
  });
});
