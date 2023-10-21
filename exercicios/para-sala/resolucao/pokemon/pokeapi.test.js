const request = require('supertest')
const api = "https://pokeapi.co/api/v2"


describe('Testar endpoint da PokeAPI', () => {
    test('deve retornar um personagem ao passar um NOME do pokemon sem problemas', async () => {
        const response = await request(api).get('/pokemon/ditto');
        expect(response.body.id).toBe(132)
        expect(response.status).toBe(200)
    })

    test('deve retornar um personagem ao passar o ID do pokemon sem problemas', async () => {
        const response = await request(api).get('/pokemon/96');
        expect(response.body.name).toBe('drowzee')
        expect(response.status).toBe(200)
    })

    test('deveria retornar um personagem ao buscar um pokemon pelo NOME', async () => {
        const response = await request(api).get('/pokemon/ditto')

        expect(response.body.id).toBe(132)
        expect(response.status).toBe(200)
    });

    //testar outros 3 endpoints da pokeAPI
})