describe("Testando links do menu", () => {
  beforeEach(() => {
    cy.visit("/index.html");
  });
  it("1 - verificar se o btn de usuário menu está correto - testando o link sem clicar", () => {
    cy.get("#users").should("have.attr", "href").and("include", "users.html");
  });

  it("2 - verificar se o btn de usuário menu está correto - testando o link sem clicar", () => {
    cy.get("#users")
      .should("have.prop", "href")
      .and("equal", "http://localhost:7078/users.html");
  });

  it("3 - requisitar uma página", () => {
    cy.get("#google").then((alink) => {
      const href = alink.prop("href");
      cy.request(href).its("body").should("include", "</html>");
    });
  });
});
