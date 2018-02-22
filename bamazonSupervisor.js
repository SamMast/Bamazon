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
  	
  start();

});

function start() {
  inquirer.prompt([
      {
        name: "choice",
        message: "Welcome Supervisor.  Please Choose an Action",
        type: "rawlist",
        choices: ["View Product Sales by Department", "Create New Department", "QUIT"]
      }
    ]).then(function(answer) {

      if (answer.choice === "View Product Sales by Department") {
        viewAll();
      
      } else if (answer.choice === "Create New Department") {
        createNew();

      } else if (answer.choice === "QUIT") {
        console.log("Good-Bye")
        connection.end();
      }

  });
}



function viewAll() {
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;

    console.log(res)
    //display table here with npm table packase


      

  });

  //start();
}

function createNew() {
  console.log("Inserting a new Department...\n");
  
  inquirer.prompt([
      {
      name: "name",
      message: "New Department Name:",
      type: "input"
      },
      {
      name: "cost",
      message: "New Department Over Head Cost:",
      type: "input"
      }
  ]).then(function(answer) {

      connection.query(
        "INSERT INTO departments SET ?",
        {
        department_name: answer.name,
        over_head_costs: answer.cost
        },
        function(err, res) {
          console.log("Department inserted!\n");
        }
      );

  });
  
  //start();
  
}


