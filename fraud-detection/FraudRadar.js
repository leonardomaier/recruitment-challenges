const fs = require('fs');
const Order = require('./Order');

function getOrders(lines = []) {
  return lines.map(line => {
    const props = {};

    [
      props.orderId,
      props.dealId,
      props.email,
      props.street,
      props.city,
      props.state,
      props.zipCode,
      props.creditCard
    ] = line.split(',');

    return new Order(props);
  });
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

      if (current.isFraudulentTo(orders[j])) {
        isFraudulent = true;
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
