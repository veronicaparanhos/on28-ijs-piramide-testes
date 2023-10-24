
beforeEach(() => {
  cy.visit('index.html')
})

describe('Elemento Select HTML', () => {
  context('valor único', () => {
    it('define MA', () => {
      cy.get('#meu-estado').select('MA')
      cy.get('#meu-estado').should('have.value', 'MA')
    })

    it('define Massachusetts', () => {
      cy.get('#meu-estado').select('Massachusetts')
      cy.get('#meu-estado').should('have.value', 'MA')
    })
  })

  context('múltiplos valores', () => {
    it('adiciona vários estados', () => {
      cy.get('#meus-estados').select(['MA', 'VT', 'CT'])
      cy.get('#meus-estados').invoke('val').should('deep.equal', ['CT', 'MA', 'VT'])
      cy.get('#meus-estados').blur()
    })
  })
})
