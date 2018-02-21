const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  user: "root",

  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;

  console.log("connected as id " + connection.threadId);
  
});

