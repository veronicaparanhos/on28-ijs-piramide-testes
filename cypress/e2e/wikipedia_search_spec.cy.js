describe('Wikipedia Search', () => {
  it('should search for a term on Wikipedia', () => {
    // Visita a página inicial do Wikipedia
    cy.visit('https://www.wikipedia.org');

    // Digita "Cypress testing" na barra de pesquisa e pressiona Enter
    cy.get('#searchInput').type('Cypress testing').type('{enter}');

    // Verifica se a página de resultados contém resultados relevantes
    cy.get('.searchresults').should('exist');

    // Clica no primeiro resultado da pesquisa
    cy.get('.searchresults .mw-search-result-heading').first().click();

    // Verifica se a página de destino contém informações relevantes
    cy.url().should('include', 'Cypress');
    cy.get('.mw-search-results .mw-search-result-heading').should('contain', 'Cypress');
  });
});
