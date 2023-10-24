const request = require('supertest');
const app = "https://pokeapi.co/api/v2" 

describe('PokeAPI Endpoints', () => {
  it('should fetch Pokemon data from the API', async () => {
    const response = await request(app).get('/pokemon/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('bulbasaur');
  });

  it('should fetch Ability data from the API', async () => {
    const response = await request(app).get('/ability/4');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('battle-armor');
  });

  it('should fetch Type data from the API', async () => {
    const response = await request(app).get('/type/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('normal');
  });

  it('should fetch Item data from the API', async () => {
    const response = await request(app).get('/item/1');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('master-ball');
  });
});
