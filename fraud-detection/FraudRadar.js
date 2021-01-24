const fs = require('fs')
const {
  normalizeEmail,
  normalizeState,
  normalizeStreet
} = require('./Normalizers');


function getOrders(lines = []) {
  return lines.map(line => {
    [orderId, dealId, email, street, city, state, zipCode, creditCard] = line.split(',');

    return {
      orderId: Number(orderId),
      dealId: Number(dealId),
      email: normalizeEmail(email.toLowerCase()),
      street: normalizeStreet(street.toLowerCase()),
      city: city.toLowerCase(),
      state: normalizeState(state.toLowerCase()),
      zipCode,
      creditCard
    }
  })
}



function Check(filePath) {
  // READ FRAUD LINES
  let orders = []
  let fraudResults = []

  let fileContent = fs.readFileSync(filePath, 'utf8')
  let lines = fileContent.split('\n')

  orders = getOrders(lines);

  // CHECK FRAUD
  for (let i = 0; i < orders.length; i++) {
    let current = orders[i]
    let isFraudulent = false

    for (let j = i + 1; j < orders.length; j++) {
      isFraudulent = false
      if (current.dealId === orders[j].dealId
        && current.email === orders[j].email
        && current.creditCard !== orders[j].creditCard) {
        isFraudulent = true
      }

      if (current.dealId === orders[j].dealId
        && current.state === orders[j].state
        && current.zipCode === orders[j].zipCode
        && current.street === orders[j].street
        && current.city === orders[j].city
        && current.creditCard !== orders[j].creditCard) {
        isFraudulent = true
      }

      if (isFraudulent) {
        fraudResults.push({
          isFraudulent: true,
          orderId: orders[j].orderId
        })
      }
    }
  }

  return fraudResults
}

module.exports = { Check }
