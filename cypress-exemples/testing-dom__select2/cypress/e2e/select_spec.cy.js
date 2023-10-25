describe("Elemnto Select", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Define estado como HI", () => {
    cy.get("#meu-estado").select("HI");
    cy.get("#meu-estado").should("have.value", "HI");
  });

  it("Define estado com Nevada", () => {
    cy.get("#meu-estado").select("Nevada");
    cy.get("#meu-estado").should("have.value", "NV");
  });

  it("Múltiplos valores", () => {
    cy.get("#meus-estados").select(["MA", "NV", "HI"]);
    cy.get("#meus-estados")
      .invoke("val")
      .should("deep.equal", ["HI", "NV", "MA"]);
  });
});
