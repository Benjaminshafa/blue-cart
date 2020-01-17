function insert_Product (db,product_info,callback){
    var collection = db.collection('products');
    collection.insert(product_info, function(err, result) {
            callback(result);
    });
}

function retrieve_Product_By_Id (db,product_id,callback){
    var collection = db.collection('products');
    collection.findOne(product_id, function(err, result) {
            callback(result);
    });
}

module.exports = {
insert_Product: insert_Product,
retrieve_Product_By_Id: retrieve_Product_By_Id
}
