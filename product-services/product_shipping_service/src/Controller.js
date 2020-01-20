var mysql      = require('mysql');
var connection = mysql.createConnection({
 host     : 'blue-cart.cgieg9vhodze.eu-central-1.rds.amazonaws.com',
 user     : 'blue_cart_admin',
 password : 'QwertyMan500',
//  database : 'shipping-service'
});

function insert_shipping (shipping_object,callback){
    
connection.connect();
 
connection.query(`INSERT INTO shipping.shipping (Id, Shipping_mode, Shipping_cost, Shipping_duration) VALUES (UUID(), 'express',6,2)`, function (error, results, fields) {
  if (error){
    throw error;
    console.log('The solution is: ', results[0].solution);
    }
    else{
          connection.destroy();
        callback(results)
    }
});

}

function retrieve_shipping (callback){

connection.connect(); 
connection.query(`SELECT * from shipping.shipping`, function (error, results, fields) {
  if (error){
    throw error;
    console.log('The solution is: ', results[0].solution);
    connection.destroy();
    }
    else{
      connection.destroy();
        callback(results)
    }
});
}


module.exports = {
insert_shipping: insert_shipping,
retrieve_shipping: retrieve_shipping
}
