// for configuring web server on express.
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// for configuring mongoDB connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://blue-cart-admin:QwertyMan@product-info-w1twn.mongodb.net/product-service?retryWrites=true&w=majority";
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
             return res.status(200).send({Product_Review: product_reviews});        
        }
    })
});


