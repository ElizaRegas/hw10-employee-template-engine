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
function getManagerInfo() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your manager's ID?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
      },
    ])
    .then((results) => {
      results.employeeType = "Manager";
      continueGatheringEmployeeInfo(results);
    })
    .catch((err) => {
      console.log(err);
    });
}

getManagerInfo();

function enterEmployeeInfo() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeType",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern"],
      },
    ])
    .then((results) => {
      switch (results.employeeType) {
        case "Engineer":
          inquirer
            .prompt([
              {
                type: "input",
                name: "name",
                message: "What is your engineer's name?",
              },
              {
                type: "input",
                name: "id",
                message: "What is your engineer's ID?",
              },
              {
                type: "input",
                name: "email",
                message: "What is your engineer's email?",
              },
              {
                type: "input",
                name: "gitHubUserName",
                message: "What is your engineer's GitHub username?",
              },
            ])
            .then((res) => {
              res.employeeType = "Engineer";
              continueGatheringEmployeeInfo(res);
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
                name: "name",
                message: "What is your intern's name?",
              },
              {
                type: "input",
                name: "id",
                message: "What is your intern's ID?",
              },
              {
                type: "input",
                name: "email",
                message: "What is your intern's email?",
              },
              {
                type: "input",
                name: "schoolName",
                message: "What is your intern's school?",
              },
            ])
            .then((res) => {
              res.employeeType = "Intern";
              continueGatheringEmployeeInfo(res);
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

function continueGatheringEmployeeInfo(results) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "addAnother",
        message: "Do you wish to add another employee?",
      },
    ])
    .then((res) => {
      let employeeObj;

      switch (results.employeeType) {
        case "Manager":
          employeeObj = new Manager(results.name, results.id, results.email, results.officeNumber);
          break;
        case "Engineer":
          employeeObj = new Engineer(results.name, results.id, results.email, results.gitHubUserName);
          break;
        case "Intern":
          employeeObj = new Intern(results.name, results.id, results.email, results.schoolName);
          break;
      }
      employeeInfo.push(employeeObj);
      if (res.addAnother) {
        enterEmployeeInfo();
      } else {
        const renderInfo = render(employeeInfo);
        fs.writeFile('./output/index.html', renderInfo, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
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
