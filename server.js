// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "GusSaysWoof!!",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptUser()
});

function promptUser(){
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Do would you like to do?",
        choices: [
          "View All Employees",
          "View All Employees By Department",
          "View All Employees By Manager",
          "Add An Employee",
          "Remove An Employee",
          "Update An Employee's Role",
          "Update An Employee's Manager",
          "Quit"
        ]
    })
    .then(function(answer) {
      switch(answer.action) {

        case "View All Employees":
        viewAllEmployees();
        break;

        case "View All Employees By Department":
        viewEmpByDept();
        break;

        case "View All Employees By Manager":
        viewEmpByMgr();
        break;

        case "Add An Employee":
        addEmployee();
        break;

        case "Remove An Employee":
        removeEmployee();
        break;

        case "Update An Employee's Role":
        updateRole();
        break;

        case "Update An Employee's Manager":
        updateManager();
        break;

        case "Exit":
        connection.end();
        break;
      }
    })


// A function to display all of the employees
function viewAllEmployees()

// A function to display all employees by department
function viewEmpByDept()

// A function to display all employees by manager
function viewEmpByMgr()

// A function to add an employee
function addEmployee()

// A function to remove an employee
function removeEmployee()

// A function to update an employee's role
function updateRole()

// A function to update an employee's manager
function updateManager()