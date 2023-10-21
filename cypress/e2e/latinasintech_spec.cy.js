describe('Latinas in Tech Website', () => {
    it('should visit the homepage and check for important elements', () => {
      // Visita a página inicial do Latinas in Tech
      cy.visit('https://latinasintech.org/');
  
      // Verifica se o título da página é correto
      cy.title().should('include', 'Latinas in Tech');
  
      // Verifica se o menu de navegação está visível
      cy.get('nav').should('be.visible');
  
      cy.contains('About').click();
  
      // Verifica se a página "About" foi carregada corretamente
      cy.url().should('include', '/about');
      cy.get('h1').should('contain', 'About Us');
    });
  });
  