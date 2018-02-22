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
        viewAll(again);
      
      } else if (answer.choice === "Create New Department") {
        createNew(again);

      } else if (answer.choice === "QUIT") {
        console.log("Good-Bye")
        connection.end();
      }

  });
}



function viewAll(cb) {
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;

    console.log(res)
    //display table here with npm table packase


    cb()

  });

}

function createNew(cb) {
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
      type: "input",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }
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

      cb();

  });
    
}

function again() {
  inquirer.prompt([
      {
        type: "confirm",
        message: "Back to the Store?",
        name: "confirm",
        default: true
      }
  ]).then(function(answer) {

    if (answer.confirm) {
        displayItems(run);
    } else {
        connection.end();
    }
    
  });

}