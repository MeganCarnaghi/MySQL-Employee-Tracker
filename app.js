const inquirer = require("inquirer");
const db = require("./db");
require ("console.table");

promptUser();

function promptUser(){
    inquirer.prompt({
        type: "list",
        name: "action",
        message: "Do would you like to do?",
        choices: [
        {
           name: "View All Employees",
           value: "view_employees"
        },

        {
          name: "View All Departments",
          value: "view_depts"
       },

       {
         name: "View All Roles",
         value: "view_roles"
       },
       {
         name: "Add an Employee",
         value: "add_employee"
       },

       {
         name: "Add a Department",
         value: "add_dept"
       },

       {
         name: "Add a Role",
         value: "add_role"
       },

       {
         name: "Update an Employee's Role",
         value: "update_role"
       },
       {
         name: "Quit",
         value: "quit"
       }
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
  const allEmployees = db.selectEmployees();
  console.table(allEmployees);
  promptUser();
};

// A function to display all departments
function viewAllDepts() {
  const allDepts = db.selectDepartments();
  console.table(allDepts);
  promptUser();
};

// A function to display all roles
function viewAllRoles() {
  const allRoles = db.selectRoles();
  console.table(allRoles);
  promptUser();
};


// A function to add a new employee
function addEmployee() {
  const newEmployee = inquirer.prompt([
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
    name: "LastName",
    type: "input",
    message: "What is the employee's role?"
  }
  ]);

};

// A function to add a new department
function addDepartment() {
  const newDepartment = inquirer.prompt([

  ])
}

// A function to add a new role
function addRole(){
  const newRole = inquirer.prompt([

  ])
}

// A function to update an employee's role
function updateRole()

module.exports = new SQLqueries(connection);
