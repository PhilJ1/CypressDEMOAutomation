Cypress.Commands.add('getPerson', function (){
    cy.fakeData('persons?_quantity=10&_locale=sk_SK').then(function (osoba) {
        const rand = Math.floor(Math.random() * osoba.body.data.length);
        Cypress.env('osoba', osoba.body.data[rand]);
    });
})
Cypress.Commands.add('getText',function(){
    cy.fakeData('texts?_quantity=10&_locale=it_IT&_characters=250').then(function (text) {
        const rand = Math.floor(Math.random() * text.body.data.length);
        Cypress.env('textData', text.body.data[rand]);
    });
})
Cypress.Commands.add('getCompany',function(){
    cy.fakeData('companies?_quantity=10&_locale=sk_SK').then(function (firma) {
        const rand = Math.floor(Math.random() * firma.body.data.length);
        Cypress.env('firmaData', firma.body.data[rand]);
    });
})