const request = require("supertest");
const starWars = "https://swapi.dev/api/";

describe("Testar endpoint da SW API", () => {
  test("deve retornar um personagem ao passar um NOME sem problemas", async () => {
    const response = await request(starWars).get("people/1");
    expect(response.body.name).toBe("Luke Skywalker");
    expect(response.status).toBe(200);
  });

  test("deve retornar um objeto sem problemas", async () => {
    const response = await request(starWars).get("planets/3");
    expect(response.body).toMatchObject({
      name: "Yavin IV",
      rotation_period: "24",
      orbital_period: "4818",
      diameter: "10200",
      climate: "temperate, tropical",
      gravity: "1 standard",
      terrain: "jungle, rainforests",
      surface_water: "8",
      population: "1000",
      residents: [],
      films: ["https://swapi.dev/api/films/1/"],
      created: "2014-12-10T11:37:19.144000Z",
      edited: "2014-12-20T20:58:18.421000Z",
      url: "https://swapi.dev/api/planets/3/",
    });
    expect(response.status).toBe(200);
  });

  test("deve retornar um conteúdo específico de um array sem problemas", async () => {
    const response = await request(starWars).get("starships/5");
    expect(response.body.films).toContain("https://swapi.dev/api/films/1/");
    expect(response.status).toBe(200);
  });

  test("deve retornar o conteúdo de um array sem problemas", async () => {
    const response = await request(starWars).get("films/2");
    expect(response.body.planets).toEqual([
      "https://swapi.dev/api/planets/4/",
      "https://swapi.dev/api/planets/5/",
      "https://swapi.dev/api/planets/6/",
      "https://swapi.dev/api/planets/27/",
    ]);
    expect(response.status).toBe(200);
  });
});
