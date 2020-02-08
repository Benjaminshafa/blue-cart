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
    console.log('meoow');
    controller.retrieve_shipping(function(shippingList){
        if(!shippingList){
            return res.status(404).send({"message": "not found!"});        
        }
        else{

            var message = {
                shippinglist: []
              };
              shippingList.forEach(element => {
                var temp_obj = {};
                temp_obj.id = element.Id;
                temp_obj.shippingmode = element.Shipping_mode;
                temp_obj.cost = element.Shipping_cost;
                temp_obj.duration = element.Shipping_duration;
                message.shippinglist.push(temp_obj);
              });

             return res.status(200).send({ShippingList: message});        
        }
    })
});


