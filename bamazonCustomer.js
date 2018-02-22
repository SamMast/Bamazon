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
  	
  	displayItems(run);

});


function displayItems(cb) {
  	var query = connection.query("SELECT * FROM products", function(err, res) {
	    if (err) throw err;

	    console.log(`\n.......................\nCurrent Items For Sale:\n------------`)

	    for (var i = 0; i < res.length; i++) {
	      console.log(`Item ID: ${res[i].item_id}\nItem Name: ${res[i].product_name}\nPrice: $${res[i].price}\n------------`);
	    }

	    console.log(".......................")

	    cb();

  	});

}


function run() {

	inquirer.prompt([
	  {
	    name: "ID",
	    message: "What is the ID of the item you would like to purchase?",
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
	    message: "How many would you like to buy?",
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

	    		console.log("Insufficient Stock Left")
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
		console.log(`\nTotal cost for ${amountPurchased} ${res[0].product_name}(s) is: $${cost}\nProduct(s) Bought!\n`);

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





