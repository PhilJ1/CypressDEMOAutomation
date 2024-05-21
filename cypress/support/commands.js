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
Cypress.Commands.add('randomSelect',(element)=>{
  cy.get(element).click()
  .then(function (dom) {
    console.log("🚀 ~ dom:", dom[0])
    const options = Array.from(dom[0].options);
    console.log("🚀 ~ options:", options)
    const nahodne = options[Math.floor(Math.random() * options.length)].value;
    console.log("🚀 ~ nahodne:", nahodne)
    cy.get(dom).select(nahodne);
});
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