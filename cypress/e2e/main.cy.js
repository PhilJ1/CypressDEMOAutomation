describe('We can search ',()=>{
    it('search destination', function () {
        cy.visit(Cypress.config('PHPTRAVELS'))
        cy.get('.col-lg-3.show > .input-items > .form-floating > .select2 > .selection > .select2-selection > .select2-selection__arrow > b').click();
        // fisrt select from destination
        cy.get('#select2--results > div').children().then((des1)=>{
            const randomOption = Math.floor(Math.random()*des1.length)
            cy.get(`.most--popular-from > :nth-child(${randomOption})`).click()
        })
        cy.get('.mt-2.show.active').last().click()
        cy.get('.most--popular-to').children().then((des2)=>{
            const randomOption = Math.floor(Math.random()*des2.length)
            cy.get(`.most--popular-to > :nth-child(${randomOption})`).click()
        })
        cy.get('#departure[value = "24-05-2024"]').type()
    })
})