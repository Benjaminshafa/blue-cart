// for configuring web server on express.
const express = require('express')
const app = express()
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var controller = require('./Controller');

app.post('/shipping',function(req,res){
    controller.insert_shipping(req.body,function(result){
        if(result.affectedRows < 1){
            return res.status(500).send({"message": "failed!"});        
        }
        else{
             return res.status(200).send();        
        }
    })
});

app.get('/shipping',function(req,res){
    controller.retrieve_shipping(function(shippingList){
        if(!shippingList){
            return res.status(404).send({"message": "not found!"});        
        }
        else{
             return res.status(200).send({shippingList});        
        }
    })
});


