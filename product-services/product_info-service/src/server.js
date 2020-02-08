// for configuring web server on express.
const express = require('express')
var responseTime = require('response-time')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('dotenv').config();

// for configuring mongoDB connection
const MongoClient = require('mongodb').MongoClient;
console.log("the mongo username is :"+ process.env["MONGO_DB_USERNAME"]);

console.log("the mongo password is :"+ process.env["MONGO_DB_PASSWORD"]);

console.log("the mongo cluster is :"+ process.env["MONGO_DB_CLUSTER_ADDRESS"]);

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

app.post('/product',function(req,res){
    controller.insert_Product(mongodbConnection,req.body,function(mongoItem){
        if(mongoItem.insertedCount < 1){
            return res.status(500).send({"message": "failed!"});        
        }
        else{
             return res.status(200).send({});        
        }
    })
});

app.get('/product',function(req,res){
    controller.retrieve_Product_By_Id(mongodbConnection,req.header.id,function(product_Info){
        if(product_Info.insertedCount < 1){
            return res.status(404).send({"message": "not found!"});        
        }
        else{
             return res.status(200).send({productInfo: product_Info});        
        }
    })
});


