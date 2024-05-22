// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
Cypress.Commands.add('fakeData',(url) => {
    cy.request(BASEFAKERURL + url).then(response =>{
        if(response.status === 200) return response
    }).as('Mock data');
    Cypress.log({
      displayName:'fakeData',
      message:url,
      consoleProps(){
        return url
      }
    })
});
Cypress.Commands.add('continueOnFail',()=>{
  cy.on('fail',(err,runnable)=>{
    cy.log(err.message);
    return false;
  })
})
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })