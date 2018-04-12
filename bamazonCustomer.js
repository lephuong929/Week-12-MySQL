var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "!HpatdHp1",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  start();
});


function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}

function promptPurchase () {
   // query the database for all items being auctioned
   connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the Item ID of the product you would like to buy?",
          validate: validateInput(),
			    filter: Number
        },
        {
          name: "quantity",
          type: "input",
          message: "How many units of the product would you like to buy?",
          validate: validateInput(),
			    filter: Number
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var item = answer.item_id;
        var quantity = answer.stock_quantity;

        var query = 'SELECT * FROM products WHERE ?';

        connection.query(query, {item_id: item}, function(err, data) {
          if (err) throw err;

          if (data.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
            displayInventory();

          } else {
            var productData = data[0];

            // If the quantity requested by the user is in stock
            if (quantity <= productData.stock_quantity) {
              console.log('Congratulations, the product you requested is in stock! Placing order!');

              // Construct the updating query string
              var updatequery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
              // console.log('updatequery = ' + updatequery);

              // Update the inventory
              connection.query(updatequery, function(err, data) {
                if (err) throw err;

                console.log('Your order has been placed! Your total is $' + productData.price * quantity);
                console.log('Thank you for shopping with us!');
                console.log("\n---------------------------------------------------------------------\n");

                // End the database connection
                connection.end();
              })
            } else {
              console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
              console.log('Please modify your order.');
              console.log("\n---------------------------------------------------------------------\n");

              displayInventory();
            }
          }
        })
      })
    });
  }

    // displayInventory will retrieve the current inventory from the database and output it to the console
    function displayInventory() {

      query = 'SELECT * FROM products';

      connection.query(query, function(err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
          strOut = '';
          strOut += 'Item ID: ' + data[i].item_id + '  //  ';
          strOut += 'Product Name: ' + data[i].product_name + '  //  ';
          strOut += 'Department: ' + data[i].department_name + '  //  ';
          strOut += 'Price: $' + data[i].price + '\n';

          console.log(strOut);
        }

          console.log("---------------------------------------------------------------------\n");

          //Prompt the user for item/quantity they would like to purchase
          promptPurchase();
      })
    }

    function start() {

      displayInventory();
    }

