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
  module.exports = {futureDate}