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
          "Query Manager",
          "Exit Application"
        ]
    })
    .then((answer) => {
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

        case "Query Manager":
        queryManagers();
        break;

        case "Exit Application":
        connection.end();
        console.log("Thank you. You are now exiting the application.");
        process.exit();
        break;
      }
    });
  }


// A FUNCTION TO DISPLAY ALL EMPLOYEES
function viewAllEmployees() {
  // SQL query to get all of the employees from the database
const query = "SELECT employee.id AS ID, employee.first_name AS 'FIRST NAME', employee.last_name AS 'LAST NAME', role.title AS ROLE, department.name AS DEPARTMENT, role.salary AS SALARY, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table("\n", res, "\n");
      promptUser();
  });
};

// A FUNCTION TO DISPLAY ALL DEPARTMENTS
function viewAllDepts() {
    // SQL query to get all of the departments from the database
  const query  = "SELECT id AS ID, name as DEPARTMENT FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("\n", res, "\n");
    promptUser();
});
};

// A FUNCTION TO DISPLAY ALL ROLES
function viewAllRoles() {
  // SQL query to get all of the roles from the database
  const query = "SELECT id AS ID, title as ROLE, salary as SALARY FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table("\n", res, "\n");
    promptUser();
});
};

// A FUNCTIONT TO ADD A NEW EMPLOYEE TO THE DATABASE
function addEmployee(){
  // Initialize the newEmployee object
  const newEmployee = {
      firstName: "",
      lastName: "", 
      roleID: 0, 
      managerID: 0
  };
  // A prompt to ask the user for the employee's first and last name
  inquirer
      .prompt([{
          name: "firstName",
          message: "What is the new employee's first name?",
          }, 
          {
          name: "lastName",
          message: "What is the new employee's last name?",
          }])
      .then(answers => {
          // Setting the first and last name for the new employee
          newEmployee.firstName = answers.firstName;
          newEmployee.lastName = answers.lastName;

          // Creating a SQL query to get all of the roles
          const query = `SELECT role.title, role.id FROM role;`;
          connection.query(query, (err, res) => {
              if (err) throw err;
              // Extract the role names and IDs into arrays
              const roles = [];
              const roleNames = [];
              for (let i = 0; i < res.length; i++) {
                  roles.push({
                      id: res[i].id,
                      title: res[i].title
                  });
                  roleNames.push(res[i].title);
              }
              // ERROR
              // Prompt the user to get the new employee's role
              inquirer
              .prompt({
                  type: "list",
                  name: "empRole",
                  message: "Select Role:",
                  choices: roleNames
                })
              .then(answer => {
                const chosenRole = answer.empRole;
                let chosenRoleID;
                for (let i = 0; i < roles.length; i++) {
                  if (roles[i].title === chosenRole) {
                    chosenRoleID = roles[i].id;
                    break;
                  }
                }
                  // Set the role ID for the new employee
                  newEmployee.roleID = chosenRoleID;
                  // A SQL query to get all of the managers' names
                  const query = `
                  SELECT DISTINCT concat(manager.first_name, " ", manager.last_name) AS full_name
                  FROM employee
                  LEFT JOIN employee AS manager ON manager.id = employee.manager_id;`;
                  connection.query(query, (err, res) => {
                    if (err) throw err;
                    //extract manager names and ids to arrays
                    const managers = [];
                    const managerNames = [];
                    for (let i = 0; i < res.length; i++) {
                        managerNames.push(res[i].full_name);
                        managers.push({
                            id: res[i].id,
                            fullName: res[i].full_name
                        });
                    }
                      // Prompt the user to select a manager for the new employee
                      inquirer
                      .prompt({
                          type: "list",
                          name: "empManager",
                          message: "Who is the manager for the new employee?",
                          choices: managerNames
                        })
                        .then(answer => {
                          //get id of chosen manager
                          const chosenManager = answer.managerPromptChoice;   
                          let chosenManagerID;
                          for (let i = 0; i < managers.length; i++) {
                              if (managers[i].fullName === chosenManager){
                                  chosenManagerID = managers[i].id;
                                  break;
                              }
                          }
                          // Set the manager ID for the new employee
                          newEmployee.managerID = chosenManagerID;
                          // SQL query to add the new employee to the database
                          const query = "INSERT INTO employee SET ?";
                          connection.query(query, {
                              first_name: newEmployee.firstName,
                              last_name: newEmployee.lastName,
                              role_id: newEmployee.roleID || 0,
                              manager_id: newEmployee.managerID || 0
                              }, (err, res) => {
                              if (err) throw err;
                              console.log("The new employee has been added successfully.");
                          });                            
                      });
                  });
              });
          });            
      });
}


