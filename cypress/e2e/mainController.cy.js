describe('Navigation is working', () => {
    beforeEach(() => {
        cy.visit(Cypress.config('PHPTRAVELS'));
    })
    it('We can navigate to flights', () => {
        cy.get('.header_menu.navbar-nav').find('li').first().click()
    })
    it('We can navigate to hotels', () => {
        cy.get('.header_menu.navbar-nav').contains('Hotels').click()
    })
    it('We can navigate to Tours', () => {
        cy.get('.header_menu.navbar-nav').contains('Tours')
            .click()
    })
    it('We can navigate to Cars', () => {
        cy.get('.header_menu.navbar-nav').contains('Cars').click()
    })
})
describe('Search flights', () => {
    before(()=>{
        cy.auth('PHPSESSID','33fa1e9ede98390beaaf9c68656be4697')
    })
    it('search destination', async function() {
        cy.fillSearchData();
        // await cy.getCompany()
        const cyOBj = Cypress.env()
        // getPerson();
        cy.get('#flight_type').children().then((type) => {
            const randomOption = Math.floor(Math.random() * type.length)
            cy.get(`#flight_type`).select(randomOption)
        })

        cy.get('.col-lg-1 > #flights-search').click();
        cy.get('#flights--list-js').next().next().children().as('searchedFlightsList')
    })
    it('We get no flights', function() {
        cy.fillSearchData();
        cy.get(`#flight_type`).select(1)
        cy.get('.col-lg-1 > #flights-search').click();
        cy.get('.mt-2.w-50.h-50.shadow-sm.p-3.mb-5.bg-white.rounded').should((img) => {
            expect(img).to.exist
            expect(img).to.be.visible
            expect(img).to.have.attr('src').that.equals('https://www.phptravels.net/assets/img/no_img.webp')
        })
    })
    it('Getting a car', () => {
        cy.visit(Cypress.config('PHPTRAVELS'))
    })
})
describe('Search hotels', () => {
    before(()=>{
        cy.visit(Cypress.config('PHPTRAVELS')+'/hotels');
        cy.get('#select2-hotels_city-container')
            .click({
                force: true
            })
            .get('input[type="search"]').
        as('searchFlight')
    })
    it('Finding no results', () => {
                // No rewsults should be found
                cy.get('@searchFlight')
                .click()
                .type('sczxczxcccxzcxz')
                .should('have.value', 'sczxczxcccxzcxz')
                .then(() => {
                    cy.get('[role="alert"]').should('contain', 'No results found');
                })
                cy.get('@searchFlight').clear().type('Dub')
                cy.get('#select2-hotels_city-results')
                //.wait(2000)
                .should('exist')
                .type('{enter}')
                cy.get('button[type="submit"]').click()
                cy.get('.row.g-3.append_template.justify-content-md-center')
                .should((results)=>{
                    expect(results).to.have.length(1);
                    expect(results).to.not.have.descendants()
                })
    })
    it('All viewports?',()=>{
        const sizes = ['iphone-6', 'ipad-2','iphone-3','iphone-5','samsung-s10','iphone-4',[1024, 768],[1280, 720],[1360, 768],[1600, 900],
        'macbook-16', 'macbook-15', 'macbook-13', 'macbook-11', 'ipad-2', 'ipad-mini', 'iphone-xr', 'iphone-x', 'iphone-6+'
        , 'iphone-se2', 'iphone-8', 'iphone-7', 'samsung-note9']
        sizes.forEach((devSize)=>{
            Array.isArray(devSize) && cy.viewport(...devSize);
            typeof devSize === 'string' && cy.viewport(devSize);            
        })
    })
})