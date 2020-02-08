function insert_review (db,review_Object,callback){
    var collection = db.collection('reviews');
    collection.insert(review_Object, function(err, result) {
            callback(result);
    });
}

function retrieve_review_By_Product_Id (db,pid,callback){
    
    db.collection('reviews').find({"product_id":pid}).toArray(function(err,result){
        if(err){
            console.log(err);
            callback(err);
        }
        else{
            console.log(result);
            callback(result);
        }
    });
}

module.exports = {
insert_review: insert_review,
retrieve_review_By_Product_Id: retrieve_review_By_Product_Id
}
