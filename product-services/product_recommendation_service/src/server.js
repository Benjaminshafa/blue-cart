// for configuring web server on express.
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('dotenv').config();

// for configuring mongoDB connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://"+process.env.MONGO_DB_USERNAME+":"+process.env.MONGO_DB_PASSWORD+"@"+process.env.MONGO_DB_CLUSTER_ADDRESS+"?retryWrites=true&w=majority";
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

app.post('/recommendation',function(req,res){
    controller.insert_recommendation(mongodbConnection,req.body,function(mongoItem){
        if(mongoItem.insertedCount < 1){
            return res.status(500).send({"message": "failed!"});        
        }
        else{
             return res.status(200).send();        
        }
    })
});

app.get('/recommendation',function(req,res){
    controller.retrieve_recommendation_by_product_id(mongodbConnection,req.headers.product_id,function(recomendation_list){
        if(!recomendation_list){
            return res.status(404).send({"message": "not found!"});        
        }
        else{
             return res.status(200).send(recomendation_list);        
        }
    })
});


