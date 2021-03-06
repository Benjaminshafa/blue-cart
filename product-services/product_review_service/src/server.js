// for configuring web server on express.
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('dotenv').config();

// for configuring mongoDB connection
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://"+process.env["MONGO_DB_USERNAME"]+":"+process.env["MONGO_DB_PASSWORD"]+"@"+process.env["MONGO_DB_CLUSTER_ADDRESS"]+"?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var mongodbConnection = null;
client.connect(function(err,connection){
    if(err){
        console.log(err);
    }
    else{
       mongodbConnection = connection.db();
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    }
}); 

var controller = require('./Controller');

app.post('/review',function(req,res){
    controller.insert_review(mongodbConnection,req.body,function(mongoItem){
        if(mongoItem.insertedCount < 1){
            return res.status(500).send({"message": "failed!"});        
        }
        else{
             return res.status(200).send();        
        }
    })
});

app.get('/review',function(req,res){
    controller.retrieve_review_By_Product_Id(mongodbConnection,req.headers.product_id,function(product_reviews){
        if(!product_reviews){
            return res.status(404).send({"message": "not found!"});        
        }
        else{
            var message = {
                productid: '',
                reviewlist: []
            };
            message.productid = product_reviews[0].product_id;
            product_reviews.forEach(element => {
                var reviewlistObject = {}
                reviewlistObject.customer_id = element.customer_Id;
                reviewlistObject.star_rating = element.star_rating;
                reviewlistObject.review_description = element.review_description;
                message.reviewlist.push(reviewlistObject);
            });

             return res.status(200).send({Product_Review: message});        
        }
    })
});


