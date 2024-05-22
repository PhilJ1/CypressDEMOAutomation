const {futureDate} = require('../../helpers.js');
const fillSearchData = function(){
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
    cy.get('#departure').type(`{selectall}{backspace}${futureDate()}`)
}
describe('We can search ',()=>{
    it('search destination', function () {
        fillSearchData();
        cy.get('#flight_type').children().then( (type) =>{
            const randomOption = Math.floor(Math.random()*type.length)
            cy.get(`#flight_type`).select(randomOption)
        })

        cy.get('.col-lg-1 > #flights-search').click();
    })
    it.only('We get no flights',function() {
        fillSearchData();
        cy.get(`#flight_type`).select(1)
        cy.get('.col-lg-1 > #flights-search').click();
        cy.get('.mt-2.w-50.h-50.shadow-sm.p-3.mb-5.bg-white.rounded').should(img=>expect(img).to.exist)
    })
})