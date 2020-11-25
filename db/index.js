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
        connection.query("INSERT INTO employee SET ?", newEmployee, function(err, res) {
            if(err) throw err;
        });
    }

    insertDepartment(newDepartment) {
        connection.query("INSERT INTO employee SET ?", newDepartment, function(err, res) {
            if(err) throw err;
        })
    }

}

