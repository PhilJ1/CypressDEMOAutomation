import example from '../fixtures/example.json';
describe('intercepting', () => {
    it('We intercept', () => {
      cy.fixtures('examples')
        cy.intercept(
            {
              method: 'GET', 
              url: 'https://postman-echo.com/get',
            },
            []
          ).as('getSearch')
          cy.wait('@getSearch').its('request.url').should('include', '/search?query=Book')
        });
});
