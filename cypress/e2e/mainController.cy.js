const {futureDate, fillSearchData} = require('../../src/helpers.js');
describe('We can search ',()=>{
    it('search destination', function () {
        cy.continueOnFail()
        fillSearchData();
        cy.getCompany()
        // getPerson();
        cy.get('#flight_type').children().then( (type) =>{
            const randomOption = Math.floor(Math.random()*type.length)
            cy.get(`#flight_type`).select(randomOption)
        })

        cy.get('.col-lg-1 > #flights-search').click();
        cy.get('#flights--list-js').next().next().children().as('searchedFlightsList')
    })
    it('We get no flights',function() {
        cy.continueOnFail()
        fillSearchData();
        cy.get(`#flight_type`).select(1)
        cy.get('.col-lg-1 > #flights-search').click();
        cy.get('.mt-2.w-50.h-50.shadow-sm.p-3.mb-5.bg-white.rounded').should((img)=>{
            expect(img).to.exist
            expect(img).to.be.visible
            expect(img).to.have.attr('src').that.equals('https://www.phptravels.net/assets/img/no_img.webp')
        })
    })
    it('Getting a hotel',()=>{
        
    })
})