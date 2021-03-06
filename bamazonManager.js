const mysql = require("mysql");
const inquirer = require("inquirer");
const Table = require('cli-table');

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

  	start()

});


function start() {
	inquirer.prompt([
	  {
	    name: "choice",
	    message: "\nWelcome Manager.  Please Choose an Action\n",
	    type: "rawlist",
	    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "QUIT"]
	  }
	]).then(function(answer) {

		if (answer.choice === "View Products for Sale") {
			displayItems(again);
		 
		} else if (answer.choice === "View Low Inventory") {
			displayLowInventory(again);

		} else if (answer.choice === "Add to Inventory") {
			addToInventory(again);

		} else if (answer.choice === "Add New Product") {
			addNewProduct(again);

		} else if (answer.choice === "QUIT") {
			console.log("\nThanks for visiting BAMAZON, Good-Bye!\n")
	    	connection.end();
		}



	});

}

function displayItems(cb) {
  	var query = connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;

		var table = new Table({
		    head: ['Current Inventory For Sale:']
		  , colWidths: [102]
		});
		 
		console.log(table.toString());

		var table1 = new Table({
			head: ['Item ID', 'Item', 'Price', 'Stock Quantity']
		  , colWidths: [15 , 35, 20, 30]
		});

	    for (var i = 0; i < res.length; i++) {
			 
			table1.push(
			    [`${res[i].item_id}`, `${res[i].product_name}`, `${res[i].price}`, `${res[i].stock_quantity}`]
			);

	    }

		console.log(table1.toString());

	    console.log(".......................")

		cb();

  	});

}

function displayLowInventory(cb) {
  	var query = connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;

		var table = new Table({
		    head: ['Low Inventory Items (<5)']
		  , colWidths: [102]
		});
		 
		console.log(table.toString());

		var table1 = new Table({
			head: ['Item ID', 'Item', 'Price', 'Stock Quantity']
		  , colWidths: [15 , 35, 20, 30]
		});

	    for (var i = 0; i < res.length; i++) {
		  	var stock = parseInt(res[i].stock_quantity)
	    	if (stock <= 5) {	 
				table1.push(
				    [`${res[i].item_id}`, `${res[i].product_name}`, `${res[i].price}`, `${res[i].stock_quantity}`]
				);
			}

	    }

		console.log(table1.toString());

	    console.log(".......................")
		
		cb();

  	});


}

function addToInventory(cb) {
	inquirer.prompt([
	  {
	    name: "ID",
	    message: "\nType the ID of the item you would like to add to:",
	    type: "input",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	  },
	  {
	  	name: "amount",
	  	message: "\nHow many would you like to add of this item?",
	  	type: "input",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	  }
	]).then(function(answer) {

		var obj = {};
		var objB = {};
		var stock;
		var amount = parseInt(answer.amount);


	 	connection.query("SELECT * FROM products WHERE ?", {item_id: answer.ID}, function(err, res) {
			if (err) throw err;
			stock = parseInt(res[0].stock_quantity);
			obj.stock_quantity = (amount + stock);
			objB.item_id = answer.ID;

		  	var query = connection.query(
			    "UPDATE products SET ? WHERE ?",
			    [obj, objB],
			    function(err, res) {
			      	console.log(answer.amount + " item(s) added!\n");

			      	cb();
				}
		  	);
		});

 
	});

}

function addNewProduct(cb) {
 	console.log("Inserting new Product.  Please provide details...\n");
  
 	inquirer.prompt([
	  	{
	    name: "name",
	    message: "\nNew Product Name:",
	    type: "input"
	  	},
	  	{
	    name: "dep",
	    message: "\nNew Product Department:",
	    type: "input"
	  	},
	  	{
	    name: "price",
	    message: "\nNew Product Price:",
	    type: "input",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	  	},
	  	{
	    name: "amount",
	    message: "\nNew Product Stock Quantity:",
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
		    "INSERT INTO products SET ?",
		    {
		    product_name: answer.name,
		    department_name: answer.dep,
		    price: answer.price,
		    stock_quantity: answer.amount
		    },
		    function(err, res) {
		      	console.log("Product inserted!\n");

				cb();
			}

	  	);
	  	
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