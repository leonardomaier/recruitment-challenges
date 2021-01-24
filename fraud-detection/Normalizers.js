const normalizeStreet = (streetName = '') => {
  return streetName
    .replace('st.', 'street')
    .replace('rd.', 'road');
}

const normalizeState = (streetName = '') => {
  return streetName
    .replace('il', 'illinois')
    .replace('ca', 'california')
    .replace('ny', 'new york')
}

const normalizeEmail = (email = '') => {

  let [username, domain] = email.split('@');

  const noPlusSymbol = username.indexOf('+') < 0;

  username = noPlusSymbol ? username.replace('.', '') : username.replace('.', '').substring(0, atIndex - 1);

  return username.concat('@' + domain);
}

module.exports = {
  normalizeEmail,
  normalizeState,
  normalizeStreet
};