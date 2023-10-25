describe("Entrar no index", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("1 - Pegar o input de range", () => {
    cy.get("input");
  });

  it("2 - invocar a função valor e passar o valor de 25", () => {
    cy.get("input[name=range-input]").invoke("val", 25).trigger("change");

    cy.get("p").should("have.text", 25);
  });
});
