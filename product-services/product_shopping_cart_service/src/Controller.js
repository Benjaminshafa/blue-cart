function insert_item_to_cart (db,review_Object,callback){
    var collection = db.collection('shopping_cart');
    collection.insert(review_Object, function(err, result) {
            callback(result);
    });
}

function retrieve_shopping_cart_by_customer_id (db,cId,callback){
    var collection = db.collection('shopping_cart');
    collection.findOne({"customer_Id":cId}, function(err, result) {
            callback(result);
    });
}

module.exports = {
insert_item_to_cart: insert_item_to_cart,
retrieve_shopping_cart_by_customer_id: retrieve_shopping_cart_by_customer_id
}
