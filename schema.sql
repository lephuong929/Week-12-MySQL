CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(6, 2) NOT NULL,
  stock_quantity INT(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vacuum", "Appliances", 399.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lenovo Laptop", "Computers", 699.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Men's Shirt", "Clothing", 19.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas YEEZY Boost 350", "Footwear", 500.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("King Bed Frame", "Furniture", 400.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Whey Protein Powder", "Supplements", 59.99, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Echo Dot", "Electronics", 49.99, 10000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Toys", 79.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("65 Inch TV", "Electronics", 2099.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Instant Pot", "Appliances", 159.99, 190);