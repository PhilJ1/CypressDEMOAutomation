Cypress.Commands.add('futureDate',
  ()=>{
  const options = {
    year: "numeric",
    month:"2-digit",
    day: "numeric"
  }
  const date = new Date();
  date.setDate(date.getDate() + Math.floor(Math.random() * 10+1))
  date.setMonth(date.getMonth() + Math.floor(Math.random()*3+1))
  const dateRand = new Intl.DateTimeFormat('sk-SK',options).format(date).replace(/\./g, '-')
  return dateRand
})
Cypress.Commands.add('auth', function (name, value) {
  cy.request('https://www.phptravels.net/api/traffic?country_code=SK').as('userHeader')
  cy.get('@userHeader')
  cy.getCookie(name).then(cookie => {
    if (!cookie) {
      cy.session({ cookies: { whitelist: [name] , preserve:true} }, () => {
        cy.setCookie(name, value, { path: '/' });
      });
    }
  }).as('Logged user');
  Cypress.log({
    displayName:'User authenficated',
    message:name + value,
    consoleProps(){
      return JSON.stringify({name:name,value:value})
    }
  })
});