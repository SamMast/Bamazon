# Bamazon Marketplace

This node.js and mySQL app is a virtual Marketplace that will allow the user different options based on being in Customer, Manager, or SuperVisor mode.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 


### Prerequisites

The project is included with a package-json file.  Use an npm install to get the necessary packages before running the program.  Once up and running, navigate to the filepath in the terminal to get started.What things you need to install the software and how to install them

```
npm install
```

If the above install is not working for any reason, the 3 required npm packages to install are:

```
npm install inquirer
npm install mySQL
npm install cli-table
```

Once you have these, the next step is to create the initial Database.  Head over to your mySQL profile and use the Seeds file to setup the initial store.  Once these database schemas and seed files are setup, you are ready to start.

### Instructions

Once you are ready, you can head over to your terminal, and enter a command based on how you would like to view the platform.  Here are the 3 options:

* If you would like to enter Bamazon as a customer, enter ```node bamazonCustomer```  
* If you would like to enter as a Manager, enter ```node bamazonManager```
* If you would like to enter as a Supervisor, enter ```node bamazonSuperVisor```

See below for more details on the modes (and Screenshots)

## Modes:

### Customer Mode:

In this mode, you will be able to Buy items from the Bamazon marketplace.  To run this mode, enter:

```node bamazonCustomer```

-Once entered, You will see a listing of the store items, their price, and the item ID number.

![Image 1](https://octodex.github.com/images/yaktocat.png)

-When you find an item you would like to purchase, enter its ID number in the prompt.

![Image 2](https://octodex.github.com/images/yaktocat.png)

-You will then be prompted on how many you'd like to buy.

![Image 3](https://octodex.github.com/images/yaktocat.png)

-Once you decide, Bamazon will show you the total and send the item to you (not really)

![Image 1](https://octodex.github.com/images/yaktocat.png)

-You will then be allowed to re-enter the store and make more purchases, or leave for now.  Click enter to stay, or type "N" to leave.

![Image 1](https://octodex.github.com/images/yaktocat.png)



### Manager Mode

In this mode, you will be able to Manager the items from the Bamazon marketplace.  To run this mode, enter:
```node bamazonManager```

-Once entered, You will see a menu.  Chose an Option to get started by typing the number of the option

![Image 1](https://octodex.github.com/images/yaktocat.png)

-"View Products for Sale" will list the total inventory, including item ID, name, price, and current stock

![Image 2](https://octodex.github.com/images/yaktocat.png)

-"View Low Inventory" will list any items with a current stock under 5 items.  THis will allow the manager to monitor the store for items getting too low.

![Image 3](https://octodex.github.com/images/yaktocat.png)

-"Add to Inventory" will allow the Manager to add more stock to any item.  Just enter the Item ID number, and then the quantity of stock you'd ike to add to the inventory, and the BAMAZOn marketplace will add new stock instantly.

![Image 4](https://octodex.github.com/images/yaktocat.png)

-"Add New Product" will allow the Manager to add a totally new product.  You will just need to add a Name, Price, and starting Stock Quantity, and the BAMAZON Marketplace will update in real time!

![Image 5](https://octodex.github.com/images/yaktocat.png)

-"QUIT" This will shit down the program.

![Image 6](https://octodex.github.com/images/yaktocat.png)




### SuperVisor Mode

In this mode, you will be able to Manager the items from the Bamazon marketplace.  To run this mode, enter:

```node bamazonSupervisor```

-Once entered, You will see a menu.  Chose an Option to get started

![Image 1](https://octodex.github.com/images/yaktocat.png)

-"View Products Sales by Department" will list the Department stats, including department ID, department name, total overhead cost, current sales total, and total profit

![Image 2](https://octodex.github.com/images/yaktocat.png)

-"Create New Department" will allow the Supervisor to create new departments to monitor any new items added by the manager.  The supervisor will be asked for the department name, Overhead Cost, and  the rest of the data will update automatically if there are items with the same Department in the Marketplace.  

![Image 3](https://octodex.github.com/images/yaktocat.png)

-"QUIT" This will shit down the program.

![Image 4](https://octodex.github.com/images/yaktocat.png)





## Built With

* Node.js
* MySQL

## Versioning

1.0

## Authors

* **Samuel Mast** - [GitHub](https://github.com/SamMast)


## Acknowledgments

* Denver Coding Bootcamp
