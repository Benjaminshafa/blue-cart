function insert_item_to_cart (db,review_Object,callback){
    var collection = db.collection('recommendation');
    collection.insert(review_Object, function(err, result) {
            callback(result);
    });
}

function retrieve_shopping_cart_by_customer_id (db,product_id,callback){
    var collection = db.collection('recommendation');
    collection.findOne(product_id, function(err, result) {
            callback(result);
    });
}

module.exports = {
insert_item_to_cart: insert_item_to_cart,
retrieve_shopping_cart_by_customer_id: retrieve_shopping_cart_by_customer_id
}
