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
  	
  	displayItems(run);

});


function displayItems(cb) {
  	var query = connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;


		var table = new Table({
		    head: ['WELCOME to the BAMAZON Marketplace']
		  , colWidths: [102]
		});
		 
		// table is an Array, so you can `push`, `unshift`, `splice` and friends 
		table.push(
		    ['Current Items For Sale:']
		);
		 
		console.log(table.toString());

	      

		var table1 = new Table({
			head: ['Item ID', 'Item', 'Price']
		  , colWidths: [20 , 40, 40]
		});

	    for (var i = 0; i < res.length; i++) {
			 
			table1.push(
			    [`${res[i].item_id}`, `${res[i].product_name}`, `${res[i].price}`]
			);

	    }
		console.log(table1.toString());

	    console.log("..........................")

	    cb();

  	});

}


function run() {

	inquirer.prompt([
	  {
	    name: "ID",
	    message: "\nWhat is the ID of the item you would like to purchase?",
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
	    message: "\nHow many would you like to buy?",
	    type: "input",
	    validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
	  }
	]).then(function(answers) {

		var query = connection.query("SELECT * FROM products WHERE ?", {item_id: answers.ID}, function(err, res) {
	    	if (err) throw err;

	    	var amount = parseInt(answers.amount);
	    	var quantity = parseInt(res[0].stock_quantity)

	    	if (amount > quantity) {

	    		console.log(`\nInsufficient Stock Left to fill order! Only ${quantity} remaining`)
	    		again();

	    	} else {
	    		var leftover = (quantity - amount);
			// Update the SQL database to reflect the remaining quantity.
				updateItem(answers.ID, "stock_quantity", leftover);

			// Once the update goes through, show the customer the total cost of their purchase.
				showCost(amount, answers.ID, again);

	    	}

		});		



	});
}


function updateItem(ID, updateLocation, updateAmount) {
	var obj = {};
	var objB = {};

	obj[updateLocation] = updateAmount;
	objB.item_id = ID;

  	var query = connection.query(
    	"UPDATE products SET ? WHERE ?",
	    [obj, objB],
	    function(err, response) {
	    }
  	);

}

function showCost(amountPurchased, ID, cb) {
  	connection.query("SELECT * FROM products WHERE ?", {item_id: ID}, function(err, res) {
		if (err) throw err;
		var cost = res[0].price * amountPurchased; 
		console.log(`\nTotal cost for ${amountPurchased} ${res[0].product_name}(s) is: $${cost}\nProduct(s) Bought!\nShipping 5-7 days\n\nTHANK YOU for choosing BAMAZON!\n`);

		var previousCost = res[0].product_sales;
		var newCost = (cost + previousCost);

		updateItem(ID, "product_sales", newCost);

		cb();
	});

}

function again() {
	inquirer.prompt([
	    {
	      type: "confirm",
	      message: "\nBack to the Store?",
	      name: "confirm",
	      default: true
	    }
	]).then(function(answer) {

		if (answer.confirm) {
  			displayItems(run);
		} else {
			console.log("\nThanks for visiting BAMAZON, Good-Bye!\n")
	    	connection.end();
		}
    
  });

}