// A FUNCTION TO ADD A NEW DEPARTMENT TO THE DATABASE
function addDepartment() {
  // Prompt the user to ask what the name of the new department they want to add is
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What is the name of the new department you want to add?",
      },
    ])
    // SQL query to add the new department
    .then((answer) => {
      const query = `INSERT INTO department (name) VALUES (?);`;
      connection.query(query, [answer.name], (err, res) => {
          if (err) throw err;
          console.log("\n", "The new department has been added successfully.", "\n")
          promptUser();
      }) 
  });
}

// A FUNCTION TO ADD A NEW ROLE TO THE DATABASE
function addRole() {
//initialize 
 const departments = [];
 const departmentNames = [];
 // Create the SQL query to get the departments and push them into the arrays
 const query = `SELECT id, name FROM department`;
 connection.query(query, (err, res) => {
     if (err) throw err;
     for (let i=0;i<res.length;i++) {
         departments.push({
            id:res[i].id,
            name:res[i].name});
         departmentNames.push(res[i].name);   
     }
  // Prompt the user regarding the new role they want to add and the specifics for the role
 inquirer
     .prompt([
         {
         name: "title",
         type: "input",
         message: "What is the title of the new role?",
         },
         {
         name: "salary",
         type: "input",
         message: "What is the salary for the new role?",
         },
         {
         name: "department",
         type: "list",
         message: "Which department does the new role belong to?",
         choices: departmentNames
         },
     ])
     .then((answer) => {
     // SQL query to insert the new role
         let deptId = departments.find((obj) => obj.name === answer.department).id;
         connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
         [answer.title, answer.salary, deptId], (err, res) => {
             if (err) throw err; 
             console.log("\n", "Your new role has been added successfully.", "\n");
                 promptUser();
         });
        
     });
 });
} 


// A FUNCTION TO UPDATE AN EMPLOYEE'S ROLE
function updateRole(){
  // Initalize
  const updatedEmployee = {
      id: 0,
      roleID: 0, 
  };
  // Create the SQL query to get the list of employees to show the user
  const query = `SELECT id, concat(employee.first_name, " ", employee.last_name) AS employee_full_name
  FROM employee ;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      // Extract all employee names and ids to the arrays
      let employees = [];
      let employeeNames = [];
      for (let i=0;i<res.length;i++){
          employees.push({
              id: res[i].id,
              fullName: res[i].employee_full_name});
          employeeNames.push(res[i].employee_full_name);
      }
      // Prompt the user for which employee to update
      inquirer
      .prompt({
          type: "list",
          name: "employeeToUpdate",
          message: "Which employee's role do you want to update?",
          choices: employeeNames
        })
      .then(answer => {
          // Get the id of the chosen employee
          const chosenEmployee = answer.employeeToUpdate;
          let chosenEmployeeID;
          for (let i = 0; i < employees.length; i++) {
            if (employees[i].fullName === chosenEmployee) {
              chosenEmployeeID = employees[i].id;
              break;
            }
          }
          // Set the id for the updatedEmployee
          updatedEmployee.id = chosenEmployeeID;
          //sql query for roles
          const query = `SELECT role.title, role.id FROM role;`;
          connection.query(query, (err, res) => {
              if (err) throw err;
              // Extract all of the role names and ids to the arrays
              const roles = [];
              const roleNames = [];
              for (let i = 0; i < res.length; i++) {
                  roles.push({
                      id: res[i].id,
                      title: res[i].title
                  });
                  roleNames.push(res[i].title);
              }
              // Prompt the user for which new role to give the employee
              inquirer
              .prompt({
                  type: "list",
                  name: "newRole",
                  message: "What is the new role do you want to give this employee?",
                  choices: roleNames
              })
              .then(answer => {
                  // Get the id of the chosen role
                  const chosenRole = answer.newRole;
                  let chosenRoleID;
                  for (let i = 0; i < roles.length; i++) {
                      if (roles[i].title === chosenRole){
                          chosenRoleID = roles[i].id;
                      }
                  }
                  // Set the updatedEmployee role id for the new role
                  updatedEmployee.roleID = chosenRoleID;
                  // SQL query to update the employee's role
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

                      console.log("\n", "The employee's role has been updated.", "\n");
                      promptUser();
                  });
              });
          });            
      });
  });
}

//query all managers
function queryManagers(){
  const query = `
  SELECT DISTINCT concat(manager.first_name, " ", manager.last_name) AS full_name
  FROM employee
  LEFT JOIN employee AS manager ON manager.id = employee.manager_id;`;
  connection.query(query, (err, res) => {
      if (err) throw err;
      //extract manager names to array
      const managers = [];
      for (let i = 0; i < res.length; i++) {
          managers.push(res[i].full_name);
      }
      console.log(res);
  });
}