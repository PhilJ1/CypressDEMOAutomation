const futureDate = ()=>{
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
  }
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
  module.exports = {futureDate,fillSearchData}