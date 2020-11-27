// Dependencies
const inquirer = require("inquirer");
const connection = require("./connection.js");
require ("console.table");

promptUser();

// Create empty arrays for prompt choices
let employeeRoles = [];
let employeeNames = [];
let allDepartments = [];
var rolesArray = [];
var employeesArray = [];
var departmentsArray = [];

// Functions to create JSON arrays of data from the Database
// Function to create a JSON array of all ROLES
function rolesJSON(){
  connection.query("SELECT id, title FROM role;", function (err, res) {
      res.forEach(function(row){
          rolesArray.push({id:row.id , title:row.title});
          employeeRoles.push(row.title);
      })
    if (err) throw err;
  });
}

// Function to create a JSON array of all EMPLOYEES
function employeesJSON(){
  employeeNames.push("NONE");

  connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
      res.forEach(function(row){
          employeesArray.push({id:row.id , first_name:row.first_name, last_name:row.last_name});
          employeeNames.push(row.first_name + " " + row.last_name);
      })
    if (err) throw err;
  });
}

// Function to create a JSON array of all DEPARTMENTS
function departmentsJSON(){
  connection.query("SELECT id, name FROM department;", function (err, res) {
      res.forEach(function(row){
          allDepartments.push(row.name);
          departmentsArray.push({id:row.id , name:row.name});
      })
    if (err) throw err;
  });
}

// Function to get ROLE ID from choosen NAMES
function getRoleId(employeeRole, array){
  for (var i=0; i<array.length; i++) {
      if (array[i].title === employeeRole) {
          return array[i].id;
          }
      }
}

// Function to get MANAGER ID from choosen NAMES
function getManagerId(managerName, array){
  if (managerName === "NONE"){
      return array.id = null;
    }
  else{
  var splitName = managerName.split(" ");
      for (var i=0; i<array.length; i++) {
          if (array[i].first_name === splitName[0]) {
              return array[i].id;
              }
          }
    } 
  
}

// Function to get DEPARTMENT ID from choosen NAMES
function getDeptId(departmentName, array){
      for (var i=0; i<array.length; i++) {
          if (array[i].name === departmentName) {
              return array[i].id;
              }
          }
}

// Function to prompt the user
function promptUser(){
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Do would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add an Employee",
          "Add a Department",
          "Add a Role",
          "Update an Employee's Role",
          "Quit"
        ]
    })
    .then(function(answer) {
      switch(answer.action) {

        case "View All Employees":
        viewAllEmployees();
        break;

        case "View All Departments":
        viewAllDepts();
        break;

        case "View All Roles":
        viewAllRoles();
        break;

        case "Add an Employee":
        addEmployee();
        break;

        case "Add a Department":
        addDepartment();
        break;

        case "Add a Role":
        addRole();
        break;

        case "Update an Employee's Role":
        updateRole();
        break;

        case "Exit":
        connection.end();
        console.log ("Thank you. You are now existing the application.");
        break;
      }
    })


// A function to display all of the employees
function viewAllEmployees() {
  connection.query("SELECT employee.id AS ID, employee.first_name AS FIRST NAME, employee.last_name AS LAST NAME, role.title AS ROLE, department.name AS DEPARTMENT, role.salary AS SALARY, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  , function(err, res) {
      if (err) throw err;
      console.table(res);
  });
  promptUser();
};

// A function to display all departments
function viewAllDepts() {
  connection.query("SELECT id AS ID, name as DEPARTMENT FROM department", function(err, res) {
    if (err) throw err;
    console.table(res);
});
  promptUser();
};

// A function to display all roles
function viewAllRoles() {
  connection.query("SELECT id AS ID, title as ROLE, salary as SALARY FROM role", function(err, res) {
    if (err) throw err;
    console.table(res);
});
  promptUser();
};


// // A function to add a new employee
function addEmployee() {
  inquirer.prompt([
  {
    name: "firstName",
    type: "input",
    message: "What is the employee's first name?"
  },
  {
    name: "LastName",
    type: "input",
    message: "What is the employee's last name?"
  },
  {
    name: "role",
    type: "list",
    message: "What is the employee's role?",
    choices: employeeRoles
  },
  {
    name: "manager",
    type: "list",
    message: "Who is the manager for this employee?",
    choices: employeeNames
  }
  ])

  .then(function(answers) {
    let roleId = getRoleId(answers.role, rolesArray);
    let managerId = getManagerId(answers.manager, employeesArray);

    function addEmplToDb(answers, roleId, managerId) {
      let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.first_name}','${answers.last_name}',${roleId},${managerId});`
      connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " record INSERTED");
    });
  }
  addEmplToDb(answers,roleId,managerId);
  promptUser();
  })
}
};


// // A function to add a new department
// function addDepartment() {
//   const newDepartment = inquirer.prompt([
//     {
//       name: "department",
//       type: "input",
//       message: "What is the name of the department you'd like to add?"
//     }
//   ])
//   db.insertDepartment(newDepartment);
//   console.log(`${department} has been added.`)
// }

// // A function to add a new role
// function addRole(){
//   const newRole = inquirer.prompt([

//   ])
// }

// // A function to update an employee's role
