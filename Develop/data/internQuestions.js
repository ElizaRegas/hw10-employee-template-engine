const validate = (value) => value.trim().length > 0 && value.trim() === value;

const internQuestions = () => [
  {
    type: "input",
    name: "name",
    message: "What is your intern's name?",
    validate: (value) => validate(value),
  },
  {
    type: "input",
    name: "id",
    message: "What is your intern's ID?",
    validate: (value) => validate(value),
  },
  {
    type: "input",
    name: "email",
    message: "What is your intern's email?",
    validate: (email) => {
      const match = email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/);
      return match !== null && match.length > 0 && match[0] === email;
    },
  },
  {
    type: "input",
    name: "schoolName",
    message: "What is your intern's school?",
    validate: (value) => validate(value),
  },
];

module.exports = internQuestions;
