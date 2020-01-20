function insert_recommendation (db,review_Object,callback){
    var collection = db.collection('recommendation');
    collection.insert(review_Object, function(err, result) {
            callback(result);
    });
}

function retrieve_recommendation_by_product_id (db,pid,callback){
    var collection = db.collection('recommendation');
    collection.findOne({"product_Id":pid}, function(err,result) {
            if(err){
                callback(err);
            }
            else{
                callback(result);
            }
    });
}

module.exports = {
insert_recommendation: insert_recommendation,
retrieve_recommendation_by_product_id: retrieve_recommendation_by_product_id
}
