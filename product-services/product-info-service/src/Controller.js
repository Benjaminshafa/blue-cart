function insert_Product (db,product_info,callback){
    // Get the documents collection
    var collection = db.collection('products');
    // Insert some documents
    collection.insert(product_info, function(err, result) {
            console.log("Inserted product successfully!");
            callback(result);
    });
}

module.exports = {
insert_Product: insert_Product
}
