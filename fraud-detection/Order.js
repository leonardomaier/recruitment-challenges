const {
  normalizeEmail,
  normalizeState,
  normalizeStreet
} = require('./Normalizers');

class Order {

  constructor({ orderId, dealId, email, street, city, state, zipCode, creditCard }) {
    this.orderId = Number(orderId);
    this.dealId = Number(dealId);
    this.email = normalizeEmail(email.toLowerCase());
    this.street = normalizeStreet(street.toLowerCase());
    this.state = normalizeState(state.toLowerCase());
    this.city = city.toLowerCase();
    this.zipCode = zipCode;
    this.creditCard = creditCard;
    this.fraudulent = false;
  }

  creditCardDifferentFrom(creditCard) {
    return this.creditCard === creditCard;
  }

  stateEqualTo(state) {
    return this.state === state;
  }

  dealIdEqualTo(dealId) {
    return this.dealId === dealId;
  }

  emailEqualTo(email) {
    return this.email === email;
  }
  zipCodeEqualTo(zipCode) {
    return this.zipCode === zipCode;
  }

  streetEqualTo(street) {
    return this.street === street;
  }

  cityEqualTo(city) {
    return this.city === city;
  }

  fullAddressEqualTo(order) {
    return this.stateEqualTo(order.state) &&
      this.zipCodeEqualTo(order.zipCode) &&
      this.streetEqualTo(order.street) &&
      this.cityEqualTo(order.city);
  }

  isFraudulentTo(order) {
    return this.emailEqualTo(order.email) || (
      this.dealIdEqualTo(order.dealId) &&
      this.fullAddressEqualTo(order) &&
      this.creditCardDifferentFrom(order.creditCard)
    );
  }
}

module.exports = Order;