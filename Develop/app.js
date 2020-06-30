// node modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// class constructors
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// json and js data elements
const managerQuestions = require("./data/managerQuestions.js");
const employeeType = require("./data/employeeType.json");
const engineerQuestions = require("./data/engineerQuestions.js");
const internQuestions = require("./data/internQuestions.js");
const addEmployee = require("./data/addEmployee.json");
// render function
const render = require("./lib/htmlRenderer");
// global variables
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const employeeInfo = [];

// function to get info about the manager
const getManagerInfo = () => {
  inquirer
    .prompt(managerQuestions())
    .then((results) => {
      results.employeeType = "Manager";
      continueGatheringEmployeeInfo(results);
    })
    .catch((err) => {
      console.log(err);
    });
};

// function to gather employee info for engineers and interns
const enterEmployeeInfo = () => {
  inquirer
    .prompt(employeeType)
    .then((results) => {
      switch (results.employeeType) {
        case "Engineer":
          inquirer
            .prompt(engineerQuestions())
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
            .prompt(internQuestions())
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
};

// function to determine if more employees need to be added
const continueGatheringEmployeeInfo = (results) => {
  const { name, id, email } = results;
  inquirer
    .prompt(addEmployee)
    .then((res) => {
      let employeeObj;

      switch (results.employeeType) {
        case "Manager":
          employeeObj = new Manager(name, id, email, results.officeNumber);
          break;
        case "Engineer":
          employeeObj = new Engineer(name, id, email, results.gitHubUserName);
          break;
        case "Intern":
          employeeObj = new Intern(name, id, email, results.schoolName);
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
};

// program begins question prompts by calling this function
getManagerInfo();