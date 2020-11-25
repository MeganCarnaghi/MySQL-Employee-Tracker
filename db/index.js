const connection = require("./connection");

class SQLqueries {

    constructor(connection) {
        this.connection = connection;
    }

    selectEmployees() {
        connection.query("SELECT * FROM employees", function(err, res) {
            if (err) throw err;
        });
    }

    selectDepartments() {
        connection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
        });
    }

    selectRoles() {
        connection.query("SELECT * FROM roles", function(err, res) {
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

