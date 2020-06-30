const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const managerQuestions = require("./data/managerQuestions.json");
const employeeType = require("./data/employeeType.json");
const engineerQuestions = require("./data/engineerQuestions.json");
const internQuestions = require("./data/internQuestions.json");
let employeeInfo = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const getManagerInfo = () => {
  inquirer
    .prompt(managerQuestions)
    .then((results) => {
      results.employeeType = "Manager";
      continueGatheringEmployeeInfo(results);
    })
    .catch((err) => {
      console.log(err);
    });
}

getManagerInfo();

const enterEmployeeInfo = () => {
  inquirer
    .prompt(employeeType)
    .then((results) => {
      switch (results.employeeType) {
        case "Engineer":
          inquirer
            .prompt(engineerQuestions)
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
            .prompt(internQuestions)
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

const continueGatheringEmployeeInfo = (results) => {
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
        fs.writeFile(outputPath, renderInfo, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}