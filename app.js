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
        addDept();
        break;

        case "Add a Role":
        addRole();
        break;

        case "Update an Employee's Role":
        updateRole();
        break;

        case "Exit":
        connection.end();
        break;
      }
    })


// A function to display all of the employees
function viewAllEmployees()

// A function to display all departments
function viewAllDepts() {
    connection.query("SELECT * FROM departments", function(err, res) {
      if (err) throw err;
      console.table(res);
  });
};

// A function to display all roles
function viewAllRoles() {
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.table(res);
});
};

// A function to add an employee
function addEmployee() {
  const newEmployee = {
    firstName: "",
    lastName: "", 
    roleID: 0, 
    managerID: 0
};

  inquirer
  .prompt([
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

  then(function(answer) {
    var query = "INSERT INTO employees SET ?";
    connection.query(query, { add: answer.add }, function(err, res) {
      if (err) throw err;
    })
  })
};

// A function to remove an employee
function removeEmployee() {
  inquirer
  .prompt({
    name: "remove",
    type: "input",
    message: "What is the first and last name of the employee you would like to remove?"
  })
  .then(function(answer) {
    var query = "DELETE FROM employees WHERE ?";
    connection.query(query, { remove: answer.remove }, function(err, res) {
      if (err) throw err;
      console.log("That person does not exist in the database.")
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].first_name + res[i].last_name + " has been removed from the database.");
      }
      promptUser();
    });
  });
}

// A function to update an employee's role
function updateRole()

// A function to update an employee's manager
function updateManager()