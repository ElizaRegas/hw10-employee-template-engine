// function to validate that the input has characters, and to block a user from entering blank space before and after
const validator = require("./validate");

const engineerQuestions = () => [
  {
    type: "input",
    name: "name",
    message: "What is your engineer's name?",
    validate: value => validator.validate(value)
  },
  {
    type: "input",
    name: "id",
    message: "What is your engineer's ID?",
    validate: value => validator.validate(value)
  },
  {
    type: "input",
    name: "email",
    message: "What is your engineer's email?",
    validate: value => validator.validateEmail(value)

  },
  {
    type: "input",
    name: "gitHubUserName",
    message: "What is your engineer's GitHub username?",
    validate: value => validator.validate(value)
  }
];

module.exports = engineerQuestions;