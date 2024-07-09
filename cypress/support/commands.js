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
import {BASEFAKERURL} from '../../src/environments'
const formView = require('../../src/views/formView');
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
Cypress.Commands.add('formDataValidator',()=>formView)
Cypress.Commands.add('continueOnFail',()=>{
  cy.on('fail',(err,runnable)=>{
    cy.log(err.message);
    return false;
  })
})
Cypress.Commands.add('fillSearchData',
  ()=>{
    let randomOption
    cy.visit(Cypress.config('PHPTRAVELS'))
    cy.get('.col-lg-3.show > .input-items > .form-floating > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click();
    // fisrt select from destination
    cy.get('#select2--results > div').children().then((des1)=>{
        randomOption = Math.floor(Math.random()*des1.length)+1
        cy.get(`.most--popular-from > :nth-child(${randomOption})`).click()
    })
    cy.get('.mt-2.show.active').last().click()
    cy.get('.most--popular-to').children().then((des2)=>{
        randomOption = Math.floor(Math.random()*des2.length)+1
        cy.get(`.most--popular-to > :nth-child(${randomOption})`).click()
    })
    cy.get('#departure').type(`{selectall}{backspace}${cy.futureDate()}`)
  }
)
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