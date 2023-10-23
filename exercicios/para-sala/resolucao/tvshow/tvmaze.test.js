const request = require("supertest");
const shows = "https://api.tvmaze.com/";

describe("Testar endpoint da TV Maze", () => {
  test("deve retornar uma série ao passar um NOME sem problemas", async () => {
    const response = await request(shows).get("shows/169");
    expect(response.body.name).toBe("Breaking Bad");
    expect(response.status).toBe(200);
  });

  test("deve retornar uma série ao passar um NOME sem problemas", async () => {
    const response = await request(shows).get("shows/1");
    expect(response.body.url).toEqual(
      "https://www.tvmaze.com/shows/1/under-the-dome"
    );
    expect(response.status).toBe(200);
  });
});
