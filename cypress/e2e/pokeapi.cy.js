describe("Testar a API Pokeapi", () => {
  it("Verificar se a página principal está funcionando", () => {
    cy.visit("https://pokeapi.co/");
  });
});
