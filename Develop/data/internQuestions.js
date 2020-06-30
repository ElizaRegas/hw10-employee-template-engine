const validator = require('./validate');

const internQuestions = () => [
  {
    type: "input",
    name: "name",
    message: "What is your intern's name?",
    validate: value => validator.validate(value)
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern's ID?",
    validate: value => validator.validate(value)
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern's email?",
    validate: value => validator.validateEmail(value)
  },
  {
    type: "input",
    name: "schoolName",
    message: "What is your intern's school?",
    validate: value => validator.validate(value)
  }
];

module.exports = internQuestions;
