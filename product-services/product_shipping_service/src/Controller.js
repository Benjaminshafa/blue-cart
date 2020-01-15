var mysql      = require('mysql');
var connection = mysql.createConnection({
 host     : 'shipping-service.mysql.database.azure.com',
 user     : 'blue_cart_admin@shipping-service',
 password : 'QwertyMan500',
//  database : 'shipping-service'
});

function insert_shipping (shipping_object,callback){
    
connection.connect();
 
connection.query(`INSERT INTO shipping.shipping (Id, Shipping_mode, Shipping_cost, Shipping_duration) VALUES (UUID(), 'standard',2,5)`, function (error, results, fields) {
  if (error){
    throw error;
    console.log('The solution is: ', results[0].solution);
    }
    else{
        callback(results)
    }
});
connection.end();
}

function retrieve_shipping (callback){
  connection.connect();
 
connection.query(`SELECT * from shipping.shipping`, function (error, results, fields) {
  if (error){
    throw error;
    console.log('The solution is: ', results[0].solution);
    }
    else{
        callback(results)
    }
});
connection.end();
}

module.exports = {
insert_shipping: insert_shipping,
retrieve_shipping: retrieve_shipping
}
