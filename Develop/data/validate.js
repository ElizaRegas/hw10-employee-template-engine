const validate = value => value.trim().length > 0 && value.trim() === value;

const validateEmail = email => {
  const match = email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/);
  return match !== null && match.length > 0 && match[0] === email;
};

module.exports = {
  validate,
  validateEmail
};
