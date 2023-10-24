const request = require('supertest');
const app = "https://swapi.dev/api" 

describe('Star Wars API Endpoints', () => {
  it('should fetch person or character data from the API', async () => {
    const response = await request(app).get('/people/1/');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Luke Skywalker');
  });

  it('should fetch species data from the API', async () => {
    const response = await request(app).get('/species/3');
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Wookie');
  });

  it('should fetch single film data from the API', async () => {
    const response = await request(app).get('/films/1/');
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('A New Hope');
  });

  it('should fetch single transport data from the API', async () => {
    const response = await request(app).get('/starships/9');
    expect(response.status).toBe(200);
    expect(response.body.model).toBe('DS-1 Orbital Battle Station');
  });
});
