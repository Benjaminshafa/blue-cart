function insert_review (db,review_Object,callback){
    var collection = db.collection('reviews');
    collection.insert(review_Object, function(err, result) {
            callback(result);
    });
}

function retrieve_review_By_Product_Id (db,product_id,callback){
    var collection = db.collection('reviews');
    collection.findOne(product_id, function(err, result) {
            callback(result);
    });
}

module.exports = {
insert_review: insert_review,
retrieve_review_By_Product_Id: retrieve_review_By_Product_Id
}
