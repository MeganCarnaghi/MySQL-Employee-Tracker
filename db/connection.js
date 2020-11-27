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

  // Initiate MySQL onnection
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    cli();
  });

module.exports = connection;