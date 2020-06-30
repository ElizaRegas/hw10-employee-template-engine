// function to validate that the input has characters, and to block a user from entering blank space before and after
const validate = value => value.trim().length > 0 && value.trim() === value;

const engineerQuestions = () => [
  {
    "type": "input",
    "name": "name",
    "message": "What is your engineer's name?",
    "validate": value => validate(value)
  },
  {
    "type": "input",
    "name": "id",
    "message": "What is your engineer's ID?",
    "validate": value => validate(value)
  },
  {
    "type": "input",
    "name": "email",
    "message": "What is your engineer's email?",
    "validate": email => {
      const match = email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/);
      return match !== null && match.length > 0 && match[0] === email;
    }
  },
  {
    "type": "input",
    "name": "gitHubUserName",
    "message": "What is your engineer's GitHub username?",
    "validate": value => validate(value)
  }
];

module.exports = engineerQuestions;