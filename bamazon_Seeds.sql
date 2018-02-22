DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xbox", "Electronics", "399", "100"),("Playstation", "Electronics", "359", "500"),("Nintendo Switch", "Electronics", "299", "1000"),("Gameboy", "Electronics", "99", "10"), ("Shoes", "Clothes", "89", "125"), ("Shirts", "Clothes", "19", "100"), ("Jeans", "Clothes", "29", "60"), ("Hats", "Clothes", "89", "40"), ("Belt", "Clothes", "15", "10"), ("Socks", "Clothes", "2", "300");

SELECT * FROM products;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(50) NOT NULL,
  over_head_costs INT NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", "100000"),("Clothes", "15000");

SELECT * FROM departments;
