var mysql      = require('mysql');

var pool  = mysql.createPool({
  connectionLimit : 8,
  host     : 'blue-cart.cgieg9vhodze.eu-central-1.rds.amazonaws.com',
  user     : 'blue_cart_admin',
  password : 'QwertyMan500',
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
  pool.getConnection(function(err, connection) {
    if(err){
      console.log('The solution is: ', results[0].solution);
      callback(err);
    }
    else{
      connection.query(`SELECT * from shipping.shipping`, function (error, results, fields) {
        if (error){
          console.log('The solution is: ', results[0].solution);
          callback(err);
          }
          else{
            callback(results)
          }
      });
    }
  })
}


module.exports = {
insert_shipping: insert_shipping,
retrieve_shipping: retrieve_shipping
}
