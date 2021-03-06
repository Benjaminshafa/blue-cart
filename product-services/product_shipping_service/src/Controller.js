var mysql      = require('mysql');
require('dotenv').config();

var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : process.env["MYSQL_DB_HOST"],
  user     : process.env["MYSQL_DB_USERNAME"],
  password : process.env["MYSQL_DB_PASSWORD"],
});


function insert_shipping (shipping_object,callback){

    pool.getConnection((err, connection)=>{
      if(err){
        console.log(err);
      }
      else{
        connection.query(`INSERT INTO shipping.shipping (Id, Shipping_mode, Shipping_cost, Shipping_duration) VALUES (UUID(), 'lousy',1,10)`, function (error, results, fields) {
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
    }) 

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
	        connection.release();
          callback(err);
          }
          else{
            connection.release();
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
