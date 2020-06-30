const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
let employeeInfo = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function enterEmployeeInfo() {
inquirer
  .prompt([
    {
      type: "list",
      name: "employeeType",
      message: "Please select an employee type:",
      choices: ["Manager", "Engineer", "Intern"],
    },
    {
      type: "input",
      name: "name",
      message: "Please enter the employee's first and last name:",
    },
    {
      type: "input",
      name: "id",
      message: "Please enter the employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Please enter the employee's email:",
    }

    // * getName()
    // * getId()
    // * getEmail()
    // * getRole() // Returns 'Employee'
  ])
  .then((results) => {
    switch (results.employeeType) {
      case "Manager":
        inquirer
          .prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "Enter Manager's office number:",
            }
          ])
          .then((res) => {
            results.officeNumber = res.officeNumber;
            continueGatheringEmployeeInfo(results);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Engineer":
        inquirer
          .prompt([
            {
              type: "input",
              name: "gitHubUserName",
              message: "Enter Engineer's GitHub user name:",
            }
          ])
          .then((res) => {
            results.gitHubUserName = res.gitHubUserName;
            continueGatheringEmployeeInfo(results);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "Intern":
        inquirer
          .prompt([
            {
              type: "input",
              name: "schoolName",
              message: "Enter Intern's school name:",
            }
          ])
          .then((res) => {
            results.schoolName = res.schoolName;
            continueGatheringEmployeeInfo(results);
          })
          .catch((err) => {
            console.log(err);
          });
        break;
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

enterEmployeeInfo();

function continueGatheringEmployeeInfo(results) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addAnother",
        message: "Do you wish to add another employee?"
      }
    ]).then((res2) => {
      employeeInfo.push(results);
      console.log(employeeInfo);
      if (res2.addAnother) {
        enterEmployeeInfo();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
