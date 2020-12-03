// Dependencies
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const mysql = require("mysql");
require("console.table");

// Create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "GusSaysWoof!!",
  database: "employeeTracker_db"
});

  // Initiate MySQL connection
  connection.connect(function(err) {
    if (err) throw err;
    displayLogo();
    promptUser();
  });

// A function to display the logo
function displayLogo(){
  const logoText = logo(
    {
      name: "Employee Tracker",
      lineChars: 20,
      padding: 2,
      margin: 2,
      borderColor: 'yellow',
      logoColor: 'bold-green',
    }
      ).render();
  console.log(logoText);
}

// Create empty arrays for prompt choices
var employeeRoles = [];
var employeeNames = [];
var allDepartments = [];
var rolesArray = [];
var employeesArray = [];
var departmentsArray = [];

//// Functions to create JSON arrays of data from the Database
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

//// Functions to get the IDs
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
        message: "what would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add an Employee",
          "Add a Department",
          "Add a Role",
          "Update an Employee's Role",
          "Exit Application"
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
        rolesJSON();
        employeesJSON();
        addEmployee();
        break;

        case "Add a Department":
        addDepartment();
        break;

        case "Add a Role":
        departmentsJSON();
        addRole();
        break;

        case "Update an Employee's Role":
        employeesJSON();
        rolesJSON();
        updateRole();
        break;

        case "Exit Application":
        connection.end();
        console.log("Thank you. You are now exiting the application.");
        process.exit();
        break;
      }
    });
  }


// A function to display all of the employees
function viewAllEmployees() {
var query = "SELECT employee.id AS ID, employee.first_name AS 'FIRST NAME', employee.last_name AS 'LAST NAME', role.title AS ROLE, department.name AS DEPARTMENT, role.salary AS SALARY, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  connection.query(query, function(err, res) {
      if (err) throw err;
      console.table("\n", res, "\n");
      promptUser();
  });
};

// A function to display all departments
function viewAllDepts() {
  var query  = "SELECT id AS ID, name as DEPARTMENT FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table("\n", res, "\n");
    promptUser();
});
};

// A function to display all roles
function viewAllRoles() {
  var query = "SELECT id AS ID, title as ROLE, salary as SALARY FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table("\n", res, "\n");
    promptUser();
});
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
    name: "lastName",
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
      var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.firstName}','${answers.lastName}',${roleId},${managerId})`;
      connection.query(query, function(err, res) {
      if (err) throw err;
      console.log("\n", "The new employee has been added to the database.", "\n");
      promptUser();
    });
  }
  addEmplToDb(answers,roleId,managerId);
  })
}

// A function to add a new department
function addDepartment() {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What is the name of the department you'd like to add?"
    }
  ])
.then(function(answers) {
  var query = `INSERT INTO department (name) VALUES('${answers.department}')`;
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log("\n", "The department has been added to the database.", "\n")
    promptUser();
  })
})
}

// A function to add a new role
function addRole(){
inquirer.prompt([
  {
    name: "title",
    type: "input",
    message: "What is the name of the role you'd like to add?"
  },
  {
    name: "salary",
    type: "input",
    message: "What is the salary for this new role?"
  },
  {
    name: "department",
    type: "list",
    message: "What department is this role a part of?",
    choices: allDepartments
  }
  ])
  .then(function(answers) {
    let deptId = getDeptId(answers.department, departmentsArray);
    var query = `INSERT INTO role (title, salary, department_id) VALUES('${answers.title}','${answers.salary}',${deptId})`;
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log("\n", "The role has been added to the database.", "\n");
      promptUser();
    })
  })
}

// function updateRole(){
//   inquirer.prompt([
//     {
//       name: "empToUpdate",
//       type: "list",
//       message: "Which employee would you like to update?",
//       choices: employeeNames
//     },
//     {
//       name: "newRole",
//       type: "list",
//       message: "What new role do you want to set for this employee?",
//       choices: employeeRoles
//     }
//     ])
//         .then(function(answers){
//           var splitName = answers.empToUpdate.split ("");
//           var roleId = getRoleID(answers.newRole, rolesArray);
//           var query = `UPDATE employee SET role_id='${roleId}' WHERE first_name='${splitName[0]}' and last_name='${splitName[1]}';`  
//           connection.query(query, function(err, res){
//             if (err) throw err;
//             console.log("\n", "The employee's role has been updated.", "\n")
//           })
//         })
// }

function updateRole(){
  // Initalize the updateRole object
  const updatedEmployee = {
      id: 0,
      roleID: 0, 
  };
  // Create SQL query for employees
  const query = `
  SELECT id, concat(employee.first_name, " ", employee.last_name) AS employee_full_name
  FROM employee ;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      // Extract all employee names and ids to arrays
      let employees = [];
      let employeeNames = [];
      for (let i=0;i<res.length;i++){
          employees.push({
              id: res[i].id,
              fullName: res[i].employee_full_name});
          employeeNames.push(res[i].employee_full_name);
      }
      // Prompt user for the employee to update
      inquirer
      .prompt({
          type: "list",
          name: "employeePromptChoice",
          message: "Select employee to update:",
          choices: employeeNames
        })
      .then(answer => {
          //get id of chosen employee
          const chosenEmployee = answer.employeePromptChoice;
          let chosenEmployeeID;
          for (let i = 0; i < employees.length; i++) {
            if (employees[i].fullName === chosenEmployee) {
              chosenEmployeeID = employees[i].id;
              break;
            }
          }
          //set updatedEmployee id
          updatedEmployee.id = chosenEmployeeID;
          //sql query for roles
          const query = `SELECT role.title, role.id FROM role;`;
          connection.query(query, (err, res) => {
              if (err) throw err;
              //extract role names and ids to arrays
              const roles = [];
              const roleNames = [];
              for (let i = 0; i < res.length; i++) {
                  roles.push({
                      id: res[i].id,
                      title: res[i].title
                  });
                  roleNames.push(res[i].title);
              }
              //prompt for role selection
              inquirer
              .prompt({
                  type: "list",
                  name: "rolePromptChoice",
                  message: "Select Role:",
                  choices: roleNames
              })
              .then(answer => {
                  //get id of chosen role
                  const chosenRole = answer.rolePromptChoice;
                  let chosenRoleID;
                  for (let i = 0; i < roles.length; i++) {
                      if (roles[i].title === chosenRole){
                          chosenRoleID = roles[i].id;
                      }
                  }
                  //set updatedEmployee role ID 
                  updatedEmployee.roleID = chosenRoleID;
                  //sql query to update role
                  const query = `UPDATE employee SET ? WHERE ?`;
                  connection.query(query, [
                      {
                        role_id: updatedEmployee.roleID
                      },
                      {
                        id: updatedEmployee.id
                      }
                      ], (err, res) => {
                      if (err) throw err;
                      console.log("The employee's role has been updated.");
                      promptUser();
                  });
              });
          });            
      });
  });
}