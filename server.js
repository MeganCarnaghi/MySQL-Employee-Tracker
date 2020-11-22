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
    inquirer.prompt([
      {
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
          "Update An Employee's Manager"
        ]
      }
    ])
    .then(function(data) {
        if(data.action === "View All Employees") {


// A function to display all of the employees
function viewAllEmployees(){

}