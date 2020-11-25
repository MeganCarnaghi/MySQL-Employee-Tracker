// Dependencies
const mysql = require("mysql");

// Create connection to database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "GusSaysWoof!!",
  database: "employeetracker_db"
});

connection.connect();

module.exports = connection;