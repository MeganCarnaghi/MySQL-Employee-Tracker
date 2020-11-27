const connection = require("./connection");

class SQLqueries {

    constructor(connection) {
        this.connection = connection;
    }
    
    selectEmployees() {
        connection.query("SELECT employee.id AS ID, employee.first_name AS FIRST NAME, employee.last_name AS LAST NAME, role.title AS ROLE, department.name AS DEPARTMENT, role.salary AS SALARY, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        , function(err, res) {
            if (err) throw err;
        });
    }

    selectDepartments() {
        connection.query("SELECT id AS ID, name as DEPARTMENT FROM department", function(err, res) {
            if (err) throw err;
        });
    }

    selectRoles() {
        connection.query("SELECT id AS ID, title as ROLE, salary as SALARY FROM role", function(err, res) {
            if (err) throw err;
        });
    }

    insertEmployee(newEmployee) {
        connection.query("INSERT INTO employees SET ?", newEmployee, function(err, res) {
            if(err) throw err;
        });
    }

    insertDepartment(newDepartment) {
        connection.query("INSERT INTO departments SET ?", newDepartment, function(err, res) {
            if(err) throw err;
        })
    }

    insertRole(newRole) {
        connection.query("INSERT INTO roles SET ?", newRole, function(err, res) {
            if(err) throw err;
        })
    }

}

