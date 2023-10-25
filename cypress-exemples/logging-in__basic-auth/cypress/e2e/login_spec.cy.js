describe("Logging In - Basic Auth", () => {
  it("quando não passar a auth retorna 401", () => {
    cy.request({
      url: "/",
      failOnStatisCode: false,
    })
      .its("status")
      .should("equal", 401);
  });
});
