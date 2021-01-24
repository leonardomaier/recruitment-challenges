const fs = require('fs');
const Order = require('./Order');

function getOrdersFromFile(filePath) {
  try {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let lines = fileContent.split('\n');

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

  } catch (error) {
    throw Error(error);
  }
}

function check(filePath) {

  const fraudulents = order => order.fraudulent;

  const toFraudObject = order => {
    return { isFraudulent: order.fraudulent, orderId: order.orderId };
  };

  let orders = getOrdersFromFile(filePath);

  for (let i = 0; i < orders.length; i++) {

    let currentOrder = orders[i];

    for (let j = i + 1; j < orders.length; j++) {

      let nextOrder = orders[j];

      if (nextOrder.isFraudulentTo(currentOrder)) {
        nextOrder.fraudulent = true;
      }
    }
  }

  return orders.filter(fraudulents).map(toFraudObject);
}

module.exports = { check }
