const validator = require('./validate');

const managerQuestions = () => [
  {
    type: "input",
    name: "name",
    message: "What is your manager's name?",
    validate: value => validator.validate(value)
  },
  {
    type: "input",
    name: "id",
    message: "What is your manager's ID?",
    validate: value => validator.validate(value)
  },
  {
    type: "input",
    name: "email",
    message: "What is your manager's email?",
    validate: value => validator.validateEmail(value)
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your manager's office number?",
    validate: value => validator.validate(value)
  }
]

module.exports = managerQuestions;