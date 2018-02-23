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
        message: "\nWelcome Supervisor.  Please Choose an Action\n",
        type: "rawlist",
        choices: ["View Product Sales by Department", "Create New Department", "QUIT"]
      }
    ]).then(function(answer) {

      if (answer.choice === "View Product Sales by Department") {
        viewAll(again);
      
      } else if (answer.choice === "Create New Department") {
        createNew(again);

      } else if (answer.choice === "QUIT") {
        console.log("\nThanks for visiting BAMAZON, Good-Bye!\n")
        connection.end();
      }

  });
}



function viewAll(cb) {
  connection.query("SELECT * FROM departments LEFT JOIN products ON (products.department_name = departments.department_name) GROUP BY departments.department_name", function(err, res) {
    if (err) throw err;

    //Once I can get values to display, then try to display table here with npm cli-table package
    console.log(`\n....................................\nCurrent Department Sales:\n....................................\n---------------------------------`)

      for (var i = 0; i < res.length; i++) {
        var totalProfit = (parseInt(res[i].product_sales) - parseInt(res[i].over_head_costs));

        console.log(`Department ID: ${res[i].department_id}\nDepartment Name: ${res[i].department_name}\nOverhead Costs: $${res[i].over_head_costs}\nProduct Sales: ${res[i].product_sales}\nTotal Profit: ${totalProfit}\n---------------------------------`);
      }

    console.log("....................................")

    cb()

  });

}

function createNew(cb) {
  console.log("Inserting a new Department...\n");
  
  inquirer.prompt([
      {
      name: "name",
      message: "\nNew Department Name:",
      type: "input"
      },
      {
      name: "cost",
      message: "\nNew Department Over Head Cost:",
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
        message: "\nBack to the Menu?",
        name: "confirm",
        default: true
      }
  ]).then(function(answer) {

    if (answer.confirm) {
        start();
    } else {
      console.log("\nThanks for visiting BAMAZON, Good-Bye!\n")
      connection.end();
    }
    
  });

}